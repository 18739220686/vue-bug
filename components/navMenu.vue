<template>
  <div class="navMenu">
    <!-- 搜索 -->
    <el-input
      style="margin: 10px;width: calc(100% - 20px)"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      prefix-icon="el-icon-search"
      clearable>
    </el-input>
    <!-- 侧边栏修改项目 -->
    <el-menu :router="true">
      <el-menu-item>
        <i class="el-icon-plus"></i>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span slot="title">默认分类</span>
      </el-menu-item>
    </el-menu>
    <el-tree
      :default-active="$route.path"
      :data="nameList"
      node-key="name"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      @node-click="handleClick"
      :props="data"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
       <span class="custom-tree-node">
            <span>{{node.label}}</span>
            <span>
              <el-button size="mini" type="text" class="el-icon-folder-add"
                         @click.stop="ProjectBounced = true"></el-button>
              <el-button size="mini" type="text" @click.stop="append(data)"
                         class="el-icon-circle-plus-outline"></el-button>
              <el-button size="mini" type="text" @click.stop="DeleteData(data)"
                         class="el-icon-delete"></el-button>
            </span>
          </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加项目"
      :visible.sync="ProjectBounced"
      width="30%"
      :before-close="handleClose">
              <span>
                <div style="margin: 20px;"></div>
                <el-form ref="projectFrom" label-width="100px" :model="projectFrom">
                  <el-form-item label="名称：">
                    <el-input v-model="projectFrom.name"></el-input>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-input v-model="projectFrom.desc"></el-input>
                  </el-form-item>
                </el-form>
              </span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="ProjectBounced = false">取 消</el-button>
                <el-button type="primary" @click="projectData">确 定</el-button>
              </span>
    </el-dialog>

  </div>
</template>

<script>
  import service from "../../utils/axios";
  import getProject from "../../utils/getProject";
  import {deleteProject} from "../../api/project";

  export default {
    name: "navMenu",
    data() {
      return {
        editableTabsValue: '2',
        filterText: '',
        nameList: [],
        ProjectBounced: false,
        data: {
          label: 'name',
          children: 'Cases',
        },
        /* 树形数据获取 */
        projectFrom: {
          name: '',
          desc: ''
        },
        queryInfo: {
          page: 1,
          limit: 2000,
        },
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      handleClick(d, node) {
        console.log(d, node);
      },

      append(data) {
        this.ProjectBounced = true
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
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
      /* 创建项目 */
      projectData() {
        this.$refs['projectFrom'].validate(async (valid) => {
          if (!valid) return
          // 发起请求
          const {data} = await service.post("/project", this.projectFrom);
          console.log(data)
          if (data.code !== 200) {
            this.$message.error('添加失败');
            return;
          }
          this.$message.success('添加成功')
          this.ProjectBounced = false
          this.getList()
        })

      },
      /* 项目获取 */
      getList() {
        getProject(this.queryInfo).then(res => {
          console.log("1", res)
          res.forEach(project => {
            if (project.envs && project.envs.length > 0) {
              let Cases = [];
              project.envs.forEach(env => {
                if (env.Cases && env.Cases.length > 0) {
                  Cases = Cases.concat(env.Cases);
                }
              })
              project.Cases = Cases;

            }
          })
          let t = [
            {id: -1, name: '默认分类', Cases: res}
          ]
          this.nameList = t;
        })
      },

      /*  删除项目  */
      DeleteData(row) {
        deleteProject(row.id).then((res) => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      },
      /* 可拖拉列表 */
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return true
        // return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    }
  }
</script>

<style lang="less">
  .project-tree {
    height: 100%;
    background-color: #1b2c3e;

    .el-menu,
    .el-tree {
      color: #ccc;
      background: transparent;
    }

    .el-menu-item {
      color: #bbbfc7;
    }

    .el-menu-item:focus, .el-menu-item:hover,
    .el-tree-node:focus > .el-tree-node__content,
    .el-tree-node__content:focus,
    .el-tree-node__content:active,
    .el-tree-node__content:hover {
      background-color: #505050;
    }

      /* 树形组件 */

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  }


</style>
