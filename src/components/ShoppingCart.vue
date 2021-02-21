<template>
  <div class="container">
    <div class="cart">
      <div class="cart-block">
        <h2 class="cart-title">您的購物車</h2>
        <div class="cart-list" v-for="item in cartlist.carts" :key="item.id">
          <div
            :style="{backgroundImage: `url(${item.product.imageUrl})`}"
            style="width:100px; height:100px; background-size:cover; background-position: center;"
          ></div>
          <div class="card-item-name">
            <h3>{{item.product.title}}</h3>
            <p>NT$ {{item.product.price}}</p>
            <div class="text-success" v-if="item.coupon">已套用優惠券</div>
          </div>
          <div>{{item.product.num}}/{{item.product.unit}}</div>
          <p class="cart-item-price">NT$ {{item.total}}</p>
          <a class="delete" @click="removecartitem(item.id)">
            <img src="../../public/baseline-delete_outline-24px.svg" alt>
          </a>
        </div>
      </div>
      <div class="order-detail-block">
        <div class="order-detail">
          <h3 class="order-detail-title">訂單摘要</h3>
          <div class="order-detail-config" v-if="cartlist.total !== cartlist.final_total">
            <div class="order-detail-config-list">
              <p>總計</p>
              <p>NT$ {{cartlist.total}}</p>
            </div>
          </div>
          <div class="order-detail-total" v-if="cartlist.total !== cartlist.final_total">
            <p>折扣後</p>
            <p>NT$ {{cartlist.final_total}}</p>
          </div>
          <div class="order-detail-total" v-if="cartlist.total === cartlist.final_total">
            <p>總計</p>
            <p>NT$ {{cartlist.total}}</p>
          </div>
        </div>
        <div class="input-group mb-3 mt-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addcouponcode(coupon_code)"
            >套用優惠碼</button>
          </div>
        </div>
        <router-link
          to="/checkout"
          class="order-detail-button"
          v-if="cartlist.carts && cartlist.carts.length > 0"
        >結帳</router-link>
        <router-link to="/" class="order-detail-button" v-else>購物車為空</router-link>
      </div>
    </div>
    <div class="cart mobile-cart">
      <div class="cart-block">
        <h2 class="cart-title">您的購物車</h2>
        <div class="cart-list" v-for="item in cartlist.carts" :key="item.id">
          <a class="delete" @click="removecartitem(item.id)">
            <img src="../../public/baseline-delete_outline-24px.svg" alt>
          </a>
          <div
            :style="{backgroundImage: `url(${item.product.imageUrl})`}"
            style="width:100px; height:100px; background-size:cover; background-position: center;"
          ></div>
          <div class="card-item-config">
            <div class="card-item-name">
              <h3>{{item.product.title}}</h3>
              <p>NT$ {{item.product.price}}</p>
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </div>
          </div>
          <div>{{item.product.num}}/{{item.product.unit}}</div>
          <p class="cart-item-price">NT$ {{item.total}}</p>
        </div>
      </div>
      <div class="order-detail-block">
        <div class="order-detail">
          <h3 class="order-detail-title">訂單摘要</h3>
          <div class="order-detail-config">
            <div class="order-detail-config-list">
              <p>小計</p>
              <p>NT$ {{cartlist.total}}</p>
            </div>
          </div>
          <div class="order-detail-total">
            <p>總計</p>
            <p>NT$ {{cartlist.final_total}}</p>
          </div>
        </div>
        <router-link
          to="/checkout"
          class="order-detail-button"
          v-if="cartlist.carts && cartlist.carts.length > 0"
        >結帳</router-link>
        <router-link to="/" class="order-detail-button" v-else>購物車為空</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon_code: ""
    };
  },
  methods: {
    getCarts() {
      this.$store.dispatch("getCarts");
    },
    removecartitem(id) {
      this.$store.dispatch("removecartitem", id);
    },
    addcouponcode(coupon_code) {
      const coupon = {
        code: coupon_code
      };
      this.$store.dispatch("addcouponcode", { data: coupon });
    }
  },
  created() {
    this.getCarts();
  },
  computed: {
    cartlist() {
      return this.$store.state.cartlist;
    }
  }
};
</script>

