webpackJsonp([17],{"8PL3":function(n,e,t){var s=t("By37");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);t("8bSs")("bef0c154",s,!0)},AHdN:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),zzz;var s={name:"pageKeep",data:function(){return{baseUrl:"https://warehouse.api.7055.net.cn/api/orders/uploadOrdersLogisticsExcel",uploadHeaders:{authorization:this.$store.state.user.token},fileList:[],innerList8:null}},watch:{},created:function(){},methods:{handlePreview:function(n){console.log(1)},handleRemove:function(n,e){console.log(n,e)},handlePictureSuccess:function(n,e,t){this.fileList=[],this.fileList.push(e),200===n.code?(this.innerList8=n.data,console.log(this.innerList8,22222)):(this.$message.error(n.errstr),this.innerList8=null)},handleOnProgress:function(n,e,t){},handleExceed:function(n,e){this.$message.warning("当前限制选择1个文件")}}},i={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"filter-container"},[t("el-upload",{attrs:{action:n.baseUrl,headers:n.uploadHeaders,"on-preview":n.handlePreview,"on-remove":n.handleRemove,"on-success":n.handlePictureSuccess,"on-progress":n.handleOnProgress,name:"excel","show-file-list":!0,limit:1,"on-exceed":n.handleExceed,"file-list":n.fileList}},[t("el-button",{attrs:{size:"small",type:"primary"}},[n._v("上传物流单号")])],1)],1),n._v(" "),null!==n.innerList8?t("el-table",{staticStyle:{width:"100%"},attrs:{data:n.innerList8,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"id"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",{staticClass:"link-type"},[n._v(n._s(e.row.id))])]}}])}),n._v(" "),t("el-table-column",{attrs:{"min-width":"200px",align:"center",label:"状态"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",{staticClass:"link-type"},[n._v(n._s(e.row.status))])]}}])})],1):n._e()],1)},staticRenderFns:[]},l=t("/Xao")(s,i,!1,function(n){t("8PL3")},null,null);e.default=l.exports},By37:function(n,e,t){(n.exports=t("UTlt")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});