webpackJsonp([37],{GP3j:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Z5Fx"),s=i("vMJZ"),o={name:"logisticsDynamics",components:{},directives:{waves:i("cAgV").a},data:function(){return{scrollTop:0,ifExpandAll:!0,tableKey:0,list:null,total:null,listLoading:!0,listQuery:{date_range:"",promotion_user_account_id:void 0,page:1,page_size:20,weixin_fans_address_phone:"",sort:"-id",orders_unique_id:"",orders_logistics_number:"",support_member_nickname:"",product_name:"",status:""},importanceOptions:[1,2,3],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:[{key:1,label:"未确认"},{key:2,label:"待发货"},{key:3,label:"发货中"},{key:4,label:"断货中"},{key:5,label:"已签收"},{key:6,label:"已拒收"},{key:7,label:"已完成"}],showAuditor:!1,temp:{id:void 0,orders_unique_id:"",support_user_account_id:void 0,product_weixin_id:void 0,product_weixin_fans_id:void 0,product_weixin_fans_address_id:void 0,price_total:void 0,actual_pay:0,status:1,orders_items:[],support_member:{id:void 0,user_id:void 0,nickname:"",head_img:"",user_account_type_id:void 0,user_account_group_id:void 0,user_account_role_id:void 0,status:void 0},product_weixin:{id:void 0,product_id:void 0,promotion_user_account_id:void 0,support_user_account_id:void 0,promotion_channel_id:void 0,weixin_nickname:"",weixin_account:"",phone:"",qq:"",promotion_channel:{id:void 0,channel_name:""},product_goods:{id:void 0,goods_name:"",price:void 0,stock:void 0}},product_weixin_fans_address:{id:void 0,product_weixin_fans_id:void 0,receive_name:"",phone:"",postcode:"",address:"",remark:""},product_weixin_fans:{id:void 0,product_weixin_id:void 0,weixin_account:"",weixin_nickname:"",default_address_id:void 0,created_at:""},orders_remarks:[],orders_payment:{id:void 0,orders_id:void 0,payment_total:void 0,status:1,orders_payment_items:[]},orders_logistics:{id:void 0,logistics_type_id:void 0,logistics_name:"",logistics_number:"",orders_logistics_type:{id:void 0,name:"",code:""}}},tempOrdersPaymentItem:{id:void 0,orders_payment_id:void 0,paid_money:void 0,pay_type_id:void 0,pay_proof_id:void 0,created_at:"",orders_pay_type:{id:void 0,type_name:""}},tempOrderRemark:{id:void 0,orders_id:void 0,user_account_id:void 0,user_account_type_id:void 0,remark:"",created_at:""},tempOrdersItem:{id:void 0,product_id:void 0,orders_id:void 0,number:void 0,product:{id:void 0,product_name:"",price:void 0,stock:void 0,is_promote:void 0}},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{product_name:[{required:!0,message:"请正确填写商品名称",trigger:"change"}]},promotionUserAccountOptions:[],promotionUserAccountLoading:!1,pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]}}},filters:{statusFilter:function(e){return{1:"success",2:"info",3:"danger"}[e]},statusTranslator:function(e){return{1:"推广",2:"附属产品",3:"赠品"}[e]},orderStatusFilter:function(e){return{0:"info",1:"warning",2:"",3:"",4:"",5:"",6:"danger",7:"success",8:"",9:"danger"}[e]},orderStatusTranslator:function(e){return{0:"无效订单",1:"未确认",2:"待发货",3:"发货中",4:"断货中",5:"已签收",6:"已拒收",7:"已完成",8:"已退回",9:"已废弃"}[e]},paymentItemStatusFilter:function(e){return{0:"info",1:"success",2:"danger",3:""}[e]},paymentItemStatusTranslator:function(e){return{0:"未确认",1:"已确认",2:"已删除",3:"已提现"}[e]},userTypeStatusTranslator:function(e){return{1:"推广",2:"客服",3:"文案",4:"库管",5:"管理员"}[e]}},created:function(){this.getList(),this.getPromotionUserAccountList(" ")},methods:{handleModifyStatus:function(e,t){var i=this,s={};s.orders_id=e.id,s.status=t,Object(n.A)(s).then(function(){i.$message({message:"操作成功",type:"success"}),e.status=t})},getPromotionUserAccountList:function(e){var t=this;""!==e&&(this.promotionUserAccountLoading=!0,Object(s.d)({nickname:e,user_account_type_code:"promote",status:1}).then(function(e){t.promotionUserAccountOptions=e.data.data,t.promotionUserAccountLoading=!1}))},handleDeliverOrders:function(e,t){var i={orders_id:e.id,is_empty:t};Object(n.k)(i).then(function(i){e.status=0===t?3:4}).catch(function(){})},handleHandleOrders:function(e,t){var i={orders_id:e.id,is_receive:t};Object(n.y)(i).then(function(i){e.status=0===t?6:5}).catch(function(){})},handleResultOrders:function(e){var t={orders_id:e.id};Object(n.z)(t).then(function(t){e.status=7})},getList:function(){var e=this;this.listLoading=!0,Object(n.q)(this.listQuery).then(function(t){e.list=t.data.data,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.page_size=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCheckOrders:function(e){Object(n.a)({orders_id:e.id}).then(function(t){e.status=2})},downExcel:function(){var e=document.createElement("form");e.action="https://warehouse.api.7055.net/api/orders/downloadNeedCheckOrder?token="+this.$store.state.user.token,e.method="post",e.style.display="none";var t=document.createElement("input");t.type="submit",e.appendChild(t),document.body.appendChild(e),e.submit(),document.body.removeChild(e)}},deactivated:function(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},activated:function(){window.scrollTo(0,this.scrollTop)}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"~","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2},on:{change:e.handleFilter},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}}),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"订单号"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.orders_unique_id,callback:function(t){e.$set(e.listQuery,"orders_unique_id",t)},expression:"listQuery.orders_unique_id"}}),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"物流单号"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.orders_logistics_number,callback:function(t){e.$set(e.listQuery,"orders_logistics_number",t)},expression:"listQuery.orders_logistics_number"}}),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"客服"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.support_member_nickname,callback:function(t){e.$set(e.listQuery,"support_member_nickname",t)},expression:"listQuery.support_member_nickname"}}),e._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{clearable:"",placeholder:"订单状态"},on:{change:e.handleFilter},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.statusOptions,function(e){return i("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),i("p",{staticStyle:{"text-align":"right","padding-right":"20px","font-size":"22px"}},[i("el-button",{attrs:{icon:"el-icon-download",size:"small",type:"primary"},on:{click:e.downExcel}},[e._v("导出未收货订单")])],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{stripe:!0,data:e.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"订单号","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.orders_unique_id))])]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"80px",align:"center",label:"客服"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.support_member.nickname))]),e._v(" "),i("p",[e._v("("+e._s(t.row.support_member.user_account_group.group_name)+")")])]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"物流类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.orders_logistics.logistics_name?i("span",[e._v(e._s(t.row.orders_logistics.logistics_name))]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"150px",align:"center",label:"物流单号"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.orders_logistics.logistics_number?i("span",[e._v(e._s(t.row.orders_logistics.logistics_number))]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"订单金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v("￥"+e._s(t.row.actual_pay))])]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"代收金额"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.orders_payment.orders_payment_items,function(t){return i("p",[2===t.pay_type_id?i("span",[e._v("\n            ￥"+e._s(t.paid_money)+"\n          ")]):e._e()])})}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:e._f("orderStatusFilter")(t.row.status)}},[e._v(e._s(e._f("orderStatusTranslator")(t.row.status)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"160px",align:"center",label:"发货时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.deliver_date))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作","min-width":"300","class-name":"small-padding"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.status?i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleCheckOrders(t.row)}}},[e._v("确认订单")]):e._e(),e._v(" "),2===t.row.status?i("el-button",{attrs:{size:"small",type:"info"},on:{click:function(i){e.handleModifyStatus(t.row,1)}}},[e._v("未确认")]):e._e(),e._v(" "),2===t.row.status||4===t.row.status?i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleDeliverOrders(t.row,0)}}},[e._v("确认发货")]):e._e(),e._v(" "),2===t.row.status?i("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(i){e.handleDeliverOrders(t.row,1)}}},[e._v("已断货")]):e._e(),e._v(" "),3===t.row.status?i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleHandleOrders(t.row,1)}}},[e._v("确认签收")]):e._e(),e._v(" "),3===t.row.status?i("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(i){e.handleHandleOrders(t.row,0)}}},[e._v("已拒收")]):e._e(),e._v(" "),5===t.row.status?i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleResultOrders(t.row)}}},[e._v("已完成")]):e._e()]}}])})],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"page",t)}}})],1)],1)},staticRenderFns:[]},a=i("VU/8")(o,r,!1,null,null,null);t.default=a.exports}});