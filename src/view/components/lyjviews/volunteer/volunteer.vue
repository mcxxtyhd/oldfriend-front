<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="志愿者名称" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <Button icon="plus" type="primary" @click="addRt">添加志愿者</Button>
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
    <Modal v-model="hasAdd" title="添加志愿者" width="500">
      <volunteerAdd ref="volunteerAdd" :form="volunteerAddForm"></volunteerAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import volunteerAdd from "../volunteer/operation/volunteerAdd";

export default {
  components: {
    volunteerAdd
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
      flag: true,
      api: "",
      volunteerAddForm: {
        lyjVolunteerId: "",
        lyjUserId: "",
        lyjUsername: ""
      },
      columns1: [
        {
          title: "志愿者ID",
          key: "lyjVolunteerId"
        },
        {
          title: "用户UUID",
          key: "lyjUserId"
        },
        {
          title: "志愿者名称",
          key: "lyjUsername"
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
                      this.deleteVolunteer(params.row);
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
    //查询志愿者
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }
      this.axios
        .get(this.global.host + "/Volunteer", {
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
    //添加
    addRt() {
      this.resetForm();
      this.hasAdd = true;
      this.flag = true;
    },
    //重置添加模板
    resetForm() {
      this.volunteerAddForm = {
        lyjvolunteerTypename: "",
        lyjvolunteerTypeparentid: ""
      };
    },
    //添加关闭
    cancelAdd() {
      this.hasAdd = false;
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
        this.$refs["volunteerAdd"].handleSubmit().then(valid => {
          if (valid == true) {

              // console.log("2222222222")
              // console.log(this.volunteerAddForm.lyjUserId)

            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/Volunteer",this.volunteerAddForm)
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
    //删除
    deleteVolunteer(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(this.global.host + "/Volunteer/" + data.lyjVolunteerId)
            .then(res => {
              this.$Message.success("删除成功");
              this.findData();
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