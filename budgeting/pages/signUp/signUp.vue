<template>
	<view class="signup-page">
		<view class="page-main">
			<view class="main-title">
				<view class="line"></view>
				<view class="title">填写报名资料</view>
			</view>

			<view class="page-card">
				<view class="input-card">
					<view class="page-title">上门服务</view>
					<view class="page-right">
						<input type="text" :placeholder="form.serviceName"  disabled="true">
					</view>
				</view>
				
				
				
				<view class="input-card">
					<view class="page-title">住址</view>
					<view class="page-right">
						<input type="text" :placeholder="form.sNumber" v-model="form.address" placeholder="请输入你的地址">
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">联系人名</view>
					<view class="page-right">
						<input type="text" placeholder="请输入你的名字" v-model="form.contactName">
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">联系电话</view>
					<view class="page-right">
						<input type="number" placeholder="请输入你的电话号码" v-model="form.contactPhone">
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">备注</view>
					<view class="page-right">
						<input type="textarea" placeholder="预约备注" v-model="form.serviceType">
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">医生选择</view>
					<view class="page-right">
						<cl-select v-model="doc" :options="list"></cl-select>
					</view>
				</view>
				<view class="input-card">
					<view class="page-right">
						<!-- 时间日期选择 -->
						<view class="example-body">
							<uni-datetime-picker v-model="form.serviceTime" type="datetimerange" rangeSeparator="至" />
						</view>
					</view>
				</view>
			</view>
			

		</view>
		<view class="page-bottom">
			<view class="page-btn" @click="submit">上门预约</view>
		</view>
	</view>
</template>


<script>
import { getDoc } from '../../api/user';

import { postOrder } from '../../api/order'
export default{
    data() {
        // 页面数据变量
        return {
			list : [
				{
					label: "海南东山羊",
					value: 1
				},
				{
					label: "乌鱼子",
					value: 2
				}
			],
			doc:'请选择医生',
            form: {
                serviceName: '',
                address: '',
				serviceTime: ['2023-05-03 10:00', '2023-05-03 13:00'], // 更改为日期时间范围

                contactName: '',
				doctorLevel: '',  // 添加这一行
                contactPhone: '',
            },
			doctorLevels: ['一级:药理师注册需要：医师资格证', '二级:药理师注册需要:药师资格证及相关其他资格证', '三级:医药相关专业毕业证书或学校在读证明', '特殊:注册需要:高中相及以上毕业证书'],  // 添加这一行

            activityTime:['162389893000','162389893']
        }
    },
    methods:{
        getActivityTime(){
            this.time.forEach(item => {
                this.activityTime[0] = formatTime(this.time[0],'yyyy年mm月dd日')
                this.activityTime[1] = formatTime(this.time[1],'yyyy年mm月dd日')
            })
        },
        change(e){
            this.form.service_time = e.detail.value
        },
        submit(){
			
			// 做校验
			if(!this.form.serviceName){
				uni.showToast({
					icon:'none',

					title:'请输入服务名称'
				})
				return
			}
			if(!this.form.address){
				uni.showToast({
					icon:'none',

					title:'请输入地址'
				})
				return
			}
			if(!this.form.contactName){
				uni.showToast({
					icon:'none',

					title:'请输入联系人姓名'
				})
				return
			}
			if(!this.form.contactPhone){
				uni.showToast({
					icon:'none',

					title:'请输入联系人电话'
				})
				return
			}
			if(!this.form.serviceType){
				uni.showToast({
					icon:'none',

					title:'请输入备注'
				})
				return
			}
		
			if(!this.form.serviceTime){
				uni.showToast({
					icon:'none',
					title:'请选择时间'
				})
				return
			}
			if(!this.doc){
				uni.showToast({
					icon:'none',
					title:'请选择医生'
				})
				return
			}
			//校验手机号与身份证
			if(!(/^1[3456789]\d{9}$/.test(this.form.contactPhone))){
				uni.showToast({
					icon:'none',

					title:'手机号码有误，请重填'
				})
				return
			}
			


			this.form.submitId = uni.getStorageSync('token')
			this.form.userId = this.doc
			this.form.serviceTime = this.form.serviceTime[0] + '至' + this.form.serviceTime[1]
            postOrder(this.form)
            .then(response => {
				if(response.data.code == 200){
                uni.showToast({
                    title:'提交成功'
                })
				setTimeout(()=>{
					uni.navigateBack({
						delta: 1
					});
				},1000)
				}else{
					uni.showToast({
						title:'提交失败'
					})	
				}
            })
            .catch(error => {
                console.log(error);
                uni.showToast({
                    title:'提交失败'
                })
            });
        },
		onDoctorLevelChange(e){
        	this.form.doctorLevel = this.doctorLevels[e.detail.value]
    	},
    },
    onReady() {
    },
    onLoad(option){
		// 初始化时间，使serviceTime为当前时间

		let i = Number(option.id) 
		getDoc(i).then(r=>{
			console.log(r)
			this.list = r.data.data
			this.list.map(i=>{
				i.label = i.name ||'黄医生'
				i.value = i.id
			})
		})
        this.form.serviceName = option.name
    }
}
</script>


<style lang="scss">
	.signup-page{
		.page-header{
			width: 100%;
			padding: 32rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-top: 16rpx;
			.title{
				font-size: 32rpx;
			}
			.time{
				font-size: 24rpx;
				color: #ccc;
				margin-top: 16rpx;
			}
		}
		.page-main{
			width: 100%;
			margin-top: 16rpx;
			.main-title{
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 24rpx 32rpx;
				.line{
					width: 8rpx;
					height: 32rpx;
					background-color: #12a7ff;
					border-radius: 4rpx;
					margin-right: 16rpx;
				}
			}
			.page-card{
				width: 100%;
				padding: 0 32rpx;
				box-sizing: border-box;
				background-color: #fff;
				.page-title{
					&:before{
						content: '*';
						color: #C01920;
					}
				}
				&:nth-last-child(1){
					margin-top: 16rpx;
				}
				.picker-card{
					width: 100%;
					height: 96rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #F5F5F5;
					.page-right{
						display: flex;
						align-items: center;
						input{
							text-align: right;
						}
						.icon{
							margin-left: 10rpx;
						}
					}
				}
				.input-card{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 96rpx;
					border-bottom: 1px solid #F5F5F5;
					input{
						text-align: right;
					}
				}
				.textarea-card{
					padding: 32rpx 0;
					textarea{
						margin-top: 16rpx;
						width: 100%;
						height: 152rpx;
						background-color: #EEEEEE;
						padding: 16rpx;
						box-sizing: border-box;
						border-radius: 8rpx;
					}
				}
			}
		}
		.page-bottom{
			width: 100%;
			padding: 32rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
			.page-btn{
				width: 100%;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				background-color: #12a7ff;
				font-size: 32rpx;
				border-radius: 48rpx;
			}
		}
	}
</style>
