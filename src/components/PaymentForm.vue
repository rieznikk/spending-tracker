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
        date: "",
        category: '',
        price: 0,
        spendingRules: [
          value => !!value || 'Please enter amout of spending.',
          value => (!isNaN(parseFloat(value)) && isFinite(value)) || 'Please enter only digits'
        ]
      };
    },
    computed: {
      ...mapGetters(['getPaymentsList', 'getAvailableCategories', 'getLengthOfPaymentList', 'getUrlQuery']),
    },
    methods: {
      ...mapMutations(['setPaymentsListData', 'setPaymentFormVisibility', 'setUrlQuery']),
      savePayment() {
        const { date, category, price } = this;
        const currentPaymentList = this.getPaymentsList;
        
        const newPaymentData = {
          date: date,
          category: category,
          price: price,
          index: this.getLengthOfPaymentList + 1
        };

        currentPaymentList.push(newPaymentData);
        this.setPaymentsListData(currentPaymentList);
        this.hideForm();
        this.clearData();
        this.category = this.getAvailableCategories[0];
        this.price = 0;
      },
      hideForm() {
        this.$modal.close();
      },
      clearData() {
        this.setUrlQuery({
          category: null,
          price: 0
        });
      },
      getDate() {
        const date = new Date();
        const padZero = (num) => num.toString().padStart(2, '0');

        const day = padZero(date.getDate());
        const month = padZero(date.getMonth() + 1);
        const year = date.getFullYear().toString().slice(-2);

        return `${day}.${month}.${year}`;
      }
    },
    mounted() {
      this.date = this.getDate();
      this.category = this.getUrlQuery.category !== null ? this.getUrlQuery.category : this.getAvailableCategories[0];
      this.price = this.getUrlQuery.price || 0;
    }
  };
</script>