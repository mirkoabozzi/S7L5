const form = document.getElementById("form");

const submitProduct = (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("url").value,
    price: document.getElementById("price").value,
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
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
});
