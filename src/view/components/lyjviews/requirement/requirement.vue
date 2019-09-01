<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="需求名称" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <!-- <Button  type="primary"  :loading="exportLoading" @click="excel">导出文件</Button> -->
                  <Button icon="plus" type="primary" @click="addRequirement">添加需求</Button>
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
    <Modal v-model="hasAdd" title="添加需求" width="500">
      <requirementAdd ref="requirementAdd" :form="requirementAddForm"></requirementAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hasEdit" title="编辑需求" width="500">
      <requirementEdit ref="requirementEdit" :form="requirementEditForm"></requirementEdit>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveEdit">保存</Button>
        <Button @click="cancelEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import requirementAdd from "../requirement/operation/requirementAdd";
import requirementEdit from "../requirement/operation/requirementEdit";

export default {
  components: {
    requirementAdd,
    requirementEdit
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
      requirementAddForm: {
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
        allTypeIds: [],
        typeLists: []
      },
      requirementEditForm: {
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
        allTypeIds: [],
        typeLists: []
      },
      columns1: [
        {
          title: "需求名称",
          key: "lyjRequirementName"
        },
        {
          title: "需求描述",
          key: "lyjRequirementDescription"
        },
        {
          title: "大概地址",
          key: "lyjRequirementRawaddress"
        },
        {
          title: "开始时间",
          key: "lyjRequirementBegindatetime",
          render:(h, params) =>{
            return h('div', 
            params.row.lyjRequirementBegindatetime!=null?
            this.$moment(params.row.lyjRequirementBegindatetime).format('YYYY-MM-DD HH:mm:ss'):null);/*这里的this.row能够获取当前行的数据*/
          }
        },
        {
          title: "结束时间",
          key: "lyjRequirementEnddatetime",
          render:(h, params) =>{
            return h('div', 
            params.row.lyjRequirementEnddatetime!=null?
            this.$moment(params.row.lyjRequirementEnddatetime).format('YYYY-MM-DD HH:mm:ss'):null);/*这里的this.row能够获取当前行的数据*/
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
                      this.deleteRequirement(params.row);
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
      data1: [],
      typeLists: []
    };
  },
  methods: {
    //查询需求
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }

      //这个是拿所有的需求
      this.axios
        .get(this.global.host + "/Requirement", {
          params: {
            searchText: this.searchData,
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

      //这个是拿所有的需求类型
      this.axios
        .get(this.global.host + "/RquirementType", {
          params: { searchText: "" }
        })
        .then(res => {
          this.typeLists = res.data.data.list;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //添加
    addRequirement() {
      this.resetForm();
      this.$refs["requirementAdd"].init(this.typeLists);
      this.hasAdd = true;
      this.flag = true;
    },
    //编辑需求窗口
    editForm(rowdata) {
      this.$refs["requirementEdit"].reset(
        this.requirementEditForm,
        this.typeLists
      );
      rowdata.allTypeIds = [];
      if (rowdata.allTypes.length > 0) {
        for (var i = 0; i < rowdata.allTypes.length; i++) {
          rowdata.allTypeIds.push(rowdata.allTypes[i].lyjRequirementTypeid);
        }
      }
      this.requirementEditForm = {
        ...rowdata
      };
      this.hasEdit = true;
    },
    //重置添加模板
    resetForm() {
      this.requirementAddForm = {
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
        allTypeIds: [],
        typeLists: this.typeLists
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
        this.$refs["requirementAdd"].handleSubmit().then(valid => {
          if (valid == true) {
            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/Requirement", this.requirementAddForm)
              .then(res => {
                this.$Message.success("新增成功");
                this.findData();
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
      this.$refs["requirementEdit"].handleSubmit().then(valid => {

        // console.log("here is the check")
        // console.log(this.requirementEditForm)

        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .put(this.global.host + "/Requirement", this.requirementEditForm)
            .then(res => {
              this.findData();
              this.$Message.success("编辑成功");
            })
            .catch(err => {
              alert("请求失败");
            });
        }
      });
    },
    //删除
    deleteRequirement(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(this.global.host + "/Requirement/" + data.lyjRequirementId)
            .then(res => {
              this.findData();
              this.$Message.success("删除成功");
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