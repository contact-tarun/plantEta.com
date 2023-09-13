let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let shopIcon = document.getElementById("shopCount");
  let orderIcon = document.getElementById("orderCount");
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  shopIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  orderIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let genrateCartItemZero = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = ShopItemData.find((y) => y.id === id) || [];
        let { img, name, price } = search;

        return `
        <div class="cart-item">
          <img width=100  src = ${img} alt="">
          <p class="title-price-name">${name}</p>
          <div class="buttons">        
          <i onclick="decrement(${id})" class="bi bi-dash">-</i>
          <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg">+</i>
          </div>
          <div class="cart-item-price">₹ ${price}</div>
          
          <h3 class="priceTotal">₹ ${item * search.price}</h3> 
          <div onclick="removeItem(${id})" class="bi bi-x-lg">Delet</div>    
          </div>`;
      })
      .join(""));
  } else if (basket == 0) {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html"><button class="HomeBtn">Back To Home</button></a>
    `;
  }
};

genrateCartItemZero();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  genrateCartItemZero();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  genrateCartItemZero();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  genrateCartItemZero();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  genrateCartItemZero();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let buyCart = () => {
  basket = [];
  genrateCartItemZero();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  alert("your Order delivered successful");
};

var amount;

let totalAmount = () => {
  if (basket.length !== 0) {
    amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = ShopItemData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `<h3>₹ ${amount}</h3>`;
    offerbtn();
    // orderprice();
  } else return;
};

// let orderprice = () => {
//   document.getElementById("orderPrice").innerHTML = amount;
// };
// orderprice();

function offerbtn() {
  let x = document.getElementById("getDiscount").value;
  let n = x.length;
  let no = +x.slice(n - 1, n);

  var loal = (amount * no) / 100;

  if (x != 0) {
    // alert(amount);
    label1.innerHTML = `
         <h2> ₹ ${amount - loal}</h2>`;
  } else {
    label1.innerHTML = `<h2> ₹ ${amount}</h2>`;
  }

  // let amount1 = amount;
  // // alert(x);
  // if (no != 0) {
  //   label.innerHTML = `
  //      <h2>Total Bill : Rs ${amount1}</h2>
  //       <div class="discount">DISCOUNT : <input id="getDiscount"><button id="offer" onclick="offerbtn()">play</button></div>
  //     <button class="checkout">Checkout</button>
  //     <button onclick="clearCart()" class="removeAll">Clear Chart</button>
  //       `;
  // }
}
totalAmount();
