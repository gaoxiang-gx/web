webpackJsonp([32],{ix0V:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("aA9S"),l=a.n(i),n=a("Pfph"),s={name:"PortSetting",data:function(){var t=this;return{list:[],data:[],total:null,menuArry:[],listLoading:!1,dialogFormVisible:!1,tableKey:0,dialogStatus:"",dialogTitle:{update:"编辑",create:"创建"},dafaulrOptions:[{value:0,label:"全部数据"},{value:1,label:"本人数据"},{value:2,label:"本组数据"},{value:3,label:"本组及其子组数据"}],defaultProps:{children:"children",label:"menu_name"},listQuery:{page:1,page_size:20,sort:"-created_at",auth_code:void 0,auth_name:void 0},temp:{user_account_auth_id:void 0,auth_name:void 0,auth_code:void 0,auth_grade:void 0,sub_auth:void 0,filter_params:void 0,default_params:void 0},tempData:{user_account_auth_id:void 0,menu_list:[]},rules:{auth_name:[{required:!0,message:"接口名称",trigger:"change"}],auth_code:[{required:!0,trigger:"blur",validator:function(e,a,i){/^[a-zA-Z_]*\/[a-zA-Z_]*\/[a-zA-Z_]*$/.test(t.temp.auth_code)?i():i(new Error("请输入正确格式"))}}]},updataData:void 0}},filters:{statusGradeColor:function(t){return{0:"success",1:"danger",2:"warning",3:"info"}[t]},statusGradeText:function(t){return{0:"全部数据",1:"本人数据",2:"本组数据",3:"本组及子组数据"}[t]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(n.k)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleInnerSizeChange1:function(t){this.listQuery.page_size=t,this.getList()},handleInnerCurrentChange1:function(t){this.listQuery.page=t,this.getList()},resetTemp:function(){this.temp={user_account_auth_id:void 0,auth_name:void 0,auth_code:void 0,sub_auth:void 0,filter_params:void 0,default_params:void 0}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.innerDataForm1.clearValidate()})},createAuth:function(){var t=this;this.$refs.innerDataForm1.validate(function(e){e&&Object(n.a)(t.temp).then(function(e){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"编辑成功",type:"success",duration:2e3})})})},handleUpdate:function(t){this.temp=l()({user_account_auth_id:t.id},t),this.dialogStatus="update",this.dialogFormVisible=!0},updateAuth:function(){var t=this;this.$refs.innerDataForm1.validate(function(e){e&&Object(n.o)(t.temp).then(function(e){t.getList(),t.$notify({title:"成功",message:"编辑成功",type:"success",duration:2e3}),t.dialogFormVisible=!1})})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该接口, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.d)({user_account_auth_id:t.id}).then(function(a){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=e.list.indexOf(t);e.list.splice(i,1),e.total--})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{clearable:"",placeholder:"接口名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.auth_name,callback:function(e){t.$set(t.listQuery,"auth_name",e)},expression:"listQuery.auth_name"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{clearable:"",placeholder:"代码名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.auth_code,callback:function(e){t.$set(t.listQuery,"auth_code",e)},expression:"listQuery.auth_code"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v("创建接口")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{stripe:"",data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{"min-width":"70px",align:"center",label:"接口名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"link-type",on:{click:function(a){t.handleUpdate(e.row)}}},[t._v(t._s(e.row.auth_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"接口代码"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.auth_code))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"50",align:"center",label:"权限细分"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.sub_auth?a("el-tag",{attrs:{type:"primary"}},[t._v(t._s(e.row.sub_auth))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"50",align:"center",label:"权限等级"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("statusGradeColor")(e.row.auth_grade)}},[t._v(t._s(t._f("statusGradeText")(e.row.auth_grade)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.updated_at))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,50,100],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleInnerSizeChange1,"current-change":t.handleInnerCurrentChange1,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"innerDataForm1",staticStyle:{width:"500px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"权限名称",prop:"auth_name"}},[a("el-input",{model:{value:t.temp.auth_name,callback:function(e){t.$set(t.temp,"auth_name",e)},expression:"temp.auth_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限API",prop:"auth_code"}},[a("el-input",{model:{value:t.temp.auth_code,callback:function(e){t.$set(t.temp,"auth_code",e)},expression:"temp.auth_code"}},[a("template",{slot:"append"},[t._v("使用 / 间隔")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"权限细分",prop:"sub_auth"}},[a("el-input",{model:{value:t.temp.sub_auth,callback:function(e){t.$set(t.temp,"sub_auth",e)},expression:"temp.sub_auth"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"允许传递参数"}},[a("el-input",{model:{value:t.temp.filter_params,callback:function(e){t.$set(t.temp,"filter_params",e)},expression:"temp.filter_params"}},[a("template",{slot:"append"},[t._v("使用 , 间隔")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"限制参数"}},[a("el-input",{model:{value:t.temp.default_params,callback:function(e){t.$set(t.temp,"default_params",e)},expression:"temp.default_params"}},[a("template",{slot:"append"},[t._v("使用 , 间隔")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"权限等级"}},[a("el-select",{model:{value:t.temp.auth_grade,callback:function(e){t.$set(t.temp,"auth_grade",e)},expression:"temp.auth_grade"}},t._l(t.dafaulrOptions,function(t){return a("el-option",{attrs:{id:t.value,value:t.value,label:t.label}})}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createAuth}},[t._v("创 建")]):t._e(),t._v(" "),"update"===t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.updateAuth}},[t._v("确 定")]):t._e()],1)],1)],1)},staticRenderFns:[]},o=a("/Xao")(s,r,!1,null,null,null);e.default=o.exports}});