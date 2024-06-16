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
        throw new Error("Add failed");
      }
    })
    .then((product) => {
      console.log(product);

      if (crudazonId) {
        alert("Item modified");
        window.location.reload();
      } else {
        alert("Product added");
        event.target.reset();
      }
    })
    .catch((error) => {
      console.log(error);
      alert("You can't use the same product name");
    });
};

window.addEventListener("DOMContentLoaded", () => {
  form.onsubmit = submitProduct;

  const btn = document.getElementById("button");
  const btnDelete = document.getElementById("btnDelete");
  const btnReset = document.getElementById("btnReset");

  if (crudazonId) {
    btn.innerText = "Edit product";
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

        const urlPreview = document.getElementById("urlPreview");
        urlPreview.setAttribute("src", imageUrl);
        urlPreview.style.width = "50px";
        urlPreview.classList.add("mb-2");
        urlPreview.classList.remove("d-none");
      })
      .catch((error) => console.log(error));
  } else {
    btn.innerText = "Add new product";
    btnReset.classList.remove("d-none");
  }
});

const deleteProduct = () => {
  // const confirmation = confirm("Do you want to delete the item?");
  const okDelete = document.getElementById("okDelete");
  okDelete.addEventListener("click", (event) => {
    if (event) {
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
          // alert("Item deleted " + deleteProduct.name);

          window.location.href = "./home.html";
        })
        .catch((error) => console.log(error));
    }
  });
};
