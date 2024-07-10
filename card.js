let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];



// calculation function//

let calculation = (item) => {
    let cartAmount = document.querySelector(".cartAmount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((acc, current) => acc + current, 0)



}
calculation()


function generateCartItems() {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `
            <div class="cart-item">
            <img src=${img} alt="" width="100">
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
        <p>${name}</p>
        <p class="cart-item-price"> $${price}</p>
    </h4>
   <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
</div>
 <div class="buttons">
            <i class="fa-solid fa-plus" onclick = "increment(${id})"></i>
            <div class="quantity" id= ${id}>${item}</div>
            <i class="fa-solid fa-minus" onclick = "decrement(${id})"></i>
        </div>
<h3> $${item * search.price}</h3>
            </div>
            </div>
            `
        }).join("");
    }
    else {
        shoppingCart.innerHTML = `
     `;
        label.innerHTML = `<h2>Cart is Empty</h2>
 <a href="index.html">
    <button class="HomeBtn">Back to home</button>
 </a>`


            ;
    }


}

generateCartItems()


let increment = (id) => {
    let selectitem = id;
    let search = basket.find((x) => x.id === selectitem.id);
    if (search === undefined) {
        basket.push({
            id: selectitem.id,
            item: 1
        })
    } else {
        search.item += 1;
    }

    update(selectitem.id)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

/// decrement number///

let decrement = (id) => {
    let selectitem = id
    let search = basket.find((x) => x.id === selectitem.id);
    if (search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }

    update(selectitem.id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()


    localStorage.setItem("data", JSON.stringify(basket))
}


let update = (id) => {
    let search = basket.find((x) => x.id === id)
    let amount = document.getElementById(id)
    amount.innerHTML = search.item
    //console.log(search.item)
    calculation(search.item)
    totalAmount()
};


let removeItem = (id) => {
    let selectitem = id;
    basket = basket.filter((x) => x.id !== selectitem.id)

    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems()
    totalAmount()
    calculation()
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((acc, current) => acc + current, 0);
        //console.log(amount);
        label.innerHTML = `
 <h2>Total Bill: $ ${amount}</h2>
<button class="checkout">Checkout</button>
<button onclick="clearChart()" class="removeAll">Clear Carts</button>

 `
    } else {
        return;
    }




};
totalAmount()

let clearChart = () => {
    basket = []
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation()

}
