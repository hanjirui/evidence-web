<template>
  <el-container>
    <div>
      <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  export default {
    data: () => ({
      form: {
        username:'',
        password: '',
      }
    }),
    methods:{
      toLogin() {
        this.$axios.post('evidenceApi/login', this.$qs.stringify(this.form))
          .then(res => {
            this.loginStatus(true)
            this.$router.push({name: "ContentWrapper"})
            })
          .catch(err => console.warn(err))
      }
    }
  }
</script>
