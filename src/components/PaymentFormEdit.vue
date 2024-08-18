<template>
  <div class="overlay">
    <div class="modal">
      <span class="close" @click="hideForm()">
        <v-icon color="black">mdi-close</v-icon>
      </span>

      <v-text-field class="mb-2" label="Date" v-model="date" hide-details="true" />

      <div class="mb-2">
        <div class="mb-2">Category</div>
        <v-select 
          v-model="category"
          :items="getAvailableCategories"
          hide-details="true"
          label="Category"
          dense
          solo
        />
      </div>

      <v-text-field label="Spending" v-model.number="price" :rules="spendingRules" />
      <v-btn dark color="teal" @click="savePayment()">Save spending</v-btn>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        date: '',
        category: '',
        price: 0,
        spendingRules: [
          value => !!value || 'Please enter amout of spending.',
          value => (!isNaN(parseFloat(value)) && isFinite(value)) || 'Please enter only digits'
        ],
      };
    },
    props: {
      item: Object
    },
    computed: {
      ...mapGetters(['getAvailableCategories', 'getPaymentsList']),
    },
    methods: {
      ...mapMutations(['setPaymentsListData']),
      savePayment() {
        const { item, date, category, price } = this;
        const actualIndex = item.index - 1;

        this.updateSpending(actualIndex, date, category, price);
        this.hideForm();
      },
      hideForm() {
        this.$paymentFormEdit.close();
      },
      updateSpending(index, date, category, price) {
        const allSpending = [...this.getPaymentsList];
        const indexInList = index + 1;

        allSpending[index] = { date, category, price, index: indexInList };
        this.setPaymentsListData(allSpending);
      }
    },
    mounted() {
      if (this.item) {
        this.date = this.item.date;
        this.category = this.item.category;
        this.price = this.item.price;
      }
    }
  };
</script>