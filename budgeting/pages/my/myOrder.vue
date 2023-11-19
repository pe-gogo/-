<template>
  <view>
     
     <view v-for="(item, index) in indexList" :key="index">
        <view
          class=""
          v-for="transaction in item.transactions"
          :key="transaction.id"
          style="padding: "
        >
          <cl-list-item :label="transaction.category + '(' + transaction.remark_time.slice(5, 10) + ')'"
          @tap="showDetails(transaction)"
          >
            <cl-text
              type="price"
              :size="30"
              :value="transaction.amount"
              :color="transaction.ortype === 1 ? 'red' : 'black'"
              :margin="[40, 40, 40, 40]"
            ></cl-text>
            <u-button size="mini" color="red" @click.stop="confirmDelete(transaction.id)">删除</u-button>
          </cl-list-item>
        </view>
      </view>
    <u-modal v-model="showModal" title="详情" :showCancel="false">
      <view>
		<cl-list-item label="金额">
				<cl-text :size="30" :value="currentItem.amount"></cl-text>
		</cl-list-item>
		<cl-list-item label="备注">
				<cl-text :size="30" :value="currentItem.remark"></cl-text>
		</cl-list-item>
		<cl-list-item label="时间">
				<cl-text :size="30" :value="currentItem.remark_time"></cl-text>
		</cl-list-item>
		<cl-list-item label="项目">
				<cl-text :size="30" :value="currentItem.category"></cl-text>
		</cl-list-item>

      </view>
    </u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      indexList: [],
      showModal: false,
      currentItem: {},
	  show:false
    };
  },
  methods: {
    showDetails(transaction) {
		console.log(transaction)
      this.currentItem = transaction;
      this.showModal = true;
    },
	 confirmDelete(id) {
	      uni.showModal({
	        title: '确认删除',
	        content: '确定要删除这条记录吗？',
	        confirmText: '确认',
	        cancelText: '取消',
			success:(res) =>{
					if (res.confirm) {
						this.deleteTransaction(id);
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
			}
	      });
	    },
	    deleteTransaction(id) {
	      uni.request({
	        url: `http://localhost:3000/accounting/${id}`,
	        method: "DELETE",
	        success: (res) => {
	          if (res.data.message === 'Record deleted successfully') {
	            this.$u.toast('删除成功');
	            // 重新加载数据
	            this.load()
	          } else {
	            this.$u.toast('删除失败');
	          }
	        },
	        fail: () => {
	          this.$u.toast('删除失败');
	        },
	      });
	    },
		load(){
			let userInfo = uni.getStorageSync("token");
			uni.request({
			  url: "http://localhost:3000/accounting/user/" + userInfo.id,
			  method: "GET",
			  data: {},
			  success: (res) => {
			    const data = res.data;
			    const dates = [...new Set(data.map((item) => item.remark_time))];
			    const indexList = dates.map((date) => {
			      return {
			        date,
			        transactions: data.filter((item) => item.remark_time === date),
			      };
			    });
			    this.indexList = indexList;
			  },
			  fail: () => {},
			  complete: () => {},
			});
		}
  },
  onShow() {
this.load()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
</style>
