/* eslint-disable no-unused-vars */
export default {
  install(Vue) {
    if (this.installed) return;

    this.installed = true;

    Vue.prototype.$paymentFormEdit = {
      EventBus: new Vue,
      open(name, spendingData) {
        this.close();

        setTimeout(() => {
          this.EventBus.$emit('open', { name, spendingData });
        }, 0);
      },
      close() {
        this.EventBus.$emit('close');
      }
    }
  }
}