<template>
    <view class="discuss">
        <!-- 标题,更多 -->
        <view class="discuss__top">
            <view class="discuss__top-title">新闻资讯</view>
        </view>
        <!-- 内容 -->
        <view
            class="discuss__content"
            v-for="(item,index) in content"
            :key="index"
			@tap="linkTo(item.id)"
        >
            <view class="discuss__content-icon">#</view>
            <view class="discuss__content-main">
                <view class="discuss__title">{{item.title}}</view>
                <!-- <view class="discuss__time">
                    <view class="discuss__begin">{{item.begin}}</view>
                    <view class="discuss__begin">{{item.duration}}</view>
                </view> -->
                <view class="discuss__reservation">{{item.createTime}}</view>
            </view>
            <view class="discuss__content-button" @tap="linkTo(item.id)">查看</view>
        </view>
    </view>
</template>

<script>
import { getNews,getNewDetail } from "@/api/news";
export default {
	data() {
		return {
			content: [
				{
					title: "在复杂世界和人性中，如何基于第一性原理的思考， 指导人生的创新实践？",
					reservation: "256人已预约",
					begin: "2020年1月30日",

				},
				{
					title: "你在工作中经历过哪些转危为安的案例？有哪些经验 可以分享？",
					begin: "2020年1月30日",

				},
			],
		};
	},
	created(){
		getNews().then(res=>{
			console.log(res)
			this.content = res.data.rows
		})
	},
	methods:{
		linkTo(url){
			url = JSON.stringify(url)
			uni.navigateTo({
				url :'/pages/home/detail?id='+ url
			})
		}
	}
};
</script>


<style lang="scss" scoped>
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