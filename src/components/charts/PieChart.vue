<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    chart-id="spending-chart"
  />
</template>

<script>
  import { mapGetters } from 'vuex';
  import { Pie } from 'vue-chartjs/legacy';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export default {
    name: 'PieChart',
    components: { Pie },
    computed: {
      ...mapGetters(['getCategoriesFromPaymentsList']),
      chartData() {
        return {
          labels: this.getCategoriesFromPaymentsList.labels,
          datasets: [
            {
              backgroundColor: this.generateColors(this.getCategoriesFromPaymentsList.labels.length),
              data: this.getCategoriesFromPaymentsList.data
            }
          ]
        };
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false
        };
      }
    },
    methods: {
      generateColors(numberOfColors) {
        const predefinedColors = [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#FF6384'
        ];

        const colors = [];
        for (let i = 0; i < numberOfColors; i++) {
          colors.push(predefinedColors[i % predefinedColors.length]);
        }
        return colors;
      }
    }
  }
</script>