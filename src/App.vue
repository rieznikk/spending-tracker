<template>
  <div id="app">
    <header :class="[$style.header]">My personal costs</header>
    <main>
      <button @click="paymentFormHandle()">ADD NEW COST +</button>

      <PaymentForm
        v-show="paymentFormVisibility"
        @addPayment="onPaymentAdded"
        @hidePaymentForm="paymentFormHandle"
      />

      <PaymentsList :items="paymentsList" />
    </main>
  </div>
</template>

<script>
import PaymentForm from "./components/PaymentForm.vue";
import PaymentsList from "./components/PaymentsList.vue";
export default {
  name: "App",
  components: {
    PaymentsList,
    PaymentForm,
  },
  data() {
    return {
      paymentFormVisibility: false,
      paymentsList: [
        {
          date: "17.02.2024",
          category: "Education",
          price: 5000,
        },
        {
          date: "17.02.2023",
          category: "Education",
          price: 5000,
        },
        {
          date: "17.02.2022",
          category: "Education",
          price: 5000,
        },
      ],
    };
  },
  methods: {
    paymentFormHandle() {
      this.paymentFormVisibility = !this.paymentFormVisibility;
    },
    onPaymentAdded(payment) {
      this.paymentsList.push(payment);
    },
  },
};
</script>

<style lang="scss" module>
.header {
  color: red;
}
</style>
