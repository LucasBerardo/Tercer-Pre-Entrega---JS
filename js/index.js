


//Variables a utilizar

let totalStock = 0;
let id = 1;
const ArrayProductos = [];
const ArrayCarritoNuevo = [];
let ArrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;


//productos

class producto {
    constructor (id,nombre, precio,descripcion,cantidad,stock,img ){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
   
   this.descripcion = descripcion
    this.cantidad = cantidad;
    this.stock = stock;
    this.img = img

     
}}

// creamos los productos y promociones, luego los incorporamos al array

const nueces = new producto (id++, "nueces", 1850, "Frutos Secos", " 1kg", 10, "../img/nueces1.jpg" );
ArrayProductos.push (nueces);

const almendras = new producto (id++,"Almendras", 4800, "Frutos Secos", " 1kg", 20,"../img/almendras.webp");
ArrayProductos.push (almendras);

const pistachos = new producto (id++, "Pistachos", 4950, "Frutos Secos", " 1kg", 30,"../img/pistachos.jpg");
ArrayProductos.push (pistachos);

const avellanas = new producto (id++, "Avellanas", 1500, "Frutos Secos", " 1kg", 40,"../img/avellanas.jpg")
ArrayProductos.push (avellanas);

const castañas = new producto (id++, "Castañas", 1500, "Frutos Secos", " 1kg", 40,"../img/castañas.jpg")
ArrayProductos.push (castañas);

const coco = new producto (id++, "Coco", 2100, "Frutos Secos", " 1kg", 50, "../img/Coco.webp");
ArrayProductos.push (coco);


const pasasDeUvas = new producto (id++, "Pasas De Uvasmani", 600, "Frutos Secos", " 500g", 60, "../img/pasasdeuvas.jpg");
ArrayProductos.push (pasasDeUvas);

const mani = new producto (id++, "Mani", 600, "Frutos Secos", " 500g", 55, "../img/mani.png");
ArrayProductos.push (mani);

//Llevamos los productos al HTML

const tienda = document.querySelector("#tienda");
const buttonCarrito = document.querySelector("#carrito_button");
const buttonEliminar = document.querySelector("#button-eliminar");
const totalCarrito = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');


    

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
        
        <span class="subtitulos"> <b>${el.nombre}</b></span>
		<span class="subtitulos"> <b>${el.descripcion}</b></span>
        <span class="subtitulos"> <b>${el.cantidad}</b></span>
        <span class="subtitulos"> <b> STOCK ${el.stock}</b></span>
        <span class="subtitulos"> <b>$${el.precio}</b></p>
        </div>`
        
        const buttonEliminar = document.createElement("button");
        buttonEliminar.innerText = "Eliminar Producto";
        buttonEliminar.classList.add ("agregar")
        buttonEliminar.addEventListener ("click",(e)=>{
            console.log(e.target)
            console.log(e.target.parentNode)
        ArrayCarrito = ArrayCarrito.filter (e=>e.id !== el.id)
        localStorage.setItem ("carrito", JSON.stringify(ArrayCarrito))
        e.target.parentNode.remove()
    
    })
    card.appendChild(buttonEliminar)
        tienda.appendChild(card);
  
})
})



ArrayProductos.forEach(el => {
    const card = document.createElement ('div')
        card.classList.add ("card")
        card.innerHTML = `
        <div class="imagenes">
        <img src="./img/${el.img}" alt="${el.nombre}" style="width: 100%" /> 
        </div>
        <div class="contenedor">
        <span class="subtitulos"> <b>${el.nombre}</b></span>
		<span class="subtitulos"> <b>${el.descripcion}</b></span>
        <span class="subtitulos"> <b>${el.cantidad}</b></span>
        <span class="subtitulos"> <b> STOCK ${el.stock}</b></span>
        <span class="subtitulos"> <b>$${el.precio}</b></p>
        </div>`
        
        const buttonAgregar = document.createElement("button");
        buttonAgregar.innerText = "Agregar";
        buttonAgregar.classList.add ("agregar")
        buttonAgregar.addEventListener ("click",()=>{
            
            if(ArrayCarrito.some(e=>e.id===el.id)){
                ArrayCarrito.find(e=>e.id==el.id).qty++
            }else{
                ArrayCarrito.push({...el, qty: 1});
            }
        
            localStorage.setItem("carrito",JSON.stringify(ArrayCarrito))
        })

        
    

        card.appendChild(buttonAgregar)
        tienda.appendChild(card)

    })
    


