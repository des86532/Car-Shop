<template>
  <div>
    <div class="row">
      <div class="col-md-6 mb-4" v-for="item in favoriteproducts" :key="item.id">
        <div class="card">
          <i class="fas fa-heart heart" @click.prevent="dellike(item)"></i>
          <a
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
            @click="getProductDetail(item.id)"
          ></a>
          <div class="card-body">
            <span class="badge badge-tag float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title text-left">
              <a @click="getProductDetail(item.id)">{{ item.title }}</a>
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
  </div>
</template>

<style lang="scss">
.card-footer {
  background-color: #eaf0ed;
  color: #3f5d45;
  font-weight: 900;
  &:hover {
    background-color: #ffe18038;
    color: #dda900ed;
  }
}
</style>

<script>
export default {
  methods: {
    getProductDetail(id) {
      this.$router.push(`/productdetail/${id}`);
    },
    addtocart(id, qty = 1) {
      this.$store.dispatch("addtoCart", { product_id: id, qty: qty });
    },
    dellike(item) {
      this.$store.dispatch("dellike", item);
    }
  },
  computed: {
    favoriteproducts() {
      return this.$store.state.favoritelist;
    }
  }
};
</script>

