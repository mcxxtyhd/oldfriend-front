<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="需求申请" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <!-- <Button  type="primary"  :loading="exportLoading" @click="excel">导出文件</Button> -->
                  <Button icon="plus" type="primary" @click="addRa">添加需求申请</Button>
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
    <Modal v-model="hasAdd" title="添加需求申请" width="500">
      <raAdd ref="raAdd" :form="raAddForm"></raAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hasEdit" title="编辑需求申请" width="500">
      <raEdit ref="raEdit" :form="raEditForm"></raEdit>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveEdit">保存</Button>
        <Button @click="cancelEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import raAdd from "../requirement-apply/operation/raAdd";
import raEdit from "../requirement-apply/operation/raEdit";

export default {
  components: {
    raAdd,
    raEdit
  },
  data() {
    return {
      searchData: "",
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      hasAdd: false,
      hasEdit: false,
      flag: true,
      api: "",
      raAddForm: {
        lyjRequirementApplyid: "",
        lyjUserId: "",
        lyjVolunteerId: "",
        lyjRequirementApplystate: "",
        lyjRequirementApplycomment: "",
        lyjRequirementApplystar: "",
        lyjRequirementApplyrequirementid: "",
        lyjRequirementApplyduration: ""
      },
      raEditForm: {
        lyjRequirementApplyid: "",
        lyjUserId: "",
        lyjVolunteerId: "",
        lyjRequirementApplystate: "",
        lyjRequirementApplycomment: "",
        lyjRequirementApplystar: "",
        lyjRequirementApplyrequirementid: "",
        lyjRequirementApplyduration: ""
      },
      columns1: [
        {
          title: "申请ID",
          key: "lyjRequirementApplyid"
        },
        {
          title: "申请者ID",
          key: "lyjUserId"
        },
        {
          title: "申请状态",
          key: "lyjRequirementApplystate",
          render:(h,params)=>{
            let text="";
            if(params.row.lyjRequirementApplystate===1){
              text="申请中"
            }else if(params.row.lyjRequirementApplystate===2){
              text="申请失败"
            }else if(params.row.lyjRequirementApplystate===3){
              text="待完成"
            }else if(params.row.lyjRequirementApplystate===4){
              text="未完成"
            }else if(params.row.lyjRequirementApplystate===5){
              text="已完成"
            }else if(params.row.lyjRequirementApplystate===6){
              text="已评价"
            }else if(params.row.lyjRequirementApplystate===99){
              text="任务结束"
            }
            return h('div',{
              props:{},
            },text)
          }
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
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.editForm(params.row);
                    }
                  }
                },
                "编辑"
              ),
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
                      this.deleteRa(params.row);
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
    //查询需求申请
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }
      this.axios
        .get(this.global.host + "/RequirementApply", {
          params: {
            pageNo: this.page.current,
            pageSize: this.page.pageSize
          }
        })
        .then(res => {
          this.data1 = res.data.data.list;
          this.page.total = res.data.listCount;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //编辑需求申请modal窗口
    editForm(rowdata) {
      this.$refs["raEdit"].reset(this.raEditForm);
      this.raEditForm = {
        ...rowdata
      };
      this.$refs["raEdit"].initForm(this.raEditForm);
      this.hasEdit = true;
    },
    //添加
    addRa() {
      this.resetForm();
      this.hasAdd = true;
      this.flag = true;
    },
    //重置添加模板
    resetForm() {
      this.raAddForm = {
        lyjRequirementApplyid: "",
        lyjUserId: "",
        lyjVolunteerId: "",
        lyjRequirementApplystate: "",
        lyjRequirementApplycomment: "",
        lyjRequirementApplystar: "",
        lyjRequirementApplyrequirementid: "",
        lyjRequirementApplyduration: ""
      };
    },
    
    //添加关闭
    cancelAdd() {
      this.hasAdd = false;
    },
    //编辑关闭
    cancelEdit() {
      this.hasEdit = false;
    },
    
    pageChange(page) {
      this.findData(page);
    },

    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.findData(this.page.current);
    },
    //添加保存按钮
    saveAdd() {
      if (this.flag == true) {
        this.flag = false;
        this.$refs["raAdd"].handleSubmit().then(valid => {
          if (valid == true) {

            console.log(this.raAddForm)
            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/RequirementApply",this.raAddForm)
              .then(res => {
                this.findData();
                this.$Message.success('新增成功');
              })
              .catch(err => {
                alert("请求失败");
              });
          }
          this.flag = true;
        });
      }
    },
    //修改保存按钮
    saveEdit() {
      this.$refs["raEdit"].handleSubmit().then(valid => {
        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .put(this.global.host +"/RequirementApply",this.raEditForm )
            .then(res => {
              this.findData();
              this.$Message.success('编辑成功');
            })
            .catch(err => {
              alert("请求失败");
            });
        }
      });
    },
    //删除
    deleteRa(ratype) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(
              this.global.host + "/RequirementApply/" + ratype.lyjRequirementApplyid
            )
            .then(res => {
              this.findData();
              this.$Message.success('删除成功');
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
    this.findData();
  }
};
</script>