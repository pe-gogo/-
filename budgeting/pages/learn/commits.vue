<template>
	<view class="signup-page">
		<view class="page-main">
			<view class="main-title">
				<view class="line"></view>
				<view class="title">评论</view>
			</view>

			<view class="page-card">
				<view class="input-card">
					<view class="page-title">对此医生对评论</view>
					<view class="page-right">
					</view>

				</view>
				<cl-textarea  v-model="text"/>

			</view>
			

		</view>
		<view class="page-bottom">
			<view class="page-btn" @click="submit">提交</view>
		</view>
	</view>
</template>


<script>
import {postComment} from '@/api/note'
export default{
    data() {
        // 页面数据变量
        return {
			text:'',
			orderId:''
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
			if(this.text ==''){
				uni.showToast({
					icon:'none',
					title: '请输入评论'
				});
				return;/*  */
			}
			let d = {
				orderId :this.orderId,
				text:this.text
			}
            postComment(d)
            .then(response => {
                console.log(response);
                uni.showToast({
                    title:'提交成功'
                })
				//延迟跳转
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},1000)
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
		this.orderId = option.id
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
