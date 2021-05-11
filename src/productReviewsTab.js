import store from './store'
import eventBus from './eventBus'

Vue.component('productReviewsTab', {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews:[]
    }
  },
  mounted() {
    eventBus.$on('review-submitted', (productId) => {
      if (productId === this.productId) {
       this.reviews = this.$store.getters.REVIEWS(productId) 
      }
    })
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