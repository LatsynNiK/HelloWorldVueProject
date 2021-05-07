    Vue.component('productReviewTabs', {
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
      :productId="productId"
      :reviews="reviews"/>
      <productMakeReviewTab
        :productId="productId"
        v-show="selectedTab === 'Make a review'"/>
      </div>
      `
    })