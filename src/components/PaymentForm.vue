<template>
  <div>
    <input placeholder="Date" type="text" v-model="date" />
    <input placeholder="Category" type="text" v-model="category" />
    <input placeholder="Price" type="number" v-model.number="price" />
    <button @click="savePayment()">Save payment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      category: "",
      price: 0,
    };
  },
  props: {},
  methods: {
    savePayment() {
      const { date, category, price } = this;
      this.$emit("addPayment", { date, category, price });
    },
  },
};
</script>

<style></style>
