export default {
  install(Vue) {
    if (this.installed) return;

    this.installed = true;

    Vue.prototype.$paymentFormEdit = {
      EventBus: new Vue,
      open(name, spendingData) {
        this.EventBus.$emit('open', { name, spendingData });
      },
      close() {
        this.EventBus.$emit('close');
      }
    }
  }
}