<template>
  <div>
    <Banner/>
    <Sidebar/>
    <ShoppingCartIcon/>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import Sidebar from '../components/Sidebar.vue';
import ShoppingCartIcon from '../components/shoppingcarticon.vue';

export default {
  components: {
    Banner,
    Sidebar,
    ShoppingCartIcon
  },
}
</script>

