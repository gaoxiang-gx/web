webpackJsonp([14],{HSQe:function(e,t,i){var a=i("eiNM");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("2ce39ea3",a,!0)},eiNM:function(e,t,i){(e.exports=i("FZ+f")(!1)).push([e.i,"\n.is-fullscreen .el-dialog__body {\n  padding:30px 0px !important;\n}\n",""])},jzeC:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("woOf"),n=i.n(a),s=i("UgCr"),r={name:"goodsManagement",directives:{waves:i("cAgV").a},data:function(){return{scrollTop:0,tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,page_size:20,product_name:void 0,is_promote:void 0,sort:"-id"},importanceOptions:[1,2,3],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:["published","draft","deleted"],showAuditor:!1,temp:{id:void 0,product_name:"",is_promote:void 0,product_deliver_id:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{product_name:[{required:!0,message:"请正确填写商品名称",trigger:"change"}],product_deliver_id:[{required:!0,message:"请正确填写商品名称",trigger:"change"}]},innerList1:null,innerTotal1:null,innerTableKey1:1,innerTableTitle1:"",innerListQuery1:{page:1,page_size:5,product_id:void 0,sort:"-id"},innerTemp1:{id:void 0,product_id:void 0,template_name:"",template_code:""},innerListLoading1:!1,innerTableVisible1:!1,innerDialogFormVisible1:!1,productType:{1:"推广",2:"附属产品"},productTypeOptions:[{key:1,display_name:"推广"},{key:2,display_name:"附属产品"}],getProductDeliverListLoading:!1,productDeliverOptions:[]}},filters:{statusFilter:function(e){return{1:"success",2:"info",3:"danger"}[e]},statusTranslator:function(e){return{1:"推广",2:"附属产品"}[e]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(s.o)(this.listQuery).then(function(t){e.list=t.data.data,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.page_size=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作成功",type:"success"}),e.status=t},resetTemp:function(){this.temp={id:void 0,product_name:"",price:void 0,stock:void 0,is_promote:void 0,product_deliver_id:void 0}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},createData:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&Object(s.a)(e.temp).then(function(t){e.getList(),e.dialogFormVisible=!1,e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(e){var t=this;this.productDeliverOptions=[],this.temp=n()({},e),e.product_deliver&&this.productDeliverOptions.push({id:e.product_deliver.id,name:e.product_deliver.name}),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(){var e=this;this.$refs.dataForm.validate(function(t){if(t){var i=n()({},e.temp);i.product_id=e.temp.id,Object(s.v)(i).then(function(){e.getList(),e.dialogFormVisible=!1,e.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},getWarehouseList:function(e){var t=this;""!==e&&(this.getProductDeliverListLoading=!0,Object(s.n)({name:e}).then(function(e){t.productDeliverOptions=e.data.data,t.getProductDeliverListLoading=!1}))},handleInnerFilter1:function(){this.innerListQuery1.page=1,this.getInnerList1()},handleInnerSizeChange1:function(e){this.innerListQuery1.page_size=e,this.getInnerList1()},handleInnerCurrentChange1:function(e){this.innerListQuery1.page=e,this.getInnerList1()},resetInnerTemp1:function(){this.innerTemp1={id:void 0,product_id:void 0,template_name:"",template_code:""}},handleInnerCreate1:function(){var e=this;this.resetInnerTemp1(),this.dialogStatus="create",this.innerDialogFormVisible1=!0,this.innerTemp1.product_id=this.temp.id,this.$nextTick(function(){e.$refs.innerDataForm1.clearValidate()})},createInnerData1:function(){var e=this;this.$refs.innerDataForm1.validate(function(t){t&&createProductTemplate(e.innerTemp1).then(function(t){e.innerTotal1++,e.innerTemp1=t.data,e.innerList1.unshift(e.innerTemp1),e.innerDialogFormVisible1=!1,e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handlePreviewClose:function(){this.previewContent="",this.previewTitle=""}},deactivated:function(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},activated:function(){window.scrollTo(0,this.scrollTop)}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"产品名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.product_name,callback:function(t){e.$set(e.listQuery,"product_name",t)},expression:"listQuery.product_name"}}),e._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{clearable:"",placeholder:"类型"},on:{change:e.handleFilter},model:{value:e.listQuery.is_promote,callback:function(t){e.$set(e.listQuery,"is_promote",t)},expression:"listQuery.is_promote"}},e._l(e.productTypeOptions,function(e){return i("el-option",{key:e.key,attrs:{label:e.display_name,value:e.key}})})),e._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"排序"},on:{change:e.handleFilter},model:{value:e.listQuery.sort,callback:function(t){e.$set(e.listQuery,"sort",t)},expression:"listQuery.sort"}},e._l(e.sortOptions,function(e){return i("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{align:"center",label:"序号",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"产品名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{staticClass:"link-type",on:{click:function(i){e.handleUpdate(t.row)}}},[e._v(e._s(t.row.product_name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center","class-name":"status-col",label:"类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{type:e._f("statusFilter")(t.row.is_promote)}},[e._v(e._s(e._f("statusTranslator")(t.row.is_promote)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{width:"180px",align:"center",label:"更新时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.updated_at))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"320","class-name":"small-padding"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){e.handleUpdate(t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"page",t)}}})],1),e._v(" "),i("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"产品名称",prop:"product_name"}},[i("el-input",{model:{value:e.temp.product_name,callback:function(t){e.$set(e.temp,"product_name",t)},expression:"temp.product_name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"类型",prop:"is_promote"}},[i("el-radio-group",{model:{value:e.temp.is_promote,callback:function(t){e.$set(e.temp,"is_promote",t)},expression:"temp.is_promote"}},[i("el-radio-button",{attrs:{label:"1"}},[e._v("推广")]),e._v(" "),i("el-radio-button",{attrs:{label:"2"}},[e._v("附属产品")])],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]},o=i("VU/8")(r,l,!1,function(e){i("HSQe")},null,null);t.default=o.exports}});
