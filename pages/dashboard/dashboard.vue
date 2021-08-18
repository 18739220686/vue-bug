<template>
  <div>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 1100px;height:600px;"></div>
  </div>

</template>

<script>
  import * as echarts from 'echarts';

  require('echarts/lib/component/grid')
  require('echarts/lib/chart/bar')
  import {list} from '../../api/user'

  import {TitleComponent} from 'echarts/components'

  export default {
    data() {
      return {
        list: {},
        datas: []
      }
    },
    created() {
    },
    mounted() {
      // 3.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 4.准备数据和配置项
      var option = {
        title: {
          text: '今日新增趋势'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["项目", "环境", "接口", "用例", "任务", "报告"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };

      // 展示数据
      myChart.setOption(option);
    },
    methods: {},

  }
</script>

<style scoped>

</style>
