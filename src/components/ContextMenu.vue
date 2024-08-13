<template>
  <div :class="[$style.wrapper]" :style="{ top: `${getMouseCoordinates.y}px`, left: `${getMouseCoordinates.x + 10}px` }">
    <div @click="editSpending">📝 Edit spending</div>
    <div @click="removeSpending">❌ Remove spending</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getMouseCoordinates'])
    },
    methods: {
      editSpending() {
        this.$contextMenu.editSpending();
      },
      removeSpending() {
        this.$contextMenu.removeSpending();
      },
      handleOutsideClick(event) {
        if (event.clientY !== this.getMouseCoordinates.y && !this.$el.contains(event.target)) {
          this.$contextMenu.close();
          document.removeEventListener('click', this.handleOutsideClick);
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };
</script>

<style lang="scss" module>
  .wrapper {
    background-color: #FFFFFF;
    border: 1px solid black;
    position: absolute;

    & div {
      padding: 3px 6px;

      &:first-child {
        border-bottom: 1px solid black;
      }

      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
</style>