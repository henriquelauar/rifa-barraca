import type { Rifa } from '../types/Rifa';
import TableRow from './TableRow';

type Props = {
  rifas: Rifa[];
  editRifa: Rifa | null;
  erro: string;
  setEditRifa: (rifa: Rifa | null) => void;
  marcarComoPago: (id: number) => void;
  marcarComoPendente: (id: number) => void;
  excluirRifa: (id: number) => void;
  atualizarRifa: () => void;
};

export default function AdminTable({
  rifas, editRifa, erro, setEditRifa,
  marcarComoPago, marcarComoPendente, excluirRifa, atualizarRifa
}: Props) {
  return (
    <>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>Telefone</th>
              <th>Número</th>
              <th>Status</th>
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
