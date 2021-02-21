<template>
  <div class="container">
    <div class="cart">
      <div class="cart-block">
        <h2 class="cart-title">購買資訊</h2>
        <div class="cart-list" v-for="item in orderdetail.products" :key="item.id">
          <div
            class="card-item-img"
            style="background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.product.imageUrl})`}"
          ></div>
          <div class="card-item-name">
            <h3 class="mb-2">{{item.product.title}}</h3>
            <p class="mb-2">{{item.qty}} / {{item.product.unit}}</p>
            <p class="text-success" v-if="item.coupon">已套用優惠券</p>
          </div>
          <div class="card-item-price">
            <p class="mb-2">NT$ {{item.final_total}}</p>
          </div>
        </div>
        <div class="card-total">總計 : NT$ {{orderdetail.total}}</div>
        <h2 class="cart-title">個人資訊</h2>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row">姓名</th>
              <td>{{orderdetail.user.name}}</td>
            </tr>
            <tr>
              <th scope="row">電話</th>
              <td>{{orderdetail.user.tel}}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{{orderdetail.user.email}}</td>
            </tr>
            <tr>
              <th scope="row">地址</th>
              <td>{{orderdetail.user.address}}</td>
            </tr>
            <tr>
              <th scope="row">付款狀態</th>
              <td>
                <button
                  class="btn btn-danger"
                  v-if="orderdetail.is_paid === false"
                  @click="payorder"
                >確認付款去</button>
                <button class="btn btn-success" v-if="orderdetail.is_paid === true">完成付款</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" style="float: right;" @click="backtoshop">繼續購物</button>
      </div>
    </div>
    <div class="cart mobile-cart">
      <div class="cart-block">
        <h2 class="cart-title">購買資訊</h2>
        <div class="cart-list" v-for="item in orderdetail.products" :key="item.id">
          <div
            class="card-item-img"
            style="background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.product.imageUrl})`}"
          ></div>
          <div class="card-item-name">
            <h3 class="mb-2">{{item.product.title}}</h3>
            <p class="mb-2">{{item.qty}} / {{item.product.unit}}</p>
            <p class="mb-2 card-item-price">NT$ {{item.final_total}}</p>
            <p class="text-success" v-if="item.coupon">已套用優惠券</p>
          </div>
        </div>
        <div class="card-total">總計 : NT$ {{orderdetail.total}}</div>
        <h2 class="cart-title">個人資訊</h2>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row">姓名</th>
              <td>{{orderdetail.user.name}}</td>
            </tr>
            <tr>
              <th scope="row">電話</th>
              <td>{{orderdetail.user.tel}}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{{orderdetail.user.email}}</td>
            </tr>
            <tr>
              <th scope="row">地址</th>
              <td>{{orderdetail.user.address}}</td>
            </tr>
            <tr>
              <th scope="row">付款狀態</th>
              <td>
                <button
                  class="btn btn-danger"
                  v-if="orderdetail.is_paid === false"
                  @click="payorder"
                >確認付款去</button>
                <button class="btn btn-success" v-if="orderdetail.is_paid === true">完成付款</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" style="float: right;" @click="backtoshop">繼續購物</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: ""
    };
  },
  methods: {
    getorder() {
      this.$store.dispatch("getOrder", this.orderId);
    },
    payorder() {
      this.$store.dispatch("payOrder", this.orderId);
    },
    backtoshop() {
      this.$router.push("/");
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getorder();
  },
  computed: {
    orderdetail: {
      get() {
        return this.$store.state.orderdetail;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  justify-content: center;
  .cart-block {
    .cart-list {
      justify-content: space-around;
      .card-item-name {
        h3 {
          font-size: 24px;
        }
        p {
          font-size: 20px;
        }
      }
      .card-item-price {
        font-size: 20px;
        color: #3f5d45;
      }
    }
    .card-total {
      display: flex;
      justify-content: flex-end;
      padding-right: 40px;
      margin: 20px 0;
      font-size: 30px;
      color: #3f5d45;
    }
  }
}
</style>