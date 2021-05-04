Vue.config.devtools = true

Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p>{{ saleText }}</p>
        <p v-if="(inventory > 10) && inStock">In stock</p>
        <p v-else-if="(inventory > 0) && inStock">Almost sold out</p>
        <p v-else :style="outOfStock" >Out of stock</p>
        <a :href="link">{{linkText}}</a>
        <br>
        <productDetails :details="details"></productDetails>
        <span>Sizes:</span>
        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <span>Variants:</span>
        <div style="display: flex;">
            <div class="color-box" v-for="(v,i) in variants" :key="v.id" @mouseover="updateVariant(i)" :style="{backgroundColor: v.color}"></div>
        </div>        
        <div>
            Shipping: {{shipping}}    
        </div>
        <div class="cart-tool">
        <div class="cart">Cart ({{cart}})</div>
            <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to cart</button>
            <button v-on:click="decrFromCart" :disabled="cart<=0" :class="{disabledButton: cart<=0}">Remove from cart</button>
        </div>
    </div>`,
    data() {
        return {
        name:'Socks',
        description: 'A pair of warm, fuzzy socks',
        brand: 'My Vue Brand',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        altText: 'image of socks',
        linkText: 'More products',
        inventory: 100,
        onSale: true,
        selectedVariantIndex: 0,
        details: [
                "1 detail",
                "second",
                200,
                true,
                1.25
        ],
        variants: [
                {
                    id: 2201,
                    color: "green",
                    image: "assets/vmSocks-green-onWhite.jpg",
                    inventory: 5
                },
                {
                    id: 2202,
                    color: "blue",
                    image: "assets/vmSocks-blue-onWhite.jpg",
                    inventory: 0
                }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
        outOfStock:{
            textDecoration: "line-through"
        }
    }},
    methods:{
        addToCart(){
            this.cart += 1
        },

        decrFromCart(){
            this.cart -= 1
        },

        updateVariant(variantIndex){
            this.selectedVariantIndex = variantIndex
        }
    },
    computed:{
        image(){
            return this.variants[this.selectedVariantIndex].image
        },
        title(){
            return this.name + ' ' + this.brand
        },
        inStock(){
            return this.variants[this.selectedVariantIndex].inventory > 0
        },
        saleText(){
            var text = `Hurry to get this ${this.name} from ${this.brand}`
            return this.onSale ? text+' on sale!' : text
        },
        shipping() {
            return this.premium ? "Free" : 2.99
        }
    }
})

Vue.component('productDetails', {
    props: {
        details: {
            type: Object,
            required: true,
        }
    },
    template:`
    <div>
        <span>Details:</span>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    </div>`,
})

app = new Vue({
    el: '#app',
    data: {
        premiumData: true
    }
})