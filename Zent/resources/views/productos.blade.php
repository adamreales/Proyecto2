<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Test Carrito</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<style>
body{background:#f4f6f9}
.producto-img{max-height:200px;object-fit:cover}
.toast-container{position:fixed;bottom:20px;right:20px;z-index:9999}
</style>
</head>
<body>

<div class="container py-5">

<h1 class="text-center mb-4">🛒 Test Carrito (sin login)</h1>

<div class="text-center mb-4">
<button class="btn btn-primary" onclick="crearCarrito()">Crear carrito</button>
</div>

<div id="productos" class="row g-4"></div>

<hr class="my-5">

<h3 class="text-center">🧺 Contenido del carrito</h3>
<div id="carrito" class="mt-4"></div>

</div>

<div id="toastContainer" class="toast-container"></div>

<script>
const API="/api";
const ID_USUARIO=1;

// ---------- TOAST ----------
function toast(msg,ok=true){
const t=document.createElement('div');
t.className=`toast show text-bg-${ok?'success':'danger'} border-0 mb-2`;
t.innerHTML=`<div class="toast-body">${msg}</div>`;
document.getElementById('toastContainer').appendChild(t);
setTimeout(()=>t.remove(),3000);
}

// ---------- CREAR CARRITO ----------
function crearCarrito(){
fetch(API+'/crear_carrito',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({id_usuario:ID_USUARIO})
})
.then(r=>r.json())
.then(d=>{
toast(d.carrito||d.error,!d.error);
cargarCarrito();
});
}

// ---------- AÑADIR ----------
function anadirCarrito(id){
let cantidad=document.getElementById('cantidad_'+id).value;

fetch(API+'/anadir_carrito',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
id_usuario:ID_USUARIO,
id_producto:id,
cantidad:cantidad
})
})
.then(r=>r.json())
.then(d=>{
toast(d.carrito||d.error,!d.error);
cargarCarrito();
});
}

// ---------- QUITAR ----------
function quitarCarrito(id){
fetch(API+'/quitar_carrito',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
id_usuario:ID_USUARIO,
id_producto:id
})
})
.then(r=>r.json())
.then(d=>{
toast(d.carrito||d.error,!d.error);
cargarCarrito();
});
}

// ---------- VER CARRITO ----------
function cargarCarrito(){

fetch(API+'/ver_carrito',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({id_usuario:ID_USUARIO})
})
.then(r=>r.json())
.then(data=>{

const div=document.getElementById('carrito');

if(!data.carrito || data.carrito.length===0){
div.innerHTML='<p class="text-center text-muted">Carrito vacío</p>';
return;
}

let total=0;
let html='<ul class="list-group">';

data.carrito.forEach(i=>{

let subtotal=i.cantidad*i.do_producto.precio;
total+=subtotal;

html+=`
<li class="list-group-item d-flex justify-content-between align-items-center">
<div>
<strong>${i.do_producto.titulo}</strong><br>
<small>${i.cantidad} x ${i.do_producto.precio}€</small>
</div>
<span>${subtotal.toFixed(2)} €</span>
</li>
`;
});

html+=`</ul>
<div class="text-end mt-3">
<h4>Total: ${total.toFixed(2)} €</h4>
</div>`;

div.innerHTML=html;

});
}


// ---------- CARGAR PRODUCTOS ----------
fetch(API+'/productos')
.then(r=>r.json())
.then(data=>{

const cont=document.getElementById('productos');

if(!data.productos?.length){
cont.innerHTML='<p class="text-center">No hay productos</p>';
return;
}

data.productos.forEach(p=>{

const img=p.do_imagenes?.length
?`https://zent.es/${p.do_imagenes[0].url}`
:'https://via.placeholder.com/400x200?text=Sin+Imagen';

const col=document.createElement('div');
col.className='col-12 col-md-6 col-lg-4';

col.innerHTML=`
<div class="card h-100 shadow-sm">

<img src="${img}" class="card-img-top producto-img">

<div class="card-body d-flex flex-column">

<h5>${p.titulo}</h5>
<small class="text-muted">${p.subtitulo??''}</small>

<p class="small mt-2">${p.descripcion??''}</p>

<p class="fw-bold">${p.precio} €</p>
<p class="text-muted small">Stock: ${p.stock}</p>

<div class="mt-auto">

<input type="number" min="1" value="1" id="cantidad_${p.id}" class="form-control mb-2">

<button class="btn btn-success w-100 mb-2" onclick="anadirCarrito(${p.id})">
Añadir al carrito
</button>

<button class="btn btn-outline-danger w-100" onclick="quitarCarrito(${p.id})">
Quitar del carrito
</button>

</div>
</div>
</div>
`;

cont.appendChild(col);

});

// cargar carrito al iniciar
cargarCarrito();

})
.catch(()=>document.getElementById('productos').innerHTML='<p class="text-danger text-center">Error cargando productos</p>');
</script>

</body>
</html>
