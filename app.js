document.addEventListener('DOMContentLoaded', function() {
  const botonAgregarAlCarrito = document.querySelectorAll('.add-to-cart-btn');
  const contenedorItemsCarrito = document.querySelector('.cart-items');
  const valorTotal = document.getElementById('total-value');
  const botonVaciar = document.getElementById('clear-cart-btn');
  let carritoItems = [];

  if (localStorage.getItem('carritoItems')) {
    carritoItems = JSON.parse(localStorage.getItem('carritoItems'));
    renderCartItems();
    updateTotalValue();
  }

  botonAgregarAlCarrito.forEach(function(button) {
    button.addEventListener('click', function() {
      const producto = {
        name: button.dataset.name,
        price: parseInt(button.dataset.price)
      };
      carritoItems.push(producto);
      saveCartItemsToLocalStorage();
      renderCartItem(producto);
      updateTotalValue();
    });
  });

  botonVaciar.addEventListener('click', function() {
    carritoItems = [];
    saveCartItemsToLocalStorage();
    clearCartItemsFromDOM();
    updateTotalValue();
    Swal.fire('Haz vaciado tu carrito de compras :(')
  });

  function renderCartItems() {
    carritoItems.forEach(function(item) {
      renderCartItem(item);
    });
  }

  function renderCartItem(item) {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    contenedorItemsCarrito.appendChild(li);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Quitar';
    removeButton.addEventListener('click', function() {
      const index = carritoItems.indexOf(item);
      if (index > -1) {
        carritoItems.splice(index, 1);
        saveCartItemsToLocalStorage();
        li.remove();
        updateTotalValue();
      }
    });
    li.appendChild(removeButton);
  }

  function clearCartItemsFromDOM() {
    contenedorItemsCarrito.innerHTML = '';
  }

  function updateTotalValue() {
    const total = carritoItems.reduce((acc, item) => acc + item.price, 0);
    valorTotal.textContent = total;
  }

  function saveCartItemsToLocalStorage() {
    localStorage.setItem('carritoItems', JSON.stringify(carritoItems));
  }

  const botonComprar = document.getElementById('btnComprar');
  botonComprar.addEventListener('click', function() {
  Swal.fire({
    title: 'Confirmar compra',
    text: '¿Estás seguro de que deseas realizar la compra?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra',
        icon: 'success'
      });
    }
  });
});

});
