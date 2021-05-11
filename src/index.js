import './style.css';
import './product';
import store from './store';

Vue.config.devtools = true

var app = new Vue({
  el: '#app',
  store,
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
  },
  template: `
  <div>
    <div class="cart">Cart ({{cart.length}})</div>
    <product :premium="premiumData" :id="101" @add-to-cart="addToCart" @remove-from-cart="decrFromCart"></product>
    <product :premium="premiumData" :id="102" @add-to-cart="addToCart" @remove-from-cart="decrFromCart"></product>
    <product :premium="premiumData" :id="103" @add-to-cart="addToCart" @remove-from-cart="decrFromCart"></product>
  </div>`
})