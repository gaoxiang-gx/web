webpackJsonp([23],{JIF7:function(t,e,a){var n=a("S9Dz");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("915c1a16",n,!0)},S9Dz:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-tree-node__content {\n  position: relative;\n}\n",""])},"hq//":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("qsHl"),i={name:"productGoodsClass",data:function(){return{listLoading:!0,dialogFormVisible:!1,currentData:{},data:[],expandTree:[],menunode:void 0,temp:{category_name:void 0,deep:1},defaultProps:{children:"son",label:"category_name"},dialogStatus:"",textMap:{update:"编辑",create:"创建"},dragtemp:{pid:void 0,user_menu_id:void 0},draggingNodelist:[]}},created:function(){this.getMenuList()},methods:{getMenuList:function(){var t=this;this.listLoading=!0,getProductCategoryTreeList().then(function(e){t.data=e.data,t.listLoading=!1})},append:function(t){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.currentData=t},exit:function(t,e){this.menunode=t,this.temp={category_name:e.category_name},this.dialogStatus="update",this.dialogFormVisible=!0,this.currentData=e},updataData:function(t){var e=this,a=this.temp;a.product_category_id=t.id,Object(n.i)(a).then(function(n){var i=e.menunode.parent,o=i.data.son||i.data;o[o.findIndex(function(e){return e.id===t.id})].category_name=a.category_name,e.dialogFormVisible=!1})},changeStatus:function(t,e){var a=this,i={product_category_id:e.id,status:t,deep:e.deep};Object(n.a)(i).then(function(t){a.getMenuList()}).catch(function(){e.status=0==t?1:0})},treeExpand:function(t){this.expandTree.push(t.id)},treeCollapse:function(t){this.expandTree.splice(this.expandTree.findIndex(function(e){return e.id===t.id}),1)},remove:function(t,e){var a=this;this.$confirm("此操作将永久删除该域名, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={user_menu_id:e.id};deleteUserMenu(n).then(function(n){a.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=t.parent,o=i.data.children||i.data,s=o.findIndex(function(t){return t.id===e.id});o.splice(s,1)})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},resetTemp:function(){this.temp={category_name:void 0}},createData:function(t){var e=this;0===t?(this.temp.pid=0,this.temp.deep=1):(this.temp.pid=t.id,this.temp.deep=++t.deep),Object(n.c)(this.temp).then(function(a){var n={id:a.data.id,category_name:a.data.category_name,son:[]};0===t?(e.data.push(n),e.dialogFormVisible=!1):(t.son||e.$set(t,"son",[]),t.son.push(n),e.dialogFormVisible=!1)})},handleDrop:function(t,e,a,n){this.dragtemp.user_menu_id=t.data.id,"inner"===a?this.dragtemp.pid=e.data.id:0===e.data.pid?this.dragtemp.pid=0:this.dragtemp.pid=e.data.pid,updateUserMenu(this.dragtemp).then(function(e){t.data.pid=e.data.pid})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("el-card",{staticStyle:{width:"50%"}},[a("template",{slot:"header"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.append(0)}}},[t._v("创建根分类\n      ")])],1),t._v(" "),a("el-tree",{attrs:{data:t.data,props:t.defaultProps,"node-key":"id",indent:20,"default-expanded-keys":t.expandTree,"expand-on-click-node":!1,"default-expand-all":!1},on:{"node-expand":t.treeExpand,"node-collapse":t.treeCollapse},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.node,i=e.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[t._v(t._s(n.label))]),t._v(" "),a("span",{staticStyle:{position:"absolute",right:"0",top:"0"}},[a("el-button",{staticStyle:{"font-size":"12px","text-align":"right"},attrs:{type:"text",size:"mini"},on:{click:function(e){e.stopPropagation(),t.exit(n,i)}}},[t._v("\n          编辑\n        ")]),t._v(" "),i.deep<3?a("el-button",{staticStyle:{"font-size":"12px","text-align":"right"},attrs:{type:"text",size:"mini"},on:{click:function(e){e.stopPropagation(),t.append(i)}}},[t._v("\n          添加\n        ")]):t._e(),t._v(" "),a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(e){return t.changeStatus(e,i)}},model:{value:i.status,callback:function(e){t.$set(i,"status",e)},expression:"data.status"}})],1)])}}])})],2),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"innerDataForm1",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.temp,"label-position":"left","label-width":"80px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"auth_name"}},[a("el-input",{model:{value:t.temp.category_name,callback:function(e){t.$set(t.temp,"category_name",e)},expression:"temp.category_name"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.createData(t.currentData)}}},[t._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.updataData(t.currentData)}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(i,o,!1,function(t){a("JIF7")},null,null);e.default=s.exports}});