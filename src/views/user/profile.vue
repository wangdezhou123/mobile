<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center @click="showPhoto=true">
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name" @click="showName=true" />
      <van-cell
        is-link
        title="性别"
        :value="userProfile.gender === 0 ? '男' : '女'"
        @click="showSex=true"
      />
      <van-cell is-link title="生日" :value="userProfile.birthday" />
    </van-cell-group>
    <!-- 弹头像 -->
    <van-popup v-model="showPhoto" position="bottom">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
      <van-cell is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup v-model="showName" position="bottom">
      <!-- 编辑用户昵称  双向绑定用户的昵称-->
      <van-field v-model.trim="userProfile.name" type="textarea" rows="3"></van-field>
    </van-popup>
    <!-- 弹性别，
          van-action-sheet"菜单"弹出层组件
          与普通弹出层的区别就是，只可以设置"菜单"项目，
          而普通弹出层可以自定义展示内容

          v-model：是否显示
          @select：选取项目的回调处理(内部可以设置弹层关闭、还可以设置选中项目信息等)
          :actions：可选取项目菜单信息设定 [{ name: '男' }, { name: '女' }]
          cancel-text="取消" 展示取消按钮
    -->
    <van-action-sheet v-model="showSex" @select="onSelect" :actions="actions" cancel-text="取消"></van-action-sheet>
  </div>
</template>

<script>
// 获取用户资料的api
import { apiUserProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      actions: [{ name: '男' }, { name: '女' }], // 弹出菜单项目定义
      showSex: false, // 是否显示选择头像弹层

      showName: false, // 是否显示编辑昵称的弹层

      showPhoto: false, // 是否显示选择头像弹层

      // 用户资料表单对象
      userProfile: {
        photo: '',
        name: '我是华仔',
        gender: 0, // 0 男 1 女
        birthday: '1993-09-01'
      }
    }
  },
  created () {
    this.getUserProfile() // 调用获取用户资料的方法
  },
  methods: {
    // 性别被选中回调处理
    // val:被选中项目的菜单单元信息  {name:xx}
    onSelect (val) {
      console.log(val) // {name:'男'}
      // 组件实例成员接收选中的数据
      this.userProfile.gender = val.name === '男' ? 0 : 1
      // 关弹层
      this.showSex = false
    },

    // 获取用户资料的方法
    async getUserProfile () {
      this.userProfile = await apiUserProfile()
    },

    save () {
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
