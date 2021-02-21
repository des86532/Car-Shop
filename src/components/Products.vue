<template>
  <div>
    <div class="row">
      <div class="col-md-6 mb-4" v-for="item in filterData" :key="item.id" v-if="item.is_enabled">
        <div class="card">
          <i
            class="far fa-heart heart"
            @click.prevent="addtolike(item)"
            v-if="favoriteproducts.findIndex(ele => ele.id === item.id) < 0"
          ></i>
          <i class="fas fa-heart heart" @click.prevent="dellike(item)" v-else></i>
          <a
            class="pointer"
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
            @click="getProductDetail(item.id)"
          ></a>
          <div class="card-body">
            <span class="badge badge-tag float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title text-left">
              <a class="pointer" @click="getProductDetail(item.id)">{{ item.title }}</a>
            </h5>
            <p class="card-content card-text">{{ item.description }}</p>
            <div class="card_price">
              <h5 class="card-origin_price">NT$ {{ item.origin_price }}</h5>
              <span class="card-price">NT$ {{ item.price }}</span>
            </div>
          </div>
          <a href="#" @click.prevent="addtocart(item.id)" class="card-footer">加到購物車</a>
        </div>
      </div>
    </div>
    <Pagination @updatepage="getProducts"/>
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  font-size: 24px;
  color: #3f5d45;
  font-weight: 900;
}
.card-content {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 114px;
}
.card_price {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  .card-origin_price {
    text-decoration: line-through;
  }
  .card-price {
    color: #3f5d45;
    font-size: 20px;
    font-weight: 900;
    margin-top: 10px;
  }
}

.card-footer {
  background-color: #eaf0ed;
  color: #3f5d45;
  font-weight: 900;
  &:hover {
    background-color: #ffe18038;
    color: #dda900ed;
  }
}
.badge-tag {
  color: white;
}
</style>

<script>
import Pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      favoriteproducts: []
    };
  },
  methods: {
    getProducts(page) {
      this.$store.dispatch("getProducts", page);
      this.filterproducts = this.$store.state.products;
    },
    getProductDetail(id) {
      // this.$store.dispatch("getProduct", id);
      this.$router.push(`/productdetail/${id}`);
    },
    addtocart(id, qty = 1) {
      this.$store.dispatch("addtoCart", { product_id: id, qty: qty });
    },
    addtolike(item) {
      this.$store.dispatch("addtolike", item);
    },
    dellike(item) {
      this.$store.dispatch("dellike", item);
    },
    getfavoriteproducts() {
      this.favoriteproducts = this.$store.state.favoritelist;
    }
  },
  created() {
    this.getProducts();
    this.getfavoriteproducts();
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    searchText() {
      return this.$store.state.searchText;
    },
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter(product => {
          return product.category.toLowerCase() === vm.searchText.toLowerCase();
        });
      } else {
        return this.$store.state.products;
      }
    }
  },
  components: {
    Pagination
  }
};
</script>