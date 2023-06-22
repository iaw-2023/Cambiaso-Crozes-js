import { Button, Container } from "react-bootstrap";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import Cliente from "../../models/cliente";
import { IBrickError } from "@mercadopago/sdk-react/bricks/util/types/common";
import { useState } from 'react';
import Loading from "../../layouts/loading";

type PayOrderProps = {
    pedidoHook: { pedido: any; setPedido: (pedido: any) => void };
    seccionHook: { seccion: number; setSeccion: (seccion: number) => void };
    showHook: { show: boolean; setShow: (show: boolean) => void};
    loggedUser: Cliente
};

function PayOrder ({ pedidoHook, seccionHook, showHook, loggedUser }: PayOrderProps) {
    const {pedido, setPedido} = pedidoHook;
    const {seccion, setSeccion} = seccionHook;
    const [loading, isLoading] = useState(false);

    initMercadoPago("TEST-fa2d9421-c75d-4643-9fc0-2edc22c0a2bd", {
        locale: "es-AR",
    });

    const settings = {
        initialization: {
            amount: pedido.precio_total,
            payer: {
                email: loggedUser.email,
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
        return new Promise(() => {
            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cardFormData),
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            if(!result.hasOwnProperty("error_message")) {
                setSeccion(3);
            } else {
                alert(JSON.stringify({
                    status: result.status,
                    message: result.error_message
                }))
            }
        })
        .catch(error => {
            alert("Unexpected error\n"+JSON.stringify(error));
        });
        })
    }
    
    const onError = async (error: IBrickError) => {
        console.log(error);
    };

    const onReady = async () => {
        //Se tiene que renderizar el componente
    };

    return (
        <Container>
            {loading ? (
                <Loading></Loading>
            ) : (
                <>
                <Container>
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
                </>
            )}
        </Container>
    );
}
export default PayOrder;