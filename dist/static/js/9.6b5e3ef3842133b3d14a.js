webpackJsonp([9],{CtOT:function(e,n,t){"use strict";n.b=function(e){return Object(a.a)({url:"/api/aftersale/getAfterSaleList",method:"post",data:e})},n.a=function(e){return Object(a.a)({url:"/api/aftersale/getAfterSaleInfo",method:"post",data:e})},n.c=function(e){return Object(a.a)({url:"/api/aftersale/updateAfterSaleWarehouse",method:"post",data:e})};var a=t("vLgD")},E7HE:function(e,n,t){var a=t("hHmS");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("47be66c2",a,!0)},hHmS:function(e,n,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"nE+D":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("mvHQ"),r=t.n(a),i=t("cAgV"),l=t("CtOT"),s={name:"afterManageList",directives:{waves:i.a},data:function(){return{tableKey:0,listQuery:{page:1,page_size:10,date_range:[],after_sale_unique_id:void 0,orders_unique_id:void 0,customer_account_phone:void 0,procedure_status_array:[1,3,5]},temp:{},procedureOptions:[{key:1,label:"审核通过",value:1},{key:3,label:"已收到退货，货物数目错误",value:3},{key:5,label:"已收到退货，退货数目正确(换货)",value:5}],pickerOptions2:{},list:[],total:null,listLoading:!1}},filters:{procedureStatus:function(e){return{0:"未审核",1:"审核通过",2:"审核不通过",10:"完结",11:"关闭"}[e]}},created:function(){this.getList()},methods:{getList:function(){var e=this,n=JSON.parse(r()(this.listQuery));console.log(n),null!==n.procedure_status_array&&""!==n.procedure_status_array||(n.procedure_status_array=[1,3,5]),console.log(n),this.listLoading=!0,Object(l.b)(n).then(function(n){e.list=n.data.data,e.total=n.data.total,e.tableKey++,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},operation:function(e){this.$router.push({path:"/afterManage/afterDetails",query:{after_sale_id:e.id}})},handleSizeChange:function(e){this.listQuery.page_size=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()}}},u={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"filter-container"},[t("el-date-picker",{staticClass:"filter-item",staticStyle:{width:"280px"},attrs:{type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2},on:{change:e.handleFilter},model:{value:e.listQuery.date_range,callback:function(n){e.$set(e.listQuery,"date_range",n)},expression:"listQuery.date_range"}}),e._v(" "),t("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"订单号",clearable:""},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.handleFilter(n)}},model:{value:e.listQuery.orders_unique_id,callback:function(n){e.$set(e.listQuery,"orders_unique_id",n)},expression:"listQuery.orders_unique_id"}}),e._v(" "),t("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"售后单号",clearable:""},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.handleFilter(n)}},model:{value:e.listQuery.after_sale_unique_id,callback:function(n){e.$set(e.listQuery,"after_sale_unique_id",n)},expression:"listQuery.after_sale_unique_id"}}),e._v(" "),t("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"客户电话",clearable:""},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.handleFilter(n)}},model:{value:e.listQuery.customer_account_phone,callback:function(n){e.$set(e.listQuery,"customer_account_phone",n)},expression:"listQuery.customer_account_phone"}}),e._v(" "),t("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{clearable:""},on:{change:e.handleFilter},model:{value:e.listQuery.procedure_status_array,callback:function(n){e.$set(e.listQuery,"procedure_status_array",n)},expression:"listQuery.procedure_status_array"}},e._l(e.procedureOptions,function(e){return t("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})})),e._v(" "),t("div",{staticStyle:{float:"right"}},[t("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v("搜索")])],1)],1),e._v(" "),[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"给我一点时间",stripe:"",fit:"","highlight-current-row":"",border:""}},[t("el-table-column",{attrs:{label:"ID",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("span",[e._v(e._s(n.row.id))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"售后单号","min-width":"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("span",[e._v(e._s(n.row.sale_unique_id))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"name",label:"订单号","min-width":"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("span",[e._v(e._s(n.row.orders_unique_id))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"售后类型",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(n){return[1==n.row.after_sale_type_id?t("span",[e._v("退货")]):e._e(),e._v(" "),2==n.row.after_sale_type_id?t("span",[e._v("换货")]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"状态",align:"center","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(n){return[e._v("\n          "+e._s(e._f("procedureStatus")(n.row.procedure_status))+"\n        ")]}}])}),e._v(" "),t("el-table-column",{attrs:{"min-width":"150",align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("span",[e._v(e._s(n.row.created_at))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.operation(n.row)}}},[e._v("操作")])]}}])})],1),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[t("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(n){e.$set(e.listQuery,"page",n)}}})],1)]],2)},staticRenderFns:[]},o=t("VU/8")(s,u,!1,function(e){t("E7HE")},"data-v-4c8e46db",null);n.default=o.exports}});