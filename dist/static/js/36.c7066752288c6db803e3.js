webpackJsonp([36],{"6kne":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("cAgV"),o=i("cjZW"),n=i("GGGG"),s=i("UgCr"),r=i("0xDb"),l={components:{},name:"purchaseInStorage",directives:{waves:a.a},data:function(){return{tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,textMap:{update:"编辑",create:"创建"},dialogStatus:void 0,dialogFormVisible:!1,importGoodsOptions:[],importGoodsLoading:!1,commonBaseLoading:!1,commonBaseOptions:[],warehouseOptions:[],warehouseLoading:!1,listQuery:{date_range:[Object(r.a)(new Date((new Date).getTime()-6048e5),"{y}-{m}-{d}"),Object(r.a)(new Date,"{y}-{m}-{d}")],page:1,page_size:20,sort:"-id"},stateOptions:[{id:0,label:"有效操作"},{id:1,label:"无效操作"}],product_storage_import_id:void 0,temp:{warehouse_id:void 0,product_goods_id:void 0,number:void 0},rules:{product_goods_id:[{required:!0,message:"选择商品",trigger:"change"}],number:[{required:!0,message:"填写数量",trigger:"change"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},getList:function(){var t=this;this.listLoading=!0,Object(o.c)(this.listQuery).then(function(e){t.list=e.data.data,t.tableKey++,t.total=e.data.total,t.listLoading=!1})},handleFilterCommonBase:function(){this.temp.product_goods_id=void 0,this.importGoodsOptions=[]},resetTemp:function(){this.temp={warehouse_id:void 0,product_goods_id:void 0,number:void 0}},getWarehouseList:function(){var t=this;Object(s.q)().then(function(e){t.warehouseOptions=e.data.data})},getProductGoodsCommonBaseList:function(t){var e=this;""!==t&&(this.commonBaseLoading=!0,Object(n.c)({goods_name:t}).then(function(t){e.commonBaseOptions=t.data.data,e.commonBaseLoading=!1}))},handleCreate:function(){var t=this;this.resetTemp(),this.importGoodsOptions=[],this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&Object(o.a)(t.temp).then(function(){t.getList(),t.dialogFormVisible=!1})})},handleUpdate:function(t){var e=this;this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()}),this.product_storage_import_id=t.id,this.temp.product_goods_id=t.product_goods_id,this.temp.number=t.number},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={product_storage_import_id:t.id};Object(o.b)(i).then(function(t){e.getList(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}},created:function(){this.getList(),this.getWarehouseList()}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("div",{staticClass:"filter-item"},[i("div",{staticClass:"filter-label"},[t._v("日期")]),t._v(" "),i("el-date-picker",{attrs:{size:"small",type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},on:{change:t.handleFilter},model:{value:t.listQuery.date_range,callback:function(e){t.$set(t.listQuery,"date_range",e)},expression:"listQuery.date_range"}})],1),t._v(" "),i("div",{staticClass:"filter-float"},[i("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("入库")])],1)]),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"仓库","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.warehouse_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"商品","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.goods_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"数量","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.number))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作人","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.operator_account_name))]),i("br"),t._v(" "),i("span",[t._v(t._s(e.row.datetime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"80%","margin-left":"10%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"80px"}},[i("el-form-item",{attrs:{label:"商品"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"选择商品","remote-method":t.getProductGoodsCommonBaseList,loading:t.commonBaseLoading},on:{focus:function(e){t.getProductGoodsCommonBaseList(" ")}},model:{value:t.temp.product_goods_id,callback:function(e){t.$set(t.temp,"product_goods_id",e)},expression:"temp.product_goods_id"}},t._l(t.commonBaseOptions,function(t){return i("el-option",{key:t.id,attrs:{label:t.goods_name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"商品数量",prop:"number"}},[i("el-input-number",{staticStyle:{width:"50%"},model:{value:t.temp.number,callback:function(e){t.$set(t.temp,"number",t._n(e))},expression:"temp.number"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"===t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):t._e()],1)],1)],1)},staticRenderFns:[]},c=i("VU/8")(l,d,!1,null,null,null);e.default=c.exports}});