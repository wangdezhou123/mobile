<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    closeable
    round
    position="bottom"
    :style="{ height: '95%' }"
    close-icon-position="top-left"
  >
    <!--
    弹出层组件van-popup
    v-model="布尔变量"  设置弹出层是否显示
    现在 通过 :value 和 @input 把v-model给体现出来的，因为具体的控制开关
    @input="$emit('input',$event)" 当前popup允许这样操作，直接传递$event就可以了
    @input="$emit('input')" 当前popup允许这样操作，直接传递$event就可以了
    我们自己设计底层代码，那么 要这样设置 @input="$emit('input',$event.target.value)"

    是要放到父组件的v-model里边的
    现在这个弹出层是否显示的控制模式 与 之前的弹出框的操作完全一致

    closeable 有关闭图标
    round  圆角
    position="bottom" 弹出层是从底部弹出
    :style="{ height: '20%' }"  弹出层高度
    close-icon-position="top-left" 关闭按钮要在左上脚显示
    -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" round>编辑</van-button>
        </div>
      </div>
      <!--van-grid 没有设置column-num属性，默认是4列-->
      <van-grid class="channel-content" :gutter="10" clickable>
        <!-- grid-item宫格单元
            宫格内容表现：
            1. text属性,设置简单内容
            2. 匿名插槽，设置复杂内容
        -->
        <van-grid-item v-for="(item,k) in channelList" :key="item.id">
          <span class="text" :style="{color:k===activeChannelIndex?'red':''}">{{item.name}}</span>
          <!-- <van-icon class="close-icon" name="close" /> -->
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="item in channelAll" :key="item.id">
          <div class="info" slot="text">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>

// 获得所有频道的api函数
import { apiChannelAll } from '@/api/channel.js'

export default {
  name: 'com-channel',
  props: {
    // 接收父组件v-model的数据信息
    value: {
      type: Boolean,
      default: false
    },
    // 父传递过来的"我的频道"数据
    channelList: {
      type: Array,
      // 数组的默认值要通过如下箭头函数方式设置
      default: () => []
    },
    // 当前激活频道的下标
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      channelAll: [] // 全部频道
    }
  },
  created () {
    this.getChannelAll()
  },
  methods: {
    // 获取全部频道
    async getChannelAll () {
      const result = await apiChannelAll()
      this.channelAll = result.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
