var  app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/socks-green.jpg',
    altText: 'A pair of socks',
    inStock: true,
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
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/socks-blue.jpg',
      },
    ],
    cart: 0,
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
    updateProduct: function(variantImage){
      this.image = variantImage;
    }
  }
});
