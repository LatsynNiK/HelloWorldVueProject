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
