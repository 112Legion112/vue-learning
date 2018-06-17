var  app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/Socks.jpg',
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
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
      },
    ],
    sizes: [
      {
        id: 111,
        name: "small",
      },
      {
        id: 112,
        name: "middle",
      },
      {
        id: 113,
        name: "large",
      }
    ],
  }
});
