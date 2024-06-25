<template>
  <div id="app">
    <header :class="[$style.header]">My personal costs</header>
    <main>
      <button :class="[$style.ctaMain]" @click="paymentFormHandle()">ADD NEW COST +</button>

      <PaymentForm v-show="paymentFormVisibility" @hidePaymentForm="paymentFormHandle"/>
      <PaymentsList />
    </main>
  </div>
</template>

<script>
import PaymentForm from "./components/PaymentForm.vue";
import PaymentsList from "./components/PaymentsList.vue";

import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    PaymentsList,
    PaymentForm,
  },
  data() {
    return {
      paymentFormVisibility: false,
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
  },
};
</script>

<style lang="scss" module>
.header {
  width: 50%;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 5px;
}

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
