<template>
	<view class="course-preview">
		<!-- 标题,更多 -->
		<view class="course-preview__top">
			<view class="course-preview__top-title">社区资讯</view>
			<view class="course-preview__top-more">
				<text>更多</text>
				<cl-icon name="arrow-right"></cl-icon>
			</view>
		</view>
		<!-- 内容 -->
		<view class="course-preview__banner" @tap="viewDetail">
			<u-swiper :list="list"></u-swiper>

		</view>
	</view>
</template>

<script>
import { getSwiper } from '@/api/swiper';

export default {
	data() {
		return {
			list: [],

		};
	},
	methods: {
    async getSwipers() {
		const res = await getSwiper();
		// 将获取到的数据转换为适合 u-swiper 的格式
		this.list = res.data.map(item => ({
			image: item.urlapp
		}));
		}
	},
	async created() {
		await this.getSwipers();
		console.log(this.list)
	},
};
</script>

<style lang="scss" scoped>
.course-preview {
	margin-top: 51rpx;
	margin-bottom: 9rpx;
	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		padding: 0 29rpx;
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
	&__banner {
		width: 690rpx;
		height: 280rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
