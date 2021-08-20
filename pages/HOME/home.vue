<template>
  <div>
    <!-- 分成三个部分 -->
    <!-- navSideBar 左侧边栏 -->
    <!-- 顶部tap -->
    <!--  内容模块 -->
    <!-- <el-aside :width="isCollapse ? '65px' : '300px'">
    //     <project-tree></project-tree>
    // </el-aside> -->
    <el-container>
      <el-aside>
        <navMenu @add-tab="handleAddTab"></navMenu>
      </el-aside>
      <el-main>
        <div style="margin-bottom: 20px;">
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
          </el-tabs>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <interface :env-select="envSelect"></interface>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import service from "../../utils/axios";
  import getProject from "../../utils/getProject";
  import EnvSetting from "../../components/envSetting";
  import NavMenu from "../../components/navMenu";
  import Interface from "../../components/interface"
  // <!-- import navMenu from "../../components/navMenu"; -->

  export default {
    components: {NavMenu, EnvSetting, Interface},

    props: {
      envSelect: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        id: '',
        radio: 3,
        tableData: {},
        tabPosition: 'bottom',
        textarea: '',
        editableTabsValue: '2',
        editableTabs: [{
          title: '新建接口',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: '新建接口',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },

    watch: {
      envSelect(val) {
        console.log(val)
      },
    },

    created() {
      getProject().then(res => {
        console.log("1", res)
        this.nameList = res;
      })
    },
    methods: {
      handleAddTab(tab) {
        this.editableTabs.push(tab);
      },

      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },

      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: '新建接口',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
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
