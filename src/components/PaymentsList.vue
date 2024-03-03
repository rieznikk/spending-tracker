<template>
  <table :class="[$style.tableWrapper]" v-show="items.length !== 0">
    <thead>
      <tr>
        <th :class="[$style.tableCell]">#</th>
        <th :class="[$style.tableCell]">Date</th>
        <th :class="[$style.tableCell]">Category</th>
        <th :class="[$style.tableCell]">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="[$style.tableRow]"
        v-for="(item, index) in items"
        :key="index"
      >
        <td :class="[$style.tableCell]">{{ index + 1 }}</td>
        <td :class="[$style.tableCell]">{{ item.date }}</td>
        <td :class="[$style.tableCell]">{{ item.category }}</td>
        <td :class="[$style.tableCell]">{{ item.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" module>
.tableWrapper {
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tableRow {
  border-top: 1px solid lightgray;
}

.tableCell {
  text-align: left;
  padding: 10px 15px;
}
</style>
