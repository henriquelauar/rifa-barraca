import React from 'react';

interface FormularioRifaProps {
  form: {
    nome: string;
    email: string;
    telefone: string;
    ddd: string;
    numeros: number[];
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  loading: boolean;
  mensagem: string;
}

const RifaForm: React.FC<FormularioRifaProps> = ({
  form,
  handleChange,
  handleSubmit,
  loading,
  mensagem,
}) => {
  return (
    <div className="card p-4 mb-4 mt-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4 text-center">📨 Reserve seus números</h4>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome ou apelido"
            required
          />
          <label htmlFor="nome">Nome ou Apelido</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            required
          />
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-4 col-sm-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="ddd"
                name="ddd"
                value={form.ddd}
                onChange={handleChange}
                minLength={2}
                maxLength={2}
                placeholder="DDD"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
              <label htmlFor="ddd">DDD</label>
            </div>
          </div>
          <div className="col-8 col-sm-9">
            <div className="form-floating">
              <input
                type="tel"
                className="form-control"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                minLength={9}
                maxLength={9}
                placeholder="Número"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
              <label htmlFor="telefone">Telefone</label>
            </div>
          </div>
        </div>

        {form.numeros.length > 0 && (
          <p className="fw-bold text-center text-primary">
            Selecionados: {form.numeros.sort((a, b) => a - b).join(', ')}
          </p>
        )}

        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Enviando...
              </>
            ) : (
              'Reservar número(s)'
            )}
          </button>
        </div>

        {mensagem && (
          <div
            className={`alert mt-3 ${
              mensagem.includes('✅') ? 'alert-success' : 'alert-danger'
            }`}
            role="alert"
          >
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
};

export default RifaForm;
