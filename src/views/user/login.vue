<template>
  <div class="user-login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单部分
      vant里边没有form相关组件，只有普通表单域组件
      van-cell-group是对普通表单域组件做封装
    -->
    <van-cell-group>
      <!--van-field 输入框表单域组件
        label="手机号" 表单域前边的名字设置
        required：不进行校验，设置表单域前边有"红星"
        clearable：表单域内容可以通过“叉号”清除
      -->
      <ValidationObserver ref="loginFormRef">
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <!-- 把校验的错误信息展示出来
        error-message：显示校验失败的错误信息
          -->
          <van-field
            v-model="loginForm.mobile"
            type="text"
            placeholder="请输入手机号码"
            label="手机号"
            required
            clearable
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
          <van-field
            v-model="loginForm.code"
            type="password"
            placeholder="请输入验证码"
            label="验证码"
            required
            clearable
            :error-message="errors[0]"
          >
            <!-- 命名插槽应用，提示相关按钮，是要给van-field组件内部的slot去填充的
        size="small" 设置按钮大小的
        type="primary" 设置按钮背景颜色
            -->
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="login-btn">
      <!--van-button
        type:按钮背景颜色
        size:按钮大小的
        round：圆圈效果
        block：块级样式设置，占据一行
      -->
      <van-button
        type="info"
        size="small"
        round
        block
        @click="login()"
        :loading="isLogin"
        loading-text="登录中..."
      >登录</van-button>
    </div>
  </div>
</template>

<script>
// 验证相关模块导入
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { apiUserLogin } from '../../api/user.js'

export default {
  name: 'user-chat',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      isLogin: false, // 登录等待
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 登录系统
    async login () {
      // 对表单全部项目做校验，没有问题再向下执行
      // ValidationObserver
      // validate()返回promise对象
      // valid=true  校验成功    valid=false  校验失败
      const valid = await this.$refs.loginFormRef.validate()
      if (!valid) {
        // 校验失败，停止后续代码执行
        return false
      }

      // 使得按钮变为加载中
      this.isLogin = true

      // 调用api，校验账号信息有效，如下api请求有可能【成功】，还有可能【失败】
      try {
        const result = await apiUserLogin(this.loginForm)
        // console.log(result) // {token:xx,refresh_token:xx}
        // 通过vuex维护服务器端返回的token等秘钥信息
        this.$store.commit('updateUser', result)
        this.$toast.success('登录成功')
        // 页面跳转
        this.$router.push('/')
      } catch (err) {
        // 错误信息提示 vant组件库方法
        this.$toast.fail('手机号或验证码错误' + err)
        // this.$toast.success('手机号或验证码错误' + err) // 成功提示
      }

      // 使得按钮变为正常状态
      this.isLogin = false
    }
  }
}
</script>

<style scoped lang='less'>
.login-btn {
  margin: 40px;
}
</style>
