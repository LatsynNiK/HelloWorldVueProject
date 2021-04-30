app  = new Vue({
    el: '#app',
    data: { 
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
    },
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
        }
    }
})