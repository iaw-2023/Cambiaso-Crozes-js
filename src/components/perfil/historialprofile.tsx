
import { Container, Stack } from 'react-bootstrap';
import DetalleHistorial from '../../models/detalleHistorial';
import PedidoHistorial from '../../models/pedidoHistorial';

type HistorialProps = {
  historial: PedidoHistorial[];
};

const HistorialProfile = ({historial}: HistorialProps) => {

  return (
    <Container className="border-dashed border-2 border-gray-200 rounded historial-perfil">
      {historial && historial.length > 0 ? (
        <>
          <Stack gap={2}>
          {historial.map((pedido: PedidoHistorial, idx:any) => (
            <div key={idx}>
              <Stack  direction="vertical" gap={2} className="d-flex align-items-center">
                <div className="me-auto">
                <div className='text-lg'>
                    Pedido:{" "}#{pedido.id}{" "}
                    <span className="text-sm text-gray-400">
                        {pedido.fecha}
                    </span>
                </div>
                </div>
                {pedido.detalles.map((detalle: DetalleHistorial, idx2:any) => (
                  <Stack key={idx2} direction="horizontal" gap={2} className="d-flex align-items-center">   
                      <div className="carrito-item-detalles">
                        <div className='text-sm'>
                          {detalle.queso_nombre}{" "}
                        </div>
                      </div>
                      
                      <div className="carrito-item-acciones me-auto">
                        <div className="carrito-item-cantidad text-sm text-gray-400">
                          x{detalle.cantidad}g
                        </div>                    
                      </div>

                      <div className="carrito-item-precio text-sm"> 
                        ${detalle.subtotal}
                      </div>
                  </Stack>           
                ))}
                  <div className="ms-auto text-base">
                    Total: ${pedido.precio_total}
                  </div>
              </Stack>
              <hr className="separador2"/>
            </div>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <p className="text-lg mt-3">Aún no has realizado ningún pedido :(</p>
        </>
      )}
    </Container>
);
};

export default HistorialProfile;