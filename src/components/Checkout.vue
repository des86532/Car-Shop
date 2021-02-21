<template>
  <div>
    <form class="check-1" @submit.prevent="createOrder">
      <div class="wrap">
        <div class="receive-info">
          <div class="receive-info-title">
            <h2>訂單資訊</h2>
          </div>
          <div class="info">
            <div class="info-first">
              <label for="username">
                <p>姓氏</p>
              </label>
              <input
                type="text"
                class="form-control info-input-col2"
                :class="{'is-invalid': errors.has('name_first')}"
                name="name_first"
                id="username"
                v-model="orderdetailform.user.name.name_first"
                v-validate="'required'"
                placeholder="輸入姓氏"
              >
              <span class="text-danger" v-if="errors.has('name_first')">姓氏必須輸入</span>
            </div>
            <div class="info-last">
              <label for="username">
                <p>名字</p>
              </label>
              <input
                type="text"
                class="form-control info-input-col2"
                :class="{'is-invalid': errors.has('name_last')}"
                name="name_last"
                id="username"
                v-model="orderdetailform.user.name.name_last"
                v-validate="'required'"
                placeholder="輸入名字"
              >
              <span class="text-danger" v-if="errors.has('name_last')">名字必須輸入</span>
            </div>
          </div>
          <div class="info">
            <div class="info-all">
              <label for="usertel">
                <p>電話</p>
              </label>
              <input
                type="tel"
                class="form-control info-input-col1"
                :class="{'is-invalid': errors.has('tel')}"
                name="tel"
                id="usertel"
                v-model="orderdetailform.user.tel"
                v-validate="'required'"
                placeholder="請輸入電話"
              >
              <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
            </div>
          </div>
          <div class="info">
            <div class="info-all">
              <label for="useremail">
                <p>Email</p>
              </label>
              <input
                type="email"
                class="form-control info-input-col1"
                :class="{'is-invalid': errors.has('email')}"
                name="email"
                id="useremail"
                v-model="orderdetailform.user.email"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
              >
              <span class="text-danger">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="info">
            <div class="info-all">
              <label for="useraddress">
                <p>地址</p>
              </label>
              <input
                type="address"
                class="form-control info-input-col1"
                :class="{'is-invalid': errors.has('address')}"
                name="address"
                id="useraddress"
                v-model="orderdetailform.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
              >
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
          </div>
          <div class="info info-all-bottom">
            <div class="info-all">
              <label for="useraddress">
                <p>留言(選填)</p>
              </label>
              <textarea
                name
                id
                class="form-control"
                cols="30"
                rows="10"
                v-model="orderdetailform.message"
                style="background-color: #EAF0ED;"
              ></textarea>
            </div>
          </div>
          <button class="enter">送出訂單</button>
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
          <div class="cart-detail">
            <h3 class="cart-detail-title">購物清單</h3>
            <div class="cart-list-config">
              <div class="cart-list" v-for="item in cartlist.carts" :key="item.id">
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
                <div class="cart-item-price">
                  <p class="mb-2">NT$</p>
                  <p class="mb-2">{{item.final_total}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    createOrder() {
      this.$validator.validate().then((result) => {
        this.$store.dispatch("updateLoading", true);
        if (result) {
          this.$store.dispatch("createOrder", this.orderdetailform);
          if(this.$store.state.temporderid) {
            this.$router.push(`/payorder/${this.$store.state.temporderid}`)
          }
        } else {
          console.log("欄位信息不完整");
          this.$store.dispatch("updateLoading", false);
          this.$router.push('/checkout');
        }
      });
    },
    getCarts() {
      this.$store.dispatch("getCarts");
    },
  },
  created() {
    this.getCarts();
  },
  computed: {
    orderdetailform: {
      get() {
        return this.$store.state.orderdetailform;
      }
    },
    orderId: {
      get() {
        return this.$store.state.temporderid;
      }
    },
    cartlist() {
      return this.$store.state.cartlist;
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-item-price {
  color:#8DA291;
}
.enter {
  cursor: pointer;
}
</style>