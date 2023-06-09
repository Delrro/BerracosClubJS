document.addEventListener('DOMContentLoaded', function() {
    const botonAgregarAlCarrito = document.querySelectorAll('.add-to-cart-btn2');
    const contenedorItemsCarrito = document.querySelector('.cart-items2');
    const valorTotal = document.getElementById('total-value2');
    const botonVaciar = document.getElementById('clear-cart-btn2');
    let carritoItems2 = [];
  
    if (localStorage.getItem('carritoItems2')) {
      carritoItems2 = JSON.parse(localStorage.getItem('carritoItems2'));
      renderCartItems();
      updateTotalValue();
    }
  
    botonAgregarAlCarrito.forEach(function(button) {
      button.addEventListener('click', function() {
        const producto = {
          name: button.dataset.name,
          price: parseInt(button.dataset.price)
        };
        carritoItems2.push(producto);
        saveCartItemsToLocalStorage();
        renderCartItem(producto);
        updateTotalValue();
      });
    });
  
    botonVaciar.addEventListener('click', function() {
      carritoItems2 = [];
      saveCartItemsToLocalStorage();
      clearCartItemsFromDOM();
      updateTotalValue();
      Swal.fire('Haz vaciado tu carrito de compras :(')
    });
  
    function renderCartItems() {
      carritoItems2.forEach(function(item) {
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
        const index = carritoItems2.indexOf(item);
        if (index > -1) {
          carritoItems2.splice(index, 1);
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
      const total = carritoItems2.reduce((acc, item) => acc + item.price, 0);
      valorTotal.textContent = total;
    }
  
    function saveCartItemsToLocalStorage() {
      localStorage.setItem('carritoItems2', JSON.stringify(carritoItems2));
    }
  
    const botonComprar2 = document.getElementById('btnComprar2');
botonComprar2.addEventListener('click', function() {
  Swal.fire({
    title: 'Confirmar compra',
    text: '¿Estás seguro de que deseas realizar la compra?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          const dolarBlue = data.find(item => item.casa.nombre === 'Dolar Blue');
          const valorDolarBlue = parseFloat(dolarBlue.casa.venta.replace(',', '.'));
          const totalCompra = parseFloat(valorTotal.textContent);
          const totalDolarBlue = totalCompra * valorDolarBlue;
          Swal.fire({
            title: '¡Compra realizada!',
            html: `Gracias por tu compra. El total en dólar blue es: US$ ${totalDolarBlue.toFixed(2)}`,
            icon: 'success'
          });
        })
        .catch(error => {
          console.log('Error al obtener el valor del dólar blue:', error);
        });
    }
  });
});


  function obtenerValorDolarBlue() {
    return new Promise((resolve, reject) => {
      fetch('')
        .then(response => response.json())
        .then(data => {
          const dolarBlueValue = data.blue.value;
          resolve(dolarBlueValue);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function getTotalCompra() {
    const total = carritoItems2.reduce((acc, item) => acc + item.price, 0);
    return total;
  }
});

  