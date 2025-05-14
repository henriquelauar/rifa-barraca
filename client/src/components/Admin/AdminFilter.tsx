import type { Dispatch, SetStateAction } from 'react';
import type { Rifa } from '../../types/Rifa';

interface Props {
  filtroPago: 'todos' | 'pago' | 'pendente';
  setFiltroPago: Dispatch<SetStateAction<'todos' | 'pago' | 'pendente'>>;
  ordenarPor: keyof Rifa;
  setOrdenarPor: Dispatch<SetStateAction<keyof Rifa>>;
  ordemAscendente: boolean;
  setOrdemAscendente: Dispatch<SetStateAction<boolean>>;
}

export function AdminFilter ({
  filtroPago,
  setFiltroPago,
  ordenarPor,
  setOrdenarPor,
  ordemAscendente,
  setOrdemAscendente,
}: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <label className="me-2 fw-bold">Filtrar por status:</label>
        <select
          value={filtroPago}
          onChange={e =>
            setFiltroPago(e.target.value as 'todos' | 'pago' | 'pendente')
          }
          className="form-select d-inline-block w-auto"
        >
          <option value="todos">Todos</option>
          <option value="pago">Pagos</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

      <div>
        <label className="me-2 fw-bold">Ordenar por:</label>
        <select
          value={ordenarPor}
          onChange={e => setOrdenarPor(e.target.value as keyof Rifa)}
          className="form-select d-inline-block w-auto me-2"
        >
          <option value="email">Email</option>
          <option value="telefone">Telefone</option>
          <option value="numero">Número</option>
          <option value="pago">Status</option>
        </select>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setOrdemAscendente(prev => !prev)}
        >
          {ordemAscendente ? '⬆️ Crescente' : '⬇️ Decrescente'}
        </button>
      </div>
    </div>
  );
}
