<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
    <FormItem label="用户名(机构名)" prop="lyjUserName" required>
      <Input placeholder="请输入用户名(机构名)：" v-model="form.lyjUserName" />
    </FormItem>
    <FormItem label="手机号码" prop="lyjUserPhone">
      <Input placeholder="请输入手机号码：" v-model="form.lyjUserPhone" required/>
    </FormItem>
    <FormItem label="密码" prop="lyjUserPassword">
      <Input placeholder="请输入密码：" v-model="form.lyjUserPassword" required/>
    </FormItem>
    <FormItem label="用户微信openid：" prop="lyjUserOpenid">
      <Input placeholder="请输入用户微信openid：" v-model="form.lyjUserOpenid" />
    </FormItem>
    <FormItem label="用户唯一标识" prop="lyjUserUuid">
      <Input placeholder="请输入用户唯一标识：" v-model="form.lyjUserUuid" />
    </FormItem>
    <FormItem label="性别" prop="lyjUserGender">
      <Input placeholder="请输入性别：" v-model="form.lyjUserGender" />
    </FormItem>
    <FormItem label="籍贯" prop="lyjUserLocation">
      <Input placeholder="请输入籍贯：" v-model="form.lyjUserLocation" />
    </FormItem>
    <FormItem label="出生日期" prop="lyjUserBirthday">
      <Date-picker type="date" placeholder="请选择出生日期：" v-model="form.lyjUserBirthday" />
    </FormItem>
    <FormItem label="年龄" prop="lyjUserAge">
      <Input placeholder="请输入年龄：" v-model="form.lyjUserAge" />
    </FormItem>
    <FormItem label="国家" prop="lyjUserCountry">
      <Input placeholder="请输入国家：" v-model="form.lyjUserCountry" />
    </FormItem>
    <FormItem label="住址" prop="lyjUserLivingplace">
      <Input placeholder="请输入住址：" v-model="form.lyjUserLivingplace" />
    </FormItem>
    <FormItem label="工作地点" prop="lyjUserWorkplace">
      <Input placeholder="请输入工作地点：" v-model="form.lyjUserWorkplace" />
    </FormItem>
    <FormItem label="个人积分" prop="lyjUserRewards">
      <Input placeholder="请输入个人积分：" v-model="form.lyjUserRewards" />
    </FormItem>
    <FormItem label="身份证号码" prop="lyjUserCreditid">
      <Input placeholder="请填写身份证号码：" v-model="form.lyjUserCreditid" />
    </FormItem>
    <FormItem label="身份证正面URL" prop="lyjUserCreditpositive">
      <Input placeholder="请填写身份证正面URL：" v-model="form.lyjUserCreditpositive" />
    </FormItem>
    <FormItem label="身份证反面URL" prop="lyjUserCreditnegative">
      <Input placeholder="请填写身份证反面URL：" v-model="form.lyjUserCreditnegative" />
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "userEdit",
  props: {
    form: {
      lyjUserId: "",
      lyjUserOpenid: "",
      lyjUserUuid: "",
      lyjUserName: "",
      lyjUserPassword: "",
      lyjUserGender: "",
      lyjUserLocation: "",
      lyjUserBirthday: "",
      lyjUserAge: "",
      lyjUserCountry: "",
      lyjUserPhone: "",
      lyjUserLivingplace: "",
      lyjUserWorkplace: "",
      lyjUserRewards: "",
      lyjUserCreditid: "",
      lyjUserCreditpositive: "",
      lyjUserCreditnegative: ""
    }
  },
  data() {
    return {
      ruleValidate: {
        lyjUserName: [
          { required: true, message: "用户名(机构名)不能为空", trigger: "blur" }
        ],
        lyjUserPhone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        lyjUserPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    reset(form) {
      this.$refs.form.resetFields();
    },

    handleSubmit() {
      return this.$refs["form"].validate(valid => {
        return valid;
      });
    },

    initForm(form) {}
  }
};
</script>

<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
</style>