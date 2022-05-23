Vue.component("products-block", {
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/50x50',
            searchLine: "",
            catalogUrl: '/catalogData.json',
        }
    },
    methods: {
        setFiltered(filteredItems) {
            this.products = filteredItems;
        },

    },

    created() {
        this.$root.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    template: `
    <div class="products" @click.stop="$root.$refs.basket.hideBasket($event)">
            <div class="product-item" v-for="product of filtered.length > 0 ? filtered : products" :key="product.id_product">
                <img :src="imgCatalog" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.basket.addProduct(product)">Купить</button>
                </div>
            </div>
        </div>
    `
});