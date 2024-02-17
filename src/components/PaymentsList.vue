<template>
  <div>
    <div v-for="(item, index) in items" :key="index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    doSomething() {
      console.log(this.items);
    },
  },
};
</script>

<style></style>
