<template>
  <div>
    <div class="container">
      <div class="row">
        <AdminSidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "../components/AdminSidebar.vue";

export default {
  components: {
    AdminSidebar
  },
};
</script>
