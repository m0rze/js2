const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        basket: [],
        isVisibleCart: false,
        searchLine: "",
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`).then((response) => {
                if (response.result === 1) {
                    this.isVisibleCart = true;
                    if(!this.checkInBasket(product)) {
                        this.$set(product, "quantity", 1);
                        this.basket.push(product);
                    } else {
                        this.$set(product, "quantity", ++product.quantity);
                    }
                }
            });
        },
        filter(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        checkInBasket(product) {
            let inBasket = false;
            this.basket.forEach(el => {
                if(el.id_product === product.id_product){
                    inBasket = true;
                    return true;
                }
            });
            return inBasket;
        },
        getBasketItems() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        hideBasket(event) {
            if(event.target.tagName !== "BUTTON") {
                this.isVisibleCart = false;
            }
            this.filter();
        }
    },
    computed: {
        getBasketTotalSum()
        {
            let sum = 0;
            this.basket.forEach(el => {
                sum += el.price * el.quantity
            });
            return sum;
        }
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
});
