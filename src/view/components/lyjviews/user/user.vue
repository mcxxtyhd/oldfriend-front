<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="用户名称" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <Button icon="plus" type="primary" @click="addUser">添加用户</Button>
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
    <Modal v-model="hasAdd" title="添加用户" width="500">
      <userAdd ref="userAdd" :form="userAddForm"></userAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hasEdit" title="编辑用户" width="500">
      <userEdit ref="userEdit" :form="userEditForm"></userEdit>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveEdit">保存</Button>
        <Button @click="cancelEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import userAdd from "../user/operation/userAdd";
import userEdit from "../user/operation/userEdit";

export default {
  components: {
    userAdd,
    userEdit
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
      userAddForm: {
        lyjUserId: "",
        lyjUserOpenid: "",
        lyjUserUuid: "",
        lyjUserName: "",
        lyjUserPassword: "",
        lyjUserGender: "",
        lyjUserLocation: "",
        lyjUserBirthday: "",
        lyjUserAge: "",
        lyjUserCountry: "",
        lyjUserPhone: "",
        lyjUserLivingplace: "",
        lyjUserWorkplace: "",
        lyjUserRewards: "",
        lyjUserCreditid: "",
        lyjUserCreditpositive: "",
        lyjUserCreditnegative: ""
      },
      userEditForm: {
        lyjUserId: "",
        lyjUserOpenid: "",
        lyjUserUuid: "",
        lyjUserName: "",
        lyjUserPassword: "",
        lyjUserGender: "",
        lyjUserLocation: "",
        lyjUserBirthday: "",
        lyjUserAge: "",
        lyjUserCountry: "",
        lyjUserPhone: "",
        lyjUserLivingplace: "",
        lyjUserWorkplace: "",
        lyjUserRewards: "",
        lyjUserCreditid: "",
        lyjUserCreditpositive: "",
        lyjUserCreditnegative: ""
      },
      columns1: [
        {
          title: "用户姓名",
          key: "lyjUserName"
        },
        {
          title: "手机号码",
          key: "lyjUserPhone"
        },
        {
          title: "用户唯一标识",
          key: "lyjUserUuid"
        },
        {
          title: "出生日期",
          key: "lyjUserBirthday",
          render:(h, params) =>{
            return h('div', 
            params.row.lyjUserBirthday!=null?
            this.$moment(params.row.lyjUserBirthday).format('YYYY-MM-DD'):null);/*这里的this.row能够获取当前行的数据*/
          }
        },
        {
          title: "身份证号码",
          key: "lyjUserCreditid"
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
                      this.deleteUser(params.row);
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
    //查询用户
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }
      this.axios
        .get(this.global.host + "/User", {
          params: {
            searchText: this.searchData,
            pageNo: this.page.current,
            pageSize: this.page.pageSize
          }
        })
        .then(res => {
          console.log(res);
          this.data1 = res.data.data.list;
          this.page.total = res.data.listCount;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //编辑用户modal窗口
    editForm(rowdata) {
      this.$refs["userEdit"].reset(this.userEditForm);
      this.userEditForm = {
        ...rowdata
      };
      this.$refs["userEdit"].initForm(this.userEditForm);
      this.hasEdit = true;
    },
    //添加
    addUser() {
      this.resetForm();
      this.hasAdd = true;
      this.flag = true;
    },
    //重置添加模板
    resetForm() {
      this.userAddForm = {
        lyjUserId: "",
        lyjUserOpenid: "",
        lyjUserUuid: "",
        lyjUserName: "",
        lyjUserPassword: "",
        lyjUserGender: "",
        lyjUserLocation: "",
        lyjUserBirthday: "",
        lyjUserAge: "",
        lyjUserCountry: "",
        lyjUserPhone: "",
        lyjUserLivingplace: "",
        lyjUserWorkplace: "",
        lyjUserRewards: "",
        lyjUserCreditid: "",
        lyjUserCreditpositive: "",
        lyjUserCreditnegative: ""
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
        this.$refs["userAdd"].handleSubmit().then(valid => {
          if (valid == true) {
            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/User", this.userAddForm)
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
      this.$refs["userEdit"].handleSubmit().then(valid => {
        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .put(this.global.host + "/User", this.userEditForm)
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
    deleteUser(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(this.global.host + "/User/" + data.lyjUserId)
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