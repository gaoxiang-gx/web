webpackJsonp([22],{NMdo:function(t,e,i){"use strict";e.a=function(t){return Object(a.a)({url:"/api/user/getUserAccountDepartmentList",method:"post",data:t})};var a=i("vLgD")},"XWE+":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),n=i.n(a),s=i("Ydgi"),r=(i("NMdo"),i("H0KO")),o={name:"userGroupManagement",directives:{waves:i("cAgV").a},data:function(){return{scrollTop:0,tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,page_size:20,user_account_department_id:void 0,group_name:void 0,sort:"-id"},importanceOptions:[1,2,3],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:["published","draft","deleted"],showAuditor:!1,temp:{id:void 0,group_name:"",pid:void 0},defaultProps:{children:"child",label:"group_name"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{group_name:[{required:!0,message:"填写小组名称",trigger:"change"}]},userAccountGroupTree:[],payOptions:[],userDepaerOptions:[],payLoading:!1,typeDisable:!1,groupBackground:"danger"}},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},created:function(){this.getList(),this.getUserAccountGroupTree()},deactivated:function(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},activated:function(){this.getList(),this.getUserAccountGroupTree(),window.scrollTo(0,this.scrollTop)},methods:{handlecheck:function(t){var e=this.$refs.tree.getCheckedKeys();1===e.length?(this.$refs.tree.setCheckedKeys([t.id]),this.temp.pid=t.id):0===e.length?(this.$refs.tree.setCheckedKeys([]),this.temp.pid=void 0):(this.$refs.tree.setCheckedKeys([t.id]),this.temp.pid=t.id)},getUserAccountGroupTree:function(){var t=this;Object(s.d)().then(function(e){t.userAccountGroupTree=e.data})},getUserAccountList:function(t){var e=this;""!==t&&(this.payLoading=!0,Object(r.a)({nickname:t,status:1}).then(function(t){e.payOptions=t.data.data.map(function(t){return{id:t.id,nickname:t.nickname}}),e.payLoading=!1}))},getList:function(){var t=this;this.listLoading=!0,Object(s.c)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={id:void 0,group_name:"",pid:void 0}},handleCreate:function(){var t=this;this.getUserAccountGroupTree(),this.resetTemp(),this.typeDisable=!1,this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.tree.setCheckedKeys([]),t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&Object(s.a)(t.temp).then(function(e){t.getList(),t.dialogFormVisible=!1,t.total++,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(t){var e=this;this.payOptions=[],null!==t.pay_to_user_account&&0!==t.pay_to_user_account&&(this.payOptions=[t.pay_to_user_account]),this.temp=n()({},t),this.typeDisable=!0,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var i={};i.group_name=t.temp.group_name,i.user_account_group_id=t.temp.id,i.user_account_department_id=t.temp.user_account_department_id,i.user_account_type_id=t.temp.user_account_type.id,Object(s.e)(i).then(function(){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该分组, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={user_account_group_id:t.id};Object(s.b)(i).then(function(i){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=e.list.indexOf(t);e.list.splice(a,1),e.total--})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"组名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.group_name,callback:function(e){t.$set(t.listQuery,"group_name",e)},expression:"listQuery.group_name"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"排序"},on:{change:t.handleFilter},model:{value:t.listQuery.sort,callback:function(e){t.$set(t.listQuery,"sort",e)},expression:"listQuery.sort"}},t._l(t.sortOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加小组")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{stripe:!0,data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"ID",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"用户组名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"link-type",on:{click:function(i){t.handleUpdate(e.row)}}},[t._v(t._s(e.row.group_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"用户组类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:"info"}},[t._v(t._s(e.row.user_account_type.type_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"180px",align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.updated_at))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"320","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除\n        ")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"90%","margin-left":"5%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"80px"}},[i("el-form-item",{attrs:{label:"小组名称",prop:"group_name"}},[i("el-input",{staticStyle:{width:"200px"},model:{value:t.temp.group_name,callback:function(e){t.$set(t.temp,"group_name",e)},expression:"temp.group_name"}})],1),t._v(" "),"create"==t.dialogStatus?i("el-form-item",{attrs:{label:"小组关系"}},[i("span",{staticStyle:{color:"red","line-height":"20px"}},[t._v("\n          选择父级小组,不选择将视为根级小组\n        ")]),t._v(" "),i("el-tree",{ref:"tree",staticStyle:{border:"1px solid #e4e4e4"},attrs:{data:t.userAccountGroupTree,"show-checkbox":"","check-strictly":"","node-key":"id",props:t.defaultProps},on:{check:t.handlecheck}})],1):t._e()],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]},c=i("VU/8")(o,l,!1,null,null,null);e.default=c.exports}});