<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="150">
    <FormItem label="申请人UUID：" prop="lyjUserId" >
      <Input placeholder="请输入申请人UUID" v-model="form.lyjUserId" />
    </FormItem>
    <FormItem label="志愿者ID：" prop="lyjVolunteerId">
      <Input placeholder="请输入志愿者ID：" v-model="form.lyjVolunteerId" />
    </FormItem>
    <FormItem label="状态码：" prop="lyjRequirementApplystate" >
      <Input placeholder="请输入状态码" v-model="form.lyjRequirementApplystate" />
    </FormItem>
    <FormItem label="评价：" prop="lyjRequirementApplycomment">
      <Input placeholder="请输入评价：" v-model="form.lyjRequirementApplycomment" />
    </FormItem>
    <FormItem label="星级：" prop="lyjRequirementApplystar" >
      <Input placeholder="请选择星级" v-model="form.lyjRequirementApplystar" />
    </FormItem>
    <FormItem label="需求ID：" prop="lyjRequirementApplyrequirementid">
      <Input placeholder="请输入需求ID：" v-model="form.lyjRequirementApplyrequirementid" />
    </FormItem>
    <FormItem label="持续时间(min)：" prop="lyjRequirementApplyduration" >
      <Input placeholder="请输入持续时间(min)" v-model="form.lyjRequirementApplyduration" />
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "raEdit",
  props: {
    form: {
      lyjRequirementApplyid: "",
      lyjUserId: "",
      lyjVolunteerId: "",
      lyjRequirementApplystate: "",
      lyjRequirementApplycomment: "",
      lyjRequirementApplystar: "",
      lyjRequirementApplyrequirementid: "",
      lyjRequirementApplyduration: ""
    }
  },
  data() {
    return {
      ruleValidate: {
        
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