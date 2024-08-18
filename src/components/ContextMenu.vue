<template>
  <v-card
    class="context-menu__wrapper"
    :style="{
      top: `${getCorrectedY}px`,
      left: shouldSwitchToRight ? 'auto' : `${getMouseCoordinates.x + 10}px`,
      right: shouldSwitchToRight ? '10px' : 'auto'
    }"
  >
    <v-list @click="editSpending" class="pt-0 pl-0 pb-0 pr-0">
      <v-list-item>📝 Edit spending</v-list-item>
    </v-list>

    <v-list @click="removeSpending" class="pt-0 pl-0 pb-0 pr-0">
      <v-list-item>❌ Remove spending</v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getMouseCoordinates']),
      shouldSwitchToRight() {
        const menuWidth = 200;
        return this.getMouseCoordinates.x + menuWidth + 20 > window.innerWidth;
      },
      getCorrectedY() {
        return this.getMouseCoordinates.y + window.scrollY;
      }
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
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick);
      window.removeEventListener('resize', this.handleResize);
    }
  };
</script>