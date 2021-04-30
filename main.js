app  = new Vue({
    el: '#app',
    data: { 
        name:'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        altText: 'image of socks',
        linkText: 'More products',
        inventory: 100,
        onSale: true,
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
                    image: "assets/vmSocks-green-onWhite.jpg" 
                },
                {
                    id: 2202,
                    color: "blue",
                    image: "assets/vmSocks-blue-onWhite.jpg"
                }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods:{
        addToCart(){
            this.cart += 1
        },

        decrFromCart(){
            this.cart -= 1
        },

        updateImage(variant){
            this.image = variant.image
        }


    }
})