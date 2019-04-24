<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select  class="filter-item"
                  style="width: 200px"
                  @change='handleFilter'
                  v-model="listQuery.brand_id"
                  filterable
                  clearable
                  remote
                  placeholder="选择品牌"
                  :remote-method="getBrandList"
                  :loading="brandLoading">
        <el-option v-for="item in brandOptions"
                   :key="item.id"
                   :label="item.brand_name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="商品名称" v-model="listQuery.goods_name">
      </el-input>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.is_sale">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%" stripe>
      <el-table-column min-width="200px" align="center" label="商品名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.goods_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="商品主图">
        <template slot-scope="scope">
          <img v-if="scope.row.main_images_default !== null " @click="handlePictureCardPreview1(row)" style="width: 100px;height: 100px;"  :src="scope.row.main_images_default"  alt="">
        </template>
      </el-table-column>
      <el-table-column min-width="75" align="center" label="类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_sale | TypeStatusFilter">{{scope.row.is_sale | TypeStatusTranslator}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="所属产品分类">
        <template slot-scope="scope">
          <div v-for="item in scope.row.product_relations">
            <span>
              {{item.product.product_name}}
            </span>
            <el-tag :type="item.product.is_promote | statusFilter">{{item.product.is_promote | statusTranslator}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <!--<el-button type="danger" size="mini">删除</el-button>-->
          <el-button type="success"　size="mini" @click="handleSet(scope.row)">规格设置</el-button>
          <el-button type="warning"　size="mini" @click="handleBelong(scope.row)">所属产品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--所属产品弹出-->
    <el-dialog title="选择所属产品"
      :visible.sync="dialogBelong"
      width="40%">
      <template>
        <el-form>
          <el-form-item label="所属产品">
          <el-select v-model="listQuery3.product_ids" multiple placeholder="请选择"　style="width: 100%;">
            <el-option
            v-for="item in productsOptions"
            :key="item.id"
            :label="item.product_name"
            :value="item.id">
          </el-option>
          </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align: right;">
          <el-button @click="dialogBelong = false">取 消</el-button>
          <el-button type="primary" @click="updateProductRProductGoods">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--规格设置弹出-->
    <el-dialog
      title="规格设置"
      :visible.sync="dialogSet"
      width="60%">
      <template>
        <el-checkbox :true-label="0" :false-label="1" v-model="listQuery1.is_open" @change="handleStatus" style="float: right;margin-bottom: 20px;">显示关闭的规格</el-checkbox>
        <el-table :key='tableKey1' :data="list1" v-loading="listLoading1" :row-class-name="tableRowClassName" element-loading-text="给我一点时间" border>
          <el-table-column prop="specDetails" label="规格明细" width="180" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{scope.row.species_value.attr_val }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="specPic" label="规格缩略图主图" width="180" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.image_thumb" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="originalPrice" label="原价" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{scope.row.origin_price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sellPrice" label="实际售价" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{scope.row.actual_price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status"
                         active-color="#13ce66"
                         v-if="scope.row.id"
                         :active-value="1"
                         @change="handleSwich(scope.row)"
                         :inactive-value="0"
                         inactive-color="#ff4949"></el-switch>
              <el-button v-if="scope.row.id" type="primary"　size="mini" :visible.sync="dialogSetEdit" @click="handleEditSet(scope.row)">编辑</el-button>
              <el-button v-else type="success"　size="mini" :visible.sync="dialogSetEdit" @click="handleCreateSet(scope.row)">创建</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--<template>-->
        <!--<div class="block" style="margin-top: 10px;">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="listQuery1.page"-->
            <!--:page-sizes="[5, 10, 20, 30]"-->
            <!--:page-size="100"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="400">-->
          <!--</el-pagination>-->
        <!--</div>-->
      <!--</template>-->
    </el-dialog>
    <!--规格设置编辑下弹出-->
    <el-dialog :visible.sync="dialogSetEdit" :title="textMap1[dialogStatus1]">
      <el-form :rules="rules" ref="dataPrice" :model="price1" label-position="left" label-width="80px" style='width: 90%; margin-left:5%;'>
        <el-form-item label="规格主图">
          <el-upload
            :action="baseUrl"
            list-type="picture-card"
            :file-list="fileList3"
            :on-success="handlePictureSuccess"
            :on-remove="handleRemove3"
            :on-exceed="handleExceed1"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            name="image">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="原价" prop="origin_price">
          <el-input v-model="price1.origin_price" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="实际售价" prop="actual_price">
          <el-input v-model="price1.actual_price" style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button @click="dialogSetEdit = false">取 消</el-button>
        <el-button v-if="dialogStatus1 =='create'" type="primary" @click="createData1">确 定</el-button>
        <el-button v-else type="primary" @click="updateData1">确 定</el-button>
      </div>
    </el-dialog>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!--图片上传-->
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible" width="50%">
      <el-tabs v-model="activeName" @tab-click="handleTabclick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :rules="rules" ref="dataForm1" :model="temp1" label-position="left"  label-width="15%">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input placeholder="请输入商品名称" v-model="temp1.goods_name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属品牌" prop="brand_id">
              <el-select  class="filter-item"
                          style="width: 300px"
                          v-model="temp1.brand_id"
                          filterable
                          clearable
                          remote
                          placeholder="选择品牌"
                          :remote-method="getBrandList1"
                          :loading="brandLoading">
                <el-option v-for="item in brandOptions1"
                           :key="item.id"
                           :label="item.brand_name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示标题"  prop="goods_title">
              <el-input placeholder="请输入展示标题" v-model="temp1.goods_title" style="width: 300px;"></el-input>
            </el-form-item>
            <!--<el-form-item label="所属产品">-->
              <!--<el-select v-model="value1" multiple placeholder="请选择"　style="width: 300px;">-->
                <!--<el-option-->
                  <!--v-for="item in productsOptions"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item  label="类型">
              <el-radio-group v-model="temp1.is_sale" size="small">
                <el-radio-button label="0">非在售</el-radio-button>
                <el-radio-button label="1">在售</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="是否为赠品">
              <el-radio-group v-model="temp1.is_gift" size="small">
                <el-radio-button :label="0">否</el-radio-button>
                <el-radio-button :label="1">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
            <el-button v-else type="primary" @click="updateData('1')">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="dialogStatus =='create'" label="图片信息" name="second">
          <el-form :rules="rules" ref="dataForm2" :model="temp2" label-position="left" label-width="15%">
            <el-form-item label="商品主图">
              <el-upload
                :action="baseUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove1"
                :file-list="fileList1"
                :on-exceed="handleExceed1"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                name="image"
                :on-success="handleUp1">
                <i class="el-icon-plus"></i>
              </el-upload>

              <div>只能上传jpg/png文件,图片大小不能超过１M</div>
            </el-form-item>
            <el-form-item label="商品轮播图">
              <el-upload
                :action="baseUrl"
                name="image"
                :file-list="fileList"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleUp"
                multiple>
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>只能上传jpg/png文件,图片大小不能超过１M</div>
              <template>
                <div style="margin-top: 10px;" v-for="(item, index) in fileList"  v-dragging="{ list: fileList, item: item, group: 'fileList' }" :key="index">
                  <i class="el-icon-rank iconStyle"></i>
                  <div class="picName">{{item.name}}</div>
                </div>
              </template>
            </el-form-item>
          </el-form>
          <div style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
            <el-button v-else type="primary" @click="updateData('2')">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="dialogStatus =='create'" label="商品详情" name="third">
          <el-form :rules="rules" ref="dataForm3" :model="temp3" label-position="left" label-width="15%" style='width: 100%;'>
            <el-form-item label="商品详情">
              <div id="editor"></div>
            </el-form-item>
          </el-form>
          <div style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
            <el-button v-else type="primary" @click="updateData('3')">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="dialogStatus =='create'" label="商品属性" name="four">
          <el-form :rules="rules" ref="dataForm4" :model="temp4" label-position="left" label-width="15%" style='width: 100%;'>
            <el-form-item label="所属分类">
              <el-cascader
                :options="classOptions"
                style="width: 100%"
                v-model="temp4.product_goods_category_id"
                :props="props">
              </el-cascader>
            </el-form-item>
            <el-form-item label="属性设置" >
              <template v-for="(item, index) in temp4.goods_attribute">
                <div style="margin-bottom: 10px;">
                  <el-input v-model="item.label" style="width: 30%;"></el-input>
                  <el-input v-model="item.value" style="width: 50%;"></el-input>
                  <el-button type="danger" @click="handleDel2(index)">删除</el-button>
                </div>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAttribute">添加属性</el-button>
            </el-form-item>
          </el-form>
          <div style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
            <el-button v-else type="primary" @click="updateData('4')">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="dialogStatus =='create'" label="规格设置" name="five">
          <el-form :rules="rules" ref="dataForm5" :model="temp5" label-position="left" label-width="10%" style='width: 100%;'>
            <el-form-item label="规格设置">
                <div style="margin-top: 10px;" v-for="(item,index) in temp5.species_values"  v-dragging="{ item: item, list: temp5.species_values, group:'species_values', comb: 'isComb'}" :key="index">
                  <el-input v-model="item.attr" style="width:320px;"></el-input>
                  <el-button type="success" @click="handleDetails(index)">
                    <i class="el-icon-plus"></i>
                  </el-button>
                  <el-button v-if="item.attr_status == 1" type="danger" @click="handleDel1(index)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                  <!--<el-button v-if="item.attr_status == 0" type="warning" @click="handleBack1(index)">恢复规格明细</el-button>-->
                  <div style="margin-top: 10px;" v-for="(item1,index1) in item.attr_val" v-dragging="{item: item1, list: item.attr_val, group:`${item.attr}`, comb: 'isComb'}" :key='`${item.attr}${index1}`'>
                    <svg-icon icon-class="bianqian" style="font-size: 22px;"></svg-icon>
                    <el-input v-model="item1.name" style="width: 290px;"></el-input>
                    <el-button v-if="item.attr_val.length > 1" type="danger" @click="handleDel(index,index1)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                    <!--<el-button v-if="item1.status == 0 || item.attr_status == 0" type="warning" @click="handleBack(index,index1)">恢复规格明细</el-button>-->
                  </div>
                </div >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAttr">添加规格分类</el-button>
              <div>(可以进行拖拽排序)</div>
            </el-form-item>
          </el-form>
          <div style="text-align: right;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
            <el-button v-else type="primary" @click="updateData('5')">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--商品管理-->
      <!--<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="25%" style='width: 55%; margin-left:15%;'>-->
        <!--<el-form-item label="产品名称" prop="goods_name">-->
          <!--<el-input v-model="temp.goods_name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="所属产品" prop="product_name">-->
          <!--<el-select-->
            <!--v-model="temp.product_ids"-->
            <!--multiple-->
            <!--filterable-->
            <!--remote-->
            <!--reserve-keyword-->
            <!--placeholder="请选择产品"-->
            <!--:remote-method="getProductList"-->
            <!--:loading="productLoading">-->
            <!--<el-option-->
              <!--v-for="item in productResult"-->
              <!--:key="item.product_name"-->
              <!--:label="item.product_name"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="价格" prop="price">-->
          <!--<el-input v-model="temp.price"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="规格" prop="unit">-->
          <!--<el-select v-model="temp.unit">-->
            <!--<el-option v-for="item in unitOptions"-->
                       <!--:value="item.id"-->
                       <!--:key="item.id"-->
                       <!--:label="item.label"-->
            <!--&gt;</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="库存" prop="stock">-->
          <!--<el-input v-model="temp.stock"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="生产周期" prop="production_cycle">-->
          <!--<el-input v-model="temp.production_cycle"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="类型" prop="status">-->
          <!--<el-radio-group v-model="temp.status"  size="small">-->
            <!--<el-radio-button v-for="item in typeOptions" :key="item.key" :label="item.key">-->
              <!--{{item.label}}-->
            <!--</el-radio-button>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    </el-dialog>
  </div>
</template>

<script>
  // import { updateProductGoods, deleteProductGoods } from '@/api/product_goods'
  import { getProductList } from '@/api/product'
  import { getProductGoodsCommonBaseList, changeProductGoodsStatus, getBrandList, createProductGoodsCommonBase, updateProductGoodsCommonBase, getProductGoodsCommonInfo, getProductGoodsList, createProductGoods, updateProductGoods, updateProductRProductGoodsCommon, getProductCategoryTreeList } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import E from 'wangeditor'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  // 富文本编辑器
  export default {
    name: 'productManagement',
    components: { Multiselect },
    directives: {
      waves
    },
    data() {
      return {
        success: true,
        danger: false,
        checked: false,
        dialogSet: false,
        listLoading1: true,
        dialogSetEdit: false,
        dialogBelong: false,
        editor: new E('#editor'),
        baseUrl: process.env.BASE_API + '/api/document/uploadImage',
        activeName: 'first',
        dialogImageUrl: '',
        tableKey1: undefined,
        dialogVisible: false,
        scrollTop: 0,
        tableKey: 0,
        list: null,
        total: null,
        list1: null,
        total1: null,
        listLoading: true,
        classOptions: [],
        classOptions1: [],
        classOptions2: [],
        temp1: {
          goods_name: undefined,
          goods_title: undefined,
          brand_id: undefined,
          is_sale: 0,
          is_gift: 1
        },
        brandOptions1: [],
        temp2: {
          main_images: [],
          main_images_default: undefined
        },
        fileList: [],
        fileList1: [],
        fileList3: [],
        temp3: {
          radio1: 1
        },
        temp4: {
          goods_attribute: [{
            value: undefined,
            label: undefined
          }],
          product_goods_category_id: []
        },
        props: {
          value: 'id',
          children: 'son',
          label: 'category_name'
        },
        temp5: {
          species_values: [],
          species_names: []
        },
        listQuery: {
          page: 1,
          page_size: 20,
          goods_name: undefined,
          sort: '-id',
          is_sale: undefined,
          // brand: undefined,
          brand_id: undefined
        },
        listQuery1: {
          page: 1,
          page_size: 20,
          sort: '-id',
          is_open: 1,
          product_goods_common_id: undefined
        },
        product_goods_common_id: undefined,
        listQuery3: {
          product_ids: [],
          product_goods_common_id: undefined
        },
        productsOptions: [],
        importanceOptions: [1, 2, 3],
        unitOptions: [
          {
            label: '件',
            id: 0
          },
          {
            label: '斤',
            id: 1
          },
          {
            label: 'g',
            id: 2
          }
        ],
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: [{ label: '非在售', key: 0 }, { label: '在售', key: 1 }],
        brandLoading: false,
        brandOptions: [],
        // typeOptions: [{ label: '非在售', key: 0 }, { label: '在售', key: 1 }],
        showAuditor: false,
        temp_product_ids: [],
        temp: {
          id: undefined,
          goods_name: '',
          unit: undefined,
          price: undefined,
          stock: undefined,
          production_cycle: undefined,
          product: [],
          product_ids: [],
          status: 1
        },
        price1: {
          goods_common_id: undefined,
          product_goods_id: undefined,
          image_thumb: undefined,
          origin_price: undefined,
          actual_price: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogStatus1: '',
        textMap1: {
          update: '编辑',
          create: '创建'
        },
        createName: false,
        rules: {
          goods_name: [{ required: true, message: '请正确填写商品名称', trigger: 'change' }],
          goods_title: [{ required: true, message: '请正确填写商品展示标题', trigger: 'change' }],
          brand_id: [{ required: true, message: '请正确选择品牌ID', trigger: 'change' }],
          origin_price: [{ required: true, message: '请正确填写原价', trigger: 'change' }],
          actual_price: [{ required: true, message: '请正确填写实际售价', trigger: 'change' }],
          label: [{ required: true, message: '请填写属性', trigger: 'change' }],
          value: [{ required: true, message: '请填写属性', trigger: 'change' }],
        },
        productType: {
          1: '推广',
          2: '附属产品',
          3: '赠品'
        },
        productTypeOptions: [
          { key: 1, display_name: '推广' },
          { key: 2, display_name: '附属产品' },
          { key: 3, display_name: '赠品' }
        ],
        tempData: {
          goods_common_id: undefined,
          product_goods_id: undefined,
          species_value: undefined,
          image_thumb: undefined,
          origin_price: undefined,
          actual_price: undefined,
          status: undefined
        },
        productOptions: [],
        productLoading: false,
        productResult: []
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: '',
          3: 'danger'
        }
        return statusMap[status]
      },
      statusUnit(status) {
        const statusTransMap = {
          0: '件',
          1: '斤',
          2: 'g'
        }
        return statusTransMap[status]
      },
      statusTranslator(status) {
        const statusMap = {
          1: '推广',
          2: '附属产品',
          3: '赠品'
        }
        return statusMap[status]
      },
      TypeStatusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      },
      TypeStatusTranslator(status) {
        const statusMap = {
          1: '在售',
          0: '非在售'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
      this.getProductList()
      this.handleChange()
    },
    mounted() {
    },
    methods: {
      // 拖拽
      dragend() {
        // this.$dragging.$on('dragged', (value) => {
        // })
        // this.$dragging.$once('dragend', (value) => {
        // })
      },
      getList() {
        this.listLoading = true
        getProductGoodsCommonBaseList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 列表页所属产品操作
      handleBelong(row) {
        this.listQuery3.product_goods_common_id = row.id
        getProductGoodsCommonInfo({ product_goods_common_id: row.id }).then(res => {
          this.listQuery3.product_ids = res.data.product_relations == null ? [] : res.data.product_relations.map(item => {
            return item.product.id
          })
          this.dialogBelong = true
        })
      },
      updateProductRProductGoods() {
        updateProductRProductGoodsCommon(this.listQuery3).then(res => {
          this.dialogBelong = false
          this.getList()
        })
      },
      getProductList() {
        getProductList({ page_size: 0 }).then(res => {
          this.productsOptions = res.data
        })
      },
      // 商品属性下所有分类
      handleChange() {
        getProductCategoryTreeList().then(res => {
          this.classOptions = res.data
        })
      },
      // 规格设置列表开关状态
      handleSwich(row) {
        console.log(row)
        changeProductGoodsStatus({ product_goods_id: row.id, status: row.status }).then(res => {
          this.getSeetingList()
          this.$message.success('修改成功')
        })
      },
      // 显示关闭表格
      handleStatus() {
        this.getSeetingList()
      },
      tableRowClassName({ row }) {
        if (row.status === 1) {
          return ''
        } else {
          return 'warning-row'
        }
      },
      // 规格明细列表
      getSeetingList(row) {
        this.listLoading1 = true
        getProductGoodsList(this.listQuery1).then(response => {
          this.list1 = response.data
          // this.total1 = response.data.total
          this.listLoading1 = false
        })
      },
      // 规格设置下编辑
      handleEditSet(row) {
        // this.price1 = Object.assign({}, row)
        this.price1 = row
        this.fileList3 = [
          {
            name: 0,
            url: row.image_thumb
          }
        ]
        this.dialogSetEdit = true
        this.dialogStatus1 = 'update'
        // this.goods_common_id = row.goods_common_id
        // this.product_goods_id = row.id
      },
      // 规格设置下创建
      handleCreateSet(row) {
        this.dialogSetEdit = true
        this.price1 = Object.assign({}, row)
        this.dialogStatus1 = 'create'
        this.dataPrice = {
          image_thumb: undefined,
          origin_price: undefined,
          actual_price: undefined
        }
      },
      // 规格设置操作按钮
      handleSet(row) {
        this.dialogSet = true
        this.listQuery1.product_goods_common_id = row.id
        this.getSeetingList()
      },
      // 品牌
      getBrandList(query) {
        if (query !== '') {
          this.brandLoading = true
          getBrandList({ brand_name: query, page_size: 0 }).then(response => {
            this.brandOptions = response.data
            this.brandLoading = false
          })
        }
      },
      // 基本信息所属品牌
      getBrandList1(query) {
        if (query !== '') {
          this.brandLoading = true
          getBrandList({ brand_name: query, page_size: 0 }).then(response => {
            this.brandOptions1 = response.data
            this.brandLoading = false
          })
        }
      },
      // 创建基本信息
      createData() {
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            createProductGoodsCommonBase(this.temp1).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.total++
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      // 创建规格设置
      createData1() {
        this.$refs['dataPrice'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({
              goods_common_id: this.listQuery1.product_goods_common_id,
            }, this.price1)
            tempData.species_value = [tempData.species_value.attr, tempData.species_value.attr_val]
            tempData.status = 1
            if (this.price1.image_thumb === '') {
              this.$message.error('请上传规格主图')
              return false
            }
            createProductGoods(tempData).then(() => {
              this.getSeetingList()
              this.dialogSetEdit = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      // 编辑规格设置
      updateData1() {
        this.$refs['dataPrice'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({
              product_goods_id: this.price1.id,
              goods_common_id: this.listQuery1.product_goods_common_id
            }, this.price1)
            tempData.species_value = [tempData.species_value.attr, tempData.species_value.attr_val]
            if (this.price1.image_thumb === '') {
              this.$message.error('请上传主图')
              return false
            }
            updateProductGoods(tempData).then(() => {
              this.dialogSetEdit = false
              this.getSeetingList()
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      // 点击确定编辑
      updateData(temp) {
        this.$refs[`dataForm${temp}`].validate((valid) => {
          if (valid) {
            let str
            if (temp === '2') {
              this.temp2.main_images = this.fileList
              this.temp2.main_images_default = this.fileList1[0].url
            }
            if (temp === '3') {
              this.temp3.goods_description = this.editor.txt.html()
            }
            if (temp === '4') {
              str = this.temp4.product_goods_category_id.join()
              let rules = false
              rules = this.temp4.goods_attribute.every(item => {
                return item.label !== undefined && item.value !== undefined
              })
              if (!rules) {
                this.$message.error('属性设置不能为空')
                return false
              }
            }
            if (temp === '5') {
              this.temp5.species_names = this.temp5.species_values.map(item => {
                return {
                  attr: item.attr,
                  attr_status: item.attr_status
                }
              })
            }
            const tempData = Object.assign({
              product_goods_common_id: this.product_goods_common_id
            }, this[`temp${temp}`], { product_goods_category_id: str })
            if (this.temp2.main_images === []) {
              this.$message.error('请上传轮播图')
              return false
            }
            if (this.temp2.main_images_default === '') {
              this.$message.error('请上传主图')
              return false
            }
            updateProductGoodsCommonBase(tempData).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
        )
      },
      // 编辑基本信息
      handleUpdate(row) {
        this.product_goods_common_id = row.id
        getProductGoodsCommonInfo({ product_goods_common_id: row.id }).then(response => {
          this.temp1.goods_name = response.data.goods_name
          this.temp1.goods_title = response.data.goods_title
          this.getBrandList1()
          this.temp1.brand_id = response.data.brand_id
          this.temp1.is_sale = response.data.is_sale
          this.temp1.is_gift = response.data.is_gift
          this.fileList = response.data.main_images !== null ? response.data.main_images.map(item => {
            return {
              name: item.name,
              url: item.url
            }
          }) : []
          this.temp2.main_images = this.fileList
          this.fileList1 = response.data.main_images_default !== null ? [{
            name: 0,
            url: response.data.main_images_default
          }] : []
          this.temp2.main_images_default = this.fileList1
          this.temp3.goods_description = response.data.goods_description
          this.temp4.goods_attribute = response.data.goods_attribute !== null ? response.data.goods_attribute : [{
            label: undefined,
            value: undefined
          }]
          this.temp4.product_goods_category_id = response.data.product_goods_category_id !== null ? response.data.product_goods_category_id.split(',').map(item => parseInt(item)) : []
          this.temp5.species_names = response.data.species_names !== null ? response.data.species_names : []
          this.temp5.species_values = response.data.species_values !== null ? response.data.species_values : []
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm1'].clearValidate()
            this.$refs['dataForm2'].clearValidate()
            this.$refs['dataForm3'].clearValidate()
            this.$refs['dataForm4'].clearValidate()
            this.$refs['dataForm5'].clearValidate()
            if (this.createName === false) {
              this.editor.create()
              this.createName = true
            }
            this.editor.txt.html(this.temp3.goods_description)
          })
        })
      },
      // 添加规格分类
      handleAttr() {
        this.temp5.species_values.push({
          attr: '默认',
          attr_val: [{
            name: '默认',
            status: 1
          }],
          attr_status: 1
        })
      },
      // 添加规格明细
      handleDetails(index) {
        this.temp5.species_values[index].attr_val.push({
          name: undefined,
          status: 1
        })
        this.$nextTick(() => {
          this.dragend()
        })
      },
      // 商品轮播图拖拽
      handleUp(response, file, fileList) {
        console.log(file)
        console.log(response)
        console.log(fileList)
        this.fileList = fileList.map(item => {
          return {
            name: item.name,
            url: item.response ? item.response.data.url : item.url
          }
        })
      },
      handleUp1(response, file, fileList) {
        this.temp2.main_images_default = response.data.url
        this.$nextTick(() => {
          this.dragend()
        })
      },
      // 规格设置上传主图
      handlePictureSuccess(response, file, fileList) {
        this.price1.image_thumb = response.data.url
      },
      // 商品属性添加属性事件
      addAttribute() {
        this.temp4.goods_attribute.push({
          label: undefined,
          value: undefined
        })
      },
      // 商品属性删除
      handleDel2(index) {
        this.temp4.goods_attribute.splice(index, 1)
      },
      // 规格设置删除规格明细
      handleDel(index, index1) {
        this.temp5.species_values[index].attr_val.splice(index1, 1)
      },
      // 规格设置恢复明细
      handleBack(index, index1) {
        // this.temp5.species_values[index].attr_val[index1].splice(0, -1)
      },
      // 删除所有规格明细
      handleDel1(index) {
        this.temp5.species_values.splice(index, 1)
      },
      // 恢复父级规格明细
      // handleBack1(index) {
      //   this.temp5.species_values[index].attr_status = 1
      //   this.temp5.species_values[index].attr_val.map(item => {
      //     item.status = 1
      //   })
      // },
      handleTabclick(tab, event) {
        console.log(tab, event)
      },
      handleExceed1() {
        this.$message.error('主图限制上传一张')
      },
      handleRemove1(file, fileList) {
      },
      handleRemove3(file, fileList) {
        this.price1.image_thumb = undefined
      },
      handleRemove(file, fileList) {
        this.fileList = fileList.map(item => {
          return {
            name: item.name,
            url: item.response ? item.response.data.url : item.url
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handlePictureCardPreview1(file) {
        console.log(file)
        this.dialogImageUrl = file.main_images_default
        this.dialogVisible = true
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 3

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!')
        }
        return isJPG && isLt2M
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSizeChange1(val) {
        this.listQuery1.page_size = val
        this.getList()
      },
      handleCurrentChange1(val) {
        this.listQuery1.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp1 = {
          goods_name: undefined,
          goods_title: undefined,
          brand_id: undefined,
          is_sale: 0,
          is_gift: 0
        }
        this.temp5 = {
          species_values: [],
          species_names: []
        }
      },
      handleCreate() {
        this.activeName = 'first'
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm1'].clearValidate()
          if (this.createName === false) {
            this.editor.create()
            this.createName = true
            // var $text1 = $('#text1')
            // editor.customConfig.onchange = function (html) {
            //   // 监控变化，同步更新到 textarea
            //   $text1.val(html)
            // }
            // $text1.val(editor.txt.html())
          }
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ttempData = {
            product_goods_id: row.id
          }
          deleteProductGoods(ttempData).then(response => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
            this.total--
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    deactivated() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    activated() {
      window.scrollTo(0, this.scrollTop)
    }
  }
</script>
<style scoped>
  .el-table >>> .warning-row {
    background: #f5f5f5!important;
  }

  .el-table .success-row {
    background: #fff;
  }
  .el-table >>> thead {
    font-size: 13px;
  }
  .el-tag {
    padding: 0 4px;
    font-size: 14px;
    line-height: 26px;
    height: 26px;
  }
  .iconStyle {
    font-weight: bold;
    font-size: 20px;
    color: #000;
    vertical-align: top;
    margin-top: 12px;
  }
  .picName{
    border: 1px solid rgb(139, 195, 74);
    width: 74%;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    color: #000;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .addAttr{
    position: absolute;
    top: 0;
    left: 45%;
  }
</style>
