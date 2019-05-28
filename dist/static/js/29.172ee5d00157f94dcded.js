webpackJsonp([29],{AlD2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("woOf"),o=i.n(s),a=i("cAgV"),l=i("UgCr"),n=i("Z5Fx"),r={components:{},name:"deliverAddressExtre",directives:{waves:a.a},data:function(){return{temp_id:void 0,tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,textMap:{update:"编辑",create:"创建"},disabled_order_logistics_type_id:!1,dialogStatus:void 0,dialogFormVisible:!1,logisticsTypeOptions:[],logisticsTypeLoading:!1,productOptions:[],productLoading:!1,listQuery:{page:1,page_size:20,sort:"-id"},stateOptions:[{id:0,label:"有效操作"},{id:1,label:"无效操作"}],causeOptions:[{id:0,label:"系统原因"},{id:1,label:"发货错误"}],temp:{description:void 0,order_logistics_type_id:void 0,configs:{sf_monthly_account:void 0,delivery_product_name:void 0}},rules:{description:[{required:!0,message:"填写名称",trigger:"change"}],order_logistics_type_id:[{required:!0,message:"选择物流",trigger:"change"}],configs:{sf_monthly_account:[{required:!0,message:"填写月结账户",trigger:"change"}],delivery_product_name:[{required:!0,message:"填写发货产品名称",trigger:"change"}]}},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},watch:{dialogFormVisible:function(t){t||(this.$refs.dataForm.resetFields(),this.disabled_order_logistics_type_id=!1,this.temp={description:void 0,order_logistics_type_id:void 0,configs:{sf_monthly_account:void 0,delivery_product_name:void 0}})}},created:function(){this.getList(),this.queryLogisticsTypeList()},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},queryLogisticsTypeList:function(t){var e=this;""!==t&&(this.logisticsTypeLoading=!0,Object(n.r)({logistics_name:t}).then(function(t){e.logisticsTypeOptions=t.data.data,e.logisticsTypeLoading=!1}))},getList:function(){var t=this;this.listLoading=!0,Object(l.r)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&Object(l.createProductDeliverExtra)(t.temp).then(function(e){t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}),t.dialogFormVisible=!1,t.getList()})})},handleUpdate:function(t){var e=this;this.disabled_order_logistics_type_id=!0,this.temp_id=t.id,this.dialogStatus="update",this.dialogFormVisible=!0,this.temp.description=t.description,this.temp.order_logistics_type_id=t.order_logistics_type_id,this.temp.configs.delivery_product_name=t.configs.delivery_product_name,this.temp.configs.sf_monthly_account=t.configs.sf_monthly_account,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var i=o()({id:t.temp_id},t.temp);Object(l.w)(i).then(function(e){t.$notify({title:"成功",message:"修改成功",type:"success",duration:2e3}),t.dialogFormVisible=!1,t.getList()})}})},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加物流额外信息")]),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"ID",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"物流","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:"primary"}},[t._v(t._s(t.logisticsTypeOptions[t.logisticsTypeOptions.findIndex(function(t){return t.id==e.row.order_logistics_type_id})].name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"名称","min-width":"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.description))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){t.handleUpdate(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"150px"}},[i("el-form-item",{attrs:{label:"仓库",prop:"order_logistics_type_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",disabled:t.disabled_order_logistics_type_id,remote:"",placeholder:"请选择物流公司","remote-method":t.queryLogisticsTypeList,loading:t.logisticsTypeLoading},model:{value:t.temp.order_logistics_type_id,callback:function(e){t.$set(t.temp,"order_logistics_type_id",e)},expression:"temp.order_logistics_type_id"}},t._l(t.logisticsTypeOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"物流公司",prop:"order_logistics_type_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",disabled:t.disabled_order_logistics_type_id,remote:"",placeholder:"请选择物流公司","remote-method":t.queryLogisticsTypeList,loading:t.logisticsTypeLoading},model:{value:t.temp.order_logistics_type_id,callback:function(e){t.$set(t.temp,"order_logistics_type_id",e)},expression:"temp.order_logistics_type_id"}},t._l(t.logisticsTypeOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"额外信息名称",prop:"name"}},[i("el-input",{model:{value:t.temp.description,callback:function(e){t.$set(t.temp,"description",e)},expression:"temp.description"}})],1),t._v(" "),1===this.temp.order_logistics_type_id?i("el-form-item",{attrs:{label:"月结账号",prop:"configs.sf_monthly_account"}},[i("el-input",{model:{value:t.temp.configs.sf_monthly_account,callback:function(e){t.$set(t.temp.configs,"sf_monthly_account",e)},expression:"temp.configs.sf_monthly_account"}})],1):t._e(),t._v(" "),1===this.temp.order_logistics_type_id||6===this.temp.order_logistics_type_id?i("el-form-item",{attrs:{label:"发货产品名称",prop:"configs.delivery_product_name"}},[i("el-input",{model:{value:t.temp.configs.delivery_product_name,callback:function(e){t.$set(t.temp.configs,"delivery_product_name",e)},expression:"temp.configs.delivery_product_name"}})],1):t._e()],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]},c=i("VU/8")(r,d,!1,null,null,null);e.default=c.exports}});