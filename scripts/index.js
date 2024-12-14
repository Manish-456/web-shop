const badge = document.querySelector(".badge");
const productList = document.getElementById("product-list");
const homeButton = document.getElementById("home");
const categoriesButton = document.getElementById("categories");
const title = document.querySelector(".category-title");

let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
let allProducts = []; // Store all products fetched from API

function logout() {
  localStorage.setItem("isLoggedIn", JSON.stringify(false));
  window.location.reload();
}

function redirectToLoginPage() {
  if (!isLoggedIn) {
    window.location.href = "/login.html";
  }
}

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

function updateCartCount() {
  badge.innerHTML = cart.length;
}

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    allProducts = await response.json();
    displayProducts(allProducts); // Display all products initially
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Display products in the product container
function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const { id, image, title, price } = product;
    productCard.innerHTML = `
                    <a href="/product.html?id=${id}">
                        <img src="${image}" class="product-img" alt="${title}" />
                        <h3 class="truncate" title="${title}">${title}</h3>
                        <p>€ ${price}</p>
                        </a>
                        <button onclick="addToCart(${id}, '${title}', ${price})">Add to Cart</button>
                `;

    productList.appendChild(productCard);
  });
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
  title.innerHTML = category.charAt(0).toUpperCase() + category.substring(1);
  if (category === "all") {
    displayProducts(allProducts); // Show all products
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts); // Show filtered products
  }
}

redirectToLoginPage();

updateCartCount();
fetchProducts();
