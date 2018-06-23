let eventBus = new Vue();

Vue.component('product-details-tab', {
  props: {
    shipping: {
      required: true,
      type: [String, Number],
    },
    details: {
      required: true,
      type: Array,
    }
  },
  template: `
    <div>
        <span class="tab"
        v-for="(tab, index) in tabs" 
        :class="{activeTab: selectedTab === tab}"
        @click="selectedTab = tab"
        :key="index">
        {{tab}}
        </span>
        <p v-show="selectedTab === 'Shipping'">Shipping: {{shipping}}</p>

        <product-details :details="details"
            v-show="selectedTab === 'Details'"> </product-details>

        
    </div>  
  `,
  data() {
    return {
      tabs: ['Shipping', 'Details'],
      selectedTab: 'Shipping'
    }
  }
});
Vue.component('product-details', {
  props:{
    details: {
      type: Array,
      required:true,
    }
  },
  template: `
  <ul>
    <li v-for="detail in details">{{detail}}</li>
  </ul>
  `
});
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `
  <div class="product">

    <div class="product-image">
      <img :src="image" :alt="altText">
    </div>

    <div class="product-info">
        <h1>{{ printOut }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        
        <product-details-tab :shipping="shipping" :details="details"></product-details-tab>

        <div v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock}">Add to Cart</button>
        <button @click="removeFromCart">Remove from Cart</button>
        
        <product-tabs :reviews="reviews"></product-tabs>        



    </div>
  </div>
  `,
  data() {
    return {
      onSale: true,
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      altText: 'A pair of socks',
      details: [
        "80% cotton",
        "20% polyester",
        "Gender-neutral",
      ],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/socks-green.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/socks-blue.jpg',
          variantQuantity: 2,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart: function(){
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function(){
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index){
      this.selectedVariant = index;
      console.log(index);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    printOut() {
      if (this.onSale) {
        return this.brand + ' ' + this.product;
      }
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    });
  }
});
Vue.component('product-review', {
  template: `
    <form class="review" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul v-for="error in errors">
          <li> {{error}} </li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>Would you recommend this product?</p>
      <p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data(){
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
      }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        eventBus.$emit('review-submitted',productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      }else{
        this.errors = [];
        if(!this.name) this.errors.push("Name required.");
        if(!this.review) this.errors.push("Review required.");
        if(!this.rating) this.errors.push("Rating required.");
        if(!this.recommend) this.errors.push("Recommend required.")
      }
    }
  }
});


Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true,
    }
  },
  template: `
    <div>
        <span class="tab" 
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab = tab">{{tab}}</span>
        
      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no review yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
          </li>
  
        </ul>
      </div>
  
        <product-review v-show="selectedTab==='Make a Review'" >
        </product-review>
    </div>
  `,
  data(){
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews',
    }
  },
});
let  app = new Vue({
  el: '#app',
  data: {
    cart: [],
    premium: false,
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      let index = this.cart.indexOf(id);
      if (index > -1){
        this.cart.splice(index, 1);
      }
    }
  }
});
