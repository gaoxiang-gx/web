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
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="商品名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.goods_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="75" align="center" label="类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | TypeStatusFilter">{{scope.row.status | TypeStatusTranslator}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="所属产品">
        <template slot-scope="scope">
          <div v-for="item in scope.row.goods_pivot">
            <span v-if="item.product">
              {{item.product.product_name}}
            </span>
            <el-tag style="height:20px;line-height:20px;" :type="item.product.is_promote | statusFilter">{{item.product.is_promote | statusTranslator}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="价格">
        <template slot-scope="scope">
          <span>￥{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="库存">
        <template slot-scope="scope">
          <span>{{scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column :key="Math.random()" align="center" label="规格" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.unit | statusUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="25%" style='width: 55%; margin-left:15%;'>
        <el-form-item label="产品名称" prop="goods_name">
          <el-input v-model="temp.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="所属产品" prop="product_name">
          <el-select
            v-model="temp.product_ids"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请选择产品"
            :remote-method="getProductList"
            :loading="productLoading">
            <el-option
              v-for="item in productResult"
              :key="item.product_name"
              :label="item.product_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="temp.price"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="unit">
          <el-select v-model="temp.unit">
            <el-option v-for="item in unitOptions"
                       :value="item.id"
                       :key="item.id"
                       :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="temp.stock"></el-input>
        </el-form-item>
        <el-form-item label="生产周期" prop="production_cycle">
          <el-input v-model="temp.production_cycle"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="status">
          <el-radio-group v-model="temp.status"  size="small">
            <el-radio-button v-for="item in typeOptions" :key="item.key" :label="item.key">
              {{item.label}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getProductGoodsList, createProductGoods, updateProductGoods, deleteProductGoods } from '@/api/product_goods'
  import { getProductList } from '@/api/product'
  import waves from '@/directive/waves' // 水波纹指令
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  export default {
    name: 'productManagement',
    components: { Multiselect },
    directives: {
      waves
    },
    data() {
      return {
        scrollTop: 0,
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
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
    methods: {
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
      getList() {
        this.listLoading = true
        getProductGoodsList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
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
</style>
