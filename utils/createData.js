/* 创建环境 */
import service from "./axios";

export default async function createData(p) {
  let d = [];
  try {
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
  } catch (e) {

  }
  return d;
}
