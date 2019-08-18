<template>
    <div class="layout user">
			<Layout>   
				<Layout>
					<Content :style="{minHeight: '680px', margin: '0 15px'}">
						 <Card>
							<Table ref="table"  :columns="hotelColumns" :data="hotelData" style="width: 100%;">
									<div slot="header" style="margin: 0 10px;">
										<div style="float: left;">
											<Input v-model="hotelCode" placeholder="酒店代码" style="width: 200px;" />
											<Button icon="search" @click="findHotel()">查询</Button>
										</div>
										<div style="float: right;">
											<!-- <Button  type="primary"  :loading="exportLoading" @click="excel">导出文件</Button> -->
											<Button icon="plus" type="primary" @click="addHotel">添加酒店</Button>
										</div>
									</div>
									<div slot="footer" style="text-align: right;margin-right: 10px;">
										<Page :current="page.current" :total="page.total" @on-change="pageChange"  :page-size="page.pageSize"  @on-page-size-change="pageSizeChange" placement="top" show-sizer show-total></Page>
									</div>
							</Table>
						</Card>
					</Content>
				</Layout>
			</Layout>
			<Modal v-model="hasAdd" title="添加酒店" width="500">
				<hotelAdd ref="hotelAdd" :form="hotelAddForm"></hotelAdd>
				<div slot="footer" style="text-align: center;">
					<Button type="primary" @click="saveAdd">保存</Button>
					<Button @click="cancelAdd">取消</Button>
				</div>
			</Modal>
			<Modal v-model="hasEdit" title="编辑酒店" width="500">
				<hotelEdit ref="hotelEdit" :form="hotelEditForm"></hotelEdit>
				<div slot="footer" style="text-align: center;">
					<Button type="primary" @click="saveEdit">保存</Button>
					<Button @click="cancelEdit">取消</Button>
				</div>
			</Modal>
    </div>
</template>

<script>
	// import excel from '@/libs/excel';
	import hotelAdd from './components/hotelAdd.vue';
	import hotelEdit from './components/hotelEdit.vue';
    import util from '../../libs/util';
    export default {
	components:{
		hotelAdd,
		hotelEdit
	},
	name: "hotel",
        data () {
            return {
				flag:true,
			 cityList: [
					{
                        value: 'true',
                        label: '未删除数据'
                    },
                    {
                        value: 'false',
                        label: '已删除数据'
                    }

                ],
				hasSubmit:false,
				hotelAddForm:{
					hotelCode: '',
					wsdl: '',
					hotelName:'',
				},
				hotelEditForm:{
					id:'',
					hotelCode: '',
					wsdl: '',
					hotelName:'',
				},
				hotelData:[],
				page: {
					current: 1,
					pageSize: 10,
					total: 0
				},
				hasAdd: false,
				hasEdit:false,
				hotelName:'',
				flag :'',
				hotelColumns1: [
				   
					{
				        title: '角色名称',
				        key: 'hotelName',
						align: 'center',
				    },
					],
                hotelColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        align: 'center',
                    },
					{
                        title: '酒店代码',
                        key: 'hotelCode',
						align: 'center',
                    },
					{
					    title: '酒店名称',
					    key: 'hotelName',
						align: 'center',
					},
					{
					    title: 'WSDL地址',
					    key: 'wsdl',
						align: 'center',
					},
					
					{
						title: '操作',
						key: 'show_more',
						align: 'center',

						render: (h, params) => {
							let bts = [
								h('Button', {
									style: {
										margin: '0 5px',
									},
									props: {
										type: 'primary',
										size: 'small',
										
									},
									on: {
										click: () => {
											this.editForm(params.row);
										}
									}
								}, '编辑'),
								h('Button', {
									style: {
										margin: '0 5px',
									},
									props: {
										type: 'error',
										size: 'small',
				
									},
									on: {
										click: () => {
											this.deletehotel(params.row);
										}
									}
								}, '删除'),

							];
							return h('div', bts);
						}
					}
                ],
                
            }
        },
		methods:{
			
			//查询酒店
			findHotel(page) {
				if (!page) {
					this.page.current = 1;
				} else {
					this.page.current = page;
				};
				//查询区/期信息
				util.get('/hotel/jjzx/list', {
					hotelCode: this.hotelCode,
					deleteHotel:0,
						...this.page
				}).then((res) => {
					if (res.success == true) {
					this.hotelData = res.result;
					this.page = res.page ;
				}else{
					this.$Message.error('查询失败');
				}
				});
			},
			
	
				
			pageChange(page) {
				this.findHotelPage(page);
			},
			
			pageSizeChange(pageSize) {
				this.page.pageSize = pageSize;
				this.findHotelPage(this.page.current);
			},
			
			//编辑酒店关闭
			cancelEdit() {
				this.hasEdit = false;
			},
			//添加酒店关闭
			cancelAdd() {
				this.hasAdd = false;
			},
			//修改酒店保存按钮
			saveEdit() {
				this.$refs['hotelEdit'].handleSubmit().then((valid) => {
					if (valid == true) {
						this.hasEdit = false;
						util.post('/hotel/jjzx/save', {
							id: this.hotelEditForm.id,
							hotelCode:  this.hotelEditForm.hotelCode,
							wsdl:  this.hotelEditForm.wsdl,
							hotelName: this.hotelEditForm.hotelName,
						}).then((res) => {
							if (res.success == true) {
								this.$Message.success('编辑成功');
								this.findHotel();
								this.resetForm();
							} else {
								this.$Message.error('编辑失败');
							}
						});
					}
				});
			},
		//添加酒店保存按钮
			saveAdd() {
				if(this.flag == true){
					this. flag = false;
					this.$refs['hotelAdd'].handleSubmit().then((valid) => {
							if (valid == true) {
								this.hasAdd = false;
								util.post('/hotel/jjzx/save', {
									hotelCode: this.hotelAddForm.hotelCode,
									wsdl: this.hotelAddForm.wsdl,
									hotelName:this.hotelAddForm.hotelName,
								}).then((res) => {
									if (res.success == true) {
										this.$Message.success('添加成功');
										this.findHotel();
										this.resetForm();
									} else {
										this.$Message.error('添加成功');	
									}
								});
							}
							this. flag = true;
					});
				}	
			},
			
			//翻页方法
			findHotelPage(page) {
				if (!page) {
					this.page.current = 1;
				} else {
					this.page.current = page;
				};
				//查询区/期信息
				util.get('/hotel/jjzx/list', {
					hotelCode: this.hotelCode,
					deleteHotel:0,
						...this.page
				}).then((res) => {
					if (res.success == true) {
					this.hotelData = res.result;
					this.page = res.page ;
				}else{
					this.$Message.error('查询失败');
				}
				});
			},
			
			//编辑酒店modal窗口
			 editForm(hotel) {
				this.$refs['hotelEdit'].reset();
				this.hotelEditForm = {
						...hotel,
				};
				this.$refs['hotelEdit'].initForm(this.hotelEditForm);
				this.hasEdit = true;
			},
			
			//添加酒店modal窗口
			addHotel() {
				this.$refs['hotelAdd'].reset();
				this.resetForm();
				this.hasAdd = true;
				this.flag = true;
			},
			
			//重置添加模板
			resetForm() {
				this.hotelAddForm = {
					hotelCode: '',
					wsdl: '',
					hotelName:'',
				}
			},
		
			
			
			
			//删除区/期
			deletehotel(hotel) {
				this.$Modal.confirm({
					title: '提示',
					content: '确认删除该数据吗？',
					onOk: () => {
						util.post('/hotel/jjzx/delete', {id: hotel.id}).then((res) => {
							if (res.success == true) {
							    this.$Message.success('删除成功');
							    this.findHotel();
							} else {
							    this.$Message.error('删除失败');
							}
						});
					},
					onCancel: () => {
					}
				});

			},

		},
		 mounted() {
        //获取组织树
        this.findHotel();
		}
    }
</script>


 hotelColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '酒店名称',
                        key: 'hotelName',
                        align: 'center'
                    },
                    {
                        title: '酒店代码',
                        key: 'hotelCode',
                        align: 'center',
                    },
                    {
                        title: 'WSDL地址',
                        key: 'wsdl',
                        align: 'center',
                    },
                    {
                        title: '集团',
                        key: 'jituan',
                        align: 'center',
                    },
					 {
					    title: '品牌',
					    key: 'pipai',
					    align: 'center',
					},
					 {
					    title: '联系人电话',
					    key: 'phone',
					    align: 'center',
					},
                   {
                       title: '联系人电话',
                       key: 'phone',
                       align: 'center',
                   },
				   {
				       title: '启用时间',
				       key: 'qi_time',
				       align: 'center',
				   },
				    {
				       title: '导入时间',
				       key: 'import_hotel',
				       align: 'center',
				   },