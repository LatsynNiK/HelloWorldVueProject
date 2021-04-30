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
                    color: "green"
                },
                {
                    id: 2202,
                    color: "blue"
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
})