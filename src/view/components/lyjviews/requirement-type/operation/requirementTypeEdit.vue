<template>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="150">
		<FormItem label="请输入酒店代码：" prop="hotelCode" required>
			<Input placeholder="请输入酒店代码：" v-model="form.hotelCode" />
		</FormItem>
		<FormItem label="请输入WSDL地址：" prop="wsdl" required>
			<Input placeholder="请输入WSDL地址：" v-model="form.wsdl" />
		</FormItem>
		<FormItem label="请输入酒店名称：" prop="hotelName" required>	
			<Input placeholder="请输入酒店名称：" v-model="form.hotelName" />
		</FormItem>	
    </Form>
</template>
<script>
    import util from '../../../libs/util';
    export default {
		name:"hotelAdd",
		props:{
			form: {
				id:'',
				hotelCode: '',
				wsdl: '',
				hotelName:'',
			},
		},
        data () {
            return {
				 
                ruleValidate: {
                    hotelCode: [
                        { required: true, message: '酒店代码不能为空', trigger: 'blur' }
                    ],
					wsdl: [
					    { required: true, message: 'WSDL地址不能为空', trigger: 'blur' }
					],
					hotelName: [
					    { required: true, message: '酒店名称不能为空', trigger: 'blur', pattern: /.+/}
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