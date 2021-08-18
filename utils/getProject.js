/* 获取项目接口 */
import service from "./axios";

export default async function getProject(p) {
  let d = [];
  try {
    const { data } = await service.get("/project", {params: p});
    if (data.code !== 200) {
      this.$message.error('获取失败');
      return;
    }
    d = data?.data?.items || [];
  } catch (e) {

  }
  return d;
}
