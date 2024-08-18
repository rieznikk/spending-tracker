<template>
  <v-card class="context-menu__wrapper" :style="{ top: `${getMouseCoordinates.y}px`, left: `${getMouseCoordinates.x + 10}px` }">
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