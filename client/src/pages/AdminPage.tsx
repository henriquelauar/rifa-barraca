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
  const [filtroNumero, setFiltroNumero] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' });
  const totalVendidas = rifas.filter(rifa => rifa.pago).length;


  const rifasFiltradas = rifas.filter(rifa => {
    const filtroTextoValido =
      filtro.trim() === '' ||
      rifa.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      rifa.email.toLowerCase().includes(filtro.toLowerCase()) ||
      rifa.telefone.includes(filtro);

    const filtroNumeroValido =
      filtroNumero.trim() === '' ||
      rifa.numero.toString() === filtroNumero.trim();

    return filtroTextoValido && filtroNumeroValido;
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

      {/* Campo de Filtro */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control shadow-sm transition-input"
            placeholder="Pesquisar por nome, email ou telefone"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control shadow-sm transition-input"
            placeholder="Pesquisar por número"
            value={filtroNumero}
            onChange={(e) => setFiltroNumero(e.target.value)}
          />
        </div>
      </div>

      <div className="fade-table">
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
    </div>
  );
}
