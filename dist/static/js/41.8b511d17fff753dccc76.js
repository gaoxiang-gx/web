webpackJsonp([41],{Qw0T:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("cAgV"),a=i("cjZW"),n=i("UgCr"),s={components:{},name:"inventoryManagement",directives:{waves:o.a},data:function(){return{tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,textMap:{update:"编辑",create:"创建"},warehouseLoading:!1,warehouseOptions:[],dialogStatus:void 0,dialogFormVisible:!1,productOptions:[],productOptions2:[],productLoading:!1,productLoading2:!1,listQuery:{product_id:void 0,warehouse_id:void 0,date_range:"",page:1,page_size:20,sort:"-id"},stateOptions:[{id:0,label:"有效操作"},{id:1,label:"无效操作"}],causeOptions:[{id:0,label:"系统原因"},{id:1,label:"发货错误"}],temp:{warehouse_id:void 0,product_goods_storage_id:void 0,origin_num:void 0,checked_num:void 0,adjust_type_id:void 0,info:void 0},rules:{warehouse_id:[{required:!0,message:"选择仓库",trigger:"change"}],product_goods_storage_id:[{required:!0,message:"选择商品",trigger:"change"}],checked_num:[{validator:function(t,e,i){""===e?i(new Error("请输入数量")):"number"!=typeof e?i(new Error("输入数字")):/[^\w]/g.test(e+"")?i(new Error("输入正整数")):i()},trigger:"change"}],adjust_type_id:[{required:!0,message:"必选差异原因",trigger:"change"}],info:[{required:!0,message:"备注",trigger:"change"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},handleFilterWarehouse:function(){this.temp.product_goods_storage_id=void 0,this.productOptions2=[],this.origin_num=void 0,this.checked_num=void 0},handleWarehouse:function(){this.listQuery.product_goods_id=void 0,this.productOptions=[],this.handleFilter()},getList:function(){var t=this;this.listLoading=!0,Object(n.k)(this.listQuery).then(function(e){t.list=e.data.data,t.listLoading=!1,t.total=e.data.total})},getWarehouseList:function(){var t=this;Object(n.q)().then(function(e){t.warehouseOptions=e.data.data})},getWarehouseProductGoodsStorageList:function(t){var e=this;""!==t&&(this.productLoading=!0,Object(a.e)({warehouse_id:this.listQuery.warehouse_id,goods_name:t}).then(function(t){e.productOptions=t.data.data,e.productLoading=!1}))},getProductList2:function(t){var e=this;""!==t&&(this.productLoading2=!0,Object(a.e)({warehouse_id:this.temp.warehouse_id,goods_name:t}).then(function(t){e.productOptions2=t.data.data,e.productLoading2=!1}))},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(Object(n.b)(t.temp).then(function(e){t.getList()}),t.dialogFormVisible=!1)})},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}},watch:{dialogFormVisible:function(t){t||(this.$refs.dataForm.resetFields(),this.productOptions2=[],this.temp={warehouse_id:void 0,product_goods_storage_id:void 0,origin_num:void 0,checked_num:void 0,adjust_type_id:void 0,info:void 0})}},filters:{handleType:function(t){return{0:"系统原因",1:"发货错误"}[t]},handleTypeClass:function(t){return{0:"success",1:"primary"}[t]}},created:function(){this.getList(),this.getWarehouseList()}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("div",{staticClass:"filter-item"},[i("div",{staticClass:"filter-label"},[t._v("日期")]),t._v(" "),i("el-date-picker",{attrs:{size:"small",type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.handleFilter},model:{value:t.listQuery.date_range,callback:function(e){t.$set(t.listQuery,"date_range",e)},expression:"listQuery.date_range"}})],1),t._v(" "),i("div",{staticClass:"filter-item"},[i("div",{staticClass:"filter-label"},[t._v("商品")]),t._v(" "),i("el-select",{staticStyle:{width:"200px"},attrs:{size:"small",filterable:"",clearable:"",remote:"",placeholder:"选择","remote-method":t.getWarehouseProductGoodsStorageList,loading:t.productLoading},on:{change:t.handleFilter,focus:function(e){t.getWarehouseProductGoodsStorageList(" ")}},model:{value:t.listQuery.product_goods_id,callback:function(e){t.$set(t.listQuery,"product_goods_id",e)},expression:"listQuery.product_goods_id"}},t._l(t.productOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.product_goods.goods_name,value:t.id}})}))],1),t._v(" "),i("div",{staticClass:"filter-float"},[i("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1)]),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"商品名称","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.goods_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"账面数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.origin_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"稽查数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.checked_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"差异数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.origin_num>e.row.checked_num?i("span",{staticStyle:{color:"#f56c6c","font-size":"20px","font-weight":"600"}},[t._v(t._s(e.row.checked_num-e.row.origin_num))]):i("span",{staticStyle:{color:"#67c23a","font-size":"20px","font-weight":"600"}},[t._v(t._s(e.row.checked_num-e.row.origin_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"差异原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("handleType")(e.row.adjust_type_id)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"备注","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.info))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"稽查人","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.operator_account_name))]),i("br"),t._v(" "),i("span",[t._v(t._s(e.row.datetime))])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"选择商品",prop:"product_goods_storage_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"请选择商品","remote-method":t.getProductList2,loading:t.productLoading2},on:{change:function(e){t.temp.origin_num=t.productOptions2.find(function(e){return e.id===t.temp.product_goods_storage_id}).stock,t.temp.checked_num=t.productOptions2.find(function(e){return e.id===t.temp.product_goods_storage_id}).stock}},model:{value:t.temp.product_goods_storage_id,callback:function(e){t.$set(t.temp,"product_goods_storage_id",e)},expression:"temp.product_goods_storage_id"}},t._l(t.productOptions2,function(t){return i("el-option",{key:t.id,attrs:{label:t.product_goods.goods_name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"账面数量",prop:"origin_num"}},[i("div",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.temp.origin_num))])]),t._v(" "),i("el-form-item",{attrs:{label:"稽查数量",prop:"checked_num"}},[i("el-input-number",{staticStyle:{width:"100%"},model:{value:t.temp.checked_num,callback:function(e){t.$set(t.temp,"checked_num",t._n(e))},expression:"temp.checked_num"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"差异原因",prop:"adjust_type_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"原因"},model:{value:t.temp.adjust_type_id,callback:function(e){t.$set(t.temp,"adjust_type_id",e)},expression:"temp.adjust_type_id"}},t._l(t.causeOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"备注",prop:"info"}},[i("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea"},model:{value:t.temp.info,callback:function(e){t.$set(t.temp,"info",e)},expression:"temp.info"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):t._e()],1)],1)],1)},staticRenderFns:[]},l=i("VU/8")(s,r,!1,null,null,null);e.default=l.exports}});