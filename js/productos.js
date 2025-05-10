// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Bolso",
        precio: 120000,
        imagen: "img/bolsos/12.png.",
        categoria: "bolsos"
    },
    {
        id: 2,
        nombre: "Bolso tejido",
        precio: 80000,
        imagen: "img/bolsos/13.jpg",
        categoria: "bolsos"
    },
    {
        id: 3,
        nombre: "Combo",
        precio: 95000,
        imagen: "img/bolsos/14.jpg",
        categoria: "bolsos"
    },
    {
        id: 4,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/15.jpg",
        categoria: "bolsos"
    },
    {
        id: 5,
        nombre: "Hamaca Individual",
        precio: 85000,
        imagen: "img/bolsos/16.jpg",
        categoria: "bolsos"
    },
    {
        id: 6,
        nombre: "Hamaca Individual",
        precio: 85000,
        imagen: "img/bolsos/14.jpg",
        categoria: "bolsos"
    },
    {
        id: 7,
        nombre: "Hamaca Individual",
        precio: 85000,
        imagen: "img/bolsos/15.jpg",
        categoria: "bolsos"
    },
    {
        id: 8,
        nombre: "Hamaca Individual",
        precio: 85000,
        imagen: "img/bolsos/16.jpg",
        categoria: "bolsos"
    },
    {
        id: 9,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/17.jpg",
        categoria: "bolsos"
    },
    {
        id: 10,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/18.jpg",
        categoria: "bolsos"
    },
    {
        id: 11,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/19.jpg",
        categoria: "bolsos"
    },  
    {
        id: 12,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/20.jpg",
        categoria: "bolsos"
    },
    {
        id: 13,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/21.jpg",
        categoria: "bolsos"
    },
    {
        id: 14,
        nombre: "Sombrero Vueltiao Tradicional",
        precio: 65000,
        imagen: "img/bolsos/22.jpg",
        categoria: "bolsos"
    },
    {
        id: 15,
        nombre: "hamaca guajira",
        precio: 65000,
        imagen: "img/hamacas/1.jpg",
        categoria: "hamacas"
    },
    {
        id: 16,
        nombre: "hamaca guajira",
        precio: 65000,
        imagen: "img/hamacas/2.jpg",
        categoria: "hamacas"
    },
    {
        id: 17,
        nombre: "hamaca guajira",
        precio: 65000,
        imagen: "img/hamacas/3.jpg",
        categoria: "hamacas"
    },
    {
        id: 18,
        nombre: "hamaca guajira",
        precio: 65000,
        imagen: "img/hamacas/4.jpg",
        categoria: "hamacas"
    },
    {
        id: 19,
        nombre: "hamaca guajira",
        precio: 65000,
        imagen: "img/hamacas/5.jpg",
        categoria: "hamacas"
    },
    










    
];

// Función para renderizar el catálogo
function renderCatalogo() {
    const contenedor = document.getElementById("catalogo");
    if (!contenedor) return;

    contenedor.innerHTML = productos.map(producto => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="producto-card h-100">
                <div class="producto-img-container">
                    <img src="${producto.imagen}" alt="${producto.nombre}" 
                         class="producto-img"
                         onerror="this.onerror=null; this.src='img/placeholder.jpg'">
                </div>
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="text-success fw-bold">$${producto.precio.toLocaleString("es-CO")}</p>
                    <button class="btn btn-add-to-cart" 
                            data-id="${producto.id}">
                        <i class="fas fa-cart-plus me-2"></i>Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para añadir al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        mostrarNotificacion("Producto no encontrado", "error");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.id === id);
    
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarNotificacion(`✓ ${producto.nombre} añadido al carrito`);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = "success") {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <span class="notificacion-icon">
            ${tipo === "success" ? "✓" : "✗"}
        </span>
        <span class="notificacion-text">${mensaje}</span>
    `;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('fade-out');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
    });
}

// Configurar event listeners
function setupEventListeners() {
    document.addEventListener('click', function(e) {
        // Manejar clic en botón "Añadir al carrito"
        if (e.target.classList.contains('btn-add-to-cart') || 
            e.target.closest('.btn-add-to-cart')) {
            const button = e.target.classList.contains('btn-add-to-cart') ? 
                          e.target : e.target.closest('.btn-add-to-cart');
            const productId = parseInt(button.dataset.id);
            
            // Feedback visual
            button.innerHTML = '<i class="fas fa-check me-2"></i>Añadido';
            button.classList.add('added');
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Añadir al carrito';
                button.classList.remove('added');
            }, 2000);
            
            añadirAlCarrito(productId);
        }
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    renderCatalogo();
    actualizarContadorCarrito();
    setupEventListeners();
});