import { Button, Container } from "react-bootstrap";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import Cliente from "../../models/cliente";
import { IBrickError } from "@mercadopago/sdk-react/bricks/util/types/common";
import { useState } from 'react';
import Loading from "../../layouts/loading";
import { useAuth0 } from "@auth0/auth0-react";
import { setOriginalNode } from "typescript";
import { useLoggedUser } from "../../context/usuario-contexto";

type PayOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    showHook: { show: boolean; setShow: (show: boolean) => void};
};

function PayOrder ({ pedidoHook, seccionHook, showHook }: PayOrderProps) {
    const {pedido, setPedido} = pedidoHook;
    const {seccion, setSeccion} = seccionHook;
    const [loading, isLoading] = useState(true);
    const [show, setShow] = useState(false);

    const {
        getLoggedUser
    } = useLoggedUser();

    const { getAccessTokenSilently } = useAuth0();

    initMercadoPago(process.env.REACT_APP_MP_ACCESS_TOKEN !== undefined?process.env.REACT_APP_MP_ACCESS_TOKEN:"", {
        locale: "es-AR",
    });

    const settings = {
        initialization: {
            amount: pedido.precio_total,
            payer: {
                email: getLoggedUser().email,
            },
        },
        callbacks: {
            onReady: () => {
                onReady();
                isLoading(false);
            },
            onError: (error:IBrickError) => {
               onError(error)
            },
            onSubmit: async (param:any) => {
              proccessPayment(param)
            }
        },
        customization: {
            paymentMethods: {
                maxInstallments: 1,
            },
            visual: {
                style: {
                    theme: 'bootstrap',
                    customVariables: {
                        "baseColor": "#F7D65A",
                        "formBackgroundColor": "#ffffff",
                    }
                }
            }
        }
    }

    const proccessPayment = async (cardFormData:any) => {
        const token = await getAccessTokenSilently();
        const url = process.env.REACT_APP_MY_ENV + 'pedidos/pago';
        return new Promise<void>(() => {
            fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(cardFormData),
        })
        .then(response => {
            if(!response.ok) throw new Error("No se ha podido realizar el pago");
            return response.json();
        })
        .then(data => {
            if (data.status !== undefined && data.status === "approved") {
                setPedido({ ...pedido, id_pago: "#" + data.id });
            }
            setSeccion(3);
        })
        .then(result => {
            // resolve();
        })
        .catch(error => {
            setSeccion(3);
            // reject();
        });
        })
    }
    
    const onError = async (error: IBrickError) => {
        console.log(error);
    };

    const onReady = async () => {
        isLoading(false);
        setShow(true);
    };

    return (
        <Container>
            {loading && (
                <Loading></Loading>
            )}
            
            <Container className={show ? "block": "hidden"}>
                <CardPayment 
                    initialization={settings.initialization}
                    onSubmit={settings.callbacks.onSubmit}
                    onReady={settings.callbacks.onReady}
                    onError={settings.callbacks.onError}
                    customization={settings.customization}
                    />
            </Container>
            <div className="div-botones-modal">
                <Button className="boton-int-modal" variant="outline-warning" onClick={() => setSeccion(1)}>
                    Volver
                </Button>
            </div>
            
            
        </Container>
    );
}
export default PayOrder;