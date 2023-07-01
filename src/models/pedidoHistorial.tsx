import DetalleHistorial from "./detalleHistorial";

type PedidoHistorial = {
    client_id: number,
    detalles: DetalleHistorial[],
    fecha: string,
    id: number,
    precio_total: number
}
export default PedidoHistorial;