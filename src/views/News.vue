<template>
  <div>
    <div class="container">
      <h1>最新消息</h1>
      <hr>
      <img class="news-pic" src="../../public/jesse-collins-629527-unsplash.jpg" alt>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur numquam quaerat temporibus? In fugiat et, molestias illo ea dolores quisquam culpa asperiores rem, tempora odio temporibus molestiae labore corporis minima?</p>
      <img class="news-pic" src="../../public/dxl-1220129-unsplash.jpg" alt>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur numquam quaerat temporibus? In fugiat et, molestias illo ea dolores quisquam culpa asperiores rem, tempora odio temporibus molestiae labore corporis minima?</p>
    </div>
    <ShoppingCartIcon/>
  </div>
</template>

<script>
import ShoppingCartIcon from "../components/shoppingcarticon.vue";

export default {
  components: {
    ShoppingCartIcon
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 36px;
  font-weight: 900;
  color:#3f5d45;
}

.news-pic {
  height: 500px;
  width: 100%;
  object-fit: contain;
}

p {
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>