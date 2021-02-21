<template>
  <div class="container text-center">
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="card card-nav list-group sticky-top">
          <h2>商品類別</h2>
          <router-link to="/products" class="sidebar-link" @click.prevent.native="filtertext()" :class="{active: searchText === ''}">
            <h3>全部商品</h3>
          </router-link>
          <router-link to="/products/favorite" class="sidebar-link" @click.prevent.native="filtertext('like')" :class="{active: searchText === 'like'}">
            <h3>收藏商品</h3>
          </router-link>
          <h2>分類商品</h2>
          <a
            href="#"
            class="sidebar-link"
            :class="{active: searchText === item}"
            v-for="item in categories"
            :key="item"
            @click.prevent="filtertext(item)"
          >{{item}}</a>
        </div>
      </div>

      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filer-products {
  padding: 16px 0;
  text-align: center;
  background-color: #fff;
  color: #3f5d45;
  text-decoration: none;
  border-bottom: 1px solid #eaf0ed;
  &:hover {
    background-color: #eaf0ed;
  }
}
.active {
  background-color: #eaf0ed;
}
</style>

<script>
import Products from "./Products.vue";

export default {
  methods: {
    filtertext(text = '') {
      this.$store.dispatch('searchText', text)
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    searchText() {
      return this.$store.state.searchText;
    }
  },
  components: {
    Products
  }
};
</script>