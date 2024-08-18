<template>
  <div class="pagination-wrapper">
    <div v-for="i in amount" :key="i" :class="['pagination-item', 'pl-1', 'pr-1', {['current']: currentPage === i}]" @click="changePage(i)">{{ i }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {}
    },
    props: {
      itemsPerPage: Number,
      currentPage: Number
    },
    computed: {
      ...mapGetters(['getLengthOfPaymentList']),
      amount() {
        return Math.ceil(this.getLengthOfPaymentList / this.itemsPerPage);
      }
    },
    methods: {
      changePage(page) {
        this.$emit('changePage', page);
      }
    }
  }
</script>