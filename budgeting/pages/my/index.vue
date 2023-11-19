<template>
	<view class="page-my">
		<!-- 用户数据 -->
		<view class="user">
			<view class="my-message">
				<view class="point"></view>
			</view>
			<view class="info" @tap="setMy">
				<!-- <image src="https://eye-photoadmin.oss-cn-shenzhen.aliyuncs.com/rhude-twin-palms-t-shirt-black-ss23-t-shirts-black-product-shot-1_300x300.jpg" class="avatar" />
				<view class="name">
					<cl-text :value="userInfo.name " color="#ffffff" :size="36" :ellipsis="1"></cl-text>
					<cl-text :value="userInfo.roleId==0?'用户':'药理师'" color="#ffffff" :size="24" :ellipsis="1"></cl-text>
				</view> -->
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="features">
			<view class="title">
				<cl-text value="我的账单" color="#000000" :size="34" blod></cl-text>
				<view class="more" @tap="orderAll">
					<cl-text value="我的账单" color="#999999" :size="24" blod></cl-text>
					<cl-icon name="arrow-right" color="#999999" :size="30"></cl-icon>
				</view>
			</view>
			<!-- 创建一个userInfo.roleId ==0 的块 -->
			<view class="entrance">
				<view
					class="item"
					v-for="(item, index) in entrance"
					:key="index"
					@tap="entranceClick(item)"
				>
					<image :src="item.icon" mode="aspectFit" />
					<text class="item-name">{{ item.name }}</text>
					<cl-icon name="arrow-right" color="#B7B7B7"></cl-icon>
				</view>
				<view
					class="item"
					v-if="userInfo.roleId !=0"
					:key="index"
					@tap="linkTo('/pages/learn/index')"
				>
					<text class="item-name">日账单</text>
					<cl-icon name="arrow-right" color="#B7B7B7"></cl-icon>
				</view>
				<view
					class="item"
					v-if="userInfo.roleId !=0"
					:key="index"
					@tap="linkTo('/pages/my/myOrder')"
				>
					<text class="item-name">总账单</text>
					<cl-icon name="arrow-right" color="#B7B7B7"></cl-icon>
				</view>
				<view
					class="item"
					:key="index"
					@tap="logout()"
				>
					<text class="item-name">退出登录</text>
					<cl-icon name="arrow-right" color="#B7B7B7"></cl-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import { useTestStore } from '../../store/index'
import { getUserInfo } from '../../api/user';
export default {
	data() {
		return {
			userInfo:{},
			count: [
				{
					name: "账户余额",
					number: 36,
				},
				{
					name: "面包钱包",
					number: 6,
				},
				{
					name: "优惠券",
					number: 3,
				},
				{
					name: "礼品卡",
					number: 1,
				},
			],
			serve: [
			],
			entrance: [
				{ 
					icon: require("@/static/icon/my-item1.png"), 
					name: "月季报表",
					url:'/pages/my/aboutUs/aboutUs' },
				{
					icon: require("@/static/icon/my-item2.png"),
					name: "分类报表",
					url: "/pages/home/detail",
				},
				
			],
		};
	},
	onLoad(){
		if(!uni.getStorageSync('token')){
			uni.navigateTo({
				url: '/pages/login/index'
			})
			return;
		}
		
	},
	onShow(){
		if(!uni.getStorageSync('token')){
			uni.navigateTo({
				url: '/pages/login/index'
			})
			return;
		}
		
		this.userInfo = uni.getStorageSync("token")
	},

	methods: {
		linkTo(url) {
			uni.navigateTo({
				url,
			});
		},
		setMy() {
			uni.navigateTo({
				url: "/pages/info/index",
			});
		},
		orderAll() {
			uni.navigateTo({
				url: "/pages/my/orders",
			});
		},
		entranceClick(item) {
			uni.navigateTo({
				url: item.url,
			});
		},
		logout(){
			uni.removeStorageSync('token')
			uni.removeStorageSync('userInfo')
			uni.navigateTo({
				url: '/pages/login/index'
			})
		}
	},
};
</script>

<style lang="scss">
.page-my {
	.user {
		width: 750rpx;
		height: 356rpx;
		background: linear-gradient(180deg, #3549af, #616eaf);
		//#ifdef MP-WEIXIN
		padding-top: 60rpx;
		//#endif
		.my-message {
			position: relative;
			//#ifdef MP-WEIXIN
			top: 80rpx;
			right: 50rpx;
			//#endif
			.message {
				position: absolute;
				top: 38rpx;
				right: 36rpx;
				width: 24rpx;
				height: 30rpx;
			}
			.point {
				position: absolute;
				top: 38rpx;
				right: 30rpx;
				width: 8rpx;
				height: 8rpx;
				background-color: #b69988;
				border-radius: 50%;
			}
		}

		.info {
			display: flex;
			align-items: center;
			padding: 100rpx 30rpx 80rpx 30rpx;
			.avatar {
				width: 100rpx;
				height: 100rpx;
				margin-right: 24rpx;
				border-radius: 100%;
				overflow: hidden;
			}

			.name {
				flex: 1;
				.cl-text:first-child {
					margin-bottom: 20rpx;
				}
			}
		}
		.count {
			display: flex;
			justify-content: space-between;
			padding: 0 75rpx;
			.item {
				text-align: center;
			}
		}
	}
	.features {
		position: relative;
		width: 100%;
		height: calc(100vh - 550rpx);
		margin-top: -80rpx;
		padding: 45rpx 30rpx 0 30rpx;
		background-color: #ffffff;
		border-radius: 40rpx 40rpx 0 0;
		box-sizing: border-box;
		z-index: 999;
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 46rpx;
			.more {
				margin-left: auto;
			}
		}
		.serve {
			display: flex;
			justify-content: space-between;
			margin-bottom: 60rpx;
			&-item {
				text-align: center;
				flex: 1;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-bottom: 14rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}
		.entrance {
			.item {
				display: flex;
				align-items: center;
				position: relative;
				height: 108rpx;
				border-bottom: solid 1rpx #f8f8f8;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}
				&-name {
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					flex: 1;
				}
			}
		}
	}
}
</style>
