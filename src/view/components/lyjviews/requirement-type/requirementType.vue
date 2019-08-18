<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                   <Input v-model="hotelCode" placeholder="需求名称" style="width: 200px;" />
                   <Button icon="search" @click="findHotel()">查询</Button> 
                </div>
                <div style="float: right;">
                  <!-- <Button  type="primary"  :loading="exportLoading" @click="excel">导出文件</Button> -->
                  <Button icon="plus" type="primary" @click="addHotel">添加需求类型</Button>
                </div>
              </div>
              <div slot="footer" style="text-align: right;margin-right: 10px;">
                <Page
                  :current="page.current"
                  :total="page.total"
                  @on-change="pageChange"
                  :page-size="page.pageSize"
                  @on-page-size-change="pageSizeChange"
                  placement="top"
                  show-sizer
                  show-total
                ></Page>
              </div>
            </Table>
          </Card>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="hasAdd" title="添加需求类型" width="500">
      <hotelAdd ref="hotelAdd" :form="hotelAddForm"></hotelAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <!-- <Modal v-model="hasEdit" title="编辑酒店" width="500">
				<hotelEdit ref="hotelEdit" :form="hotelEditForm"></hotelEdit>
				<div slot="footer" style="text-align: center;">
					<Button type="primary" @click="saveEdit">保存</Button>
					<Button @click="cancelEdit">取消</Button>
				</div>
    </Modal>-->
  </div>
</template>
<script>
import hotelAdd from "../requirement-type/operation/hotelAdd";

export default {
  components: {
    hotelAdd
  },
  data() {
    return {
      hotelCode:'',
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      hasAdd: false,
      hasEdit: false,
      flag: true,
      api: "",
      hotelAddForm: {
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
      },
      hotelEditForm: {
        id: "",
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
      },
      columns1: [
        {
          title: "名称",
          key: "lyjRequirementTypename"
        },
        {
          title: "操作",
          key: "show_more",
          align: "center",

          render: (h, params) => {
            let bts = [
              h(
                "Button",
                {
                  style: {
                    margin: "0 5px"
                  },
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deletehotel(params.row);
                    }
                  }
                },
                "删除"
              )
            ];
            return h("div", bts);
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    //查询酒店
			findHotel(page) {
        console.log(typeof(this.hotelCode));
				if (!page) {
					this.page.current = 1;
				} else {
					this.page.current = page;
        };
         this.axios
        .get(this.global.host+"/RquirementType",{
          params:{
           
            searchText:this.hotelCode,
            pageNo:this.page.current,
            pageSize:this.page.pageSize
          }
          })
        .then(res => {
          // console.log("11111111111111");
          // console.log(res.data.listCount);
          // console.log("11111111111111");
          this.data1 = res.data.data.list;
          this.page.total = res.data.listCount;
        })
        .catch(err => {
          alert("请求失败");
        });
				//查询区/期信息
				// util.get('/hotel/jjzx/list', {
				// 	hotelCode: this.hotelCode,
				// 	deleteHotel:0,
				// 		...this.page
				// }).then((res) => {
				// 	if (res.success == true) {
				// 	this.hotelData = res.result;
				// 	this.page = res.page ;
				// }else{
				// 	this.$Message.error('查询失败');
				// }
				// });
			},
    // findHotel() {
    //   this.api = this.global.host + "/RquirementType";
    //   console.log(this.api);
    //   this.axios
    //     .get(this.api,{searchText:''})
    //     .then(res => {
    //       this.data1 = res.data.data.list;
    //     })
    //     .catch(err => {
    //       alert("请求失败");
    //     });
    // },
    //添加
    addHotel() {
      // this.$refs['hotelAdd'].reset();
      this.resetForm();
      this.hasAdd = true;
      this.flag = true;
    },
    //重置添加模板
    resetForm() {
      this.hotelAddForm = {
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
      };
    },
    //添加酒店保存按钮
    saveAdd() {
      if (this.flag == true) {
        this.flag = false;
        console.log(this.hotelAddForm.lyjRequirementTypename);
        this.$refs["hotelAdd"].handleSubmit().then(valid => {
          if (valid == true) {
            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/RquirementType", {
                lyjRequirementTypename: this.hotelAddForm
                  .lyjRequirementTypename,
                lyjRequirementTypeparentid: this.hotelAddForm
                  .lyjRequirementTypeparentid
              })
              .then(res => {
                this.findHotel();
              })
              .catch(err => {
                alert("请求失败");
              });
          }
          this.flag = true;
        });
      }
    },
    //添加酒店关闭
    cancelAdd() {
      this.hasAdd = false;
    },
    //编辑酒店关闭
    cancelEdit() {
      this.hasEdit = false;
    },
    //修改酒店保存按钮
    saveEdit() {
      this.$refs["hotelEdit"].handleSubmit().then(valid => {
        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .post(this.global.host + "/RquirementType", {
              lyjRequirementTypename: "羊城晓",
              lyjRequirementTypeparentid: "3"
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              alert("请求失败");
            });
        }
      });
    },
    pageChange(page) {
      this.findHotel(page);
    },

    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.findHotel(this.page.current);
    },
    //删除区/期
    deletehotel(hotel) {
      console.log(hotel.lyjRequirementTypeid);
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(
              this.global.host + "/RquirementType/" + hotel.lyjRequirementTypeid
            )
            .then(res => {
              console.log(res);
              this.findHotel();
            })
            .catch(err => {
              alert("请求失败");
            });
        },
        onCancel: () => {}
      });
    }
  },
  mounted() {
    //获取组织树
    this.findHotel();
  }
};
</script>