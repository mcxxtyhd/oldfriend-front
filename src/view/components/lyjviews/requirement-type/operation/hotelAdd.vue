<template>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
		<FormItem label="请输入需求类型名称" prop="lyjRequirementTypename" required>
			<Input placeholder="请输入需求类型名称" v-model="form.lyjRequirementTypename" />
		</FormItem>
		<FormItem label="请输入需求类型父ID：" prop="lyjRequirementTypeparentid" required>	
			<Input placeholder="请输入需求类型父ID：" v-model="form.lyjRequirementTypeparentid" />
		</FormItem>	
    </Form>
</template>
<script>
    export default {
		name:"hotelAdd",
		props:{
			form: {
				 lyjRequirementTypename: '',
                lyjRequirementTypeparentid: '',
			},
		},
        data () {
            return {
                ruleValidate: {
                    lyjRequirementTypename: [
                        { required: true, message: '需求类型名称不能为空', trigger: 'blur' }
                    ],
					lyjRequirementTypeparentid: [
					    { required: true, message: '需求类型父ID不能为空', trigger: 'blur' }
					],
		
                }
            }
        },
        methods: {
			reset(form){
				this.$refs.form.resetFields();
			},
			
             handleSubmit () {
			 
                return this.$refs['form'].validate((valid) => {
                    return valid;
				})
			},
			
			initForm(form) {
								
						},
									
        }
    }
</script>

<style scoped>
    .margin-top-10 {
        margin-top: 10px;
    }
</style>