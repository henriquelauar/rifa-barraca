import React from 'react';

interface FormularioRifaProps {
  form: {
    nome: string;
    email: string;
    telefone: string;
    numeros: number[];
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
  mensagem: string;
}

const RifaForm: React.FC<FormularioRifaProps> = ({ form, handleChange, handleSubmit, loading, mensagem }) => {
  return (
    <div className="card p-4 mb-4 mt-4">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-3">📨 Reserve seus números</h4>
        <div className="mb-3">
          <label className="form-label">Nome / Apelido</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
        </div>
        {form.numeros.length > 0 && (
          <p className="fw-bold">Selecionados: {form.numeros.sort((a, b) => a - b).join(', ')}</p>
        )}
        <div className="d-grid">
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? 'Enviando...' : 'Reservar número(s)'}
          </button>
        </div>
        {mensagem && (
          <div className={`alert mt-3 ${mensagem.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
};

export default RifaForm;
