<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="广告名称" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <Button icon="plus" type="primary" @click="addRt">添加广告</Button>
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
    <Modal v-model="hasAdd" title="添加广告" width="500">
      <advertisementAdd ref="advertisementAdd" :form="advertisementAddForm"></advertisementAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hasEdit" title="编辑广告" width="500">
      <advertisementEdit ref="advertisementEdit" :form="advertisementEditForm"></advertisementEdit>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveEdit">保存</Button>
        <Button @click="cancelEdit">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import advertisementAdd from "../advertisement/operation/advertisementAdd";
import advertisementEdit from "../advertisement/operation/advertisementEdit";

export default {
  components: {
    advertisementAdd,
    advertisementEdit
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
      advertisementAddForm: {
        lyjAdvertisementId: "",
        lyjAdvertisementName: "",
        lyjAdvertisementImageurl: "",
        lyjAdvertisementBegindatetime: "",
        lyjAdvertisementEnddatetime: "",
        lyjAdvertisementPage: "",
        lyjAdvertisementPageurl: ""
      },
      advertisementEditForm: {
        lyjAdvertisementId: "",
        lyjAdvertisementName: "",
        lyjAdvertisementImageurl: "",
        lyjAdvertisementBegindatetime: "",
        lyjAdvertisementEnddatetime: "",
        lyjAdvertisementPage: "",
        lyjAdvertisementPageurl: ""
      },
      columns1: [
        {
          title: "广告名称",
          key: "lyjAdvertisementName"
        },
        {
          title: "广告所属界面",
          key: "lyjAdvertisementPage"
        },
        {
          title: "开始时间",
          key: "lyjAdvertisementBegindatetime",
          render:(h, params) =>{
            return h('div', 
            params.row.lyjAdvertisementBegindatetime!=null?
            this.$moment(params.row.lyjAdvertisementBegindatetime).format('YYYY-MM-DD HH:mm:ss'):null);/*这里的this.row能够获取当前行的数据*/
          }
        },
        {
          title: "结束时间",
          key: "lyjAdvertisementEnddatetime",
          render:(h, params) =>{
            return h('div', 
            params.row.lyjAdvertisementEnddatetime!=null?
            this.$moment(params.row.lyjAdvertisementEnddatetime).format('YYYY-MM-DD HH:mm:ss'):null);/*这里的this.row能够获取当前行的数据*/
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
                      this.deleteAd(params.row);
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
    //查询广告
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }
      this.axios
        .get(this.global.host + "/Advertisement", {
          params: {
            pageName: this.searchData,
            pageNo: this.page.current,
            pageSize: this.page.pageSize
          }
        })
        .then(res => {
          this.data1 = res.data.data;
          this.page.total = res.data.listCount;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //编辑广告modal窗口
    editForm(rowdata) {
      this.$refs["advertisementEdit"].reset(this.advertisementEditForm);
      this.advertisementEditForm = {
        ...rowdata
      };
      this.$refs["advertisementEdit"].initForm(this.advertisementEditForm);
      this.hasEdit = true;
    },
    //添加
    addRt() {
      this.resetForm();
      this.hasAdd = true;
      this.flag = true;
    },
    //重置添加模板
    resetForm() {
      this.advertisementAddForm = {
        lyjAdvertisementId: "",
        lyjAdvertisementName: "",
        lyjAdvertisementImageurl: "",
        lyjAdvertisementBegindatetime: "",
        lyjAdvertisementEnddatetime: "",
        lyjAdvertisementPage: "",
        lyjAdvertisementPageurl: ""
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
        this.$refs["advertisementAdd"].handleSubmit().then(valid => {
          if (valid == true) {
            this.hasAdd = false;
            this.axios
              .post(
                this.global.host + "/Advertisement",
                this.advertisementAddForm
              )
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
      this.$refs["advertisementEdit"].handleSubmit().then(valid => {
        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .put(
              this.global.host + "/Advertisement",
              this.advertisementEditForm
            )
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
    deleteAd(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(
              this.global.host + "/Advertisement/" + data.lyjAdvertisementId
            )
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