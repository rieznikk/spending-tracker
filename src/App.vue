<template>
  <div id="app">
    <header :class="[$style.header]">My personal costs</header>
    <main>
      <PaymentForm @addPayment="onPaymentAdded" />
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
