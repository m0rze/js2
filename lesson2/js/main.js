class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.productObjects = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 150.28},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    render() {
        for (const good of this.goods) {
            const productObject = new ProductItem(good);
            this.productObjects.push(productObject);

            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    getTotalPrice() {
        let result = 0.00;
        for (const item of this.productObjects) {
            result += item.price;
        }
        return result;
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class Basket {
    constructor() {
        this.items = [];
        this.basketHTML = "";
    }

    addItem(newItem) {
        let addTrigger = "yes";
        for (const el of this.items) {
            if (el.id === newItem.id) {
                el.count++;
                addTrigger = "no";
                break;
            }
        }
        if (addTrigger === "yes") {
            this.items.push(newItem);
        }
    }

    showItems() {
        for (const el of this.items) {
            this.basketHTML = this.basketHTML + el.basketItemToHTML();
        }
        return this.basketHTML;
    }
}

class BasketItem extends ProductItem {

    constructor(productItem) {
        super(productItem);
        this.count = 1;
    }

    basketItemToHTML() {
        return `
<div class="basket-item" data-item-id="${this.id}" data-item-price="${this.price}">
    <div class="title">${this.title}</div>
    <div class="count">${this.count}</div>
    <div class="price">${this.price}</div>
</div>`;
    }
}

const products = new ProductList();
console.log(products.getTotalPrice());

const basket = new Basket();
const basketItem = new BasketItem(products.productObjects[0]);
basket.addItem(basketItem);
basket.addItem(basketItem);
const basketItem2 = new BasketItem(products.productObjects[2]);
basket.addItem(basketItem2);
console.log(basket.items);
const basketHTML = basket.showItems();
console.log(basketHTML);