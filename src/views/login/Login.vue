<template>
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
      size="small"
      hide-required-asterisk
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="loginForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      else{
        callback()
      }
    };
    return {
      loginForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if(valid){
        // 跳转到后台首页
        this.$router.push('/layout')
      }
      else{
         console.log('error submit!!');
         return false;
      }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #2d3a4b;
}
.loginForm{
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>


