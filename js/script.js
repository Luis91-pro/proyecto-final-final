document.addEventListener('DOMContentLoaded', function() {
    const elemento = document.querySelector('.tu-elemento');
    
    if (elemento) { // Solo si existe
        elemento.addEventListener('click', function() {
            // Tu lógica...
     

// Validación de formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");
    const btnEnviar = document.getElementById("btn-enviar");
});

// Contador del carrito (simplificado)
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = localStorage.getItem("cartCount") || 0;
  document.getElementById("cart-count").textContent = cartCount;
});

document.addEventListener('DOMContentLoaded', function() {
    var myCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
        interval: 3000,  // 3 segundos
        ride: true
    });
});

// Función compartida para añadir al carrito (si necesitas acceder desde múltiples archivos)
function addToCart(productId, productName, productPrice) {
    // Implementación igual que en carrito.js
    // O mejor aún, organiza tu código en módulos
}
});
}
});