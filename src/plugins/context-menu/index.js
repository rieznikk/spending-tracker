import store from '@/store';

export default {
  install(Vue) {
    if (this.installed) return;

    this.installed = true;

    Vue.prototype.$contextMenu = {
      EventBus: new Vue,
      openedItem: null,
      open(name, item) {
        this.EventBus.$emit('open', { name });
        this.openedItem = item; 
      },
      close() {
        this.EventBus.$emit('close');
        this.openedItem = null;
      },
      editSpending() {
        if (!this.openedItem) return;

        Vue.prototype.$paymentFormEdit.open('paymentFormEdit', this.openedItem);
      },
      removeSpending() {
        if (!this.openedItem) return;

        const indexToRemove = this.openedItem.index - 1;
        store.commit('removePayment', indexToRemove);
        store.commit('rebuildPaymentList');
        this.close();
      }
    }
  }
}