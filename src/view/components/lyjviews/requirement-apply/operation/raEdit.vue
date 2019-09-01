<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="140">
    <FormItem label="需求ID：" prop="lyjRequirementApplyrequirementid">
      <Input number placeholder="请输入申请的需求ID：" v-model="form.lyjRequirementApplyrequirementid" />
    </FormItem>
    <FormItem label="申请人UUID：" prop="lyjUserId">
      <Input placeholder="请输入申请人UUID" v-model="form.lyjUserId" />
    </FormItem>
    <FormItem label="志愿者ID：" prop="lyjVolunteerId">
      <Input placeholder="请输入志愿者ID：" v-model="form.lyjVolunteerId" />
    </FormItem>
    <!-- <FormItem label="状态码：" prop="lyjRequirementApplystate">
      <Input placeholder="请输入状态码" v-model="form.lyjRequirementApplystate" />
    </FormItem>-->
    <FormItem label="状态：">
      <Input v-model="requirementApplyState" disabled />
    </FormItem>
    <FormItem label="评价：" prop="lyjRequirementApplycomment">
      <Input placeholder="请填写评价" v-model="form.lyjRequirementApplycomment" />
    </FormItem>
    <FormItem label="星级：" prop="lyjRequirementApplystar">
      <RadioGroup v-model="form.lyjRequirementApplystar" type="button" size="small">
        <Radio :label="1">1分</Radio>
        <Radio :label="2">2分</Radio>
        <Radio :label="3">3分</Radio>
        <Radio :label="4">4分</Radio>
        <Radio :label="5">5分</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="实际完成时间(min)：" prop="lyjRequirementApplyduration">
      <Input placeholder="请输入实际完成时间(min)" v-model="form.lyjRequirementApplyduration" />
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
    // const validateNumber = (rule, value, callback) => {
    //   if (!Number.isInteger(value)) {
    //     callback(new Error("请输入数字值"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleValidate: {
        lyjRequirementApplyrequirementid: [
          {
            required: true,
            type: "number",
            message:"请输入申请的需求ID,必须为数字格式",
            trigger: "blur"
          },
          // { validator: validateNumber, trigger: "blur" }
        ]
      },
      requirementApplyState: ""
    };
  },
  watch: {
    //监听状态码  生成新的状态文字
    "form.lyjRequirementApplystate": {
      handler: function(newVal, oldVal) {
        switch (newVal) {
          case 1:
            this.requirementApplyState = "申请中";
            break;
          case 2:
            this.requirementApplyState = "申请失败";
            break;
          case 3:
            this.requirementApplyState = "待完成";
            break;
          case 4:
            this.requirementApplyState = "未完成";
            break;
          case 5:
            this.requirementApplyState = "已完成";
            break;
          case 6:
            this.requirementApplyState = "已评价";
            break;
          case 99:
            this.requirementApplyState = "任务结束";
            break;
        }
      }
    }
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