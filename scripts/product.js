const queryString = window.location.search;
const urlSearchParam = new URLSearchParams(queryString);
const paramValue = urlSearchParam.get("id");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

const badge = document.querySelector(".badge");
const container = document.querySelector(".container");
const productSection = document.querySelector(".product-section");

function logout() {
  localStorage.setItem("isLoggedIn", JSON.stringify(false));
  window.location.reload();
}

function redirectToLoginPage() {
  if (!isLoggedIn) {
    window.location.href = "/login.html";
  }
}

redirectToLoginPage();

function toggleCategories() {
  document.getElementById("category-dropdown").classList.toggle("show");

  //Close the dropdown if the user clicks outside of it
  window.onclick = function (e) {
    if (!e.target.matches(".categorybtn")) {
      const dropdowns = document.getElementsByClassName("product-categories");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
}

async function getProductById(id) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${paramValue}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching product", error);
    return null;
  }
}

async function displayProductDetail() {
  const product = await getProductById(paramValue);
  if (!product) {
    productSection.innerHTML = `Product not found`;
    return;
  }

  productSection.innerHTML = `
              <div class="product-image">
            <img src=${product.image} class="product-img" alt="Product Image" width="200" height="200">
        </div>
        <div class="product-details">
            <h1 class="product-title">${product.title}</h1>
            <p class="product-price">${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
            </div>
            `;
}

displayProductDetail();

function updateCartCount() {
  badge.innerHTML = cart.length;
}

// Add to Cart Function
function addToCart(id, title, price) {
  // Check if product is already in the cart
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if product is already in the cart
  } else {
    const item = { id, title, price, quantity: 1 };
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  alert(`${title} added to your cart!`);
  updateCartCount();
}

// Filter products by selected category
function filterByCategory(category) {
  if (category === "all") {
    displayProducts(allProducts); // Show all products
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts); // Show filtered products
  }
}

updateCartCount();
