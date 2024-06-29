<template>
  <div>
    <button :class="[$style.ctaMain]" @click="paymentFormHandle()">ADD NEW COST +</button>

    <PaymentForm v-show="paymentFormVisibility" @hidePaymentForm="paymentFormHandle"/>
    <PaymentsList />
  </div>
</template>

<script>
  import PaymentForm from "../components/PaymentForm";
  import PaymentsList from "../components/PaymentsList";

  import { mapActions } from "vuex";

  export default {
    components: {
      PaymentForm,
      PaymentsList
    },
    data() {
      return {
        paymentFormVisibility: false
      };
    },
    methods: {
      ...mapActions(["fetchData"]),
      paymentFormHandle() {
        this.paymentFormVisibility = !this.paymentFormVisibility;
      }
    },
    mounted() {
      this.fetchData();
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