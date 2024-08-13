<template>
  <div v-if="getPaymentsList.length !== 0">
    <table :class="[$style.tableWrapper]">
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
          <td :class="[$style.tableCell]">
            <div :class="$style.verticalEllipsis" @click="(event) => switchContextMenu(event, item)"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <ListPagination v-if="getPaymentsList.length > itemsOnPage" :itemsPerPage="itemsOnPage" :currentPage="currentPageNumber" @changePage="rerenderList"></ListPagination>
  </div>
  <div v-else>Let's add your first spending 😎</div>
</template>

<script>
import ListPagination from './ListPagination'
import { mapGetters, mapMutations } from "vuex";

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
    ...mapMutations(['setMouseCoordinates']),
    rerenderList(page) {
      this.$router.push({ name: 'dashboard', params: { page } });
    },
    switchContextMenu(event, item) {
      const { clientX, clientY } = event;
      this.setMouseCoordinates({ clientX, clientY });
      this.$contextMenu.close();
      this.$contextMenu.open('contextMenu', item);
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

  .verticalEllipsis {
    display: inline-block;
    transform: rotate(90deg);
    font-size: 24px;
    line-height: 1;
    position: relative;
    cursor: pointer;
  }

  .verticalEllipsis::before {
    content: '...';
  }
</style>
