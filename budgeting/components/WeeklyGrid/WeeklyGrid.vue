<template>
  <view>
    <weekly-grid>
      <template v-for="(item, index) in balanceData" :slot="'balance-' + index">
        <text>收支: {{item.balance}}</text>
      </template>
    </weekly-grid>
  </view>
</template>


<script>
	export default {
	  data() {
	    return {
	      gridItems: [],
	    };
	  },
	  mounted() {
		  
	    this.generateWeeklyGrid();
	  },
	  methods: {
	    formatDate(date) {
	      const year = date.getFullYear();
	      const month = String(date.getMonth() + 1).padStart(2, '0');
	      const day = String(date.getDate()).padStart(2, '0');
	      return `${year}-${month}-${day}`;
	    },
	    generateWeeklyGrid() {
	      const currentDate = new Date();
	      const chinaTime = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000);
	      for (let d = new Date(chinaTime); d <= currentDate; d.setDate(d.getDate() + 1)) {
	        const dateString = this.formatDate(d);
	        this.gridItems.push({ date: dateString });
	      }
	    },
	  },
	};

</script>

<style scoped>
.weekly-grid {
  width: 100%;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.grid-item {
  width: calc(100% / 3 - 10px);
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.grid-item-header {
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background-color: #f0f0f0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.grid-item-content {
  padding: 10px;
  text-align: center;
}
</style>
