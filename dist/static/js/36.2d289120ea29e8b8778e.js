webpackJsonp([36],{Qw0T:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("cAgV"),n=i("GGGG"),o=i("UgCr"),l={components:{},name:"inventoryManagement",directives:{waves:a.a},data:function(){return{tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,textMap:{update:"编辑",create:"创建"},dialogStatus:void 0,dialogFormVisible:!1,productOptions:[],productOptions2:[],productLoading:!1,productLoading2:!1,listQuery:{product_id:void 0,date_range:"",page:1,page_size:20,sort:"-id"},stateOptions:[{id:0,label:"有效操作"},{id:1,label:"无效操作"}],causeOptions:[{id:0,label:"系统原因"},{id:1,label:"发货错误"}],temp:{product_goods_id:void 0,origin_num:void 0,checked_num:void 0,adjust_type_id:void 0,info:void 0},rules:{product_goods_id:[{required:!0,message:"选择商品",trigger:"change"}],checked_num:[{validator:function(t,e,i){""===e?i(new Error("请输入数量")):"number"!=typeof e?i(new Error("输入数字!")):/[^\w]/g.test(e+"")?i(new Error("输入整数!")):i()},trigger:"change"}],adjust_type_id:[{required:!0,message:"必选差异原因",trigger:"change"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},getList:function(){var t=this;this.listLoading=!0,Object(o.p)(this.listQuery).then(function(e){t.list=e.data.data,t.listLoading=!1,t.total=e.data.total})},getProductList:function(t){var e=this;""!==t&&(this.productLoading=!0,Object(n.e)({goods_name:t,status:1}).then(function(t){e.productOptions=t.data.data,e.productLoading=!1}))},getProductList2:function(t){var e=this;""!==t&&(this.productLoading2=!0,Object(n.e)({goods_name:t,status:1}).then(function(t){e.productOptions2=t.data.data,e.productLoading2=!1}))},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(Object(o.d)(t.temp).then(function(e){t.getList()}),t.dialogFormVisible=!1)})},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleUpdate:function(){},updateData:function(){},handleDelete:function(){}},watch:{dialogFormVisible:function(t){t||(this.$refs.dataForm.resetFields(),this.productOptions2=[],this.temp.info=void 0)}},filters:{handleType:function(t){return{0:"系统原因",1:"发货错误"}[t]},handleTypeClass:function(t){return{0:"success",1:"primary"}[t]}},created:function(){this.getProductList(" "),this.getList()}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.handleFilter},model:{value:t.listQuery.date_range,callback:function(e){t.$set(t.listQuery,"date_range",e)},expression:"listQuery.date_range"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"请选择商品","remote-method":t.getProductList,loading:t.productLoading},on:{change:t.handleFilter},model:{value:t.listQuery.product_goods_id,callback:function(e){t.$set(t.listQuery,"product_goods_id",e)},expression:"listQuery.product_goods_id"}},t._l(t.productOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.goods_name,value:t.id}})})),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"商品名称","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.product_goods.goods_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"盘货日期","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.datetime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"账面数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.origin_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"稽查数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.checked_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"差异数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.origin_num>e.row.checked_num?i("span",{staticStyle:{color:"#f56c6c","font-size":"20px","font-weight":"600"}},[t._v(t._s(e.row.checked_num-e.row.origin_num))]):i("span",{staticStyle:{color:"#67c23a","font-size":"20px","font-weight":"600"}},[t._v(t._s(e.row.checked_num-e.row.origin_num))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"差异原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("handleType")(e.row.adjust_type_id)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"备注","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.info))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"稽查人","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.operator_account.nickname))])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"选择商品",prop:"product_goods_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"请选择商品","remote-method":t.getProductList2,loading:t.productLoading2},on:{change:function(e){t.temp.origin_num=t.productOptions2[t.productOptions2.findIndex(function(e){return e.id===t.temp.product_goods_id})].stock,t.temp.checked_num=t.productOptions2[t.productOptions2.findIndex(function(e){return e.id===t.temp.product_goods_id})].stock}},model:{value:t.temp.product_goods_id,callback:function(e){t.$set(t.temp,"product_goods_id",e)},expression:"temp.product_goods_id"}},t._l(t.productOptions2,function(t){return i("el-option",{key:t.id,attrs:{label:t.goods_name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"账面数量",prop:"origin_num"}},[i("el-input",{staticStyle:{width:"100%","text-align":"center"},attrs:{disabled:""},model:{value:t.temp.origin_num,callback:function(e){t.$set(t.temp,"origin_num",t._n(e))},expression:"temp.origin_num"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"稽查数量",prop:"checked_num"}},[i("el-input-number",{staticStyle:{width:"100%"},model:{value:t.temp.checked_num,callback:function(e){t.$set(t.temp,"checked_num",t._n(e))},expression:"temp.checked_num"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"差异原因",prop:"adjust_type_id"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"原因"},model:{value:t.temp.adjust_type_id,callback:function(e){t.$set(t.temp,"adjust_type_id",e)},expression:"temp.adjust_type_id"}},t._l(t.causeOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea"},model:{value:t.temp.info,callback:function(e){t.$set(t.temp,"info",e)},expression:"temp.info"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]},s=i("VU/8")(l,r,!1,null,null,null);e.default=s.exports}});