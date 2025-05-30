export type Rifa = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    numero: number;
    pago: boolean;
    created_at: Date;
  };

  export type FormData = {
    nome: string;
    email: string;
    telefone: string;
    numeros: number[];
  };
  