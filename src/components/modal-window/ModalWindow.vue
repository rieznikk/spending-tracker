<template>
  <div>
    <PaymentForm v-if="modalToShow === 'paymentForm'" />
  </div>
</template>

<script>
  import PaymentForm from '../PaymentForm.vue';

  export default {
    components: {
      PaymentForm
    },
    props: {
      modalToShow: String
    }
  }
</script>