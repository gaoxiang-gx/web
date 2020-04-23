<template>
  <div>
    <div class="filter-container">
      <el-upload
        :action="baseUrl"
        :headers="uploadHeaders"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handlePictureSuccess"
        :on-progress="handleOnProgress"
        name="excel"
        :show-file-list="true"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">上传物流单号</el-button>
      </el-upload>
    </div>
     <el-table
        v-if="innerList8 !== null"
        :data="innerList8"
        border fit highlight-current-row
        style="width: 100%">
        <el-table-column min-width="100px" align="center" label="id">
          <template slot-scope="scope">
            <span class="link-type">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" align="center" label="状态">
          <template slot-scope="scope">
               <span class="link-type">{{scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  name: "pageKeep",
  data() {
    return {
      baseUrl: process.env.BASE_API + "/api/orders/uploadOrdersLogisticsExcel",
      uploadHeaders: {
        authorization: this.$store.state.user.token
      },
      fileList: [],
      innerList8:null

    };
  },
  watch: {},
  created() {},
  methods: {
    handlePreview(file) {
      console.log(1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureSuccess(response, file, fileList) {
      this.fileList = [];
      this.fileList.push(file);
      if (response.code === 200) {
        this.innerList8 = response.data;
        console.log(this.innerList8,22222)
      } else {
        this.$message.error(response.errstr);
        this.innerList8 = null;
      }
    },
    handleOnProgress(event, file, fileList) {},
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    }
  }
};
</script>
<style lang="">
</style>
