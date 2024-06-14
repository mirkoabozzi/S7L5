const row = document.getElementById("row");

const fetchProduct = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
    .then((products) => {
      console.log(products);

      products.forEach((product) => {
        console.log(product);
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const pic = document.createElement("img");
        pic.classList.add("bd-placeholder-img", "card-img-top");
        pic.setAttribute("src", product.imageUrl);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const name = document.createElement("h5");
        name.classList.add("card-title");
        name.innerText = product.name;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.innerText = product.description;

        const price = document.createElement("h5");
        price.classList.add("card-title");
        price.innerText = product.price + "€";

        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-primary");
        btn.setAttribute("type", "button");
        btn.innerText = "Modifica";

        const id = document.createElement("p");
        id.classList.add("text-muted");
        id.innerText = "id:" + product._id;

        cardBody.appendChild(name);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(id);
        cardBody.appendChild(btn);
        card.appendChild(pic);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchProduct();
});
