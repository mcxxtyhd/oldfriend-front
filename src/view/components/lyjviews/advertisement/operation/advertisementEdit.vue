<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
    <FormItem label="广告名称" prop="lyjAdvertisementName" required>
      <Input placeholder="请输入广告名称:" v-model="form.lyjAdvertisementName" />
    </FormItem>
    <FormItem label="广告图片url：" prop="lyjAdvertisementImageurl">
      <Input placeholder="请输入广告图片url：" v-model="form.lyjAdvertisementImageurl" />
    </FormItem>
    <FormItem label="开始时间：" prop="lyjAdvertisementBegindatetime">
      <Date-picker type="datetime" placeholder="请选择开始时间：" v-model="form.lyjAdvertisementBegindatetime" />
    </FormItem>
    <FormItem label="结束时间：" prop="lyjAdvertisementEnddatetime">
      <Date-picker type="datetime" placeholder="请选择结束时间：" v-model="form.lyjAdvertisementEnddatetime" />
    </FormItem>
    <FormItem label="广告所属页面名称：" prop="lyjAdvertisementPage">
      <Input placeholder="请输入广告所属页面名称：" v-model="form.lyjAdvertisementPage" />
    </FormItem>
    <FormItem label="广告跳转链接URL：" prop="lyjAdvertisementPageurl">
      <Input placeholder="请输入广告跳转链接URL：" v-model="form.lyjAdvertisementPageurl" />
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "advertisementEdit",
  props: {
    form: {
      lyjAdvertisementId: "",
      lyjAdvertisementName: "",
      lyjAdvertisementImageurl: "",
      lyjAdvertisementBegindatetime: "",
      lyjAdvertisementEnddatetime: "",
      lyjAdvertisementPage: "",
      lyjAdvertisementPageurl: ""
    }
  },
  data() {
    return {
      ruleValidate: {
        lyjAdvertisementName: [
          { required: true, message: "广告名称不能为空", trigger: "blur" }
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