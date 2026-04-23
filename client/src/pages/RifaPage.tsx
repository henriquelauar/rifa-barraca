import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PaymentModal from '../components/Rifa/PaymentModal';
import RifaInfo from '../components/Rifa/RifaInfo';
import RifaFormComponent from '../components/Rifa/RifaForm';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  ddd: string;
  numeros: number[];
};

export default function RifaPage() {
  const [form, setForm] = useState<FormData>({
    nome: '',
    email: '',
    ddd: '',
    telefone: '',
    numeros: [],
  });

  const [numerosUsados, setNumerosUsados] = useState<number[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState<'todos' | 'disponiveis' | 'reservados'>('disponiveis');
  const [showModal, setShowModal] = useState(false);
  const [reservaInfo, setReservaInfo] = useState<FormData | null>(null);

  useEffect(() => {
    buscarNumerosUsados();
  }, []);

  async function buscarNumerosUsados() {
    const { data, error } = await supabase
      .from('rifa_participantes')
      .select('numero');

    if (error) {
      console.error('Erro ao buscar números:', error);
      setMensagem('❌ Erro ao carregar números reservados.');
      return;
    }

    const usados = [...new Set((data ?? []).map((item) => Number(item.numero)).filter((n) => !Number.isNaN(n)))];
    setNumerosUsados(usados);
  }

  const numerosUsadosSet = useMemo(() => new Set(numerosUsados), [numerosUsados]);

  const numerosFiltrados = useMemo(() => {
    return Array.from({ length: 600 }, (_, i) => i + 1).filter((numero) => {
      const usado = numerosUsadosSet.has(numero);

      if (filtro === 'disponiveis') return !usado;
      if (filtro === 'reservados') return usado;
      return true;
    });
  }, [filtro, numerosUsadosSet]);

  function toggleNumero(numero: number) {
    const isUsado = numerosUsadosSet.has(numero);
    if (isUsado) return;

    setForm((prev) => ({
      ...prev,
      numeros: prev.numeros.includes(numero)
        ? prev.numeros.filter((n) => n !== numero)
        : [...prev.numeros, numero],
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'telefone' || name === 'ddd') {
      const onlyNumbers = /^[0-9]*$/;
      if (!onlyNumbers.test(value)) {
        setMensagem('❌ O telefone e DDD devem conter apenas números.');
        return;
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setMensagem('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const erros: string[] = [];

    if (!form.nome || form.nome.trim().length < 2) {
      erros.push('Nome deve ter pelo menos 2 caracteres.');
    }

    if (!form.email || !form.email.includes('@')) {
      erros.push('E-mail inválido. Verifique se está no formato correto.');
    }

    if (!form.ddd || !/^\d{2}$/.test(form.ddd)) {
      erros.push('DDD deve conter exatamente 2 dígitos numéricos.');
    }

    if (!form.telefone || !/^\d{8,9}$/.test(form.telefone)) {
      erros.push('Telefone deve conter 8 ou 9 dígitos numéricos.');
    }

    if (!form.numeros || form.numeros.length === 0) {
      erros.push('Selecione pelo menos um número da rifa.');
    }

    if (erros.length > 0) {
      setMensagem(`❌ Corrija os seguintes erros:\n- ${erros.join('\n- ')}`);
      return;
    }

    const indisponiveis = form.numeros.filter((n) => numerosUsadosSet.has(n));
    if (indisponiveis.length > 0) {
      setMensagem(`❌ Os números ${indisponiveis.join(', ')} já foram reservados.`);
      return;
    }

    setLoading(true);

    try {
      const registros = form.numeros.map((numero) => ({
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: `(${form.ddd}) ${form.telefone}`,
        numero,
      }));

      const { error } = await supabase.from('rifa_participantes').insert(registros);

      if (error) {
        if (error.code === '23505') {
          setMensagem('❌ Um ou mais números acabaram de ser reservados por outro participante. Atualize a lista e tente novamente.');
          await buscarNumerosUsados();
          return;
        }

        setMensagem(`❌ Erro ao reservar número(s): ${error.message}`);
        return;
      }

      const reservaAtual: FormData = {
        ...form,
        numeros: [...form.numeros],
      };

      setMensagem(
        `✅ ${form.numeros.length === 1 ? 'Número' : 'Números'} ${[...form.numeros].sort((a, b) => a - b).join(', ')} reservado${form.numeros.length === 1 ? '' : 's'} com sucesso!`
      );

      setReservaInfo(reservaAtual);
      setForm({ nome: '', email: '', ddd: '', telefone: '', numeros: [] });
      await buscarNumerosUsados();
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <RifaInfo />

      <div className="mb-3">
        <label className="form-label fw-bold">Filtrar números:</label>
        <select
          className="form-select"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as 'todos' | 'disponiveis' | 'reservados')}
        >
          <option value="todos">Todos</option>
          <option value="disponiveis">Disponíveis</option>
          <option value="reservados">Reservados</option>
        </select>
      </div>

      <div className="card p-4">
        <h5 className="mb-1">🎫 Escolha seus números</h5>
        <h6 className="mb-3">Números de 1 a 600, role para ver mais!</h6>

        <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '430px', overflowY: 'scroll' }}>
          {numerosFiltrados.map((numero) => {
            const usado = numerosUsadosSet.has(numero);
            const selecionado = form.numeros.includes(numero);

            return (
              <button
                key={numero}
                type="button"
                className={`btn numero-btn ${
                  usado ? 'btn-danger' : selecionado ? 'btn-success' : 'btn-outline-dark'
                }`}
                onClick={() => toggleNumero(numero)}
                disabled={usado}
              >
                {numero}
              </button>
            );
          })}
        </div>
      </div>

      <RifaFormComponent
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        mensagem={mensagem}
      />

      <h6 className="text-center">
        <a href="/admin">Painel Administrativo</a>
      </h6>

      {reservaInfo && (
        <PaymentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          nome={reservaInfo.nome}
          email={reservaInfo.email}
          telefone={reservaInfo.telefone}
          numeros={reservaInfo.numeros}
          chavePix="bacead7c-cc07-4ace-83a6-1b5201dbbaac"
        />
      )}
    </div>
  );
}