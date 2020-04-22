<template>
  <div class="app-container calendar-list-container">
    <el-input-number style="width: 300px" v-model="number" :min="0" :max="1000"></el-input-number>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createdatas">确 定</el-button>
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
      for(var i=0 ;i<this.number;i++)
       new QRCode("qrcode", {
        width: 130, // 设置宽度
        height: 130, // 设置高度
        text: "1"
      });
    }
  }
};
</script>
