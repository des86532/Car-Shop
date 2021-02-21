<template>
  <div>
    <div class="text-right">
      <button type="button" class="btn btn-primary" @click="openModal('#productModal', 'product', 'New', {})">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in adminproducts" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary" @click="openModal('#productModal', 'product', 'Edit', item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary" @click="openModal('#delProductModal', 'product', 'Del', item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @updatepage="getAdminProducts"/>
    <Modal/>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Modal from "../components/Modal.vue";

export default {
  methods: {
    getAdminProducts(page) {
      this.$store.dispatch("getAdminProducts", page);
    },
    openModal(modal, species, status, item) {
      this.$store.dispatch("openModal", {modal, species, status, item}); 
    },
  },
  created() {
    this.getAdminProducts();
  },
  computed: {
    adminproducts() {
      return this.$store.state.adminproducts;
    },
    error() {
      return this.$store.state.errormessage;
    }
  },
  watch: {
    error: function (value) {
      if (value) {
        this.$router.push('/login');
        this.$store.dispatch('updateerror', false);
      }
    }
  },
  components: {
    Pagination,
    Modal
  }
};
</script>