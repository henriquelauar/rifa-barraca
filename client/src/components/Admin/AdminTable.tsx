import TableRow from '../Admin/TableRow';
import type { Rifa } from '../../types/Rifa';

type Props = {
  rifas: Rifa[];
  erro: string;
  editRifa: Rifa | null;
  setEditRifa: (rifa: Rifa | null) => void;
  marcarComoPago: (id: number) => void;
  marcarComoPendente: (id: number) => void;
  excluirRifa: (id: number) => void;
  atualizarRifa: () => void;
  handleSort: (key: string) => void;
  sortConfig: { key: string, direction: 'asc' | 'desc' };
};

export default function AdminTable({
  rifas, erro, editRifa, setEditRifa,
  marcarComoPago, marcarComoPendente, excluirRifa, atualizarRifa,
  handleSort, sortConfig
}: Props) {
  return (
    <>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort('nome')} style={{ cursor: 'pointer' }}>
                Nome {sortConfig.key === 'nome' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('telefone')} style={{ cursor: 'pointer' }}>
                Telefone {sortConfig.key === 'telefone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('numero')} style={{ cursor: 'pointer' }}>
                Número {sortConfig.key === 'numero' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('pago')} style={{ cursor: 'pointer' }}>
                Status {sortConfig.key === 'pago' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rifas.map(rifa => (
              <TableRow
                key={rifa.id}
                rifa={rifa}
                isEditing={editRifa?.id === rifa.id}
                editRifa={editRifa}
                setEditRifa={setEditRifa}
                onSalvar={atualizarRifa}
                onPagar={marcarComoPago}
                onPendente={marcarComoPendente}
                onExcluir={excluirRifa}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
