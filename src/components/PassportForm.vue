<template>
  <div class="personal_form">
    <div class="sign changepaw modifypaw">
      <div class="sign_title">修改密码</div>
      <div class="sign_name changepaw_name">
        用户名<input type="text" v-model="userData.username" placeholder="用户名/邮箱/手机号" readonly />
      </div>
      <div class="sign_name modify_contact">
        验证方式
        <span class="modify_contact_1">
          <el-radio v-model="contactRadio" label="1">手机号：{{ userData.phone }}</el-radio>
        </span>
        <div class="modify_contact_2">
          <el-radio v-model="contactRadio" label="2">邮箱：{{ userData.email }}</el-radio>
        </div>
      </div>
      <div class="sign_name modify_code">
        <input v-model.trim="verificationCode" autocomplete="new-password" placeholder="请输入验证码" />
        <div v-if="ifModifyCode1" class="modify_code_2">
          {{ countDown }}s后重试
        </div>
        <div v-if="ifModifyCode2" @click="getCode()" class="modify_code_1">
          获取验证码
        </div>
      </div>
      <div class="sign_name sign_paw">
        新设密码<input v-model.trim="newPassword" type="password" autocomplete="new-password" placeholder="密码需在6-18个字符" />
      </div>
      <div class="sign_name sign_paw">
        确认密码<input v-model.trim="repeatPassword" type="password" autocomplete="new-password" placeholder="请再次输入新密码" />
      </div>
           <el-button :disabled="isDisabledBtn?true:false" @click="modifyPaw()" 
           style="margin:30px 0;width:100%;padding: 20px;" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import { revisePaw, getValidation, gainK } from "../api/api";
import { mapState } from "vuex";
export default {
  name: "PassportForm",
  props: {},
  data () {
    return {
      ifModifyCode1: false,
      ifModifyCode2: true,
      contactRadio: "1",
      password: "",
      publicKey: "",
      requestKey: "",
      countDown: 60,
      newPassword: "",
      repeatPassword: "",
      verificationCode: "",
      isDisabledBtn: true
    };
  },
  watch: {
    newPassword (val) {
      if (val && this.repeatPassword && this.verificationCode) {
        this.isDisabledBtn = false;
      } else {
        this.isDisabledBtn = true;
      }
    },
    repeatPassword (val) {
      if (val && this.newPassword && this.verificationCode) {
         this.isDisabledBtn = false;
      } else {
        this.isDisabledBtn = true;
      }
    },
    verificationCode (val) {
      if (val && this.repeatPassword && this.newPassword) {
        this.isDisabledBtn = false;
      } else {
        this.isDisabledBtn = true;
      }
    }
  },
  methods: {
    getCode () {
      let para = {
        type: this.contactRadio
      };
      getValidation(para).then(res => {
        if (res.data.code == 0) {
          this.ifModifyCode1 = true;
          this.ifModifyCode2 = false;
          let clock = window.setInterval(() => {
            if (this.countDown == 0) {
              this.ifModifyCode1 = false;
              this.ifModifyCode2 = true;
              this.countDown = 60;
              window.clearInterval(clock);
            } else {
              this.countDown--;
            }
          }, 1000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    modifyPaw () {
      if (this.verificationCode !== "") {
        if (this.newPassword === this.repeatPassword) {
          if (
            this.newPassword.length >= 6 &&
            this.newPassword.length <= 18
          ) {
            gainK().then(res => {
              this.publicKey = res.data.model.p;
              this.requestKey = res.data.model.k;
              let id = {
                code: this.verificationCode,
                password: this.newPassword
              };
              let jsencrypt = new JSEncrypt();
              jsencrypt.setPublicKey(this.publicKey);
              let para = {
                data: jsencrypt.encrypt(JSON.stringify(id))
              };
              revisePaw(para).then(res => {
                if (res.data.code == 0) {
                  this.verificationCode = "";
                  this.newPassword = "";
                  this.repeatPassword = "";
                  this.$message({
                    message: "修改成功，请重新登录！",
                    type: "success"
                  });
                  location.reload();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
            });
          } else {
            this.$message.error("密码长度为6-18个字符");
          }
        } else {
          this.$message.error("密码两次输入不一致");
        }
      } else {
        this.$message.error("验证码不能为空");
      }
    }
  },
  mounted () { },
  computed: {
    ...mapState({
      userData: state => state.userinfo
    })
  }
};
</script>

<style lang="less">
.personal_form .modifypaw {
  position: relative;
  margin-top: 20px;
}
</style>
