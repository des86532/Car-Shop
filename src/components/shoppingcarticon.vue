<template>
  <div>
    <router-link to="/shoppingcart" class="cart-dropdown">
      <span class="point" v-if="cartquantity.carts && cartquantity.carts.length">{{cartquantity.carts.length}}</span>
      <span style="font-size: 42px;">
      <i class="fas fa-shopping-cart"></i>
      </span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.cart-dropdown {
  bottom: 45px;
  position: fixed;
  right: 30px;
  border: 1px solid #3F5D45;
  border-radius: 100%;
  padding: 10px;
  color:#3F5D45;
  padding-right: 11px;
  padding-top: 11px;
  padding-bottom: 11px;
  background-color: #eaf0eda8;
  &:hover {
    color:#d6a70c;
  }
  .point {
    position: absolute;
    top: -5px;
    right: 0px;
    border: 1px solid red;
    border-radius: 100%;
    padding: 4px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
}
</style>

<script>
export default {
  methods: {
    getcarts() {
      this.$store.dispatch("getCarts");
    }
  },
  created() {
    this.getcarts();
  },
  computed: {
    cartquantity() {
      return this.$store.state.cartlist;
    }
  }
};
</script>
