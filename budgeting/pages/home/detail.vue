<template>
  <view class="discuss">
	  
	  <view class="discuss__top">
	      <view class="discuss__top-title">分类支出</view>
	  </view>
    <canvas canvas-id="xKpneTFbiSTwyXMFgxjfZPMcXPDYoHoE" id="xKpneTFbiSTwyXMFgxjfZPMcXPDYoHoE" class="charts" @touchend="tap"/>
	
	<view class="discuss__top">
	    <view class="discuss__top-title">分类收入</view>
	</view>
	<canvas canvas-id="xKpneTFbiSTwyXMFgxjfZPMcXPDYoHo4" id="xKpneTFbiSTwyXMFgxjfZPMcXPDYoHo4" class="charts" @touchend="tap"/>	
  </view>
  
</template>

<script>
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
var uChartsInstance = {};
export default {
  data() {
    return {
      cWidth: 750,
      cHeight: 500
    };
  },
  onReady() {
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
			const user = uni.getStorageSync('token')
			uni.request({
				url: 'http://localhost:3000/accounting/user/'+user.id+'/category-summary',
				method: 'GET',
				data: {},
				success:(res)=> {
					let d = {
						series:[
							{data:[]},
							{data:[]}
						]
					}
					
					let d2 = {
						series:[
							{data:[]},
							{data:[]}
						]
					}
					
					d.series[0].data = res.data.incomeSummary
					d2.series[0].data = res.data.expenseSummary
					this.drawCharts('xKpneTFbiSTwyXMFgxjfZPMcXPDYoHoE', d);
					this.drawCharts('xKpneTFbiSTwyXMFgxjfZPMcXPDYoHo4', d2);
				},
				
			});
      }, 500);
    },
    drawCharts(id,data){
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "pie",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        series: data.series,
        animation: true,
        background: "#FFFFFF",
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      });
    },
    tap(e){
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
</script>

<style scoped lang="scss">
  .charts{
    width: 750rpx;
    height: 500rpx;
  }
  
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