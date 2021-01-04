<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <template>
      <h2>调用云函数</h2>
      <p>
        点击
        <a href="javascript:;" @click="callFunction">调用 hello world 云函数</a>
      </p>
      <p>
        <b>云函数执行结果</b>
      </p>
      <p>{{ callFunctionResult }}</p>
    </template>
    <template>
      <h2>上传文件</h2>
      <el-upload action="" :http-request="httpRequest" list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </template>
    <template>
      <h2>获取临时链接</h2>
      <p>
        点击
        <a href="javascript:;" @click="getTempFileURL">获取临时链接</a>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      envId: '',
      callFunctionResult: '',
    }
  },
  props: {
    msg: String,
  },
  methods: {
    async callFunction() {
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'vue-echo',
          data: {
            foo: 'bar',
          },
        })
        this.callFunctionResult = res
      } catch (e) {
        console.error(e)
        this.callFunctionResult = e.message
      }
    },
    async httpRequest(file) {
      console.log(file)
      try {
        // 匿名登录
        await this.login()
        // 文件上传
        const res = await this.$cloudbase.uploadFile({
          cloudPath: 'vue/first',
          filePath: file.file,
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async login() {
      const auth = this.$cloudbase.auth()
      await auth.anonymousAuthProvider().signIn()
      // 匿名登录成功检测登录状态isAnonymous字段为true
      const loginState = await auth.getLoginState()
      console.log(loginState.isAnonymousAuth) // true
    },
    async getTempFileURL() {
      try {
        const res = await this.$cloudbase.getTempFileURL({
          fileList: [
            'cloud://vue-3g1ei8m934e45f58.7675-vue-3g1ei8m934e45f58-1257780692/vue/first',
          ],
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello {
  max-width: 500px;
  margin: 0 auto;
  word-break: break-all;
}
</style>
