webpackJsonp([21],{"/FYa":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("HzJ8"),l=i.n(a),n=i("aA9S"),s=i.n(n),o=i("lR2X"),r=i("Pfph"),c={name:"rolesManagement",directives:{waves:i("cAgV").a},data:function(){return{scrollTop:0,tableKey:0,list:null,total:null,data:[],relationID:void 0,listLoading:!0,listQuery:{page:1,page_size:20,role_name:void 0,role_code:void 0,sort:"-id"},dafaulrOptions:[{value:"own",label:"只看自己"},{value:"grounp",label:"只看本组"},{value:"grounp_deliver",label:"看本组和子组"}],defaultProps:{children:"children",label:function(t,e){return t.menu_name?t.menu_name:t.permission_name}},checkedList:[],checkList:[],checkedId:[],dialogAuthVisible:!1,dialogAuthTitle:void 0,importanceOptions:[1,2,3],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:["published","draft","deleted"],showAuditor:!1,temp:{id:void 0,role_name:void 0,role_code:void 0,default_params:void 0},tempData:{user_account_role_id:void 0,relation_list:[]},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},authList:[],active:"",rules:{role_name:[{required:!0,message:"填写角色名",trigger:"change"}],role_code:[{required:!0,message:"填写角色代码",trigger:"change"}]}}},watch:{dialogAuthVisible:function(t){!1===t&&(this.active="",this.$refs.tree.setCheckedKeys([]))}},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},created:function(){this.getList()},methods:{changeStatus:function(t,e){var i=this,a={user_account_role_id:e.id,status:t};Object(o.e)(a).then(function(){i.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})}).catch(function(){e.status=1===t?0:1})},traverseTree:function(t){if(t&&(this.traverseNode(t),t.children&&t.children.length>0)){var e=0;for(e=0;e<t.children.length;e++)this.traverseTree(t.children[e])}},traverseNode:function(t){t.permission_name&&(t.idd=t.id,delete t.id)},getList:function(){var t=this;this.listLoading=!0,Object(o.c)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={id:void 0,role_name:void 0,role_code:void 0,default_params:void 0}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&Object(o.a)(t.temp).then(function(e){t.temp=e.data,t.list.unshift(t.temp),t.dialogFormVisible=!1,t.total++,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(t){var e=this;this.temp=s()({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var i=s()({},t.temp);i.user_account_role_id=t.temp.id,Object(o.e)(i).then(function(){var e=!0,i=!1,a=void 0;try{for(var n,s=l()(t.list);!(e=(n=s.next()).done);e=!0){var o=n.value;if(o.id===t.temp.id){var r=t.list.indexOf(o);t.list.splice(r,1,t.temp);break}}}catch(t){i=!0,a=t}finally{try{!e&&s.return&&s.return()}finally{if(i)throw a}}t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},authority:function(){var t=this;Object(r.l)().then(function(e){var i=!0,a=!1,n=void 0;try{for(var s,o=l()(e.data);!(i=(s=o.next()).done);i=!0){var r=s.value;t.traverseTree(r)}}catch(t){a=!0,n=t}finally{try{!i&&o.return&&o.return()}finally{if(a)throw n}}t.data=e.data})},handleRoleAuth:function(t){var e=this;this.authority(),this.dialogAuthTitle=t.role_name,this.dialogAuthVisible=!0,this.tempData.user_account_role_id=t.id;var i={};i.user_account_role_id=t.id,Object(r.j)(i).then(function(t){console.log(t,11111);var i=[],a=!0,n=!1,s=void 0;try{for(var o,r=l()(t.data.user_permission);!(a=(o=r.next()).done);a=!0){var c=o.value;i.push(c.id)}}catch(t){n=!0,s=t}finally{try{!a&&r.return&&r.return()}finally{if(n)throw s}}e.$refs.tree.setCheckedKeys(i)})},updateAuthList:function(){for(var t=this,e=this.$refs.tree.getCheckedKeys(),i=0;i<e.length;i++)void 0===e[i]&&(e.splice(i,1),i--);this.tempData.permission_list=e,Object(r.h)(this.tempData).then(function(e){t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3}),t.dialogAuthVisible=!1})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={user_account_role_id:t.id};Object(o.b)(i).then(function(i){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=e.list.indexOf(t);e.list.splice(a,1),e.total--})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},deactivated:function(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},activated:function(){this.getList(),this.authority(),window.scrollTo(0,this.scrollTop)}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"角色名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.role_name,callback:function(e){t.$set(t.listQuery,"role_name",e)},expression:"listQuery.role_name"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"排序"},on:{change:t.handleFilter},model:{value:t.listQuery.sort,callback:function(e){t.$set(t.listQuery,"sort",e)},expression:"listQuery.sort"}},t._l(t.sortOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{stripe:!0,data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"序号",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"角色名"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"link-type",on:{click:function(i){t.handleUpdate(e.row)}}},[t._v(t._s(e.row.role_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"Code"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:"info"}},[t._v(t._s(e.row.role_code))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"180px",align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.updated_at))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"100px",align:"center",label:"启用"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(i){t.changeStatus(i,e.row)}},model:{value:e.row.status,callback:function(i){t.$set(e.row,"status",i)},expression:"scope.row.status"}})]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"320","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleRoleAuth(e.row)}}},[t._v("权限管理")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"90%","margin-left":"5%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"80px"}},[i("el-form-item",{attrs:{label:"角色名",prop:"role_name"}},[i("el-input",{model:{value:t.temp.role_name,callback:function(e){t.$set(t.temp,"role_name",e)},expression:"temp.role_name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"code",prop:"role_code"}},[i("el-input",{model:{value:t.temp.role_code,callback:function(e){t.$set(t.temp,"role_code",e)},expression:"temp.role_code"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"屏蔽"}},[i("el-select",{model:{value:t.temp.default_params,callback:function(e){t.$set(t.temp,"default_params",e)},expression:"temp.default_params"}},t._l(t.dafaulrOptions,function(t){return i("el-option",{attrs:{id:t.value,value:t.value,label:t.label}})}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialogAuthTitle+"--权限设置",visible:t.dialogAuthVisible,width:"30%"},on:{"update:visible":function(e){t.dialogAuthVisible=e}}},[i("div",{staticClass:"tree_iconBox"},[i("el-tree",{ref:"tree",attrs:{data:t.data,size:"font-size: 25px;",props:t.defaultProps,"show-checkbox":"","node-key":"idd","default-expand-all":!1}})],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogAuthVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.updateAuthList}},[t._v("确定")])],1)])],1)},staticRenderFns:[]},d=i("/Xao")(c,u,!1,function(t){i("Ws3c")},null,null);e.default=d.exports},Ws3c:function(t,e,i){var a=i("ldVC");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("8bSs")("885d1a84",a,!0)},ldVC:function(t,e,i){(t.exports=i("UTlt")(!1)).push([t.i,"",""])}});