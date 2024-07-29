<template>
  <div>
    <button :class="[$style.ctaMain]" @click="showPaymentForm()">ADD NEW COST +</button>
    <PaymentsList />
  </div>
</template>

<script>
  import PaymentsList from "../components/PaymentsList.vue";
  import { mapActions, mapGetters, mapMutations } from "vuex";

  export default {
    components: {
      PaymentsList
    },
    methods: {
      ...mapActions(["fetchData"]),
      ...mapMutations(['setUrlQuery']),
      showPaymentForm() {
        this.$modal.open('paymentForm');
      }
    },
    computed: {
      ...mapGetters(['getAvailableCategories'])
    },
    mounted() {
      this.fetchData();

      if (!this.$route.redirectedFrom?.includes('/dashboard/add')) return;

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
</script>

<style module lang="scss">
  .ctaMain {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85rem;
    padding: 5px 15px;
    background-color: coral;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    cursor: pointer;
  }
</style>