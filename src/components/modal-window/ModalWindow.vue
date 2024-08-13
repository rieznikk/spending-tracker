<template>
  <div>
    <PaymentForm v-if="modalToShow === 'paymentForm'" />
    <ContextMenu v-if="modalToShow === 'contextMenu'" />
    <PaymentFormEdit v-if="modalToShow === 'paymentFormEdit'" :item="additionalInfo" />
  </div>
</template>

<script>
  import PaymentForm from '../PaymentForm.vue';
  import ContextMenu from '../ContextMenu.vue';
  import PaymentFormEdit from '../PaymentFormEdit.vue';

  export default {
    components: {
      PaymentForm,
      ContextMenu,
      PaymentFormEdit
    },
    props: {
      modalToShow: String,
      additionalInfo: Object
    }
  }
</script>