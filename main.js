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
})
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
        <p>Shipping: {{shipping}}</p>

        <product-details :details="details"> </product-details>

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

        <div class="cart">
          <p>Cart({{cart}})</p>
        </div>

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
          variantQuantity: 0,
        },
      ],
      cart: 0,
    };
  },
  methods: {
    addToCart: function(){
      this.cart += 1;
    },
    removeFromCart: function(){
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    updateProduct: function(index){
      this.selectedVariant = index;
      console.log(index);
    }
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
  }
});

var  app = new Vue({
  el: '#app',
  data: {
    premium: false,
  }
});
