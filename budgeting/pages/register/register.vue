<template>
	<view class="page-login">
		<view class="title"> 注册账号 </view>
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
				<cl-input type="password" v-model="form.password" placeholder="请输入密码" >
				</cl-input>
			</view>
			<view class="input">
				<cl-input type="password" v-model="form.cpassword" placeholder="确认密码" >
				</cl-input>
			</view>
			<view class="input">
				<cl-input type="text"  v-model="form.name" placeholder="姓名" >
				</cl-input>
			</view>
			<view class="input">
				<cl-input type="number" v-model="form.phone" placeholder="手机号" >
			</cl-input>
			</view>
			
			<view class="login-btn">
				<button class="btn"  @tap="registerT">注册</button>
			</view>
		</view>
	
		
	</view>
</template>

<script>
// import {register} from '../../api/user.js'
export default {
	data() {
		return {
			action: 'http://47.112.136.153/prod-api/system/oss/upload',
			imageList: [],
			fileList: [],
			form: {
				username: "",
				password: "",
				cpassword:"",
				roleId:0,
			},
			v1:'',
			urls:[],
			mode: [
				// { icon: require("@/static/icon/wx.png") },
				// { icon: require("@/static/icon/qq.png") },
				// { icon: require("@/static/icon/wb.png") },
			],
			imageValue:{},
		};
	},
	onShow(){
		
	},
	methods: {
		lineTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		fileUpload(){
			let that = this
			uni.chooseMessageFile({
				count: 1,
				type: 'file',
				success: function (res) {
					var tempFiles = res.tempFiles
					uni.uploadFile({
						url: this.action, // 你的接口地址
						filePath: tempFiles[0].path,
						name: 'file',
						formData: {},
						success: function (uploadFileRes) {
							console.log(uploadFileRes.data);
							that.urls.push(uploadFileRes.data)
						}
					});
				}
			});
		},
		registerT() {
			// 校验密码与账号是否有6位数
			if(this.form.username.length < 6 || this.form.password.length < 6){
				uni.showToast({
					title: "请输入6位数的账号与密码",
					icon: "none",
				});
				return;
			}

			// 校验确认密码以及密码是否一致
			if(this.form.password !== this.form.cpassword){
				uni.showToast({
					title: "两次密码不一致",
					icon: "none",
				});
				return;
			}
			// 校验账户密码是否为空
			if(!this.form.username || !this.form.password){
				uni.showToast({
					title: "账户密码不能为空",
					icon: "none",
				});
				return;
			}
		
			// 校验
			if(!this.form.phone){
				uni.showToast({
					title: "请输入手机号",
					icon: "none",
				});
				return;
			}
			// 校验手机号格式
			if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){ 
				uni.showToast({
					title: "手机号格式不正确",
					icon: "none",
				});
				return;
			}

			uni.request({
				url: 'http://localhost:3000/users/register',
				method: 'POST',
				data: this.form,
				success: (res) => {
					console.log(res)
					if(res.statusCode === 200){
						uni.showToast({
							title: "注册成功",
							icon: "none",
						});
						//延时跳转
						setTimeout(()=>{
							uni.navigateTo({
								url: "/pages/login/index"
							});
						},1000)
					}else{
						uni.showToast({
							title: "注册失败",
							icon: "none",
						});
					}
					
				},
				fail: (err) => {
					console.log(err)
					uni.showToast({
						title: "注册失败",
						icon: "none",
					});
				}
			});
		},
		uploadImageSuccess(res, file) {
			console.log('upload success', res, file);
		},
		uploadFail(err, file) {
			console.log('upload fail', err, file);
		},
		deleteImage(index, file) {
			this.imageList.splice(index, 1);
		},
		chooseFile() {
			uni.chooseMessageFile({
				count: 1,
				type: 'file',
				success: (res) => {
					let tempFiles = res.tempFiles;
					tempFiles.forEach((file) => {
						this.uploadFile(file);
					});
				}
			});
		},
		uploadFile(file) {
			uni.uploadFile({
				url: this.action,
				filePath: file.path,
				name: 'file',
				success: (uploadFileRes) => {
					let url = JSON.parse(uploadFileRes.data).data.ossId
					this.fileList.push({
						name: file.name,
						url
					});
				}
			});
		},
		deleteFile(index) {
			this.fileList.splice(index, 1);
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
	.btn-1 {
				width: 600rpx;
				height: 80rpx;
				background: #c7700e;
				border-radius: 40rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #ffffff;
			}
}
</style>
