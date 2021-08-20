<template>
  <div>
    <el-form ref="addForm" :model="addForm" inline label-position="right" label-width="80px">
      <!-- 搜索 -->
      <el-card shadow="always">
        <el-input placeholder="输入接口路径" class="input-with-select" v-model="addForm.path">
          <el-select v-model="addForm.method" slot="prepend" placeholder="GET" prop="method">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
            <el-option label="PUT" value="put"></el-option>
            <el-option label="DELECT" value="delect"></el-option>
            <el-option label="PATCH" value="patch"></el-option>
          </el-select>
          <!--  按钮    -->
          <el-button slot="append" type="success" plain @click="addCase" class="el-icon-message">保存</el-button>
          <el-button slot="append" type="success" plain @click="runCase" class="el-icon-position">运行</el-button>
        </el-input>
        <el-card class="box-card">
          <!-- 基本信息 -->
          <span class="form-card">基本信息</span>
          <!-- 名称 -->
          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <el-form-item label="名称:">
                <el-input v-model="addForm.name" placeholder="请输入名称" prop="case_name" style="width: 320px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--  项目分类  -->
              <el-form-item label="项目分类:">
                <el-select v-model="addForm.project_id" clearable placeholder="请选择" prop="project_id"
                           class="select-wrapper">
                  <el-option
                    v-for="item in nameList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    prop="project_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg">
            <el-col :span="12">
              <!-- 预期结果 -->
              <el-form-item label="预期结果:">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="addForm.expect"
                  style="width: 320px"
                  prop="expect">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--  提取变量  -->
              <el-form-item label="提取变量:">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="addForm.extra"
                  style="width: 320px"
                  prop="extra">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!--   请求体    -->
        <el-tabs class="data-request" type="border-card">
          <el-tab-pane label="Body">
            <el-radio-group v-model="addForm.content_type">
              <el-radio :label="3">params</el-radio>
              <el-radio :label="6">data</el-radio>
              <el-radio :label="9">json</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="Headers"></el-tab-pane>
          <el-tab-pane label="Cookies"></el-tab-pane>
          <el-input
            v-model="addForm.body"
            class="el-form"
            type="textarea"
            :rows="2"
            placeholder="请输入内容">
          </el-input>
        </el-tabs>
      </el-card>
      <div class="text item">
        <!--  响应结果  -->
        <el-card class="data-response">
          <div slot="header" class="clearfix">
            <span>Response</span>
            <el-button style="float: right; padding: 1px 0" type="text" :data="tableData">
              状态:{{tableData.response&&tableData.response.status}}
            </el-button>
            <el-button style="float: right; padding: 1px 0" type="text">
              响应时间:{{tableData.response&&tableData.response.time}}
            </el-button>
            <el-button style="float: right; padding: 1px 0" type="text" :data="tableData">
              测试结果:{{tableData.result}}
            </el-button>
          </div>
          <el-card style="margin: 5px;height:200px;">
            <el-tabs v-model="tab">
              <el-tab-pane label="请求信息" name="request">
                {{ tableData.request}}
              </el-tab-pane>
              <el-tab-pane label="响应结果" name="response">{{tableData.response}}</el-tab-pane>
              <el-tab-pane label="断言信息" name="expect">{{tableData.expect}}</el-tab-pane>
              <el-tab-pane label="提取变量" name="extra">{{tableData.extra}}</el-tab-pane>
              <el-tab-pane label="异常信息" name="error">{{tableData.error_code}}</el-tab-pane>
            </el-tabs>
          </el-card>
        </el-card>
      </div>
    </el-form>
  </div>
</template>
<script>
  import service from "../utils/axios";
  import getProject from "../utils/getProject";
  import EnvSetting from "../components/envSetting";
  import NavMenu from "../components/navMenu";
  // <!-- import navMenu from "../../components/navMenu"; -->

  export default {
    components: {NavMenu, EnvSetting},
    data() {
      return {
        tab: 'request',
        id: '',
        isCollapse: false,

        formInline: {
          user: '',
          region: '',
          name: '',
          expect: '',
          extra: ''
        },
        label: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
          select: ''
        },
        //  获取项目列表
        queryInfo: {
          page: 1,
          limit: 20,
        },
        nameList: [],
        // 保存用例
        addForm: {
          name: '',
          body: '',
          desc: '',
          path: '',
          standard: "restful",
          method: 'get',
          project_id: '',
          content_type: 'params',
          extra: '',
          expect: '',
          token: 'false',
          token_path: 'string',
          env_id: '1939',
          query: '',

        },
        radio: 3,
        code: 'request',
        tableData: {},
        tabPosition: 'bottom',
        textarea: '',
      }
    },

    props: {
      envSelect: {
        type: String,
        default: '',
      },
    },

    watch: {
      envSelect(val) {
        console.log(val)
        if (val) {
          this.addForm = {
            ...this.addForm,
            env_id: +val,
          };
        }
      },
    },
    created() {
      getProject().then(res => {
        console.log("1", res)
        this.nameList = res;
      })
    },
    methods: {
      // 运行用例
      runCase() {
        if (!this.id) {
          this.$message.error('请先添加实例');
          return;
        }
        this.$refs['addForm'].validate(
          async (valid) => {
            if (!valid) return
            const {data} = await service.post(`/task/${this.id}/run`);

            if (data.code !== 200) {
              this.$message.error('运行失败');
              return;
            }
            // 报告详情
            this.$message.success('添加成功')
            console.log(data);
            this.id = data.data.id || '';
            const {data: res} = await service.get(`/report/${this.id}`);

            if (res.code !== 200) {
              return;
            }

            this.tableData = res?.data.data.suite_info[0] || {} || '';
            debugger
            console.log(this.tableData)
          }
        )
      },
      // 添加用例
      addCase() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) return
          // 发起请求
          const {data} = await service.post("/case", this.addForm);
          console.log(data)
          if (data.code !== 200) {
            this.$message.error('添加失败');
            return;
          }
          // 创建任务
          this.$message.success('添加成功')
          const {data: res} = await service.post("/task", {
            case_list: [data.data.id], env_id: data.data.env.id,
            name: data.data.name
          });
          if (res.code !== 200) {
            return;
          }

          console.log(res);
          this.id = res.data.id || '';

        })
      }
    }
  }

</script>

<style lang="less" scoped>

  .form-card {
    display: inline-block;
    margin-bottom: 20px;
  }

  .el-form {
    margin: auto;
    width: 99%;
    padding: 10px;
  }

  .select-wrapper {
    width: 320px;
  }

  .el-date-picker {
    margin: auto;
    width: 50%;
    padding: 5px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .params-box {
    display: flex;
    justify-content: center;
  }


  .data-request {
    margin-top: 20px;
  }


</style>

