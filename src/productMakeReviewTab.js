import eventBus from './eventBus'  

Vue.component('productMakeReviewTab', {
    props: {
        productId: {
            type: Number,
            required: true,
        },
    },
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
                eventBus.$emit('review-submitted', this.productId, submittedReview)
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