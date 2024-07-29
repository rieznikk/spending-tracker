<template>
  <div id="app">
    <header :class="[$style.header]">
      <nav :class="$style.navigationBar">
        <router-link to="/">🏠 Home Page</router-link>
        <router-link to="/dashboard/1">📋 Dashboard</router-link>
        <router-link to="/about">💸 About</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <transition name="fade">
      <ModalWindow v-if="isModalVisible" :modalToShow="modalToShow" />
    </transition>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {
      ModalWindow: () => import('./components/modal-window/ModalWindow.vue')
    },
    data() {
      return {
        isModalVisible: false,
        modalToShow: ''
      }
    },
    methods: {
      open({ name }) {
        this.modalToShow = name;
        this.isModalVisible = true;
      },
      close() {
        this.isModalVisible = false;
        this.modalToShow = '';
      }
    },
    beforeMount() {
      this.$modal.EventBus.$on('open', this.open);
      this.$modal.EventBus.$on('close', this.close);
    },
    beforeDestroy() {
      this.$modal.EventBus.$off('open', this.open);
      this.$modal.EventBus.$off('close', this.close);
    }
  };
</script>

<style lang="scss" module>
  .header {
    width: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .navigationBar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 12px;

    a {
      text-decoration: none;
    }

    a:visited {
      color: black;
    }
  }

  :global(.fade-enter-active), :global(.fade-leave-active) {
    transition: opacity 0.5s;
  }

  :global(.fade-enter), :global(.fade-leave-to) {
    opacity: 0
  }

  :global(.fade-enter-to), :global(.fade-leave) {
    opacity: 100;
  }
</style>
