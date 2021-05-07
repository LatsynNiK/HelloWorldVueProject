    Vue.component('productReviewsTab', {
      props: {
        productId: {
          type: Number,
          required: true,
        },
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