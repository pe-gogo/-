<template>
	<view class="signup-page">
		<view class="page-main">
			<view class="main-title">
				<view class="line"></view>
				<view class="title">报名资料详情</view>
			</view>

			<view class="page-card">
				<view class="input-card">
					<view class="page-title">上门服务</view>
					<view class="page-right">
						<text>{{form.serviceName}}</text>
					</view>
				</view>
				
				<view class="input-card">
					<view class="page-title">上门时间</view>
					<view class="page-right">
						<text>{{form.serviceTime}}</text>
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">住址</view>
					<view class="page-right">
						<text>{{form.address}}</text>
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">联系人名</view>
					<view class="page-right">
						<text>{{form.contactName}}</text>
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">联系电话</view>
					<view class="page-right">
						<text>{{form.contactPhone}}</text>
					</view>
				</view>
				<view class="input-card">
					<view class="page-title">备注</view>
					<view class="page-right">
						<text>{{form.serviceType}}</text>
					</view>
				</view>
				<view class="page-card">
				<view class="input-card">
					<view class="page-title">客户对医生的评论</view>
						<view class="page-right">
						</view>

					</view>
					<cl-textarea disabled  v-model="text"/>

				</view>
			
			</view>
		</view>
		<view class="page-bottom">
			<view class="page-btn" @click="submit" v-if="form.type==0">确认完成</view>
			<view class="page-btn" style="background-color: aliceblue;"  v-else>已完成</view>
		
		</view>
	</view>
</template>

<script>
import { update,getDOCOrder } from '../../api/order'

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
			text:"暂无评论",
			doc:'请选择医生',
            form: {
                serviceName: '',
                address: '',
                serviceTime: '2023-05-01',
                contactName: '',
                contactPhone: '',
            },
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
		submit(){
			this.form.type = 1;
            update(this.form)
            .then(response => {
                console.log(response);
                uni.showToast({
                    title:'提交成功'
                })
            })
            .catch(error => {
                console.log(error);
                uni.showToast({
                    title:'提交失败'
                })
            });
		}
    },
    onReady() {
		console.log(this.form)
		uni.request({
			url: 'http://47.112.136.153/prod-api/system/comments/comm/'+this.form.id,
			method: 'GET',
			success: (res) => {
				console.log(res.data)
				this.text = res.data.text
			}
		})
    },
    onLoad(option){	
		let ob = JSON.parse(option.item)
		this.form = ob
		console.log(this.form)
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
					}
				}
				.input-card{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 96rpx;
					border-bottom: 1px solid #F5F5F5;
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
