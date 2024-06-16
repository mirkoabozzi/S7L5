const row = document.getElementById("row");

const pageLoading = (boolean) => {
  const spinner = document.getElementById("spinner");

  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

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
      pageLoading(false);

      products.forEach((product) => {
        console.log(product);
        const col = document.createElement("div");
        col.classList.add("col-md-6", "col-lg-4", "d-flex");
        const card = document.createElement("div");
        card.className = "card mb-4 shadow";

        const pic = document.createElement("img");
        pic.classList.add("bd-placeholder-img", "card-img-top", "p-2");
        pic.style.cursor = "pointer";
        pic.style.maxHeight = "300px";
        pic.style.objectFit = "contain";
        pic.setAttribute("src", product.imageUrl);

        pic.addEventListener("click", () => {
          window.location.assign("./detail.html?crudazonId=" + product._id);
        });

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-end");

        const name = document.createElement("h4");
        name.classList.add("card-title");
        name.style.cursor = "pointer";
        name.innerText = product.name;

        name.addEventListener("click", () => {
          window.location.assign("./detail.html?crudazonId=" + product._id);
        });

        const description = document.createElement("p");
        description.classList.add("card-text", "text-secondary");
        description.style.height = "100px";
        description.style.overflow = "hidden";
        // description.style.textOverflow = "ellipsis";
        description.innerText = product.description;

        const price = document.createElement("h5");
        price.classList.add("card-title");
        price.innerText = product.price + " " + "€";

        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-primary", "mx-auto", "px-4");
        btn.setAttribute("type", "button");
        btn.innerText = "Edit product";

        btn.addEventListener("click", () => {
          window.location.assign("./backoffice.html?crudazonId=" + product._id);
        });

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
