<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <router-link to="/" class="navbar-brand">
        <h1 href="#">Car Shopping</h1>
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/products" class="nav-item nav-link text-center">
            <img src="../../public/baseline-home-24px.svg" width="56px" height="56px">
            <span>首頁</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/news" class="nav-item nav-link text-center">
            <img src="../../public/baseline-fiber_new-24px.svg" width="56px" height="56px">
            <span>最新消息</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shoppingcart" class="nav-item nav-link text-center">
            <img src="../../public/baseline-shopping_cart-24px.svg" width="56px" height="56px">
            <span>購物車</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/productlist" class="nav-item nav-link text-center">
            <img src="../../public/baseline-list_alt-24px.svg" width="56px" height="56px">
            <span>管理商品</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-item nav-link text-center" @click="logout">
            <img src="../../public/baseline-person-24px.svg" width="56px" height="56px">
            <span>登出</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.navbar-expand-lg {
  justify-content: space-around;
  .navbar-brand {
    font-size: 36px;
    padding-left: 10px;
    color:#3f5d45;
    text-align: center;
  }
  .navbar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    .nav-item {
      display: flex;
      flex-direction: column;
      color: #3f5d45;
      margin: 0 5px;
    }
  }
}
</style>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_PATHAPI}/logout`;
      this.$http.post(api).then(response => {
        console.log(response.data.message);
        this.$router.push("/login");
      });
    }
  }
};
</script>