const form = document.getElementById("form");

const params = new URLSearchParams(window.location.search);
const crudazonId = params.get("crudazonId");

const URL = crudazonId ? "https://striveschool-api.herokuapp.com/api/product/" + crudazonId : "https://striveschool-api.herokuapp.com/api/product/";
const method = crudazonId ? "PUT" : "POST";

const submitProduct = (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("url").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk3OTdjMjM5YzAwMTUyZjRiM2IiLCJpYXQiOjE3MTgzNTIyNDksImV4cCI6MTcxOTU2MTg0OX0.f4gnzNVJVs5xZ9EJ-jZKJDsp7Tycz_uGx67W2xT4030",
    },
    body: JSON.stringify(newProduct),
  })
    .then((respond) => {
      if (respond.ok) {
        return respond.json();
      } else {
        throw new Error("Caricamento prodotto fallito");
      }
    })
    .then((product) => {
      console.log(product);
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  form.onsubmit = submitProduct;

  // const name = document.getElementById("name");
  // const description = document.getElementById("description");
  // const brand = document.getElementById("brand");
  // const urlImg = document.getElementById("url");
  // const price = document.getElementById("price");
  const btn = document.getElementById("button");
  const btnDelete = document.getElementById("btnDelete");
  const btnReset = document.getElementById("btnReset");

  if (crudazonId) {
    btn.innerText = "Modifica prodotto";
    btnDelete.classList.remove("d-none");
    btnDelete.onclick = deleteProduct;

    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk3OTdjMjM5YzAwMTUyZjRiM2IiLCJpYXQiOjE3MTgzNTIyNDksImV4cCI6MTcxOTU2MTg0OX0.f4gnzNVJVs5xZ9EJ-jZKJDsp7Tycz_uGx67W2xT4030",
      },
    })
      .then((respond) => {
        if (respond.ok) {
          return respond.json();
        } else {
          throw new Error("Caricamento prodotto fallito");
        }
      })
      .then((product) => {
        console.log(product);

        const { name, description, brand, imageUrl, price } = product;

        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("url").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((error) => console.log(error));
  } else {
    btn.innerText = "Aggiungi prodotto";
    btnReset.classList.remove("d-none");
  }
});

const deleteProduct = () => {
  const confirmation = confirm("Vuoi eliminare questo articolo?");

  if (confirmation) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk3OTdjMjM5YzAwMTUyZjRiM2IiLCJpYXQiOjE3MTgzNTIyNDksImV4cCI6MTcxOTU2MTg0OX0.f4gnzNVJVs5xZ9EJ-jZKJDsp7Tycz_uGx67W2xT4030",
      },
    })
      .then((respond) => {
        if (respond.ok) {
          return respond.json();
        }
      })
      .then((deleteProduct) => {
        alert("Articolo eliminato " + deleteProduct.name);

        window.location.href = "./home.html";
      })
      .catch((error) => console.log(error));
  }
};
