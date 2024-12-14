let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
const cartButton = document.getElementById("view-cart");
const cartSection = document.getElementById("cart-section");
const cartItems = document.getElementById("cart-items");
const amountEl = document.querySelector(".total-amount");

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
// Render Cart Items
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty. Start shopping!</p>";
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
                    <div class="cart-item">
                        <h3>${item.title}</h3>
                        <p>${item.price} €</p>
                        <div class="quantity-controls">
                            <button onclick="changeQuantity(${item.id}, -1)">-</button>
                            <span>Quantity: ${item.quantity}</span>
                            <button onclick="changeQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
                    </div>
                `
      )
      .join("");
  }
  calculateTotalAmount();
}

function calculateTotalAmount() {
  const totalAmount = cart.reduce(
    (acc, curr) => acc + parseInt(curr.price) * curr.quantity,
    0
  );
  const formattedTotalAmount = new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
  }).format(totalAmount);

  amountEl.innerHTML = formattedTotalAmount;
}

calculateTotalAmount();

// Change quantity of product in cart
function changeQuantity(id, change) {
  const product = cart.find((item) => item.id === id);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      removeFromCart(id);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
      renderCart();
    }
  }
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
  renderCart();
  calculateTotalAmount();
}

function goBackToHome() {
  window.location.href = "/";
}

renderCart();
