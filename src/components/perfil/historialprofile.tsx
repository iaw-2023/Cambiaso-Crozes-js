import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Stack } from 'react-bootstrap';
import DetalleHistorial from '../../models/detalleHistorial';
import PedidoHistorial from '../../models/pedidoHistorial';
import CheesePagination from '../../layouts/pagination/pagination';
import DataPagination from '../../models/dataPagination';

type HistorialProps = {
  historial: PedidoHistorial[];
  dataPagination: DataPagination;
};

const HistorialProfile = ({historial, dataPagination}: HistorialProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Container className="border-dashed border-2 border-gray-200 rounded historial-perfil">
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
      <CheesePagination last_page={dataPagination.last_page} current_page={dataPagination.current_page} path={dataPagination.path} url={'/perfil'} ></CheesePagination>
    </Container>
);
};

export default HistorialProfile;