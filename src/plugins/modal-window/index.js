export default {
  install(Vue) {
    if (this.installed) return;

    this.installed = true;

    Vue.prototype.$modal = {
      EventBus: new Vue,
      open(name) {
        this.EventBus.$emit('open', { name });
      },
      close() {
        this.EventBus.$emit('close');
      }
    }
  }
}