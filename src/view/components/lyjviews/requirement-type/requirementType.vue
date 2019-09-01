<template>
  <div class="layout user">
    <Layout>
      <Layout>
        <Content :style="{minHeight: '680px', margin: '0 15px'}">
          <Card>
            <Table ref="table" :columns="columns1" :data="data1" style="width: 100%;">
              <div slot="header" style="margin: 0 10px;">
                <div style="float: left;">
                  <Input v-model="searchData" placeholder="需求类型名称" style="width: 200px;" />
                  <Button icon="search" @click="findData()">查询</Button>
                </div>
                <div style="float: right;">
                  <!-- <Button  type="primary"  :loading="exportLoading" @click="excel">导出文件</Button> -->
                  <Button icon="plus" type="primary" @click="addRt">添加需求类型</Button>
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
      <rtAdd ref="rtAdd" :form="rtAddForm"></rtAdd>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="saveAdd">保存</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hasEdit" title="编辑需求类型" width="500">
				<rtEdit ref="rtEdit" :form="rtEditForm"></rtEdit>
				<div slot="footer" style="text-align: center;">
					<Button type="primary" @click="saveEdit">保存</Button>
					<Button @click="cancelEdit">取消</Button>
				</div>
    </Modal>
  </div>
</template>
<script>
import rtAdd from "../requirement-type/operation/rtAdd";
import rtEdit from "../requirement-type/operation/rtEdit";

export default {
  components: {
    rtAdd,
    rtEdit
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
      rtAddForm: {
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
      },
      rtEditForm: {
        id: "",
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
      },
      columns1: [
        {
          title: "需求类型ID",
          key: "lyjRequirementTypeid",
          width:100,
          align:"center",
        },
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
                      this.deleteRt(params.row);
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
    //查询需求类型
    findData(page) {
      if (!page) {
        this.page.current = 1;
      } else {
        this.page.current = page;
      }
      this.axios
        .get(this.global.host + "/RquirementType", {
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
    },
    //编辑需求类型modal窗口
    editForm(rowdata) {
      this.$refs['rtEdit'].reset(this.rtEditForm);
      this.rtEditForm = {
          ...rowdata,
      };
      // this.$refs['rtEdit'].initForm(this.rtEditForm);
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
      this.rtAddForm = {
        lyjRequirementTypename: "",
        lyjRequirementTypeparentid: ""
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
        this.$refs["rtAdd"].handleSubmit().then(valid => {
          if (valid == true) {
            this.hasAdd = false;
            this.axios
              .post(this.global.host + "/RquirementType",this.rtAddForm)
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
      this.$refs["rtEdit"].handleSubmit().then(valid => {
        if (valid == true) {
          this.hasEdit = false;
          this.axios
            .put(this.global.host +"/RquirementType", {
              lyjRequirementTypeid: this.rtEditForm.lyjRequirementTypeid,
              lyjRequirementTypename: this.rtEditForm.lyjRequirementTypename,
              lyjRequirementTypeparentid: this.rtEditForm
                .lyjRequirementTypeparentid
            })
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
    deleteRt(rtype) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该数据吗？",
        onOk: () => {
          this.axios
            .delete(
              this.global.host + "/RquirementType/" + rtype.lyjRequirementTypeid
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