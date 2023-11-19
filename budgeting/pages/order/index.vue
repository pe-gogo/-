<template>
	<view class="page-order">
		<!-- 学习时长 -->
		<view class="order__statistics">
			<view class="order__statistics-item" v-for="(item, index) in statistics" :key="index">
				<view class="order__statistics-title">{{ item.title }}(h)</view>
				<view class="order__statistics-duration">{{ item.duration }}</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order__list">
			<view class="order__list-item" v-for="(item, index) in orderList" :key="index">
				<view class="order__list-img"><img :src="item.img" /></view>
				<view class="order__listx-title"
					><cl-text
						:value="item.title"
						:size="30"
						color="#21201E"
						:ellipsis="2"
						bold
					></cl-text
				></view>
			</view>
			<view class="order__buy" @tap="open">
				<cl-icon name="plus" :size="54" color="#D2D2D2"></cl-icon>
			</view>
		</view>
		<!-- 弹出层 -->
		<cl-popup
			ref="pupop"
			:visible.sync="visible"
			direction="bottom"
			:size="900"
			border-radius="40rpx 40rpx 0 0"
		>
			<view class="order__popup">
				<view
					class="order__popup-commodity"
					v-for="(group, groupIndex) in commodity"
					:key="groupIndex"
				>
					<cl-text
						:value="group.label"
						:size="30"
						color="#000"
						bold
						:margin="[50, 0, 0, 0]"
					></cl-text>
					<view class="order__popup-list">
						<cl-row :gutter="21">
							<cl-col span="8" v-for="(item, index) in group.children" :key="index">
								<view
									class="order__popup-item"
									:class="{ 'is-active': item.active }"
									@tap="activeClick(item)"
								>
									<view class="order__popup-name">
										<cl-text
											:ellipsis="1"
											:value="item.name"
											:size="26"
											color="#21201E"
											bold
										>
										</cl-text>
									</view>
									<view class="order__popup-title">
										<cl-text
											:ellipsis="1"
											:value="item.title"
											:size="20"
											color="#21201E"
											:margin="[13, 0, 0, 0]"
										></cl-text>
									</view>
								</view>
							</cl-col>
						</cl-row>
					</view>
				</view>
			</view>
		</cl-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statistics: [
				{
					title: "总学习",
					duration: "65",
				},
				{
					title: "本周学习",
					duration: "10",
				},
			],
			orderList: [
				
			],
			visible: false,
			commodity: [
				{
					label: "线上学院",
					children: [
						{
							name: "创新学院",
							title: "顶级只会至简应用",
						},
						{
							name: "研习社",
							title: "实战案例深度拆解",
						},
						{
							name: "在线训练营",
							title: "群体实战练习场",
						},
					],
				},
				{
					label: "线下学院",
					children: [
						{
							name: "创新训练营",
							title: "最快最燃急速创新",
						},
						{
							name: "创新商学院",
							title: "只讲创新长久陪伴",
						},
						{
							name: "创新院·2020",
							title: "打破认知边界训练",
						},
					],
				},
				{
					label: "系列课",
					children: [
						{
							name: "学习坊",
							title: "大师系列",
						},
						{
							name: "穿透课",
							title: "大咖专栏",
						},
					],
				},
			],
		};
	},
	methods: {
		open() {
			this.visible = true;
		},
		activeClick(item) {
			this.$set(item, "active", !item.active);
		},
	},
};
</script>

<style lang="scss" scoped>
.order {
	&__statistics {
		display: flex;
		padding: 67rpx 33rpx 0 33rpx;

		&-item {
			margin-right: 137rpx;
		}
		&-title {
			font-size: 24rpx;
			font-weight: 500;
			color: #21201e;
		}
	}

	&__list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 29rpx;
		padding-left: 30rpx;

		&-item {
			width: 216rpx;
			margin-top: 52rpx;
			margin-right: 21rpx;
		}
		&-img {
			width: 216rpx;
			height: 260rpx;
			margin-bottom: 10rpx;
			border-radius: 10rpx;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	&__buy {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 216rpx;
		height: 260rpx;
		margin-top: 52rpx;
		border-radius: 10rpx;
		border: solid 1rpx #d2d2d2;
	}

	&__popup {
		&-item {
			margin-top: 30rpx;
			padding: 20rpx;
			background-color: #e9e9e9;
			border-radius: 10rpx;

			&.is-active {
				background-color: #12a7ff;

				.cl-text {
					color: #fff !important;
				}
			}
		}

		&-title {
			white-space: nowrap;
		}
	}
}
</style>
