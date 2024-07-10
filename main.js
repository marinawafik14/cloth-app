let shop = document.getElementById("shop");




let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, desc, img, price } = x
        let search = basket.find((x) => x.id === id) || []
        return ` <div class="item" id="product-id-${id}">
    <img src=${img} alt="" width="220" >
<div class="details">
    <h3>${name}</h3>
    <p>${desc}</p>
    <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
            <i class="fa-solid fa-plus" onclick = "increment(${id})"></i>
            <div class="quantity" id= ${id} >${search.item === undefined ? 0 : search.item}</div>
            <i class="fa-solid fa-minus" onclick = "decrement(${id})"></i>
        </div>
    </div>
</div>

   </div>
     
    `
    }).join("")

    )

};
generateShop();



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
    //console.log(basket)
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
    //console.log(basket)


    localStorage.setItem("data", JSON.stringify(basket))
}
//upate numbers //

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    let amount = document.getElementById(id)
    amount.innerHTML = search.item
    //console.log(search.item)
    calculation(search.item)
};


// calculation function//

let calculation = (item) => {
    let cartAmount = document.querySelector(".cartAmount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((acc, current) => acc + current, 0)



}
calculation()



let res ;
console.log(res)