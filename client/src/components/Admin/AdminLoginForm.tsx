import { useState } from "react";

type Props = {
    onLogin: (email: string, senha: string) => void;
    erro: string;
  };
  
  export default function AdminLoginForm({ onLogin, erro }: Props) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onLogin(email, senha);
    };
  
    return (
      <div className="container py-5">
        <h6 className="text-center"><a href="/">Voltar para a página da rifa</a></h6>
        <h2 className="text-center mb-4">Login do Admin</h2>
        <form onSubmit={handleSubmit} className="col-12 col-md-6 mx-auto shadow p-4 rounded bg-light">
          <input type="email" placeholder="Email" required className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" required className="form-control mb-3" value={senha} onChange={e => setSenha(e.target.value)} />
          <button type="submit" className="btn btn-dark w-100">Entrar</button>
          {erro && <div className="alert alert-danger mt-3">{erro}</div>}
        </form>
      </div>
    );
  }
  