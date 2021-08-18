<!-- 环境设置 -->

<template>

  <div style="padding: 0 20px">

    <el-button icon="el-icon-setting" circle @click="table = true" type="primary"></el-button>

    <el-drawer

      title="环境设置"

      :visible.sync="table"

      direction="rtl"

      ref="drawer"

      size="50%">

      <el-button style="float: right;margin-right: 10px" type="primary" @click="handleCreate" round>创建环境</el-button>

      <el-table

        :data="envList"

        style="width: 100%">

        <el-table-column

          label="环境名称"

          prop="name">

        </el-table-column>

        <el-table-column

          label="前置URL"

          prop="base_url">

        </el-table-column>

        <el-table-column

          align="right">

          <template slot-scope="{ row }">

            <el-button type="primary" size="mini" @click="handleUpdate(row)" class="filter-item">

              编辑

            </el-button>

            <!-- 删除环境 -->

            <el-button

              size="mini"

              type="danger"

              @click="DeleteData( row.id)">删除

            </el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-drawer>

    <!-- 添加环境 -->

    <el-dialog

      :title="textMap[dialogStatus]"

      :visible.sync="dialogVisible"

      width="30%"

      :before-close="handleClose">

      <el-form

        :model="envFrom"

        ref="envFrom"

        label-width="100px">

        <el-form-item label="项目：">

          <el-select v-model="envFrom.project_id" placeholder="请选择项目">

            <el-option

              v-for="item in projectList"

              :key="item.id"

              :label="item.name"

              :value="item.id"

              prop="interface_id">

            </el-option>

          </el-select>

        </el-form-item>

        <el-form-item label="环境名称：" prop="name">

          <el-input v-model="envFrom.name"></el-input>

        </el-form-item>

        <el-form-item label="环境地址：" prop="name">

          <el-input v-model="envFrom.base_url"></el-input>

        </el-form-item>

        <el-form-item label="Header：">

          <el-input type="textarea" v-model="envFrom.base_header"></el-input>

        </el-form-item>

        <el-form-item label="项目描述：">

          <el-input type="textarea" v-model="envFrom.desc"></el-input>

        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">

                    <el-button @click="dialogVisible = false">取 消</el-button>

                    <el-button

                      type="primary"

                      @click="dialogStatus === 'create' ? createData() : updateData()"

                    >确 定</el-button>

                    </span>

    </el-dialog>

  </div>

</template>


<script>

  import service from "../utils/axios";

  import {projectList} from "../api/case";

  import {updateProject} from "../api/project";

  import {updateEnv} from "../api/env";


  export default {

    name: "env-setting",

    data() {

      return {

        table: false,

        envList: [],

        /* 添加环境 */

        envFrom: {

          name: '',

          base_url: '',

          desc: '',

          base_header: '{}',

          project_id: '',


        },

        dialogVisible: false,

        projectList: [],

        textMap: {

          update: '编辑',

          create: '创建'

        },

        dialogStatus: '',

        queryInfo: {

          page: 1,

          limit: 20,

        },

      }

    },

    mounted() {

      this.getenvGet();

    },

    methods: {

      /* 查询环境 */

      async getenvGet() {

        const {data} = await service.get("/env", {params: this.queryInfo});

        console.log(data);

        if (data.code !== 200) {

          this.$message.error('获取失败');

          return;

        }

        this.envList = data?.data?.items || [];

      },

      /* 修改获取 */

      handleUpdate(row) {

        projectList().then((res) => {

          this.projectList = res.data.data.items

        })

        this.envFrom = Object.assign({}, row) // copy obj

        this.envFrom.project_id = this.envFrom.project.id

        this.dialogStatus = 'update'

        this.dialogVisible = true

        this.$nextTick(() => {

          this.$refs['envFrom'].clearValidate()

        })

        console.log(333, this.$nextTick)

      },

      /* 删除环境 */

      async DeleteData(e_id) {

        const confirmResult = await this.$confirm('确定要删除该环境吗', '提示', {

          confirmButtonText: '确定',

          cancelButtonText: '取消',

          type: 'warning'

        }).catch(err => err);


        // 取消删除

        if (confirmResult !== "confirm") {

          return this.$message.info('已取消删除')

        }


        // 调用删除

        const {data: res} = await service.delete(`/env/${e_id}`);


        if (res.code !== 200) {

          return this.$message.error("删除参数失败")

        }


        this.$message.success("删除成功")

        this.getenvGet()


      },

      handleCreate() {

        // this.envFrom()

        this.dialogStatus = 'create'

        projectList().then((res) => {

          this.projectList = res.data.data.items

        })

        this.dialogVisible = true

        this.$nextTick(() => {

          this.$refs['envFrom'].clearValidate()


        })

      },

      updateData() {

        this.$refs['envFrom'].validate((valid) => {

          if (valid) {

            updateEnv(this.envFrom).then((res) => {

              this.dialogVisible = false

              this.$notify({

                title: 'Success',

                message: '更新成功',

                type: 'success',

                duration: 2000

              })

              this.getenvGet()

            })

          }

        })

      },

      // 确定关闭操作

      handleClose(done) {

        this.$confirm('确认关闭？')

          .then(_ => {

            done();

          })

          .catch(_ => {

          });

      },

      /* 新增环境 */

      createData() {

        this.$refs['envFrom'].validate(async (valid) => {

          if (!valid) return

          // 发起请求

          const {data} = await service.post("/env", this.envFrom);

          console.log(data)

          if (data.code !== 200) {

            this.$message.error('添加失败');

            return;

          }

          this.$message.success('添加成功')

          console.log()

        })

        this.dialogVisible = false

        this.getenvGet()

      },

    }

  }

</script>


<style scoped>


</style>

