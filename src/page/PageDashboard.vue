<template>
  <v-row>
    <v-col cols="12" lg="6" :order-lg="2" :order="1">
      <PieChart />
    </v-col>
    
    <v-col cols="12" lg="6" :order-lg="1" :order="2">
      <v-btn dark color="teal" @click="showPaymentForm()">
        ADD NEW COST
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <PaymentsList />
    </v-col>
  </v-row>
</template>

<script>
  import PaymentsList from '../components/PaymentsList.vue';
  import PieChart from '../components/charts/PieChart.vue';
  import { mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    components: {
      PaymentsList,
      PieChart
    },
    methods: {
      ...mapActions(["fetchData"]),
      ...mapMutations(['setUrlQuery']),
      showPaymentForm() {
        this.$modal.open('paymentForm');
      },
      showPaymentFormEdit(index) {
        this.$paymentFormEdit.open('paymentFormEdit', index);
      }
    },
    computed: {
      ...mapGetters(['getAvailableCategories'])
    },
    mounted() {
      this.fetchData();

      if (this.$route.redirectedFrom?.includes('/dashboard/add')) {
        const queryCategory = this.$route.query.paymentCategory;
        const querySpending = this.$route.query.spending;

        if (!queryCategory) return;

        const cleanedQueryCategory = queryCategory.replace(/"/g, '').trim();
        const cleanedQuerySpending = +querySpending?.replace(/"/g, '').trim();

        const categoryArray = this.getAvailableCategories;
        const categoryExists = categoryArray.find(category => {
          const cleanedCategory = category.trim();
          return cleanedCategory.toLowerCase().includes(cleanedQueryCategory.toLowerCase());
        });

        if (categoryExists) {
          this.setUrlQuery({
            category: categoryExists,
            price: cleanedQuerySpending ? cleanedQuerySpending : 0
          });

          this.showPaymentForm();
        }
      }
    }
  }
</script>