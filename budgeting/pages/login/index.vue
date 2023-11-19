<template>
	<view class="page-login">
		<view class="title"> 快捷登录 </view>
		<view class="form">
			<view class="input">
				<cl-input
					v-model="form.username"
					placeholder="请输入账号"
					:maxlength="11"
					type="number"
				>
				</cl-input>
			</view>
			<view class="input">
				<cl-input v-model="form.password" placeholder="请输入密码" type="password">
				</cl-input>
			</view>
			<view class="login-btn">
				<button class="btn" @tap="onLogin">登录</button>
			</view>
		</view>
		
		<view class="pact">
			<cl-text value="暂无账号？" :size="24" color="#333333"></cl-text>
			<cl-text value="点击注册" :size="24" color="#3549AF" @click="toRegister"></cl-text>
		</view>
	</view>
</template>

<script>
import { login } from '../../api/user.js'
export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
			},
			mode: [
				// { icon: require("@/static/icon/wx.png") },
				// { icon: require("@/static/icon/qq.png") },
				// { icon: require("@/static/icon/wb.png") },
			],
		};
	},
	methods: {
		onLogin() {
			let data = {
				...this.form
			}
			login(data).then((r) => {
				if(r.data!= null){
					uni.setStorageSync('token', r.data);
					uni.showToast({
						icon:'success',
						title: '登录成功'
					});
					// 延迟跳转
					setTimeout(function(){
					  uni.switchTab({
						url: "/pages/home/index",
					  });
					},2000);
				}else{
					console.log('登录失败',r.data);
					uni.showToast({
						icon:'error',
						title: r.data.msg
						
					});
				}
					
			    })
			    .catch((err) => {
					uni.showModal({
						icon:'error',
						title: '账号或密码错误',
						showCancel:false
						
					});
					console.log("登录失败",err.data.error)
			});
			
		},
		toRegister() {
			uni.navigateTo({
				url:"/pages/register/register"
			})
		},
		phoneLogin() {
			let data = {
				username:phone.value,
				password:password.value
			}
			login(data).then((r) => {
					user.setToken(r.data.token)
					console.log(r.data.token)
			      uni.setStorageSync('token', r.data.token);

				})
			    .catch((err) => {
			      console.log('登录失败:', err);
			});
		}
		
	},
};
</script>

<style lang="scss">
.page-login {
	padding: 166rpx 75rpx 0 75rpx;
	.title {
		margin-bottom: 80rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
	}
	.form {
		.input {
			margin-bottom: 40rpx;
			.cl-input {
				border-top: 0;
				border-right: 0;
				border-left: 0;
				border-bottom: 1rpx solid #f0f0f0;
				border-radius: 0;
			}
			.uni-input-placeholder {
				color: #b1b1b1;
			}
		}
		.login-btn {
			display: flex;
			justify-content: center;
			width: 100%;
			margin-top: 100rpx;
			margin-bottom: 180rpx;
			.btn {
				width: 600rpx;
				height: 80rpx;
				background: #3549af;
				border-radius: 40rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}
	.mode {
		text-align: center;
		.list {
			display: flex;
			margin-top: 62rpx;
			margin-bottom: 126rpx;
			.item {
				text-align: center;
				flex: 1;
				image {
					width: 80rpx;
					height: 78rpx;
				}
			}
		}
	}
	.pact {
		text-align: center;
	}
}
</style>
