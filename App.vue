<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 去除scroll滚动条 */
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}
=======
	  ::-webkit-scrollbar {
	   width: 0;
	   height: 0;
	   background-color: transparent;
	  }

</style>
