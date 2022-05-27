Vue.component("basketBlock", {
    data() {
        return {
            basket: [],
            isVisibleCart: false,
            basketUrl: '/basket',
        }
    },
    methods: {
        addProduct(product) {
            let find = this.checkInBasket(product);
            if (!find) {
                this.$root.postJson(`${API}/basket`, product).then((response) => {
                    if (response.result === 1) {
                        this.getServerBasket();
                        this.isVisibleCart = true;

                    }
                });
                // let prod = Object.assign({quantity: 1}, product);
                // this.basket.push(prod);
            } else {
                this.$root.putJson(`${API}/basket/${find.id_product}`,
                    {quantity: 1}).then((response) => {
                    if (response.result === 1) {
                        this.getServerBasket();
                        this.isVisibleCart = true;

                    }
                });
            }

        },
        removeProduct(productId) {
            this.$root.deleteJson(`${API}/basket/${productId}`,
                {quantity: 1}).then((response) => {
                if (response.result === 1) {
                    this.getServerBasket();
                    this.isVisibleCart = true;

                }
            });
        },
        checkInBasket(product) {
            let inBasket = null;
            this.basket.forEach(el => {
                if (el.id_product === product.id_product) {
                    inBasket = el;
                    return true;
                }
            });
            if (inBasket) {
                return inBasket;
            }
            return false;
        },
        getServerBasket() {
            this.basket = [];
            this.$root.getJson(`${API + this.basketUrl}`)
                .then(data => {
                    for (let el of data.contents) {
                        this.basket.push(el);
                    }
                });
        },
        getBasketItems() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        hideBasket(event) {
            if (event.target.tagName !== "BUTTON") {
                this.isVisibleCart = false;
            }
            //this.filter();
        }
    },
    created() {
        this.getServerBasket();
    },
    computed: {
        getBasketTotalSum() {
            let sum = 0;
            this.basket.forEach(el => {
                sum += el.price * el.quantity
            });
            return sum;
        }
    },
    template: `
    <div class="cart-section">
                <button class="btn-cart" type="button" @click="getBasketItems">Корзина</button>
                <div class="cart-list" :class="{show: isVisibleCart, hide: !isVisibleCart}">
                    <h4 v-if="basket.length === 0">Нет товаров</h4>
                    <div v-else class="basket-products">
                        <div class="cart-product" v-for="cartProduct of basket" :key="cartProduct.id_product">
                            <div class="cart-product-name">{{ cartProduct.product_name }}</div>
                            <div class="cart-product-price">{{ cartProduct.price * cartProduct.quantity }}</div>
                            <div class="cart-product-quantity">{{ cartProduct.quantity }}</div>
                            <button class="remove-cart-product" @click="removeProduct(cartProduct.id_product)">X</button>
                        </div>
                        <h4 class="total-basket">
                            Всего товаров: {{ basket.length }} на сумму {{ getBasketTotalSum }}
                        </h4>
                    </div>

                </div>
            </div>
    `
});