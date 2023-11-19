<template>
	<view class="student-live">
		<!-- 标题,更多 -->
		<view class="student-live__top">
			<view class="student-live__top-title">预约服务</view>
		</view>
		<!-- 横向滚动,item -->
		<scroll-view :scroll-x="true" :show-scrollbar="false">
			<view class="student-live__box">
				<view class="student-live__item" v-for="(item, index) in list" :key="index">
					<view class="student-live__item-box">
						<view class="student-live__item-tips"
						></view>
						<view class="student-live__item-img"
						@tap="linkTo('/pages/signUp/signUp?name='+item.title+'&id='+item.id)"
						><img :src="item.img" alt="" /></view>
						<view class="student-live__item-title">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					id:1,
					img: 'http://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/2023/05/04/87188d9da0a8453eaa3dc519059b6268.png',
					title: "上门开药",
					time: "08:00",
				},
				{
					id:2,

					img: 'http://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/2023/05/04/3e22c81ae778442ea6370d1a15518383.png',
					title: "上门药物分类",
					time: "08:00",
				},
				{
					id:3,
					img: 'http://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/2023/05/04/e83b9ca243e644ba80bf52f77e97e991.png',
					title: "上门送药/回收过期药品",
					time: "08:00",
				},
				{
					id:4,
					img: 'http://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/2023/05/04/883c19b5b35f459ba44b935203724d46.png',
					title: "上门陪护/护工",
					time: "08:00",
				},
				{
					id:5,
					img: 'http://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/2023/05/04/afa40f40b53b47a887a16d3c320dcfd7.png',
					title: "上门检测血压",
					time: "08:00",
				},
			],
		};
	},
	methods: {
		linkTo(url) {
			uni.navigateTo({
				url,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.student-live {
	margin-bottom: 69rpx;
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
	scroll-view {
		margin-top: 30rpx;
		white-space: nowrap;
		::-webkit-scrollbar {
			display: none;
			width: 0;
			height: 0;
			color: transparent;
			background: transparent;
		}
	}
	&__box {
		flex-wrap: nowrap;
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
	}

	&__item {
		display: inline-block;
		position: relative;
		margin-right: 20rpx;
		&-img {
			width: 430rpx;
			height: 240rpx;
			border-radius: 10rpx;
			overflow: hidden;
			img {
				width: 430rpx;
				height: 240rpx;
			}
		}
		&-title {
			margin-top: 27rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #21201e;
		}
		&-tips {
			position: absolute;
			top: 0;
			padding: 0 10rpx;
			background: rgba(0,0,0,.4);
			border-radius: 10rpx 0 10rpx 0;
		}
	}
}
</style>
