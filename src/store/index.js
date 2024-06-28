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
    getLengthOfPaymentList: (state) => state.paymentsList.length,
    getAvailableCategories: (state) => state.availableCategory
  },
  actions: {
    async fetchData({ commit }) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { date: "01.06.2024", category: "🏠 Rent/Mortgage", price: 133000, index: 1 },
            { date: "02.06.2024", category: "💡 Utilities", price: 69000, index: 2 },
            { date: "03.06.2024", category: "🛒 Groceries", price: 120000, index: 3 },
            { date: "04.06.2024", category: "🚗 Transportation", price: 3000, index: 4 },
            { date: "05.06.2024", category: "🛡️ Insurance", price: 9000, index: 5 },
            { date: "06.06.2024", category: "🏥 Healthcare", price: 12000, index: 6 },
            { date: "07.06.2024", category: "🎬 Entertainment", price: 100, index: 7 },
            { date: "08.06.2024", category: "🍽️ Dining Out", price: 1500, index: 8 },
            { date: "09.06.2024", category: "👗 Clothing", price: 40000, index: 9 },
            { date: "20.06.2024", category: "📚 Education", price: 54000, index: 10 }
          ]);
        }, 1000);
      });
      
      commit("setPaymentsListData", res);
    },
  },
});
