import { useAdmin } from '../hooks/useAdmin';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminTable from '../components/AdminTable';

export default function AdminPage() {
  const {
    user, isAdmin, loading, erro, rifas, editRifa,
    setEditRifa, login, logout, marcarComoPago,
    marcarComoPendente, excluirRifa, atualizarRifa
  } = useAdmin();

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" />
    </div>;
  }

  if (!user) return <AdminLoginForm onLogin={login} erro={erro} />;
  if (!isAdmin) return <p className="text-danger text-center">Acesso negado.</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painel de Administração</h2>
        <button className="btn btn-outline-danger" onClick={logout}>
          <i className="bi bi-box-arrow-right me-1" />
          Sair
        </button>
      </div>
      <h4 className="mb-3">Reservas da Rifa</h4>
      <AdminTable
        rifas={rifas}
        erro={erro}
        editRifa={editRifa}
        setEditRifa={setEditRifa}
        marcarComoPago={marcarComoPago}
        marcarComoPendente={marcarComoPendente}
        excluirRifa={excluirRifa}
        atualizarRifa={atualizarRifa}
      />
    </div>
  );
}
