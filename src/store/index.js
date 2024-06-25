import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    availableCategory: [
      '🏠 Rent/Mortgage', '💡 Utilities', '🛒 Groceries', '🚗 Transportation',
      '🛡️ Insurance', '🏥 Healthcare', '🎬 Entertainment', '🍽️ Dining Out',
      '👗 Clothing', '📚 Education', '💰 Savings', '📈 Investments',
      '✈️ Travel', '💅 Personal Care', '🧹 Household Supplies', '📦 Subscriptions',
      '🎁 Gifts/Donations', '👶 Childcare', '🐾 Pet Care', '💳 Debt Repayment'
    ]
  },
  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentsList = payload;
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getPaymentsListTotalPrice: (state) => {
      return state.paymentsList.reduce((res, cur) => res + cur.price, 0);
    },
    getAvailableCategories: (state) => state.availableCategory
  },
  actions: {
    async fetchData({ commit }) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { date: "20.06.2024", category: "Apple", price: 133000 },
            { date: "19.06.2024", category: "Apple", price: 69000 },
            { date: "18.06.2024", category: "Apple", price: 120000 },
          ]);
        }, 1000);
      });
      
      commit("setPaymentsListData", res);
    },
  },
});
