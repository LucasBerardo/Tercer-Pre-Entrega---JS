let arrayProductos = [];

fetch("./productos.json")

 .then(response =>response.json())

  .then (data => {

 arrayProductos = data

 cargarProductos(arrayProductos)

})



//Variables a utilizar

let totalStock = 0;
let id = 1;

const ArrayCarritoNuevo = [];
let ArrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// const ArrayProductos = [
//   {
//     "id": "id++",
//     "nombre": "Nueces",
//     "img": "../img/nueces1.jpg",
//     "precio": 1000,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Almendras",
//     "img": "../img/almendras.webp",
//     "precio": 2000,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Pistachos",
//     "img": "../img/pistachos.jpg",
//     "precio": 1500,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Avellanas",
//     "img": "../img/avellanas.jpg",
//     "precio": 1850,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Castañas",
//     "img": "../img/castañas.jpg",
//     "precio": 1850,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Coco",
//     "img": "../img/Coco.webp",
//     "precio": 1800,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "Pasas De Uvas",
//     "img": "../img/pasasdeuvas.jpg",
//     "precio": 700,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   },
//   {
//     "id": "id++",
//     "nombre": "mani",
//     "img": "../img/mani.png",
//     "precio": 600,
//     "cantidad": 1,
//     "descripcion": "Frutos Secos"
//   }
//   ]


//Llevamos los productos al HTML

const tienda = document.querySelector("#tienda");
const buttonCarrito = document.querySelector("#carrito_button");
const buttonEliminar = document.querySelector("#button-eliminar");
const totalCarrito = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');
let totalCarritoActualizado = document.querySelector('#contenedor-total-carrito');


    

buttonCarrito.addEventListener("click", ()=>{
    tienda.innerHTML = ''    
    
    ArrayCarrito.forEach(el => {
        const card = document.createElement ('div')
        card.classList.add ('card');
        card.innerHTML = `
        <div class="imagenes">
        <img src="./img/${el.img}" alt="${el.nombre}" style="width: 100%" /> 
        </div>
        <div class="contenedor">
        <div class="carrito-producto-titulo"><small> TITULO:</small> <b>${el.nombre}</b></div>
		<div class="carrito-producto-descripcion"><small> DESCRIPCION:</small> <b>${el.descripcion}</b></div>
        <div class="carrito-producto-precio"><small> PRECIO:</small> <b>$${el.precio}</b></p></div>
        <div class="carrito-producto-precio"><small> CANTIDAD:</small> <b>${el.cantidad}</b></p></div>
        <div class="carrito-producto-subtotal"><small> SUBTOTAL:</small> <b>$${el.precio * el.cantidad}</b></p></div>
        

        </div>`

        const buttonEliminar = document.createElement("button");
        buttonEliminar.innerText = "Eliminar Producto";
        buttonEliminar.classList.add ("agregar")
        buttonEliminar.addEventListener ("click",(e)=>{

           
            

        Swal.fire({
            title: '¿Estas seguro/a de eliminar el producto?',
            icon: 'info',
            html:
              'Se eliminara todo el producto',
            
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              'Si',
            cancelButtonText:
              'No',
          })
          .then((result) => {
            if (result.isConfirmed) {
                console.log(e.target)
                console.log(e.target.parentNode)
            ArrayCarrito = ArrayCarrito.filter (e=>e.id !== el.id)
            localStorage.setItem ("carrito", JSON.stringify(ArrayCarrito))
            e.target.parentNode.remove()
            }
          })

           

       
    })
    card.appendChild(buttonEliminar)
     tienda.appendChild(card);

     

})

})

function cargarProductos () {
arrayProductos.forEach(el => {
    const card = document.createElement ('div')
        card.classList.add ("card")
        card.innerHTML = `
        <div class="imagenes">
        <img src="./img/${el.img}" alt="${el.nombre}" style="width: 100%" /> 
        </div>
        <div class="contenedor">
        <div class="carrito-producto-titulo"><small> TITULO:</small> <b>${el.nombre}</b></div>
		<div class="carrito-producto-descripcion"><small> DESCRIPCION:</small> <b>${el.descripcion}</b></div>
        <div class="carrito-producto-precio"><small> PRECIO:</small> <b>$${el.precio}</b></p></div>
       
        `
        


        const buttonAgregar = document.createElement("button");
        buttonAgregar.innerText = "Agregar";
        buttonAgregar.classList.add ("agregar")
        buttonAgregar.addEventListener ("click",()=>{

            Toastify({
                text: "Producto Agregado",
                duration: 3000,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right, rgba(173, 179, 154), rgba(158, 158, 158, 0.726))",
                  color: "black",
                  borderRadius: "2rem",
                  fontSize: "18px",
                  fontWeight: "bold",
                },
                onClick: function(){} // Callback after click
              }).showToast();

        
            if(ArrayCarrito.some(e=>e.id===el.id)){
                ArrayCarrito.find(e=>e.id==el.id).cantidad++
            }else{
              
                ArrayCarrito.push({...el, qty: 1});
            }
        
            // actualizarTotal ()

            localStorage.setItem("carrito",JSON.stringify(ArrayCarrito))
         })

        
        card.appendChild(buttonAgregar)
        tienda.appendChild(card)

    })}
   
    

// function actualizarTotal (){
//     const totalCalculado = ArrayCarrito.reduce ((acc, el)=> acc + (el.precio * el.cantidad),0)
// total.innerText = `$${totalCalculado}`
// }
