import { toast } from "react-toastify";

type PagamentoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nome: string;
  email: string;
  telefone: string;
  numeros: number[];
  chavePix: string;
};

export default function PagamentoModal({
  isOpen,
  onClose,
  nome,
  email,
  telefone,
  numeros,
  chavePix,
}: PagamentoModalProps) {
  if (!isOpen) return null;

  const total = numeros.length * 5;

  function copiarChavePix() {
    navigator.clipboard.writeText(chavePix);
    toast.success("Chave Pix copiada!");
  }

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow rounded">
          <div className="modal-header bg-light">
            <h5 className="modal-title">💸 Informações para Pagamento</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="mb-3">
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Telefone:</strong> {telefone}</p>
              <p><strong>Quantidade:</strong> {numeros.length} rifa(s)</p>
              <p>
                <strong>{numeros.length === 1 ? "Número escolhido" : "Números escolhidos"}:</strong>{" "}
                {numeros.sort((a, b) => a - b).join(", ")}
              </p>             
              <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
            </div>

            <hr />

            <div className="mb-2">
              <p className="mb-2"><strong>Dados para pagamento via Pix:</strong></p>
              <p className="mb-1"><strong>Nome:</strong> Matheus Henrique Gomes Marques</p>
              <p className="mb-1"><strong>Instituição:</strong> PicPay</p>
              <div className="d-flex justify-content-between align-items-center border rounded p-2 bg-light">
                <div className="text-break">
                  <strong>Chave:</strong> {chavePix}
                </div>
                <button className="btn btn-sm btn-outline-primary ms-3" onClick={copiarChavePix}>
                  Copiar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
