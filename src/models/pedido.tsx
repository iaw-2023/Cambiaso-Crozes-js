import Detalle from "./detalle";

type Pedido = {
    fecha:Date;
    precio_total:number;
    cliente_id:bigint;
    quesos:Detalle[];
} 
export default Pedido;