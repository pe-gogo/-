<template>
	<view class="page-reservation-1">
		<!-- 背景图 -->
		<image src="./static/images/bgc.png" class="bgc" />

		<!-- 选择日期 -->
		<view class="select-date">
			<!-- 顶部 -->

			<!-- 标题 -->
			<view class="title">
				<image src="./static/images/date.png" mode="" />
				<cl-text value="选择日期" color="#18223E" :size="40" bold></cl-text>
			</view>

			<!-- 列表 -->
			<scroll-view class="list" :scroll-x="true"
			  :scroll-left="scrollLeft"
			     @scroll="onScroll" 


			>
				<view
					class="item"
					:class="{ 'is-active': index == activeDate }"
					v-for="(item, index) in dates"
					:key="index"
					@tap="selectDate(index)"
				>
					<view class="item-box">
						<text class="day">{{ item.day }}</text>
						<text class="week">{{ item.label }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		  <view class="data-list">
		    <view class="record" v-for="record in records" :key="record.id">
		      <view class="record-info">
		        <text class="category">{{ record.category }}</text>
		        <text class="amount" :class="{ 'income': record.ortype === 1 }">{{ record.amount }}</text>
		      </view>
		      <view class="record-time">
		        <text class="remark-time">{{ record.remark_time }}</text>
		        <text class="remark">{{ record.remark }}</text>
		      </view>
		    </view>
		  </view>
		<!-- 选择时间 -->
		
		</view>

	</view>
</template>

<script>
import dayjs from "cl-uni/utils/dayjs";

export default {
	data() {
		return {
			records:[],
			activeDate: null,
			dates: [],
			activeNght: 0,
			activeTime: 0,
			activeService: 0,
			scrollLeft:0,
			      weeksLoaded: 1, // 记录已加载的周数

		};
	},
	onLoad() {
		this.getDate();
		    this.selectDate(this.activeDate); // 在页面加载时，默认选中今天

	},
	methods: {
		getDate() {
		    let curr = dayjs();
		    let list = [];
		
		    for (let i = -6; i <= 0; i++) {
		        let day = curr.add(i, "day").day();
		        const d = {
		            0: "周日",
		            1: "周一",
		            2: "周二",
		            3: "周三",
		            4: "周四",
		            5: "周五",
		            6: "周六",
		        };
		        list.push({
		            day: curr.add(i, "day").date(),
		            label: d[day],
		        });
		    }
		    list.map((e) => {
		        if (e.day < 10) {
		            e.day = "0" + e.day;
		        }
		    });
		    this.dates = list;
			this.activeDate = 6; // 设置与今天对应的索引值
    const itemWidth = 124 * uni.upx2px(1);
      const itemMargin = 30 * uni.upx2px(1);
      this.scrollLeft = (itemWidth + itemMargin) * (this.activeDate - 1);
		},



		selectDate(index) {
			const user = uni.getStorageSync('token')
			    if (index === null) return; // 如果索引值为 null，则不执行后续操作

			this.activeDate = index;

			const selectedDate = dayjs().add(index - 6, "day");
			const formattedDate = selectedDate.format("YYYY-MM-DD");


			uni.request({
				url:`http://localhost:3000/accounting/user/${user.id}/date/${formattedDate}`,
				success: (res) => {
					this.records = res.data; // 将响应的数据存储到 records 变量中

					console.log(res.data)
					// 渲染
				}
			})
			console.log("选中的日期：", formattedDate);
		},
		selectNight(index) {
			console.log(index)
			this.activeNght = index;
		},
		selectTime(index) {
			console.log(index)
			this.activeTime = index;
		},
		selectService(index) {
			console.log(index)
			this.activeService = index;
		},
		
	},
};
</script>

<style lang="scss">
page {
	width: 100%;
	height: 100%;
}
.page-reservation-1 {
	width: 100%;
	height: 100%;
	.bgc {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.title {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 12rpx;
		}
	}
	.select-date {
		margin-bottom: 24rpx;
		padding-top: 50rpx;
		padding-bottom: 40rpx;
	
		.topbar {
			margin-bottom: 57rpx;
		}
		.list {
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			margin-top: 31rpx;
			::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
				color: transparent;
				background: transparent;
			}
			.item {
				display: inline-block;
				width: 124rpx;
				height: 206rpx;
				background-color: #ffffff;
				// border: 1px solid #dff2f2;
				border-radius: 20rpx;
				margin-right: 30rpx;
				&.item:first-child {
					margin-left: 30rpx;
				}
				&.is-active {
					background: linear-gradient(180deg, #89ebd9 0%, #45c5ae 100%);
					box-shadow: 0 10rpx 16rpx rgba(71, 198, 175, 0.45);
					border: 0;
					text {
						color: #ffffff;
					}
				}
				&-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					text {
						display: block;
					}
					.day {
						margin-bottom: 20rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #16213c;
					}
					.week {
						font-size: 24rpx;
						color: #9ca5be;
					}
				}
			}
		}
	}
	.select-time {
		margin-bottom: 24rpx;
		padding-top: 50rpx;
		background: linear-gradient(
			180deg,
			#ffffff 0%,
			rgba(255, 255, 255, 0.4) 37%,
			rgba(255, 255, 255, 0.22) 87%,
			rgba(255, 255, 255, 0.36) 100%
		);
		.select {
			display: flex;
			align-items: center;
			margin-top: 46rpx;
			margin-bottom: 40rpx;
			padding: 0 30rpx;
			.item {
				font-size: 32rpx;
				font-weight: 400;
				color: #959595;
				text-align: center;
				flex: 1;
				&.item:first-child {
					border-right: 2rpx solid #c7c7c7;
				}
				&.is-active {
					color: #3cad99;
				}
			}
		}
		.list {
			padding: 0 30rpx;
			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 80rpx;
				margin-bottom: 30rpx;
				background: #ffffff;
				border: 1rpx solid #dff2f2;
				border-radius: 20rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: 400;
				color: #959595;
				&.is-active {
					background: linear-gradient(180deg, #88ead8 0%, #46c6af 100%);
					color: #ffffff;
				}
			}
		}
	}
	.service {
		padding-top: 51rpx;
		padding-bottom: 20rpx;
		background: linear-gradient(
			180deg,
			#ffffff 0%,
			rgba(255, 255, 255, 0.4) 37%,
			rgba(255, 255, 255, 0.22) 87%,
			rgba(255, 255, 255, 0.36) 100%
		);
		.list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 39rpx;
			padding-left: 30rpx;
			.item {
				display: flex;
				align-items: center;
				height: 80rpx;
				margin-right: 30rpx;
				margin-bottom: 30rpx;
				padding: 0 41rpx;
				background-color: #ffffff;
				border: 1rpx solid #dff2f2;
				border-radius: 20rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #959595;
				&.is-active {
					background: linear-gradient(180deg, #88ead8 0%, #46c6af 100%);
					color: #ffffff;
				}
			}
		}
	}
}.data-list {
  padding: 20rpx;
}
.record {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.record-info {
  display: flex;
  align-items: center;
  flex: 1; /* 让这个元素填充剩余空间 */
}
.category {
  font-size: 30rpx;
  color: #333;
  width: 30%; /* 设置宽度为30% */
  text-align: left;
}
.amount {
  font-size: 32rpx;
  font-weight: bold;
  color: #f44336;
  width: 30%; /* 设置宽度为30% */
  text-align: right;
  &.income {
    color: #4caf50;
  }
}
.record-time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 40%; /* 设置宽度为40% */
}
.remark-time {
  font-size: 24rpx;
  color: #999;
}
.remark {
  font-size: 28rpx;
  color: #666;
}


</style>
