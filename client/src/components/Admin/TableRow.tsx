import type { Rifa } from '../../types/Rifa';

type Props = {
  rifa: Rifa;
  isEditing: boolean;
  editRifa: Rifa | null;
  setEditRifa: (r: Rifa | null) => void;
  onSalvar: () => void;
  onPagar: (id: number) => void;
  onPendente: (id: number) => void;
  onExcluir: (id: number) => void;
};

export default function TableRow({
  rifa, isEditing, editRifa, setEditRifa,
  onSalvar, onPagar, onPendente, onExcluir
}: Props) {
  return (
    <tr className='fs-5'>
      <td>
        {isEditing ? (
          <input className="form-control" type="text" value={editRifa?.nome} onChange={e => setEditRifa({ ...editRifa!, nome: e.target.value })} />
        ) : rifa.nome}
      </td>
      <td>
        {isEditing ? (
          <input className="form-control" type="email" value={editRifa?.email} onChange={e => setEditRifa({ ...editRifa!, email: e.target.value })} />
        ) : rifa.email}
      </td>
      <td>
        {isEditing ? (
          <input className="form-control" type="text" value={editRifa?.telefone} onChange={e => setEditRifa({ ...editRifa!, telefone: e.target.value })} />
        ) : rifa.telefone}
      </td>
      <td>
        {isEditing ? (
          <input className="form-control" type="number" value={editRifa?.numero} onChange={e => setEditRifa({ ...editRifa!, numero: +e.target.value })} />
        ) : rifa.numero}
      </td>
      <td>
        <span className={`badge ${rifa.pago ? 'bg-success' : 'bg-warning text-dark'}`}>
          {rifa.pago ? 'Pago' : 'Pendente'}
        </span>
      </td>
      <td>
        {isEditing ? (
          <button className="btn btn-success btn-sm" onClick={onSalvar}>
            <i className="bi bi-check-lg" /> Salvar
          </button>
        ) : (
          <>
            <button
              className={`btn ${rifa.pago ? 'btn-warning' : 'btn-success'} me-1`}
              onClick={() => rifa.pago ? onPendente(rifa.id) : onPagar(rifa.id)}
            >
              <i className={`bi ${rifa.pago ? 'bi-x-circle' : 'bi-check-circle'}`} />
            </button>
            <button className="btn btn-info me-1" onClick={() => setEditRifa(rifa)}>
              <i className="bi bi-pencil" />
            </button>
            <button className="btn btn-danger" onClick={() => onExcluir(rifa.id)}>
              <i className="bi bi-trash" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
