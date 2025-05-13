import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PaymentModal from '../components/PaymentModal'
import logo from '../assets/BARRACA.png'

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  numeros: number[];
};

export default function RifaForm() {
  const [form, setForm] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    numeros: [],
  });

  const [numerosUsados, setNumerosUsados] = useState<number[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState<'todos' | 'disponiveis' | 'reservados'>('todos');
  const [showModal, setShowModal] = useState(false);
  const [reservaInfo, setReservaInfo] = useState<FormData | null>(null);

  useEffect(() => {
    buscarNumerosUsados();
  }, []);

  async function buscarNumerosUsados() {
    const { data, error } = await supabase.from('rifa_participantes').select('numero');
    if (error) {
      console.error('Erro ao buscar números:', error);
      return;
    }
    const usados = data.map((item) => item.numero);
    setNumerosUsados(usados);
  }

  function toggleNumero(numero: number) {
    const isUsado = numerosUsados.includes(numero);
    if (isUsado) return;

    setForm((prev) => ({
      ...prev,
      numeros: prev.numeros.includes(numero)
        ? prev.numeros.filter((n) => n !== numero)
        : [...prev.numeros, numero],
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email.includes('@') || form.nome.length < 2 || form.telefone.length < 8 || form.numeros.length === 0) {
      setMensagem('❌ Preencha todos os campos corretamente e selecione ao menos um número.');
      return;
    }

    const indisponiveis = form.numeros.filter((n) => numerosUsados.includes(n));
    if (indisponiveis.length > 0) {
      setMensagem(`❌ Os números ${indisponiveis.join(', ')} já foram reservados.`);
      return;
    }

    setLoading(true);

    const registros = form.numeros.map((numero) => ({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      numero,
    }));

    const { error } = await supabase.from('rifa_participantes').insert(registros);

    if (error && error.code === '23505') {
      setMensagem('❌ Um ou mais números acabaram de ser reservados por outro participante. Atualize a lista e tente novamente.');
      buscarNumerosUsados();
      return;
    } else {
      setMensagem(`✅ ${form.numeros.length === 1 ? "Número" : "Números"} ${form.numeros.join(", ")} reservado${form.numeros.length === 1 ? "" : "s"} com sucesso!`);
      setForm({ nome: '', email: '', telefone: '', numeros: [] });
      buscarNumerosUsados();
      setReservaInfo(form);
      setShowModal(true);
    }

    setLoading(false);
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Rifa da Barraca Armada</h1>

      {/* Imagem da Rifa */}
      <div className="card mb-4 text-center">
        <div>
          <img
            src="https://m.media-amazon.com/images/I/51cYs7G8oRL._AC_SX679_.jpg" // substitua pelo seu caminho real
            alt="Imagem da Rifa"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '250px', objectFit: 'cover' }}
            />
          </div>
      </div>

      {/* Valor */}
      <div className="card text-white bg-success text-center mb-3">
        <div className="card-body">
          <h6 className="card-title">Por Apenas</h6>
          <h4 className="card-text fw-bold">R$5,00</h4>
        </div>
      </div>

      {/* Sorteio */}
      <div className="card text-center mb-4">
        <p className="mb-1 mt-2"><strong>Sorteio:</strong> Live no Instagram</p>
        <p className='border-top'><strong>Data:</strong> 30/06/2025</p>
      </div>

      {/* Prêmio */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">🏆 Prêmio</h5>
          <p className="card-text">Fritadeira Air Fryer Philco Gourmet Black 4,4L</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">📋 Descrição da Rifa</h5>
          <p className="card-text">Fala galera! Como muitos sabem, morar em república não é fácil e estamos precisando da ajuda de vocês para comprar uma máquina de lavar e um fogão,
            visto que eles estão com defeito. Sua participação é essencial para nos ajudar a melhorar a nossa república. <br/><br/>Cada rifa está custando R$5,00 e o prêmio é uma AirFryer Philco 
            4,4L ou um pix no valor de R$300,00. O sorteio acontecerá por meio de uma live no instagram <a href="https://www.instagram.com/barracaarmada" target='_blank'>(@barracaarmada)</a> no dia 30/06, ou assim que esgotarem os números da rifa. 
          </p>
        </div>
      </div>

      {/* Organizador */}
      <div className="card mb-4">
        <div className="card-body d-flex">
          <img src={logo} alt="logo barraca armada" className="img-fluid rounded-circle shadow" style={{maxHeight: '100px'}}/>
          <div className="text-center mx-3">
            <p className='fw-bold'>Organizador</p>
            <p>República Barraca Armada</p>
            <button className='btn btn-success'><a href="https://wa.me/5531997568782" target="_blank" className='text-white' style={{textDecoration: 'none'}}>Whatsapp <i className='bi bi-whatsapp mx-2'></i></a></button>
          </div>
        </div>
      </div>

      {/* Filtro de Números */}
      <div className="mb-3">
        <label className="form-label fw-bold">Filtrar números:</label>
        <select
          className="form-select"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as 'todos' | 'disponiveis' | 'reservados')}
        >
          <option value="todos">Todos</option>
          <option value="disponiveis">Disponíveis</option>
          <option value="reservados">Reservados</option>
        </select>
      </div>

      {/* Números */}
      <div className="card p-4">
        <h5 className="mb-3">🎫 Escolha seus números</h5>
        <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {Array.from({ length: 500 }, (_, i) => i + 1)
          .filter((numero) => {
            const usado = numerosUsados.includes(numero);
            if (filtro === 'disponiveis') return !usado;
            if (filtro === 'reservados') return usado;
            return true; // 'todos'
          })
          .map((numero) => {
            const usado = numerosUsados.includes(numero);
            const selecionado = form.numeros.includes(numero);
            return (
              <button
                key={numero}
                type="button"
                className={`btn numero-btn ${usado ? 'btn-danger' : selecionado ? 'btn-success' : 'btn-outline-dark'}`}
                onClick={() => toggleNumero(numero)}
                disabled={usado}
              >
                {numero}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formulário */}
      <div className="card p-4 mb-4 mt-4">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3">📨 Reserve seus números</h4>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input type="tel" className="form-control" name="telefone" value={form.telefone} onChange={handleChange} required />
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

      {/* Estilos */}
      <style>
        {`
          .numero-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-weight: bold;
            font-size: 0.85rem;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            padding: 0;
          }
        `}
      </style>
    {reservaInfo && (
      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nome={reservaInfo.nome}
        email={reservaInfo.email}
        telefone={reservaInfo.telefone}
        numeros={reservaInfo.numeros}
        chavePix="31 997568782"
      />
    )}
    </div>
  );
}
