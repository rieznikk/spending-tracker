<template>
  <div :class="[$style.paginationWrapper]">
    <div v-for="i in amount" :key="i" :class="[$style.paginationItem, {[$style.current]: currentPage === i}]" @click="changePage(i)">{{ i }}</div>
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
    },
    mounted() {}
  }
</script>

<style lang="scss" module>
  .paginationWrapper {
    display: flex;
    gap: 5px;

    .paginationItem {
      cursor: pointer;
    }

    .current {
      background-color: black;
      color: white;
    }
  }
</style>