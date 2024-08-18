<template>
  <div v-if="getPaymentsList.length !== 0">
    <v-container fluid class="pl-0">
      <v-data-table
        :headers="headers"
        :items="currentPage"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >

        <template v-slot:[`item.index`]="{ item }">
          <v-chip>{{ item.index }}</v-chip>
        </template>

        <template v-slot:[`item.date`]="{ item }">
          {{ item.date }}
        </template>

        <template v-slot:[`item.category`]="{ item }">
          {{ item.category }}
        </template>

        <template v-slot:[`item.price`]="{ item }">
          {{ item.price }}
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon small @click="(event) => switchContextMenu(event, item)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>

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
      currentPageNumber: 1,
      headers: [
        { text: '#', value: 'index', width: '2%' },
        { text: 'Date', value: 'date', width: '10%' },
        { text: 'Category', value: 'category', width: '40%' },
        { text: 'Spending', value: 'price', width: '45%' },
        { text: '', value: 'action', width: '2%' },
      ],
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
    width: 100%;
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
