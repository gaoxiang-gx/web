webpackJsonp([39],{CwuW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("cAgV"),n=a("UgCr"),s=(a("GGGG"),a("cjZW")),l=a("0xDb"),o={components:{},name:"inventoryStatistics",directives:{waves:i.a},data:function(){return{tableKey:0,scrollTop:0,list:null,total:null,listLoading:!1,typeOptions:[{id:0,label:"出库"},{id:1,label:"入库"}],typeOptions2:[{id:0,label:"客户下单"},{id:1,label:"盘货整理"},{id:2,label:"订货到货"},{id:3,label:"客户退货"},{id:4,label:"人工出入库"}],typeOptions3:[{id:0,label:"有效操作"},{id:1,label:"无效操作"}],productOptions:[],productLoading:!1,listQuery:{product_goods_id:void 0,operate_type:void 0,date_range:[Object(l.a)(new Date((new Date).getTime()-6048e5),"{y}-{m}-{d}"),Object(l.a)(new Date,"{y}-{m}-{d}")],is_input:void 0,page:1,page_size:20,sort:"-id"},warehouseOptions:[],productGoodsOptions:[],productGoodsLoading:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},methods:{handleFilter:function(){this.listQuery.page=1,this.getList()},getList:function(){var e=this;this.listLoading=!0,Object(n.m)(this.listQuery).then(function(t){e.list=t.data.data,e.listLoading=!1,e.total=t.data.total})},getWarehouseList:function(){var e=this;Object(n.q)().then(function(t){e.warehouseOptions=t.data.data})},getWarehouseProductGoodsStorageList:function(e){var t=this;if(!this.listQuery.warehouse_id)return this.$message.error("先选择仓库"),!1;""!==e&&(this.productGoodsLoading=!0,Object(s.e)({warehouse_id:this.listQuery.warehouse_id,goods_name:e}).then(function(e){t.productGoodsOptions=e.data.data,t.productGoodsLoading=!1}))},handleWarehouse:function(){this.listQuery.product_goods_id=void 0,this.productGoodsOptions=[],this.handleFilter()},handleSizeChange:function(e){this.listQuery.page_size=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()}},filters:{handleType:function(e){return{0:"客户下单",1:"盘货整理",2:"订货到货",3:"客户退单",4:"人工出入库"}[e]},handleTypeClass:function(e){return{0:"danger",1:"primary",2:"success",3:"warning",4:"info"}[e]}},created:function(){this.getList(),this.getWarehouseList()}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"",clearable:!1,"range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},on:{change:e.handleFilter},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"出入库"},on:{change:e.handleFilter},model:{value:e.listQuery.is_input,callback:function(t){e.$set(e.listQuery,"is_input",t)},expression:"listQuery.is_input"}},e._l(e.typeOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"操作类型"},on:{change:e.handleFilter},model:{value:e.listQuery.operate_type,callback:function(t){e.$set(e.listQuery,"operate_type",t)},expression:"listQuery.operate_type"}},e._l(e.typeOptions2,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{filterable:"",clearable:"",remote:"",placeholder:"商品","remote-method":e.getWarehouseProductGoodsStorageList,loading:e.productGoodsLoading},on:{change:e.handleFilter,focus:function(t){e.getWarehouseProductGoodsStorageList(" ")}},model:{value:e.listQuery.product_goods_id,callback:function(t){e.$set(e.listQuery,"product_goods_id",t)},expression:"listQuery.product_goods_id"}},e._l(e.productGoodsOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.product_goods.goods_name,value:e.id}})})),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[a("el-table-column",{attrs:{align:"center",label:"仓库","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.warehouse_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"商品名称","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.goods_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"出入库","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.number>0?a("el-tag",{attrs:{type:"success"}},[e._v("入库")]):a("el-tag",{attrs:{type:"danger"}},[e._v("出库")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作类型","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("handleTypeClass")(t.row.operate_type)}},[e._v(e._s(e._f("handleType")(t.row.operate_type)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"数量","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.number>0?a("span",{staticStyle:{color:"#67c23a","font-size":"20px","font-weight":"600"}},[e._v(e._s(t.row.number))]):a("span",{staticStyle:{color:"#f56c6c","font-size":"20px","font-weight":"600"}},[e._v(e._s(t.row.number))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作人","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.operator_account_name))]),a("br"),e._v(" "),a("span",[e._v(e._s(t.row.datetime))])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"page",t)}}})],1)],1)])},staticRenderFns:[]},d=a("VU/8")(o,r,!1,null,null,null);t.default=d.exports}});