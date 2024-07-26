<template>
  <div id="app">
    <header :class="[$style.header]">
      <div>My personal costs</div>
      <div>
        <router-link to="/dashboard/1">Dashboard</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/404">404</router-link>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // this.$router.push({ name: 'notFound' });
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
</style>
