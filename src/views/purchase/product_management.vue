<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="商品名称" v-model="listQuery.goods_name">
      </el-input>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="在售">
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
          <span>-</span>
        </template>
      </el-table-column>
      <el-table-column min-width="75" align="center" label="类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | TypeStatusFilter">{{scope.row.status | TypeStatusTranslator}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="所属产品分类">
        <template slot-scope="scope">
          <div v-for="item in scope.row.goods_pivot">
            <span v-if="item.product">
              {{item.product.product_name}}
            </span>
            <el-tag style="height:20px;line-height:20px;" :type="item.product.is_promote | statusFilter">{{item.product.is_promote | statusTranslator}}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success"　size="mini">规格设置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!--图片上传-->
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" width="66%">
      <el-tabs v-model="activeName" @tab-click="handleTabclick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :rules="rules" ref="dataForm" :model="temp1" label-position="left" label-width="15%" style='width: 80%;margin-left: 10%;'>
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="temp1.produceName" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属品牌">
              <el-select placeholder="请选择所属品牌"　style="width: 300px;">
                <el-option>1</el-option>
                <el-option>2</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示标题">
              <el-input placeholder="请输入展示标题" v-model="temp1.displayTitle" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属产品">
              <el-select v-model="value1" multiple placeholder="请选择"　style="width: 300px;">
                <el-option
                  v-for="item in productsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="类型">
              <div>
                <el-radio-group v-model="radio１" size="small">
                  <el-radio-button label="0">非在售</el-radio-button>
                  <el-radio-button label="1">在售</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item  label="是否为赠品">
              <div>
                <el-radio-group v-model="radio２" size="small">
                  <el-radio-button :label="0">否</el-radio-button>
                  <el-radio-button :label="1">是</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="图片信息" name="second">
          <el-form :rules="rules" ref="dataForm" :model="temp2" label-position="left" label-width="15%" style='width: 92%;margin-left: 4%;'>
            <el-form-item label="商品主图">
              <el-upload
                :action="baseUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :limit="1">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div>只能上传jpg/png文件,图片大小不能超过１M</div>
            </el-form-item>
            <el-form-item label="商品轮播图">
              <el-upload
                :action="baseUrl"
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
                <div style="margin-top: 10px;" v-for="(item, index) in temp2.imgOption"  v-dragging="{ list: temp2.imgOption, item: item, group: 'index' }" :key="index">
                  <i class="el-icon-rank iconStyle"></i>
                  <div class="picName">{{item.name}}</div>
                </div>
              </template>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="third">
          <el-form :rules="rules" ref="dataForm" :model="temp3" label-position="left" label-width="10%" style='width: 100%;'>
            <el-form-item label="商品详情">
              <div id="editor"></div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="four">
          <el-form :rules="rules" ref="dataForm" :model="temp4" label-position="left" label-width="10%" style='width: 100%;'>
            <el-form-item label="所属分类">
              <el-select style="width: 192px;" v-model="value" placeholder="请选择分类">
                <el-option
                  v-for="item in classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="width: 192px;" v-model="value" placeholder="请选择分类">
                <el-option
                  v-for="item in classOptions1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="width: 192px;" v-model="value" placeholder="请选择分类">
                <el-option
                  v-for="item in classOptions2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="属性设置">
              <template v-for="(item, index) in temp4.Commodity">
                <div style="margin-bottom: 10px;">
                  <el-input v-model="item.dataName" style="width: 180px;"></el-input>
                  <el-input v-model="item.date" style="width: 280px;"></el-input>
                  <el-input v-model="item.number" style="width: 46px;"></el-input>
                  <el-button type="danger" @click="handleDel2(index)">删除</el-button>
                </div>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAttribute">添加属性</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="规格设置" name="five">
          <el-form :rules="rules" ref="dataForm" :model="temp5" label-position="left" label-width="10%" style='width: 100%;'>
            <el-form-item label="规格设置">
                <div style="margin-top: 10px;" v-for="(item,index) in temp5.setting"  v-dragging="{ item: item, list: temp5.setting, group: 'index', comb: 'isComb'}"   :key="index">
                  <el-input v-model="item.name" style="width:320px;"></el-input>
                  <el-button type="success" @click="handleDetails(index)">添加规格明细</el-button>
                  <!--<el-button v-if="item.status1 == 0" type="danger" @click="handleDel1(index)">删除规格明细</el-button>-->
                  <!--<el-button v-if="item.status1 == 1" type="warning" @click="handleBack1(index)">恢复规格明细</el-button>-->
                  <div style="margin-top: 10px;" v-for="(item1,index1) in item.nameOption" v-dragging="{item: item1, list: item.nameOption, group: `${item.name}`, comb: 'isComb'}" :key="`${item.name}${index1}`">
                    <svg-icon icon-class="bianqian" style="font-size: 22px;"></svg-icon>
                    <el-input v-model="item1.nameDetails" :disabled="item1.status == 1 || item.status1 == 1" style="width: 290px;"></el-input>
                    <el-button v-if="item1.status == 0 && item.status1 == 0" type="danger" @click="handleDel(index,index1)">删除规格明细</el-button>
                    <el-button v-if="item1.status == 1 || item.status1 == 1" type="warning" @click="handleBack(index,index1)">恢复规格明细</el-button>
                  </div>
                </div >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAttr">添加规格分类</el-button>
              <div>(可以进行拖拽排序)</div>
            </el-form-item>
          </el-form>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返　回</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保　存</el-button>
        <el-button v-else type="primary" @click="updateData">保　存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getProductGoodsList, createProductGoods, updateProductGoods, deleteProductGoods } from '@/api/product_goods'
  import { getProductList } from '@/api/product'
  import { getProductGoodsCommonBaseList } from '@/api/goods'
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
        editor: new E('#editor'),
        baseUrl: process.env.BASE_API + '/api/document/uploadImage',
        activeName: 'first',
        productsOptions: [],
        value1: [],
        dialogImageUrl: '',
        dialogVisible: false,
        scrollTop: 0,
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        classOptions: [],
        classOptions1: [],
        classOptions2: [],
        temp1: {
          produceName: undefined,
          displayTitle: undefined,
          product: undefined,
          radio１: 1,
          radio２: 0
        },
        temp2: {
          imgOption: []
        },
        temp3: {
          radio1: 1
        },
        temp4: {
          Commodity: []
        },
        temp5: {
          setting: []
        },
        listQuery: {
          page: 1,
          page_size: 20,
          goods_name: undefined,
          sort: '-id',
          status: 1
        },
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
        typeOptions: [{ label: '非在售', key: 0 }, { label: '在售', key: 1 }],
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
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        createName: false,
        rules: {
          goods_name: [{ required: true, message: '请正确填写商品名称', trigger: 'change' }],
          unit: [{ required: true, message: '选择规格', trigger: 'change' }]
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
        productOptions: [],
        productLoading: false,
        productResult: []
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'info',
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
    },
    mounted() {
    },
    methods: {
      // 拖拽
      dragend() {
        this.$dragging.$on('dragged', (value) => {
          console.log(this.temp2.imgOption)
          console.log('value111', value)
        })
        this.$dragging.$once('dragend', (value) => {
          console.log('value222', value)
        })
      },
      getList() {
        this.listLoading = true
        getProductGoodsCommonBaseList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 添加规格分类
      handleAttr() {
        this.temp5.setting.push({
          name: undefined,
          nameOption: [],
          status1: 0
        })
      },
      // 添加规格明细
      handleDetails(index) {
        this.temp5.setting[index].nameOption.push({
          nameDetails: undefined,
          status: 0
        })
        this.$nextTick(() => {
          this.dragend()
        })
      },
      // 商品轮播图拖拽
      handleUp(response, file, fileList) {
        console.log(fileList)
        this.temp2.imgOption = fileList
        console.log(this.temp2.imgOption)
        this.$nextTick(() => {
          this.dragend()
        })
      },
      // 商品属性删除
      handleDel2(index) {
        this.temp4.Commodity.splice(index, 1)
      },
      // 规格设置删除规格明细
      handleDel(index, index1) {
        this.temp5.setting[index].nameOption[index1].status = 1
      },
      // 规格设置恢复明细
      handleBack(index, index1) {
        this.temp5.setting[index].nameOption[index1].status = 0
      },
      // 删除所有规格明细
      handleDel1(index) {
        this.temp5.setting[index].status1 = 1
      },
      // 恢复父级规格明细
      handleBack1(index) {
        this.temp5.setting[index].status1 = 0
        this.temp5.setting[index].nameOption.map(item => {
          item.status = 0
        })
      },
      // 商品属性添加属性事件
      addAttribute() {
        this.temp4.Commodity.push({
          dataName: undefined,
          date: undefined,
          number: undefined
        })
      },
      getProductList(query) {
        if (query !== '') {
          this.productLoading = true
          getProductList({ product_name: query, page_size: 100, sort: '-sort' }).then(response => {
            this.productResult = response.data.data
            this.productLoading = false
          })
        }
      },
      queryProductList(query) {
        getProductList({ product_name: query }).then(response => {
          if (!response.data.data) return
          this.productOptions = response.data.data
        })
      },
      handleTabclick(tab, event) {
        console.log(tab, event)
      },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList)
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg' || 'image/png'
      //   console.log(file)
      //   const isLt2M = file.size / 1024 / 1024 < 1
      //
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!')
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!')
      //   }
      //   return isJPG && isLt2M
      // },
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          product: [],
          goods_name: '',
          unit: undefined,
          price: undefined,
          stock: undefined,
          production_cycle: undefined,
          product_ids: [],
          status: 1
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          if (this.createName === false) {
            this.editor.create()
            this.createName = true
          }
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.product_id = this.temp.product.id
            createProductGoods(this.temp).then(response => {
              this.temp.id = response.data.id
              this.temp.product = response.data.product
              this.temp.updated_at = response.data.updated_at
              this.temp.production_cycle = response.data.production_cycle
              // this.temp = response.data
              this.list.unshift(this.temp)
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
      handleUpdate(row) {
        const tempData = Object.assign({}, row) // copy obj
        this.getProductList(' ')
        tempData.product_ids = []
        for (const v in row.goods_pivot) {
          tempData.product_ids.push(row.goods_pivot[v].product_id)
        }
        this.temp = tempData
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.product_goods_id = this.temp.id
            tempData.product_ids = this.temp.product_ids
            updateProductGoods(tempData).then(response => {
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
