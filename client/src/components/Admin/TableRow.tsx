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

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta rifa?");
    if (confirmDelete) {
      onExcluir(id);
    }
  };

  return (
    <tr className="align-middle">
      <td>
        {new Date(rifa.created_at).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          dateStyle: 'short',
          timeStyle: 'short',
        })}
      </td>
      <td className="text-wrap">
        {isEditing ? (
          <input 
            className="form-control w-100" 
            type="text" 
            value={editRifa?.nome} 
            onChange={e => setEditRifa({ ...editRifa!, nome: e.target.value })} 
          />
        ) : rifa.nome}
      </td>
      <td className="text-wrap">
        {isEditing ? (
          <input 
            className="form-control w-100" 
            type="text" 
            value={editRifa?.telefone} 
            onChange={e => setEditRifa({ ...editRifa!, telefone: e.target.value })} 
          />
        ) : rifa.telefone}
      </td>
      <td className="text-wrap">
        {isEditing ? (
          <input 
            className="form-control w-100" 
            type="number" 
            value={editRifa?.numero} 
            onChange={e => setEditRifa({ ...editRifa!, numero: +e.target.value })} 
          />
        ) : rifa.numero}
      </td>
      <td className="text-wrap">
        <span className={`badge ${rifa.pago ? 'bg-success' : 'bg-warning text-dark'}`}>
          {rifa.pago ? 'Pago' : 'Pendente'}
        </span>
      </td>
      <td>
        {isEditing ? (
          <button className="btn btn-success btn-sm w-100" onClick={onSalvar}>
            <i className="bi bi-check-lg" /> Salvar
          </button>
        ) : (
          <div className="d-flex flex-column flex-md-row">
            <button
              className={`btn ${rifa.pago ? 'btn-warning' : 'btn-success'} me-1 mb-1 w-100 w-md-auto`}
              onClick={() => rifa.pago ? onPendente(rifa.id) : onPagar(rifa.id)}
            >
              <i className={`bi ${rifa.pago ? 'bi-x-circle' : 'bi-check-circle'}`} />
            </button>
            <button className="btn btn-info me-1 mb-1 w-100 w-md-auto" onClick={() => setEditRifa(rifa)}>
              <i className="bi bi-pencil" />
            </button>
            <button className="btn btn-danger me-1 mb-1 w-100 w-md-auto" onClick={() => handleDelete(rifa.id)}>
              <i className="bi bi-trash" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
