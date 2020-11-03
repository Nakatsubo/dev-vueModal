var eventBus = new Vue();

Vue.component('modal', {
    template: `
        <transition name="modal">
            <div class="special_modal_bg" v-if="active" @click="close()">
                <div class="special_modal">
                    <div class="special_modal_content">

                        <div class="special_products_area">
                            <p class="special_products_img">
                                <img :src="'./assets/img/' + product.path">
                            </p>
                            <p class="special_products_name">
                                {{ product.name }}
                            </p>
                            <p v-if="product.price" class="special_products_price">
                                {{ product.price }}
                            </p>
                        </div>

                        <div class="modal-footer">
                            &nbsp;
                            <button class="modal-default-button" @click="close()">
                                close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `,
    data: function() {
        return {
            active: false,
            product: {
                id: '',
                name: '',
                price: '',
                sale_price: '',
                link: ''
            }
        }
    },
    methods: {
        open: function(product) {
            this.active = true;
            this.product = product;
        },
        close: function() {
            this.active = false;
        }
    },
    mounted: function() {
        this.$nextTick(function () {
            eventBus.$on('open-modal', this.open);
            eventBus.$on('close-modal', this.close);
        }.bind(this));
    }
});

new Vue({
    el: '#app',
    data: {
        products: []
    },
    methods: {
        async getProducts() {
            var url = 'http://127.0.0.1:8080/assets/data/data.json'
            await axios.get(url).then(product => { this.products = product.data })
        },
        openModal: function(product) {
            eventBus.$emit('open-modal', product);
        },
        closeModal: function() {
            eventBus.$emit('close-modal');
        }
    },
    mounted() {
        this.getProducts()
    }
});