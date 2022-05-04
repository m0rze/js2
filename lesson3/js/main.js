const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// переписать на промис (!!!!!!!не fetch !!!!!!!!!!)
// Далее НЕ ИСПОЛЬЗОВАТЬ В КОДЕ!
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });

};
getRequest(`${API}/catalogData.json`)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });

// ---------------------------------

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.productObjects = [];

        // this.fetchGoods();
        // this.render();

        this.getProducts()
            .then((data) => {
                this.goods = data;
                this.render();
            })
            .then(() => {
                document.querySelectorAll(".buy-btn")
                    .forEach(el => {
                        el.addEventListener("click",
                            (event) => {
                                const productId = event.target
                                    .closest(".product-item")
                                    .dataset.id
                                this.addToBasketRequest(productId)
                                    .then(response => {
                                        if (response.result === 1) {
                                            console.log("Add to basket", productId);
                                        }
                                    })
                                    .catch(error => console.log(error));
                            });
                    });
            });
    }

    // fetchGoods() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     console.log(data);
    //     this.goods = JSON.parse(data);
    //     this.render();
    //   });
    // }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    addToBasketRequest(dataId) {
        return fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    render() {
        for (const good of this.goods) {
            console.log(good);
            const productObject = new ProductItem(good);
            console.log(productObject);
            this.productObjects.push(productObject);

            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
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

new ProductList();



