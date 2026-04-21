import logo from '../../assets/BARRACA.png';
import './rifa-info.css';

export default function RifaInfo() {
  return (
    <>
      <h1 className="rifa-title text-center mb-4">Rifa da Barraca Armada</h1>

      <div className="card rifa-banner-card mb-4">
        <img
          src="https://imgs.casasbahia.com.br/1569607727/1xg.jpg"
          alt="Caixa de Som Bluetooth Extreme Britânia"
          className="img-fluid rifa-banner-image"
        />
      </div>

      <div className="card rifa-price-card text-center mb-3">
        <div className="card-body">
          <h6 className="card-title rifa-price-label">Por apenas</h6>
          <h4 className="card-text fw-bold rifa-price-value">R$5,00</h4>
        </div>
      </div>

      <div className="card rifa-info-card text-center mb-4">
        <div className="card-body py-3">
          <p className="mb-2">
            <strong>Sorteio:</strong> Live no Instagram
          </p>
          <p className="mb-0 pt-2 border-top">
            <strong>Data:</strong> 21/05/2026
          </p>
        </div>
      </div>

      <div className="card rifa-section-card mb-3">
        <div className="card-body">
          <h5 className="card-title rifa-section-title">Prêmio</h5>
          <p className="card-text mb-0">
            Caixa de Som Bluetooth Extreme Britânia BBS200B
          </p>
        </div>
      </div>

      <div className="card rifa-section-card mb-3">
        <div className="card-body">
          <h5 className="card-title rifa-section-title">Descrição da Rifa</h5>
          <p className="card-text mb-0 rifa-description-text">
            Fala galera! Recentemente a nossa televisão estragou e
            contamos com a ajuda de vocês para comprar uma nova televisão para
            nossa república.
            <br />
            <br />
            Cada rifa está custando <strong>R$5,00</strong> e o prêmio é uma
            <strong> Caixa de Som Bluetooth</strong> da marca Britânia ou um
            <strong> Pix no valor de R$300,00</strong>. O sorteio acontecerá por
            meio de uma live no Instagram{' '}
            <a
              href="https://www.instagram.com/barracaarmada"
              target="_blank"
              rel="noopener noreferrer"
              className="rifa-link"
            >
              (@barracaarmada)
            </a>{' '}
            no dia 21/05, ou assim que esgotarem os números da rifa.
          </p>
        </div>
      </div>

      <div className="card rifa-organizer-card mb-4">
        <div className="card-body d-flex flex-column flex-md-row align-items-center gap-3">
          <img
            src={logo}
            alt="Logo Barraca Armada"
            className="img-fluid rounded-circle shadow rifa-organizer-logo"
          />

          <div className="text-center text-md-start">
            <p className="fw-bold mb-1">Organizador</p>
            <p className="mb-3">República Barraca Armada</p>

            <a
              href="https://wa.me/5531996992730"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success rifa-whatsapp-btn"
            >
              Whatsapp <i className="bi bi-whatsapp ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}