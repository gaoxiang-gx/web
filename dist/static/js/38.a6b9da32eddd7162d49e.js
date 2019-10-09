webpackJsonp([38],{"n7/f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),n=i.n(a),o=i("cAgV"),r=(i("GGGG"),i("UgCr")),l=i("cjZW"),s=i("0xDb"),d={components:{},name:"manual_Management",directives:{waves:o.a},data:function(){return{tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,is_input:void 0,product_storage_manual_id:void 0,textMap:{update:"编辑",create:"创建"},dialogStatus:void 0,dialogFormVisible:!1,productOptions:[],productLoading:!1,warehouseLoading:!1,warehouseOptions:[],listQuery:{operate_type:void 0,is_input:void 0,date_range:[Object(s.a)(new Date((new Date).getTime()-6048e5),"{y}-{m}-{d}"),Object(s.a)(new Date,"{y}-{m}-{d}")],page:1,page_size:20,sort:"-id"},stateOptions:[{id:0,label:"出库"},{id:1,label:"入库"}],stateOptions2:[{id:0,label:"内部使用"},{id:1,label:"人工退货"}],temp:{warehouse_id:void 0,product_goods_storage_id:void 0,number:void 0,operate_type:void 0,info:void 0,is_input:void 0},rules:{product_goods_storage_id:[{required:!0,message:"选择商品",trigger:"change"}],number:[{validator:function(t,e,i){""===e?i(new Error("请输入数量")):"number"!=typeof e?i(new Error("输入数字!")):/[^\w]/g.test(e+"")?i(new Error("输入整数!")):i()},trigger:"change"}],operate_type:[{required:!0,message:"必选",trigger:"change"}],is_input:[{required:!0,message:"必选",trigger:"change"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},getList:function(){var t=this;this.listLoading=!0,Object(r.n)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},getWarehouseProductGoodsStorageList:function(t){var e=this;""!==t&&(this.productLoading=!0,Object(l.f)({warehouse_id:this.temp.warehouse_id,goods_name:t}).then(function(t){e.productOptions=t.data.data,e.productLoading=!1}))},handleWarehouse:function(){this.productOptions=[],this.temp.product_goods_id=void 0},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},getWarehouseList:function(){var t=this;Object(r.q)().then(function(e){t.warehouseOptions=e.data.data})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(0===t.temp.is_input&&(t.temp.number=0-t.temp.number),Object(r.c)(t.temp).then(function(e){t.getList(),t.dialogFormVisible=!1}))})},handleUpdate:function(t){var e=this;this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()}),-1===this.productOptions.findIndex(function(e){return e.id===t.product_goods.id})&&this.productOptions.push(t.product_goods),this.temp.product_goods_id=t.product_goods_id,this.temp.number=Math.abs(t.number),t.number>0?this.temp.is_input=1:this.temp.is_input=0,this.temp.info=t.info,this.temp.operate_type=t.operate_type,this.product_storage_manual_id=t.id},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){0===t.temp.is_input&&(t.temp.number=0-t.temp.number);var i=n()({product_storage_manual_id:t.product_storage_manual_id},t.temp);Object(r.t)(i).then(function(e){t.getList(),t.dialogFormVisible=!1})}})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={product_storage_manual_id:t.id};Object(r.h)(i).then(function(i){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=e.list.indexOf(t);e.list.splice(a,1),e.total--})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}},created:function(){this.getList(),this.getWarehouseList()},watch:{dialogFormVisible:function(t){t||(this.$refs.dataForm.resetFields(),this.temp={warehouse_id:void 0,number:void 0,product_goods_storage_id:void 0,operate_type:void 0,info:void 0,is_input:void 0})}},filters:{handleType:function(t){return{0:"内部使用",1:"人工退货"}[t]},handleTypeClass:function(t){return{0:"warning",1:"primary"}[t]}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.handleFilter},model:{value:t.listQuery.date_range,callback:function(e){t.$set(t.listQuery,"date_range",e)},expression:"listQuery.date_range"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"出入库"},on:{change:t.handleFilter},model:{value:t.listQuery.is_input,callback:function(e){t.$set(t.listQuery,"is_input",e)},expression:"listQuery.is_input"}},t._l(t.stateOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"操作状态"},on:{change:t.handleFilter},model:{value:t.listQuery.operate_type,callback:function(e){t.$set(t.listQuery,"operate_type",e)},expression:"listQuery.operate_type"}},t._l(t.stateOptions2,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"仓库","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.warehouse_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"商品名称","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.goods_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"出入库","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:e.row.number<0?"danger":"success"}},[t._v(t._s(e.row.number<0?"出库":"入库"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作类型","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:t._f("handleTypeClass")(e.row.operate_type)}},[t._v(t._s(t._f("handleType")(e.row.operate_type)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"数量","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.number))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"备注","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.info))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作人","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.operator_account_name))]),i("br"),t._v(" "),i("span",[t._v(t._s(e.row.datetime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"商品",prop:"product_goods_storage_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"请选择商品","remote-method":t.getWarehouseProductGoodsStorageList,loading:t.productLoading},model:{value:t.temp.product_goods_storage_id,callback:function(e){t.$set(t.temp,"product_goods_storage_id",e)},expression:"temp.product_goods_storage_id"}},t._l(t.productOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.product_goods.goods_name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"商品数量",prop:"number"}},[i("el-input-number",{staticStyle:{width:"100%"},model:{value:t.temp.number,callback:function(e){t.$set(t.temp,"number",t._n(e))},expression:"temp.number"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出入库",prop:"is_input"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"出入库"},model:{value:t.temp.is_input,callback:function(e){t.$set(t.temp,"is_input",e)},expression:"temp.is_input"}},t._l(t.stateOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"操作类型",prop:"operate_type"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"操作状态"},model:{value:t.temp.operate_type,callback:function(e){t.$set(t.temp,"operate_type",e)},expression:"temp.operate_type"}},t._l(t.stateOptions2,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea"},model:{value:t.temp.info,callback:function(e){t.$set(t.temp,"info",e)},expression:"temp.info"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]},c=i("VU/8")(d,u,!1,null,null,null);e.default=c.exports}});