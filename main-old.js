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
                <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to cart</button>
                <button v-on:click="decrFromCart">Remove from cart</button>
            </div>
        </div>
        <productReviewTabs :reviews="reviews"/>
    </div>
    `,
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
                    inventory: 10
                }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        outOfStock:{
            textDecoration: "line-through"
            },
        reviews: [],
    }},
    methods:{
        updateVariant(variantIndex){
            this.selectedVariantIndex = variantIndex
        },
        addToCart() {
            let id = this.variants[this.selectedVariantIndex].id;
            this.$emit('add-to-cart', id)
        },
        decrFromCart() {
            let id = this.variants[this.selectedVariantIndex].id;
            this.$emit('remove-from-cart', id)
        },
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
    },
    mounted() {
        eventBus.$on('review-submitted', review => {
            this.reviews.push(review)
        })
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

Vue.component('productMakeReviewTab', {
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            recommended: null,
            errors:[],
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review, this.recommended)
            {
                let submittedReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommended: this.recommended == "true" ? true : false
                }
                this.name = null
                this.review = null
                this.rating = null
                this.recommended = null
                eventBus.$emit('review-submitted', submittedReview)
            }
            else
            {
                if (!this.name)
                {
                    this.errors.push("Name is required!")
                }
                if (!this.review)
                {
                    this.errors.push("Review is required!")
                }
                if (!this.recommended)
                {
                    this.errors.push("Recommended or not is required!")
                }
            }
        }
    },
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name"> 
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea > 
        </p>

        <p>Would you recommend this product?</p>
        <div style="display: flex">
            <label for="yes">Yes!</label>
            <input style="width:10%" type="radio" id="yes" name="recommended" value="true" v-model="recommended">
        </div>
        <div style="display: flex">
            <label for="no">Nooo =(</label>
            <input style="width:10%" type="radio" id="no" name="recommended" value="false" v-model="recommended">
        </div>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating" required>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <div v-if="errors.length">
            <p> Please, correct the following errors:</p>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </div>
        <p>
            <input type="submit" value="Submit review">
        </p>
    </form>
    <input v-model="name">
    `
})

Vue.component('productReviewsTab', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length > 0">There are no reviews yet</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>{{review.name}} ({{review.rating}}){{review.recommended ? " Recommended!" : ""}}</p>
                    <p>{{review.review}}</p>
                </li>
            </ul>
        </div>
    `
})

Vue.component('productReviewTabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedTab: "Reviews",
            tabs: ["Reviews", "Make a review"],
        }
    },
    template: `
        <div>
            <span
                v-for="(tab, index) in tabs" :key="index"
                class="tab"
                :class="{activeTab: selectedTab === tab }"
                v-on:click="selectedTab = tab">
                {{tab}}
            </span>
            <productReviewsTab v-show="selectedTab === 'Reviews'"
                :reviews="reviews"/>
            <productMakeReviewTab v-show="selectedTab === 'Make a review'"/>
        </div>
    `
})

var eventBus = new Vue()

app = new Vue({
    el: '#app',
    data: {
        premiumData: true,
        cart: [],
    },
    methods: {
        addToCart(id){
            this.cart.push(id)
        },
        decrFromCart(id) {
            let removedIndex = this.cart.indexOf(id);
            if (~removedIndex) {
                this.cart.splice(removedIndex, 1)
            }
        },
    }
})