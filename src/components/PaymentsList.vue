<template>
  <div>
    <table :class="[$style.tableWrapper]" v-show="getPaymentsList.length !== 0">
      <thead>
        <tr>
          <th :class="[$style.tableCell]">#</th>
          <th :class="[$style.tableCell]">Date</th>
          <th :class="[$style.tableCell]">Category</th>
          <th :class="[$style.tableCell]">Value</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in currentPage" :key="index" :class="[$style.tableRow]">
          <td :class="[$style.tableCell]">{{ item.index }}</td>
          <td :class="[$style.tableCell]">{{ item.date }}</td>
          <td :class="[$style.tableCell]">{{ item.category }}</td>
          <td :class="[$style.tableCell]">{{ item.price }}</td>
        </tr>
      </tbody>
    </table>

    <ListPagination :itemsPerPage="itemsOnPage" :currentPage="currentPageNumber" @changePage="rerenderList"></ListPagination>
  </div>
</template>

<script>
import ListPagination from './ListPagination'
import { mapGetters } from "vuex";

export default {
  components: { 
    ListPagination
  },
  data() {
    return {
      itemsOnPage: 10,
      currentPageNumber: 1
    }
  },
  watch: {
    '$route.params.page'(newPage) {
      this.currentPageNumber = +newPage;
    }
  },
  methods: {
    rerenderList(page) {
      this.$router.push({ name: 'dashboard', params: { page } });
    }
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    currentPage() {
      const { itemsOnPage, currentPageNumber } = this;
      return this.getPaymentsList.slice(itemsOnPage * (currentPageNumber - 1), itemsOnPage * (currentPageNumber - 1) + itemsOnPage);
    }
  },
  mounted() {
    this.currentPageNumber = +this.$route.params.page || 1;
  }
};
</script>

<style lang="scss" module>
.tableWrapper {
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tableRow {
  border-top: 1px solid lightgray;
}

.tableCell {
  text-align: left;
  padding: 10px 15px;
}
</style>
