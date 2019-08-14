export type Shipment = {
  id: string;
  name: string;
  cargo: Cargo[];
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: Service[];
  total: string;
  status: string;
  userId: string;
}

export type Cargo = {
  type: string;
  description: string;
  volume: string
}

export type Service = {
  type: string;
}
