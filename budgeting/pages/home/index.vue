<template>
	<view class="page-order">
		<!-- 选项 -->
		<view class="cl-sticky">
			<view class="tabs">
				<u-tabs-swiper ref="tabs1" :list="tabs" :is-scroll="false" :current="current" @change="tabChange"></u-tabs-swiper>
			</view>
			<u-grid :col="4" :border="false" v-if="current==0" >
				<u-grid-item v-for="(item, index) in gridItems" :key="index" >
					<u-icon :name="item.icon" :size="46" @tap="showInputDialog(item.text)"></u-icon>
					<view class="grid-text">{{ item.text }}</view>
				</u-grid-item>
			</u-grid>
			<u-grid :col="4" :border="false" v-else >
				<u-grid-item v-for="(item, index) in gridItems2" :key="index" >
					<u-icon :name="item.icon" :size="46" @tap="showInputDialog(item.text)"></u-icon>
					<view class="grid-text">{{ item.text }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view>
			
		</view>
		<!-- 输入金额模态框 -->
		<view>
			<cl-dialog title="记账" :visible.sync="visible" :close-on-click-modal="false">
				<cl-input 
				v-model="form.amount" 
				type="number"
				>
					<text slot="prepend">金额</text>
				</cl-input>

				<view style="margin: 30rpx 0;"></view>
				<!-- 后缀图标 -->
				<cl-input v-model="form.remark">
					<text slot="prepend">备注</text>
				</cl-input>
				
				<view style="margin: 30rpx 0;"></view>
				<uni-datetime-picker v-model="form.remarkTime" type="date" rangeSeparator="至" />
				
				<view style="margin: 30rpx 0;"></view>
				<view  style="display: flex;justify-content: center;align-items: center;">
					<cl-button type="success" fill @click="confirmInput">确定</cl-button>
					<cl-button type="error" fill @click="cancelInput">取消</cl-button>

				</view>
			</cl-dialog>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			tabs: [
				{
					label: "支出",
					name: "支出",
				},
				{
					label: "收入",
					name: "收入",
				},
				
			],
			gridItems: [
				{ icon: "photo", text: "三餐" },
				{ icon: "lock", text: "零食" },
				{ icon: "hourglass", text: "衣物" },
				{ icon: "photo", text: "交通" },
				{ icon: "lock", text: "旅行" },
				{ icon: "hourglass", text: "孩子" },
				{ icon: "photo", text: "宠物" },
				{ icon: "lock", text: "话费网费" },
				{ icon: "hourglass", text: "烟酒" },
				{ icon: "hourglass", text: "学习" },
				{ icon: "hourglass", text: "日用品" },
				{ icon: "hourglass", text: "住房" },
				{ icon: "hourglass", text: "美妆" },
				{ icon: "hourglass", text: "医疗" },
				{ icon: "hourglass", text: "发红包" },
				{ icon: "hourglass", text: "汽车/加油" },
				{ icon: "hourglass", text: "娱乐" },
				{ icon: "hourglass", text: "请客送礼" },
				{ icon: "hourglass", text: "电器数码" },
				{ icon: "hourglass", text: "运动" },
				{ icon: "hourglass", text: "其它" },
			],
			gridItems2: [
				{ icon: "photo", text: "工资" },
				{ icon: "lock", text: "生活费" },
				{ icon: "hourglass", text: "收红包" },
				{ icon: "photo", text: "外快" },
				{ icon: "lock", text: "股票基金" },
				{ icon: "hourglass", text: "其他" },
			],
			current: 0,
			form:{
				
			},
			amount: "",
			};
			},
			methods: {
			tabChange(id) {
			this.current = id;
			},
			showInputDialog(item) {
				console.log(item)
				this.form.category = item
				this.visible = true;
			},
			confirmInput(item) {
			if (!this.form.amount) {
				uni.showToast({
				title: "请输入金额",
				icon: "none",
				});
				return;
			}
			if (!this.form.category) {
				uni.showToast({
				title: "系统错误",
				icon: "none",
				});
				return;
			}
			if (!this.form.remarkTime) {
				uni.showToast({
				title: "请选择时间",
				icon: "none",
				});
				return;
			}
			this.visible = false;
			
			let userinfo = uni.getStorageSync("token")
			if(!userinfo.id){
				uni.navigateTo({
					url: '/pages/login/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			this.form.user_id = userinfo.id
			this.form.remark_time = this.form.remarkTime
			this.form.ortype = this.current
					// 发送请求到后端
					uni.request({
						url: "http://localhost:3000/accounting",
						method: "POST",
						data: {
							...this.form
							// 其他需要发送的数据
						},
						success: (res) => {
							this.form = {}
							if (res.statusCode === 200) {
								uni.showToast({
									title: "记录成功",
									icon: "success",
								});
							} else {
								uni.showToast({
									title: "记录失败，请重试",
									icon: "none",
								});
							}
						},
						fail: () => {
							uni.showToast({
								title: "网络错误，请重试",
								icon: "none",
							});
						},
					});
				},
				cancelInput() {
					this.visible = false;
					this.form = {}
				},
			},
};
</script>

<style lang="scss">
.page-order {
	// ...
	padding-top: 150rpx;
	.input-wrapper {
		margin: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		input {
			margin: 20rpx;
			width: 80%;
			border: 1rpx solid #ccc;
			border-radius: 5rpx;
			padding: 10rpx;
		}
	}
}
</style>