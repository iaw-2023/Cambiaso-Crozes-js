![alt text](https://github.com/iaw-2023/Cambiaso-Crozes-laravel/blob/primera-entrega/public/logo.png)

<h1 align="center">Una página web orientada a la venta de lo que todos amamos: el queso.</h1>

<b><h2>Proyecto Javascript - React/Vue</h2></b>

<b><h3>LINK</h3></b>
🧀 [Deploy en Vercel](https://cambiaso-crozes-js.vercel.app/)

<b><h3>Aclaraciones</h3></b>


🧀 Elegimos trabajar con Typescript para evitar errores de tipos.

🧀 Al no tener usuarios y por lo tanto, tampoco login, entendemos que no hay seguridad al realizar el pedido. Este proceso tendría más sentido si tuviésemos usuarios, pero al haberlo modelado de esta forma decidimos que de todas maneras se pueda realizar el pedido solamente ingresado el mail de un cliente, y que también se pueda crear uno nuevo o editar sus campos si ya existe un cliente con el mail.

🧀 La página no está pensada para que se puedan acceder a los quesos individuales o a las categorías de estos a través de la url, ya que se manejan con estados para evitar más llamadas a la API, por lo tanto, decidimos que se redirija al Home cuando esto suceda.

🧀 El carrito se almacena en el localStorage del navegador para que si el cliente carga nuevamente la página o lo vuelve a abrir en otro momento se mantengan los quesos agregados. Esto genera que si en la base de datos se elimina o se modifica alguno de los campos de algunos de los quesos que contiene, no se vea reflejado en el carrito.

🧀 Al no manejar stock de los quesos, se pueden agregar cantidades infinitas de gramos por queso.

🧀 La búsqueda no se puede realizar a partir de un enter, sólo a través del botón de búsqueda. En caso de que se haga la búsqueda sin escribir nada, poniendo sólo espacios o ingresando caracteres que no sean letras, se muestran todos los quesos como resultado.

🧀 El pedido puede fallar por un error interno del servidor, mostrando al cliente el mensaje: "No se pudo realizar el pedido, inténtalo más tarde". O también puede fallar porque en el carrito se encuentra algún queso que fue eliminado de la base de datos antes de que se confirme el pedido, y se muestra el siguiente mensaje al cliente: "No tenemos alguno de los quesos que solicitaste, debemos reiniciar tu carrito :(". En ambos casos, para cerrar el modal, la única opción será mediante un botón que borra todos los quesos del carrito y redirije al Home.

🧀 Para facilitar y disminuir la cantidad de llamadas a la API agregamos nuevos GET, PUT y POST, que se pueden encontrar en [Swagger-UI](https://cambiaso-crozes-laravel-iota.vercel.app/rest/documentation).

<b><h3>Créditos</h3></b>
🧀 [React](https://es.react.dev/)

🧀 [React-Bootstrap](https://react-bootstrap.github.io/)

🧀 [Tailwind](https://tailwindcss.com/)

