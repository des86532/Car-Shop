<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>是否付款</th>
          <th>總金額</th>
          <th>建立時間</th>
          <th>訂單信息</th>
          <th>購買人信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in adminorders" :key="item.id">
          <td>{{item.num}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>{{item.total}}</td>
          <td>
            <span>{{date1(item.create_at)}}</span>
            <br>
            <span>{{date2(item.create_at)}}</span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary"
              @click="openModal('#OrderDetailModal', 'order', 'ReadOnly', item)"
            >詳細</button>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary"
              @click="openModal('#OrderUserDetailModal', 'order', 'ReadOnly', item)"
            >詳細</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @updatepage="getAdminOrders"/>
    <Modal/>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';
import Modal from '../components/Modal.vue';

export default {
  methods: {
    getAdminOrders(page) {
      this.$store.dispatch("getAdminOrders", page);
    },
    openModal(modal, species, status, item) {
      this.$store.dispatch("openModal", {modal, species, status, item});
    },
    date1(timestamp) {
      const date = new Date(timestamp * 1000);
      const Month = date.getMonth() + 1;
      const Day = date.getDate();
      const Y = date.getFullYear() + "-";
      const M = Month < 10 ? "0" + Month + "-" : Month + "-";
      const D = Day < 10 ? "0" + Day : Day;
      return Y + M + D;
    },
    date2(timestamp) {
      const date = new Date(timestamp * 1000);
      const Hours = date.getHours();
      const Minutes = date.getMinutes();
      const Seconds = date.getSeconds();
      const H = Hours < 10 ? "0" + Hours : Hours;
      const M = Minutes < 10 ? "0" + Minutes : Minutes;
      const S = Seconds < 10 ? "0" + Seconds : Seconds;
      return `${H}-${M}-${S}`;
    }
  },
  created() {
    this.getAdminOrders();
  },
  computed: {
    adminorders() {
      return this.$store.state.adminorders;
    }
  },
  components: {
      Pagination,
      Modal
  }
};
</script>