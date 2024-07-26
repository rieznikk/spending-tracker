<template>
  <div>
    <button :class="[$style.ctaMain]" @click="paymentFormHandle()">ADD NEW COST +</button>

    <PaymentForm v-show="paymentFormVisibility" @clearProps="clearData" @hidePaymentForm="paymentFormHandle" :categoryFromQuery="category" :spendingFromQuery="spending"/>
    <PaymentsList />
  </div>
</template>

<script>
  import PaymentForm from "../components/PaymentForm";
  import PaymentsList from "../components/PaymentsList";

  import { mapActions, mapGetters } from "vuex";

  export default {
    components: {
      PaymentForm,
      PaymentsList
    },
    data() {
      return {
        paymentFormVisibility: false,
        category: '',
        spending: 0
      };
    },
    methods: {
      ...mapActions(["fetchData"]),
      paymentFormHandle() {
        this.paymentFormVisibility = !this.paymentFormVisibility;
      },
      clearData() {
        this.category = '';
        this.spending = 0;
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
        this.category = categoryExists;
        this.spending = cleanedQuerySpending ? cleanedQuerySpending : 0;
        this.paymentFormHandle();
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