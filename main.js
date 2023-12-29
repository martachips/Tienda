import "./style.css";
// import 'src/pages/contact/contact.js';
import { products } from "./src/data/data.js";

const filter = {
  price: "",
  seller: ""
};
let sellerFilter = "";
let priceFilter = "";

const printProducts = () => {
  const sectionProd = document.querySelector("#product-container");
  sectionProd.replaceChildren();

  const filteredProducts = products
    .filter((product) => product.price <= priceFilter || priceFilter === "")
    .filter(
      (product) => sellerFilter === product.seller || sellerFilter === ""
    );

  for (const product of filteredProducts) {
    const articleProduct = document.createElement("article");
    const titleProduct = document.createElement("h3");
    const imgProduct = document.createElement("img");
    const descriptionProduct = document.createElement("p");
    descriptionProduct.classList.add("description");
    const sellerProduct = document.createElement("p");
    sellerProduct.classList.add("seller");
    const ulPriceStarNumber = document.createElement("ul");
    const liPrice = document.createElement("li");
    const liStar = document.createElement("li");
    const liStarImg = document.createElement("img");
    const liNumber = document.createElement("li");

    titleProduct.textContent = product.name;
    imgProduct.src = product.image;
    descriptionProduct.textContent = product.description;
    sellerProduct.textContent = product.seller;
    liPrice.textContent = product.price;
    liStarImg.src = "src/images/star-svgrepo-com (1).svg";
    liNumber.textContent = product.stars;

    sectionProd.appendChild(articleProduct);
    articleProduct.appendChild(titleProduct);
    articleProduct.appendChild(imgProduct);
    articleProduct.appendChild(descriptionProduct);
    articleProduct.appendChild(sellerProduct);
    articleProduct.appendChild(ulPriceStarNumber);
    ulPriceStarNumber.append(liPrice);
    ulPriceStarNumber.append(liStar);
    liStar.append(liStarImg);
    ulPriceStarNumber.append(liNumber);
  }
};
printProducts();

//! Aquí creo el filtro para los vendedores
const sectionSelect = document.querySelector("#filter");
const selectFilter = document.createElement("select");
selectFilter.classList.add("selectFilter");
sectionSelect.appendChild(selectFilter);

const sellers = [];
for (let i = 0; i < products.length; i++) {
  // console.log(products[i].seller);
  if (!sellers.includes(products[i].seller)) {
    sellers.push(products[i].seller);
  }
}
const createOption = (value, content) => {
  const optionSeller = document.createElement("option");
  optionSeller.classList.add("option");
  optionSeller.textContent = content;
  selectFilter.appendChild(optionSeller);
  optionSeller.value = value;
};
createOption("", "Vendor");

for (const eachSeller of sellers) {
  createOption(eachSeller, eachSeller);
}

selectFilter.addEventListener("change", (event) => {
  sellerFilter = event.target.value;
  printProducts();
});

//! Aquí creo el filtro de tipo input para el precio
const maxPriceInput = document.createElement("input");
maxPriceInput.classList.add("inputNum");
maxPriceInput.placeholder = "price";
maxPriceInput.type = "number";
maxPriceInput.max = "1050";
maxPriceInput.min = "0";
sectionSelect.appendChild(maxPriceInput);

maxPriceInput.addEventListener("change", (event) => {
  priceFilter = event.target.value;
  printProducts();
});

//! Aquí creo el botón que elimina todos los filtros
const clearBtn = document.createElement("button");
clearBtn.innerText = "Clean Filters";
sectionSelect.appendChild(clearBtn);

clearBtn.addEventListener("click", function () {
  priceFilter = "";
  sellerFilter = "";
  maxPriceInput.value = "";
  selectFilter;
  printProducts();
});
