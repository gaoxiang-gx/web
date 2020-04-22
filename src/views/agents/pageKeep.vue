<template>
  <div class="app-container calendar-list-container">
    <el-input-number style="width: 300px" v-model="number" :min="0" :max="1000"></el-input-number>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createdatas">确 定</el-button>
      <el-button type="primary" @click="savePic">下 载</el-button>
    </div>
    <div id="qrcode"></div>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import QRCode from "qrcodejs2";

export default {
  name: "pageKeep",
  directives: {
    waves
  },
  data() {
    return {
      number: 0
    };
  },

  methods: {
    createdatas() {
      for (var i = 0; i < this.number; i++)
        new QRCode("qrcode", {
          width: 130, // 设置宽度
          height: 130, // 设置高度
          text: "1"
        });
    },
    savePic() {
      //  找到canvas标签
      let myCanvas = document
        .getElementById("qrcode")
        .getElementsByTagName("canvas");
      //创建一个a标签节点
      let a = document.createElement("a");
      //设置a标签的href属性，将canvas变成图片
      a.href = myCanvas[0].toDataURL("image/png");
      //设置下载文件的名字
      a.download = "箱码";
      //点击
      a.click();
      //弹出提示
      this.$messsage({
        messsage: "正在下载中",
        type: "success"
      });
    },
    qrCode(url) {
      for (var i = 0; i < this.number; i++)
      new QRCode("qrcode", {
          width: 130, // 设置宽度
          height: 130, // 设置高度
          text: "1"
        });
    }
  }
};
</script>
