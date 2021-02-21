<template>
  <div>
    <div class="text-right">
      <button type="button" class="btn btn-primary" @click="openModal('#couponModal', 'coupon', 'New', {})">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>標題</th>
          <th>優惠碼</th>
          <th>折扣</th>
          <th>到期日</th>
          <th>是否可使用</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in coupons" :key="item.id">
          <td>{{index + 1}}</td>
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">可以</span>
            <span v-else>不可以</span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary"
              @click="openModal('#couponModal', 'coupon', 'Edit', item)"
            >編輯</button>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary" @click="openModal('#delcouponmodal', 'coupon', 'Del', item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @updatepage="getcoupons"/>
    <Modal/>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';
import Modal from "../components/Modal.vue";

export default {
  methods: {
      getcoupons(page) {
          this.$store.dispatch("getCoupons", page);
      },
      openModal(modal, species, status, item) {
      this.$store.dispatch("openModal", {modal, species, status, item}); 
    },
  },
  created() {
      this.getcoupons();
  },
  computed: {
      coupons() {
          return this.$store.state.coupons;
      }
  },
  components: {
      Pagination,
      Modal
  }
};
</script>