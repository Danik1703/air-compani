let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

setInterval(autoSlide, 5000);

const navLinks = document.querySelectorAll("header nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");

    const targetElement = document.querySelector(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  });
});

var items = [];

function addToCart(button) {
  var productCard = button.parentElement.parentElement;
  var productName = productCard.querySelector(".destination-name").innerText;
  var productPrice = parseFloat(button.dataset.price);
  var productImage = productCard.querySelector("img").getAttribute("src");

  addItem(productName, productPrice, productImage);
  updateCartDisplay();

  var cartMessage = document.getElementById("cartMessage");
  cartMessage.innerText = "Товар добавлен в корзину";
  cartMessage.style.display = "block";

  setTimeout(function () {
    cartMessage.style.display = "none";
  }, 1000);
}

function removeFromCart(name) {
  var indexToRemove = -1;
  items.forEach(function (item, index) {
    if (item.name === name) {
      item.quantity -= item.quantity > 0 ? 1 : 0;
      if (item.quantity === 0) {
        indexToRemove = index;
      }
    }
  });
  if (indexToRemove !== -1) {
    items.splice(indexToRemove, 1);
  }

  updateCartDisplay();
  saveItems();
}

function addItem(name, price, image) {
  var existingItem = items.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ name: name, price: price, image: image, quantity: 1 });
  }

  saveItems();
}

function openCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "block";
  updateCartDisplay();
}

function closeCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

function updateCartDisplay() {
  var cartItems = document.getElementById("cart-items");
  if (items.length === 0) {
    cartItems.innerHTML = "<p>Корзина пуста</p>";
  } else {
    cartItems.innerHTML = "";
    items.forEach(function (item, index) {
      if (item.quantity > 0) {
        var listItem = document.createElement("div");
        listItem.classList.add("cart-item");

        var itemImage = document.createElement("img");
        itemImage.src = item.image;

        var itemInfo = document.createElement("span");
        itemInfo.innerText =
          item.name +
          " - $" +
          (item.price * item.quantity).toFixed(2) +
          " (" +
          item.quantity +
          " шт.)";

        var removeButton = document.createElement("button");
        removeButton.innerText = "Удалить";
        removeButton.classList.add("remove-button"); 
        removeButton.onclick = function () {
          removeFromCart(item.name);
        };

        listItem.appendChild(itemImage);
        listItem.appendChild(itemInfo);
        listItem.appendChild(removeButton);

        cartItems.appendChild(listItem);
      }
    });
  }
}

function saveItems() {
  var cartData = JSON.stringify(items);
  localStorage.setItem("cartItems", cartData);
}

function loadItems() {
  var cartData = localStorage.getItem("cartItems");
  if (cartData) {
    items = JSON.parse(cartData);
    updateCartDisplay();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadItems();
});

function processPayment() {
  var nameInput = document.getElementById("name-input");
  var addressInput = document.getElementById("address-input");
  var cardNumberInput = document.getElementById("card-number-input");
  var cvvInput = document.getElementById("cvv-input");

  var name = nameInput.value;
  var address = addressInput.value;
  var cardNumber = cardNumberInput.value;
  var cvv = cvvInput.value;

  if (name.trim() === "" || address.trim() === "" || cardNumber.trim() === "" || cvv.trim() === "") {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  alert("Оплата прошла успешно. Спасибо!");

  items = [];
  saveItems();
  closeCart();
  updateCartDisplay();
}
