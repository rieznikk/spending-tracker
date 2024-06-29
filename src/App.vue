<template>
  <div id="app">
    <header :class="[$style.header]">
      <div>My personal costs</div>
      <div>
        <span><a href="#dashboard">Dashboard</a></span>
        <span><a href="#about">About</a></span>
        <span><a href="#404">404</a></span>
      </div>
    </header>
    <main>
      <PageDashboard v-if="page === 'dashboard'"></PageDashboard>
      <PageAbout v-else-if="page === 'about'"></PageAbout>
      <Page404 v-else></Page404>
    </main>
  </div>
</template>

<script>
import PageDashboard from './page/PageDashboard';
import PageAbout from './page/PageAbout';
import Page404 from './page/PageNotFound';

export default {
  name: "App",
  components: {
    PageDashboard,
    PageAbout,
    Page404
  },
  data() {
    return {
      page: 'dashboard'
    };
  },
  methods: {
    setPage() {
      this.page = location.hash.slice(1); 
    }
  },
  mounted() {
    this.setPage();

    window.addEventListener('hashchange', () => {
      this.setPage();
    });
  },
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
</style>
