<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
    <FormItem label="用户UUID" prop="lyjUserId" required>
      <Input placeholder="请输入用户UUID" v-model="form.lyjUserId" />
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "volunteerAdd",
  props: {
    form: {
      lyjVolunteerId:"",
      lyjUserId: "",
      lyjUsername: ""
    }
  },
  data() {
    return {
      ruleValidate: {
        lyjUserId: [
          { required: true, message: "用户UUID不能为空", trigger: "blur" }
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