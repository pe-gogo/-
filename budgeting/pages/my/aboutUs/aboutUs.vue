<template>
	<view style="padding: 0;" class="discuss">
		
		
		<view class="discuss__top">
		    <view class="discuss__top-title">月度收支</view>
		</view>
		<view class="charts-box">
		  <qiun-data-charts 
		    type="column"
		    :opts="opts"
		    :chartData="chartData"
		  />
		</view>
	</view>
  
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,15,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
	    getYears() {
	        const currentYear = new Date().getFullYear();
	        for (let i = currentYear; i >= currentYear - 10; i--) {
	          this.years.push(i);
	        }
	      },
	  
	      // 年份选择事件处理
	      onYearChange(e) {
	        this.selectedYear = this.years[e.detail.value];
	        this.getServerData(this.selectedYear);
	      },
    async getServerData() {
		const user = uni.getStorageSync('token')
        // 获取用户 ID，此处以 1 为例，请根据实际情况获取用户 ID
        const user_id = user.id;
		
    
        try {
          // 向后端发起请求，获取收支数据
          const response = await uni.request({
          	url:`http://localhost:3000/accounting/user/${user_id}/income-expense`
          });
		  console.log(response)
          const responseData = response[1].data;
    
          // 准备组件需要的数据格式
          const categories = responseData.map(item => `${item.year}-${item.month}`);
          const incomeData = responseData.map(item => item.income);
          const expenseData = responseData.map(item => item.expense);
    
          // 设置组件数据
          this.chartData = {
            categories,
            series: [
              {
                name: "支出",
                data: expenseData,
              },
              {
                name: "收入",
                data: incomeData,
              },
            ],
          };
        } catch (error) {
          console.error("获取收支数据失败", error);
        }
      },
  }
};
</script>

<style scoped lang="scss">
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
  
  .discuss {
  	margin-bottom: 71rpx;
  	&__top {
  		display: flex;
  		justify-content: space-between;
  		align-items: center;
  		padding: 0 30rpx;
  
  		&-title {
  			font-size: 32rpx;
  			font-weight: bold;
  			color: #21201e;
  		}
  		&-more {
  			display: flex;
  			align-items: center;
  
  			text {
  				margin-right: 5rpx;
  				font-size: 20rpx;
  				font-weight: 400;
  				color: #929699;
  			}
  		}
  	}
  	&__content {
  		position: relative;
  		display: flex;
  		width: 690rpx;
  		margin: 0 auto;
  		margin-top: 51rpx;
  		margin-bottom: 71rpx;
  		border-bottom: solid 1rpx #ebebeb;
  
  		&-icon {
  			display: flex;
  			justify-content: center;
  			align-items: center;
  			width: 35rpx;
  			height: 35rpx;
  			background-color: rgba(18, 167, 255, 0.2);
  			border-radius: 50%;
  			font-size: 28rpx;
  			color: #12a7ff;
  			position: absolute;
  			top: 6rpx;
  			left: 0;
  		}
  
  		&-main {
  			padding-left: 50rpx;
  			flex: 1;
  			    padding-right: 150rpx; /* 留出按钮位置 */
  
  		}
  
  		&-button {
  			position: absolute;
  			right: 30rpx;
  			bottom: 30rpx;
  			display: flex;
  			justify-content: center;
  			align-items: center;
  			width: 100rpx;
  			height: 46rpx;
  			background: #12a7ff;
  			border-radius: 23rpx;
  			font-size: 24rpx;
  			font-weight: 400;
  			color: #fffcfc;
  			white-space: nowrap; /* 不换行 */
  
  		}
  	}
  	&__title {
  		font-size: 28rpx;
  		font-weight: bold;
  		color: #21201e;
  		line-height: 48rpx;
  	}
  
  	&__time {
  		display: flex;
  	}
  	&__begin {
  		margin-top: 33rpx;
  		margin-right: 45rpx;
  		font-size: 20rpx;
  		font-weight: 500;
  		color: #21201e;
  	}
  	&__reservation {
  		margin-top: 34rpx;
  		margin-bottom: 43rpx;
  		font-size: 20rpx;
  		font-weight: 500;
  		color: #929699;
  	}
  }
  
</style>