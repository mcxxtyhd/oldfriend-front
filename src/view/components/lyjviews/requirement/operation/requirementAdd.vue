<template>
  <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
    <FormItem label="需求名称：" prop="lyjRequirementName" required>
      <Input placeholder="请输入需求名称：" v-model="form.lyjRequirementName" />
    </FormItem>
    <FormItem label="需求类型：" prop="allTypeIds" required>
      <CheckboxGroup v-model="form.allTypeIds" v-for="item in typeLists" :key="item.lyjRequirementTypeid" >
        <Checkbox :label="item.lyjRequirementTypeid">{{item.lyjRequirementTypename}}</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="需求描述：" prop="lyjRequirementDescription">
      <Input placeholder="请输入需求描述：：" v-model="form.lyjRequirementDescription" />
    </FormItem>
    <FormItem label="城市：" prop="lyjRequirementCity">
      <Input placeholder="请输入城市：" v-model="form.lyjRequirementCity" />
    </FormItem>
    <FormItem label="地区：" prop="lyjRequirementArea">
      <Input placeholder="请输入地区：" v-model="form.lyjRequirementArea" />
    </FormItem>
    <FormItem label="街道：" prop="lyjRequirementStreet">
      <Input placeholder="请输入街道：" v-model="form.lyjRequirementStreet" />
    </FormItem>
    <FormItem label="门牌号：" prop="lyjRequirementDetailadd">
      <Input placeholder="请输入门牌号：" v-model="form.lyjRequirementDetailadd" />
    </FormItem>
    <FormItem label="大约地址：" prop="lyjRequirementRawaddress">
      <Input placeholder="请输入大约地址：" v-model="form.lyjRequirementRawaddress" />
    </FormItem>
    <FormItem label="开始时间：" prop="lyjRequirementBegindatetime">
      <Date-picker
        type="datetime"
        placeholder="请选择开始时间："
        v-model="form.lyjRequirementBegindatetime"
      />
    </FormItem>
    <FormItem label="结束时间：" prop="lyjRequirementEnddatetime">
      <Date-picker type="datetime" placeholder="请选择结束时间：" v-model="form.lyjRequirementEnddatetime" />
    </FormItem>
    <FormItem label="积分：" prop="lyjRequirementReward">
      <Input placeholder="请输入积分：" v-model="form.lyjRequirementReward" />
    </FormItem>
    <FormItem label="是否为义工需求：" prop="lyjRequirementIsvolunteer">
      <RadioGroup v-model="form.lyjRequirementIsvolunteer" type="button" size="small">
        <Radio :label=1>是</Radio>
        <Radio :label=2>否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="义工优先性别：" prop="lyjRequirementVolunteerperfer">
      <RadioGroup v-model="form.lyjRequirementVolunteerperfer" type="button" size="small">
        <Radio :label=1>男</Radio>
        <Radio :label=2>女</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "requirementAdd",
  props: {
    form: {
      lyjRequirementName: "",
      lyjRequirementDescription: "",
      lyjRequirementCity: "",
      lyjRequirementArea: "",
      lyjRequirementStreet: "",
      lyjRequirementDetailadd: "",
      lyjRequirementRawaddress: "",
      lyjRequirementBegindatetime: "",
      lyjRequirementEnddatetime: "",
      lyjRequirementReward: "",
      lyjRequirementIsvolunteer: "",
      lyjRequirementVolunteerperfer: "",
      allTypeIds:[],
      typeLists:[]
    }
  },
  data() {
    return {
      typeLists:[],
      ruleValidate: {
        lyjRequirementName: [
          { required: true, message: "需求名称不能为空", trigger: "blur" }
        ],
        allTypeIds: [
          { required: true,type:'array', message: "需求类型是必须选择的", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    reset(form) {
      this.$refs.form.resetFields();
    },
    init(typeData){
      this.typeLists=typeData
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