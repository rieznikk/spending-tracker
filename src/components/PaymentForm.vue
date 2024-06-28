<template>
  <div :class="[$style.overlay]">
    <div :class="[$style.modal]">
      <span :class="[$style.close]" @click="hideForm()">&times;</span>

      <div :class="[$style.dateField]">
        <span :class="[$style.dateHeading]">Date</span>
        <input :class="[$style.input]" placeholder="Date" type="text" v-model="date"/>
      </div>

      <div :class="[$style.categoryField]">
        <span :class="[$style.categoryHeading]">Category</span>

        <select v-model="category" :class="[$style.input]">
          <option v-for="(option, index) in getAvailableCategories" :value="option" :key="index">{{ option }}</option>
        </select>
      </div>

      <div :class="[$style.priceField]">
        <span :class="[$style.priceHeading]">Your spending</span>
        <input :class="[$style.input]" placeholder="Price" type="number" v-model.number="price"/>
      </div>

      <button :class="[$style.buttonSave]" @click="savePayment()">Save payment</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      date: "",
      category: "",
      price: 0
    };
  },
  props: {},
  computed: {
    ...mapGetters(['getPaymentsList', 'getAvailableCategories']),
  },
  methods: {
    ...mapMutations(['setPaymentsListData']),
    savePayment() {
      const { date, category, price } = this;
      const currentPaymentList = this.getPaymentsList;
      const index = currentPaymentList[currentPaymentList.length - 1].index + 1;
      
      const newPaymentData = {
        date: date,
        category: category,
        price: price,
        index: index
      };

      currentPaymentList.push(newPaymentData);
      this.setPaymentsListData(currentPaymentList);
      this.$emit("hidePaymentForm");
      this.date = "";
      this.category = this.getAvailableCategories[0];
      this.price = 0;
    },
    hideForm() {
      this.$emit("hidePaymentForm");
    },
  },
  mounted() {
    this.category = this.getAvailableCategories[0];
  },
};
</script>

<style lang="scss" module>
.overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  row-gap: 10px;
}

.close {
  position: absolute;
  top: 1.5px;
  right: 7px;
  cursor: pointer;
}

.dateField,
.categoryField,
.priceField {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 15px;
}

.input {
  width: 200px;
  max-width: 200px;
  min-width: 200px;
  box-sizing: border-box;
  padding-block: 1px;
}

.buttonSave {
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
