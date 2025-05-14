import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import type { Rifa } from '../types/Rifa';

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rifas, setRifas] = useState<Rifa[]>([]);
  const [erro, setErro] = useState('');
  const [editRifa, setEditRifa] = useState<Rifa | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        checkAdmin(session.user.id);
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('isAdmin')
      .eq('id', userId)
      .single();

    if (error || !data?.isAdmin) {
      setErro('Acesso não autorizado.');
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
      fetchRifas();
    }
    setLoading(false);
  };

  const fetchRifas = async () => {
    const { data, error } = await supabase
      .from('rifa_participantes')
      .select('*')
      .order('created_at', { ascending: true });


    if (error) {
      setErro('Erro ao carregar rifas');
    } else {
      setRifas(data);
    }
  };

  const login = async (email: string, senha: string) => {
    setErro('');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error || !data.session?.user) {
      setErro('Login inválido');
      setLoading(false);
      return;
    }
    const currentUser = data.session.user;
    setUser(currentUser);
    checkAdmin(currentUser.id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const marcarComoPago = async (id: number) => {
    const { error } = await supabase.from('rifa_participantes').upsert([{ id, pago: true }]).single();
    if (error) {
      setErro('Erro ao marcar como pago');
    } else {
      setRifas(rifas.map(rifa => (rifa.id === id ? { ...rifa, pago: true } : rifa)));
    }
  };

  const marcarComoPendente = async (id: number) => {
    const { error } = await supabase.from('rifa_participantes').upsert([{ id, pago: false }]).single();
    if (error) {
      setErro('Erro ao marcar como pendente');
    } else {
      setRifas(rifas.map(rifa => (rifa.id === id ? { ...rifa, pago: false } : rifa)));
    }
  };

  const excluirRifa = async (id: number) => {
    const { error } = await supabase.from('rifa_participantes').delete().eq('id', id);
    if (error) {
      setErro('Erro ao excluir reserva');
    } else {
      setRifas(rifas.filter(rifa => rifa.id !== id));
    }
  };

  const atualizarRifa = async () => {
    if (!editRifa) return;
    const { error } = await supabase
      .from('rifa_participantes')
      .update({
        email: editRifa.email,
        telefone: editRifa.telefone,
        numero: editRifa.numero
      })
      .eq('id', editRifa.id);
    if (error) {
      setErro('Erro ao atualizar reserva');
    } else {
      setRifas(rifas.map(r => (r.id === editRifa.id ? editRifa : r)));
      setEditRifa(null);
    }
  };

  return {
    user, isAdmin, loading, erro, rifas, editRifa,
    setEditRifa, login, logout, marcarComoPago,
    marcarComoPendente, excluirRifa, atualizarRifa
  };
}
