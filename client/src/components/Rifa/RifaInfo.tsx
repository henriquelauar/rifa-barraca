import logo from '../../assets/BARRACA.png';

export default function RifaInfo () {
  return (
    <>
      <h1 className="text-center mb-4">Rifa da Barraca Armada</h1>

      <div className="card d-flex justify-content-center align-items-center mb-4" style={{backgroundColor: "#e7e7e7"}}>
        <img
          src="https://m.media-amazon.com/images/I/51cYs7G8oRL._AC_SX679_.jpg"
          alt="Imagem da Rifa"
          className="img-fluid rounded shadow"
          style={{ maxHeight: '250px', maxWidth: '200px' }}
        />
      </div>

      <div className="card text-white bg-success text-center mb-3">
        <div className="card-body">
          <h6 className="card-title">Por Apenas</h6>
          <h4 className="card-text fw-bold">R$5,00</h4>
        </div>
      </div>

      <div className="card text-center mb-4">
        <p className="mb-1 mt-2"><strong>Sorteio:</strong> Live no Instagram</p>
        <p className='border-top'><strong>Data:</strong> 30/06/2025</p>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">🏆 Prêmio</h5>
          <p className="card-text">Fritadeira Air Fryer Philco Gourmet Black 4,4L</p>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">📋 Descrição da Rifa</h5>
          <p className="card-text">Fala galera! Como muitos sabem, morar em república não é fácil e estamos precisando da ajuda de vocês para comprar uma máquina de lavar e um fogão,
            visto que eles estão com defeito. Sua participação é essencial para nos ajudar a melhorar a nossa república. <br/><br/>Cada rifa está custando R$5,00 e o prêmio é uma AirFryer Philco 
            4,4L ou um pix no valor de R$300,00. O sorteio acontecerá por meio de uma live no instagram <a href="https://www.instagram.com/barracaarmada" target='_blank'>(@barracaarmada)</a> no dia 30/06, ou assim que esgotarem os números da rifa. 
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body d-flex">
          <img src={logo} alt="logo barraca armada" className="img-fluid rounded-circle shadow" style={{ maxHeight: '100px' }} />
          <div className="text-center mx-3">
            <p className='fw-bold'>Organizador</p>
            <p>República Barraca Armada</p>
            <button className='btn btn-success'>
              <a href="https://wa.me/5531997568782" target="_blank" className='text-white' style={{ textDecoration: 'none' }}>
                Whatsapp <i className='bi bi-whatsapp mx-2'></i>
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
