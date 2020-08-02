<template>
  <div class="container">
    <!--
      van-tabs/van-tab:标签页组件
      v-model：通过下标设置激活项目，下标从0开始计数
      title: 标签名称
    -->
    <van-tabs v-model="activeChannelIndex">
      <!-- <van-tab title="标签名称">当前标签对应的内容</van-tab> -->
      <van-tab title="推荐">
        <div class="scroll-wrapper">
          <!-- 瀑布流加载效果(动作-上拉)
        v-model="loading" 加载动画效果(加载中...)
        :finished="finished" 是否停止加载，false可以继续加载,true停止加载
        finished-text="没有更多了" 停止加载后的文字提示
        @load="onLoad" 加载数据的回调事件，页面初次载入会自动触发
        或者是 滚轮 滚动到系统设置的页面底部，也会自动触发
          -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!--
          单元格组件
          内容独占一行进行显示，使用其他div也可以
          title：设置单元格标题
            -->
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="数据库">数据库内容展示</van-tab>
      <van-tab title="后端">后端内容展示</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      // 瀑布流相关成员
      list: [], // 接收加载好的数据
      loading: false, // “加载中...”动画是否显示(加载的时候才设置为true，加载完毕再设置为false)，每次onLoad执行就设置为true，执行完毕就设置为false
      finished: false, // 加载是否停止的标志，false可以继续加载，true瀑布流停止加载，如果后端没有数据可以提供了，就设置该项目为true即可
      // 激活频道下标标志
      activeChannelIndex: 0
    }
  },
  methods: {
    // 瀑布流加载执行的方法
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout设置延迟加载效果，有1s延迟
      setTimeout(() => {
        // 把数字信息追加给list数字
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false // '加载中。。'动画清除

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true // 停止瀑布流加载
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直显示，正如一个列一样
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    // flex:1;的值是1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    // 给上拉列表设置样式
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
