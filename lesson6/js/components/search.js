Vue.component('search-block', {
    data() {
        return {
            searchLine: ""
        }
    },
    methods: {
        getFiltered(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.$root.$refs.productsBlock.filtered = this.$root.$refs.productsBlock.products.filter(product => regexp.test(product.product_name));
        },
    },

    template: `
    <div>
     <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="searchLine">
                <button class="btn-search" type="button" @click="getFiltered">
                    <i class="fas fa-search"></i>
                </button>
            </form>
</div>
    `
});