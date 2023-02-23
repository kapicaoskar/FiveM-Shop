$('html').hide();
$('body').hide();
let shopItems = ""
let shopName = ""
let shopLogo = ""


$(document).keyup(function(e) {
    if (e.key === "Escape") { 
        $.post(`http://${GetParentResourceName()}/exitShop`, JSON.stringify("exit"))
        $('body').fadeOut('slow');
}
});

function openBasket() {
    $('body').fadeOut('slow');
    $.post(`http://${GetParentResourceName()}/openBasket`, JSON.stringify("open"))
}

function addBasket(name) {
const info = {
    "itemName": name,
}
    $.post(`http://${GetParentResourceName()}/addBasket`, JSON.stringify(info))
}




const renderCategories = (categories) => {
    
    categories.forEach((cat) => {
        const itemsDiv = document.querySelector('.items');
        const div = document.createElement('div');
        div.classList.add('category');

        const p = document.createElement('p');
        p.classList.add('header-cat');
        p.innerText = cat.name;

        const boxes = renderItems(cat.items);
        div.appendChild(p);
        div.appendChild(boxes);
        itemsDiv.appendChild(div)
    })
}

const renderItems = (items) => {
    const boxes = document.createElement('div');
    boxes.classList.add('boxes');

    items.forEach(i => {
        const itemBox = document.createElement("div");
        itemBox.classList.add("item-box");

        const itemPhoto = document.createElement("div");
        itemPhoto.classList.add("item-photo");
        const img = document.createElement("img");
        img.setAttribute('src', i.itemPhoto);
        img.setAttribute('id', "photo");
        img.setAttribute('alt', "item-photo");
        itemPhoto.appendChild(img);

        const itemTitle = document.createElement("p");
        itemTitle.setAttribute("class", "item-title");
        itemTitle.innerText = i.previewName;

        const itemDesc = document.createElement("p");
        itemDesc.setAttribute("class", "item-desc");
        itemDesc.innerText = i.itemDescription;

        const center = document.createElement("center");
        const button = document.createElement("button");
        center.appendChild(button);
        button.setAttribute("id", "addBasket");
        button.setAttribute("class", i.previewName);
        const nameOf = i.previewName
        button.setAttribute("onclick", `addBasket('${nameOf}')`);
        button.innerHTML = i.price + '.00 PLN' + '<i class="fa-solid fa-basket-shopping"></i>';

        itemBox.appendChild(itemPhoto);
        itemBox.appendChild(itemTitle);
        itemBox.appendChild(itemDesc);
        itemBox.appendChild(center);

        boxes.appendChild(itemBox);
    })

    return boxes;
}







window.addEventListener('message', function(event) {
    if (event.data.type == "OPEN_SHOP") {
        document.querySelector('.server-name').innerText = event.data.shopItems;
        shopItems = JSON.parse(event.data.shopItems)
        shopName = event.data.shopName
        shopLogo = event.data.shopLogo
        renderCategories(shopItems)
        document.querySelector('.logo-server').innerHTML =  '<img src="' + shopLogo + '" alt="photo" width="100%" height="100%">';
        document.querySelector('.server-name').innerText = shopName;
        $('html').fadeIn('slow');
        $('body').fadeIn('slow');
    } 
})





