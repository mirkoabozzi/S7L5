const params = new URLSearchParams(window.location.search);
const crudazonId = params.get("crudazonId");

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + crudazonId, {
    headers: {
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
      //vecchia detail page
      // const col = document.createElement("div");
      // col.classList.add("col-md-8");
      // const card = document.createElement("div");
      // card.className = "card mb-4 shadow-sm";

      // const pic = document.createElement("img");
      // pic.classList.add("bd-placeholder-img", "card-img-top");
      // pic.setAttribute("src", product.imageUrl);

      // const cardBody = document.createElement("div");
      // cardBody.classList.add("card-body");

      // const name = document.createElement("h5");
      // name.classList.add("card-title");
      // name.innerText = product.name;

      // const description = document.createElement("p");
      // description.classList.add("card-text");
      // description.innerText = product.description;

      // const price = document.createElement("h5");
      // price.classList.add("card-title");
      // price.innerText = product.price + "€";

      // const btn = document.createElement("button");
      // btn.classList.add("btn", "btn-primary");
      // btn.setAttribute("type", "button");
      // btn.innerText = "Edit product";

      // btn.addEventListener("click", () => {
      //   window.location.assign("./backoffice.html?crudazonId=" + product._id);
      // });

      // const id = document.createElement("p");
      // id.classList.add("text-muted");
      // id.innerText = "id:" + product._id;

      // cardBody.appendChild(name);
      // cardBody.appendChild(description);
      // cardBody.appendChild(price);
      // cardBody.appendChild(id);
      // cardBody.appendChild(btn);
      // card.appendChild(pic);
      // card.appendChild(cardBody);
      // col.appendChild(card);
      // row.appendChild(col);

      //nuova detail page
      const col = document.createElement("div");
      col.classList.add("col-md-6");

      const pic = document.createElement("img");
      pic.classList.add("card-img-top", "mb-5", "mb-md-0");
      pic.setAttribute("src", product.imageUrl);

      const col2 = document.createElement("div");
      col2.classList.add("col-md-6", "mb-5");

      const id = document.createElement("div");
      id.classList.add("small", "mb-1", "mt-5");
      id.innerText = "id:" + product._id;

      const name = document.createElement("h1");
      name.classList.add("display-5", "fw-bolde");
      name.innerText = product.name;

      const price = document.createElement("div");
      price.classList.add("fs-5", "mb-5");
      price.innerText = product.price + " " + "€";

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.innerText = product.description;

      const divBtn = document.createElement("div");
      divBtn.classList.add("d-flex", "mt-3");

      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-primary");
      btn.setAttribute("type", "button");
      btn.innerText = "Edit product";

      btn.addEventListener("click", () => {
        window.location.assign("./backoffice.html?crudazonId=" + product._id);
      });

      divBtn.appendChild(btn);

      col2.appendChild(name);
      col2.appendChild(price);
      col2.appendChild(description);
      col2.appendChild(id);
      col2.appendChild(divBtn);

      col.appendChild(pic);

      row.appendChild(col);
      row.appendChild(col2);
    })
    .catch((error) => console.log(error));
});
