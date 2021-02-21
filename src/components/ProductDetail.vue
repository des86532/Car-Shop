<template>
  <div>
    <div class="container">
      <div class="row">
        <div
          class="col-md-6"
          style="background-size: contain; background-position: center; background-repeat: no-repeat;"
          :style="{backgroundImage: `url(${productdetail.imageUrl})`}"
        ></div>
        <div class="col-md-6">
          <div class="d-flex justify-content-between" style="margin: 20px 10px 0 10px">
            <div class="detail-title">{{productdetail.title}}</div>
            <div class="detail-category">{{productdetail.category}}</div>
          </div>
          <div class="detail-description">{{productdetail.description}}</div>
          <hr>
          <div class="detail-price">
            <span>原價 {{productdetail.origin_price}}</span>
            <span style="font-size: 20px">售價 {{productdetail.price}}</span>
          </div>
          <div class="cart-item-quantity">
            <button class="minus" @click="minus(qty)">
              <i class="fas fa-minus"></i>
            </button>
            <input type="number" class="quantity" v-model.number="qty">
            <button class="add" @click="plus(qty)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="detail-total_price">小計 {{qty * productdetail.price}}</div>
          <button
            type="button"
            class="btn btn-simple detail-addcart"
            @click="addtocart(productdetail.id, qty)"
          >加入購物車</button>
        </div>
      </div>
    </div>
    <ShoppingCartIcon/>
  </div>
</template>

<style lang="scss" scoped>
.detail-title {
  font-size: 30px;
}
.detail-category {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  border-radius: 0.25rem;
  color: #212529;
  background-color: #8da291;
}
.detail-description {
  line-height: 25px;
  padding: 20px 10px;
}
.detail-price {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}
.cart-item-quantity {
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
.detail-total_price {
  margin: 0 10px;
  display: flex;
  justify-content: flex-end;
  font-size: 24px;
}
.detail-addcart {
  color: white;
  font-weight: 900;
  float: right;
  font-size: 24px;
  margin: 10px 10px 0 10px;
}
</style>

<script>
import ShoppingCartIcon from "../components/shoppingcarticon.vue";

export default {
  data() {
    return {
      qty: "1"
    };
  },
  methods: {
    getProduct() {
      this.$store.dispatch("getProduct", this.$route.params.id);
    },
    addtocart(id, qty = 1) {
      if (qty < 0) {
        qty = 1;
      }
      this.$store.dispatch("addtoCart", { product_id: id, qty: qty });
    },
    plus(qty) {
      qty++;
      this.qty = qty;
    },
    minus(qty) {
      qty--;
      this.qty = qty;
    }
  },
  computed: {
    productdetail() {
      return this.$store.state.productdetail;
    }
  },
  created() {
    this.getProduct();
  },
  components: {
    ShoppingCartIcon
  }
};
</script>