<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !paginationinfo.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click="pagechild(paginationinfo.current_page - 1)">
            <img src="../../public/if_icon-arrow-left-b_211617.svg" alt="">
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in paginationinfo.total_pages"
          :key="page"
          :class="{'active': paginationinfo.current_page === page}"
        >
          <a class="page-link" href="#" @click="pagechild(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !paginationinfo.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="pagechild(paginationinfo.current_page + 1)">
            <img src="../../public/if_icon-arrow-right-b_211620.svg" alt="">
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
.page-link {
  color:#3f5d45;
}
  
</style>

<script>
export default {
  methods: {
    pagechild(page) {
      this.$emit('updatepage', page);
    }
  },
  computed: {
    paginationinfo() {
      return this.$store.state.pagination;
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  justify-content: flex-end;
}
</style>