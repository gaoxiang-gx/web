webpackJsonp([13],{"1gH0":function(t,e,a){var i=a("W/aG");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("2352a25a",i,!0)},A4eN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),n=a.n(i),s=a("GGGG"),o=a("UgCr"),l=a("cAgV"),r=a("RUzx"),c=a.n(r),u=(a("tLvy"),{name:"productManagement",components:{Multiselect:c.a},directives:{waves:l.a},data:function(){return{scrollTop:0,tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,page_size:20,goods_name:void 0,sort:"-id",status:1},importanceOptions:[1,2,3],unitOptions:[{label:"件",id:0},{label:"斤",id:1},{label:"g",id:2}],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:[{label:"非在售",key:0},{label:"在售",key:1}],typeOptions:[{label:"非在售",key:0},{label:"在售",key:1}],showAuditor:!1,temp_product_ids:[],temp:{id:void 0,goods_name:"",unit:void 0,price:void 0,stock:void 0,production_cycle:void 0,product:[],product_ids:[],status:1},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{goods_name:[{required:!0,message:"请正确填写商品名称",trigger:"change"}],unit:[{required:!0,message:"选择规格",trigger:"change"}]},productType:{1:"推广",2:"附属产品",3:"赠品"},productTypeOptions:[{key:1,display_name:"推广"},{key:2,display_name:"附属产品"},{key:3,display_name:"赠品"}],productOptions:[],productLoading:!1,productResult:[]}},filters:{statusFilter:function(t){return{1:"success",2:"info",3:"danger"}[t]},statusUnit:function(t){return{0:"件",1:"斤",2:"g"}[t]},statusTranslator:function(t){return{1:"推广",2:"附属产品",3:"赠品"}[t]},TypeStatusFilter:function(t){return{1:"success",0:"danger"}[t]},TypeStatusTranslator:function(t){return{1:"在售",0:"非在售"}[t]}},created:function(){this.getList()},methods:{getProductList:function(t){var e=this;""!==t&&(this.productLoading=!0,Object(o.o)({product_name:t,page_size:100,sort:"-sort"}).then(function(t){e.productResult=t.data.data,e.productLoading=!1}))},queryProductList:function(t){var e=this;Object(o.o)({product_name:t}).then(function(t){t.data.data&&(e.productOptions=t.data.data)})},getList:function(){var t=this;this.listLoading=!0,Object(s.e)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.page_size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={id:void 0,product:[],goods_name:"",unit:void 0,price:void 0,stock:void 0,production_cycle:void 0,product_ids:[],status:1}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&Object(s.b)(t.temp).then(function(e){t.temp.id=e.data.id,t.temp.product=e.data.product,t.temp.updated_at=e.data.updated_at,t.temp.production_cycle=e.data.production_cycle,t.list.unshift(t.temp),t.dialogFormVisible=!1,t.total++,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(t){var e=this,a=n()({},t);this.getProductList(" "),a.product_ids=[];for(var i in t.goods_pivot)a.product_ids.push(t.goods_pivot[i].product_id);this.temp=a,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){var a=n()({},t.temp);a.product_goods_id=t.temp.id,a.product_ids=t.temp.product_ids,Object(s.f)(a).then(function(e){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})}})},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={product_goods_id:t.id};Object(s.c)(a).then(function(a){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=e.list.indexOf(t);e.list.splice(i,1),e.total--})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},deactivated:function(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},activated:function(){window.scrollTo(0,this.scrollTop)}}),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"商品名称"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.goods_name,callback:function(e){t.$set(t.listQuery,"goods_name",e)},expression:"listQuery.goods_name"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"排序"},on:{change:t.handleFilter},model:{value:t.listQuery.sort,callback:function(e){t.$set(t.listQuery,"sort",e)},expression:"listQuery.sort"}},t._l(t.sortOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"120px"},attrs:{placeholder:"在售"},on:{change:t.handleFilter},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":"",stripe:""}},[a("el-table-column",{attrs:{align:"center",label:"ID",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200px",align:"center",label:"商品名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"link-type",on:{click:function(a){t.handleUpdate(e.row)}}},[t._v(t._s(e.row.goods_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"75",align:"center",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("TypeStatusFilter")(e.row.status)}},[t._v(t._s(t._f("TypeStatusTranslator")(e.row.status)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200px",align:"center",label:"所属产品"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.goods_pivot,function(e){return a("div",[e.product?a("span",[t._v("\n            "+t._s(e.product.product_name)+"\n          ")]):t._e(),t._v(" "),a("el-tag",{staticStyle:{height:"20px","line-height":"20px"},attrs:{type:t._f("statusFilter")(e.product.is_promote)}},[t._v(t._s(t._f("statusTranslator")(e.product.is_promote)))])],1)})}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("￥"+t._s(e.row.price))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"库存"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.stock))])]}}])}),t._v(" "),a("el-table-column",{key:Math.random(),attrs:{align:"center",label:"规格","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("statusUnit")(e.row.unit)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"180px",align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.updated_at))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"160","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.page_size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"55%","margin-left":"15%"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"25%"}},[a("el-form-item",{attrs:{label:"产品名称",prop:"goods_name"}},[a("el-input",{model:{value:t.temp.goods_name,callback:function(e){t.$set(t.temp,"goods_name",e)},expression:"temp.goods_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所属产品",prop:"product_name"}},[a("el-select",{attrs:{multiple:"",filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择产品","remote-method":t.getProductList,loading:t.productLoading},model:{value:t.temp.product_ids,callback:function(e){t.$set(t.temp,"product_ids",e)},expression:"temp.product_ids"}},t._l(t.productResult,function(t){return a("el-option",{key:t.product_name,attrs:{label:t.product_name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"价格",prop:"price"}},[a("el-input",{model:{value:t.temp.price,callback:function(e){t.$set(t.temp,"price",e)},expression:"temp.price"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"规格",prop:"unit"}},[a("el-select",{model:{value:t.temp.unit,callback:function(e){t.$set(t.temp,"unit",e)},expression:"temp.unit"}},t._l(t.unitOptions,function(t){return a("el-option",{key:t.id,attrs:{value:t.id,label:t.label}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"库存",prop:"stock"}},[a("el-input",{model:{value:t.temp.stock,callback:function(e){t.$set(t.temp,"stock",e)},expression:"temp.stock"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"生产周期",prop:"production_cycle"}},[a("el-input",{model:{value:t.temp.production_cycle,callback:function(e){t.$set(t.temp,"production_cycle",e)},expression:"temp.production_cycle"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型",prop:"status"}},[a("el-radio-group",{attrs:{size:"small"},model:{value:t.temp.status,callback:function(e){t.$set(t.temp,"status",e)},expression:"temp.status"}},t._l(t.typeOptions,function(e){return a("el-radio-button",{key:e.key,attrs:{label:e.key}},[t._v("\n            "+t._s(e.label)+"\n          ")])}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]},p=a("VU/8")(u,d,!1,function(t){a("1gH0")},"data-v-53e1addc",null);e.default=p.exports},"W/aG":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-table[data-v-53e1addc] thead {\n  font-size: 13px;\n}\n.el-tag[data-v-53e1addc] {\n  padding: 0 4px;\n  font-size: 14px;\n  line-height: 26px;\n  height: 26px;\n}\n",""])}});