import { useAdmin } from '../hooks/useAdmin';
import AdminLoginForm from '../components/Admin/AdminLoginForm';
import AdminTable from '../components/Admin/AdminTable';
import { useState } from 'react';

export default function AdminPage() {
  const {
    user, isAdmin, loading, erro, rifas, editRifa,
    setEditRifa, login, logout, marcarComoPago,
    marcarComoPendente, excluirRifa, atualizarRifa
  } = useAdmin();

  const [filtro, setFiltro] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' });
  const totalVendidas = rifas.filter(rifa => rifa.pago).length;

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const rifasFiltradas = rifas.filter(rifa => {
    return (
      rifa.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      rifa.email.toLowerCase().includes(filtro.toLowerCase()) ||
      rifa.telefone.includes(filtro) ||
      (rifa.pago ? 'Pago' : 'Pendente').toLowerCase().includes(filtro.toLowerCase())
    );
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRifas = [...rifasFiltradas].sort((a, b) => {
    const key = sortConfig.key as keyof typeof rifas[0];
    if (a[key] < b[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" />
    </div>;
  }

  if (!user) return <AdminLoginForm onLogin={login} erro={erro} />;
  if (!isAdmin) return <p className="text-danger text-center">Acesso negado.</p>;

  return (
    <div className="container my-4">
      <h6><a href="/">Voltar para a página da rifa</a></h6>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painel de Administração</h2>
        <button className="btn btn-outline-danger" onClick={logout}>
          <i className="bi bi-box-arrow-right me-1" />
          Sair
        </button>
      </div>
      <h4 className="mb-3">Reservas da Rifa</h4>
      <div className="alert alert-success">
  <strong>{totalVendidas}</strong> número{totalVendidas !== 1 ? 's' : ''} já {totalVendidas !== 1 ? 'vendidos' : 'vendido'}!
</div>
      {/* Campo de filtro */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome, email, telefone ou status"
          value={filtro}
          onChange={handleFiltroChange}
        />
      </div>

      <AdminTable
        rifas={sortedRifas}
        erro={erro}
        editRifa={editRifa}
        setEditRifa={setEditRifa}
        marcarComoPago={marcarComoPago}
        marcarComoPendente={marcarComoPendente}
        excluirRifa={excluirRifa}
        atualizarRifa={atualizarRifa}
        handleSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
}
