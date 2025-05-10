// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para renderizar los productos del carrito
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const cantidadProductos = document.getElementById('cantidad-productos');
    const subtotalElement = document.getElementById('subtotal');
    const envioElement = document.getElementById('envio');
    const totalElement = document.getElementById('total');
    const btnPagar = document.getElementById('btn-pagar');
    
    if (!listaCarrito) return;
    
    const carrito = obtenerCarrito();
    
    // Limpiar lista
    listaCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <a href="productos.html" class="btn btn-success">Ver productos</a>
            </div>
        `;
        cantidadProductos.textContent = '0';
        subtotalElement.textContent = '$0';
        envioElement.textContent = '$0';
        totalElement.textContent = '$0';
        if (btnPagar) btnPagar.disabled = true;
        return;
    }
    
    // Calcular totales
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const envio = subtotal > 100000 ? 0 : 10000;
    const total = subtotal + envio;
    
    // Mostrar productos
    carrito.forEach(item => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto-carrito';
        productoElement.dataset.id = item.id;
        productoElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3 class="producto-nombre">${item.nombre}</h3>
                <p class="producto-precio">$${item.precio.toLocaleString('es-CO')}</p>
                
                <div class="producto-cantidad">
                    <button class="cantidad-btn menos">-</button>
                    <input type="number" value="${item.cantidad}" min="1" class="cantidad-input">
                    <button class="cantidad-btn mas">+</button>
                </div>
                
                <p class="producto-subtotal">Subtotal: $${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                <span class="producto-eliminar"><i class="fas fa-trash-alt"></i> Eliminar</span>
            </div>
        `;
        listaCarrito.appendChild(productoElement);
    });
    
    // Actualizar totales
    cantidadProductos.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    subtotalElement.textContent = `$${subtotal.toLocaleString('es-CO')}`;
    envioElement.textContent = envio === 0 ? 'Gratis' : `$${envio.toLocaleString('es-CO')}`;
    totalElement.textContent = `$${total.toLocaleString('es-CO')}`;
    if (btnPagar) btnPagar.disabled = false;
}

// Manejar eventos del carrito
function manejarEventosCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) return;
    
    listaCarrito.addEventListener('click', function(e) {
        const target = e.target;
        const productoElement = target.closest('.producto-carrito');
        if (!productoElement) return;
        
        const carrito = obtenerCarrito();
        const id = parseInt(productoElement.dataset.id);
        const itemIndex = carrito.findIndex(item => item.id === id);
        
        if (target.classList.contains('menos')) {
            if (carrito[itemIndex].cantidad > 1) {
                carrito[itemIndex].cantidad--;
            } else {
                carrito.splice(itemIndex, 1);
            }
        } else if (target.classList.contains('mas')) {
            carrito[itemIndex].cantidad++;
        } else if (target.classList.contains('producto-eliminar') || target.closest('.producto-eliminar')) {
            carrito.splice(itemIndex, 1);
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
    });
    
    // Botón de pago
    const btnPagar = document.getElementById('btn-pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            alert('Proceso de pago simulado. ¡Gracias por tu compra!');
            localStorage.removeItem('carrito');
            renderizarCarrito();
            actualizarContadorCarrito();
        });
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    manejarEventosCarrito();
    actualizarContadorCarrito();
});