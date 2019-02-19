<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-date-picker class="filter-item"
                      v-model="listQuery.date_range"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      align="right"
                      unlink-panels
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      @change='handleFilter'>
      </el-date-picker>
      <!--<el-select  class="filter-item"-->
                  <!--style="width:200px;"-->
                  <!--@change='handleFilter'-->
                  <!--v-model="listQuery.product_id"-->
                  <!--placeholder="状态"-->
                  <!--&gt;-->
        <!--<el-option  v-for="item in stateOptions"-->
                    <!--:key="item.id"-->
                    <!--:label="item.label"-->
                    <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleFilter" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>

      <el-table :key='tableKey'
                :data="list"
                v-loading="listLoading"
                element-loading-text="给我一点时间"
                border
                fit
                highlight-current-row
                style="width: 100%"
                stripe>
        <el-table-column align="center" label="商品名称" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.product_goods.goods_name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作类型" min-width="100">
          <template slot-scope="scope">
            <el-tag type="primary">订货到货</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="完成时间" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.datetime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作人" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.operator_account.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150" >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.row)" type="primary">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 80%; margin-left:10%;'>
          <el-form-item label="选择商品" prop="product_goods_id">
            <el-select v-model="temp.product_goods_id"
                       style="width: 100%"
                       filterable
                       clearable
                       remote
                       placeholder="请选择商品"
                       :remote-method="getProductList"
                       :loading="productLoading">
              <el-option  v-for="item in productOptions"
                          :key="item.id"
                          :label="item.goods_name"
                          :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品数量" prop="number">
            <el-input v-model.number="temp.number" style="width: 100%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">确 定</el-button>
          <el-button v-else type="primary" @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import { getProductGoodsList } from '@/api/product_goods'
  import { getProdcutStorageImportList, createProductStorageImport, deleteProductStorageImport, updateProductStorageImport } from '@/api/product'
  import { parseTime } from '@/utils/index'

  export default {
    components: { },
    name: 'purchaseInStorage',
    directives: {
      waves
    },
    data() {
      const validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入数量'))
        } else if (typeof value !== 'number') {
          callback(new Error('输入数字!'))
        } else if (/[^\w]/g.test(value + '')) {
          callback(new Error('输入整数!'))
        } else {
          callback()
        }
      }
      return {
        tableKey: 0,
        scrollTop: 0,
        list: null,
        total: null,
        listLoading: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogStatus: undefined,
        dialogFormVisible: false,
        productOptions: [],
        productLoading: false,
        listQuery: {
          date_range: [
            parseTime(new Date(new Date().getTime() - 1000 * 3600 * 24 * 7), '{y}-{m}-{d}'),
            parseTime(new Date(), '{y}-{m}-{d}')
          ],
          page: 1,
          page_size: 20,
          sort: '-id'
        },
        stateOptions: [
          { id: 0, label: '有效操作' },
          { id: 1, label: '无效操作' }
        ],
        product_storage_import_id: undefined,
        temp: {
          product_goods_id: undefined,
          number: undefined
        },
        rules: {
          product_id: [{ required: true, message: '选择商品', trigger: 'change' }],
          product_total: [
            { validator: validate, trigger: 'change' }
          ]
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        getProdcutStorageImportList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
          this.listLoading = false
        })
      },
      getProductList(query) {
        if (query !== '') {
          this.productLoading = true
          getProductGoodsList({ goods_name: query, status: 1 }).then(response => {
            this.productOptions = response.data.data
            this.productLoading = false
          })
        }
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createProductStorageImport(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible = false
            })
          }
        })
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        this.product_storage_import_id = row.id
        this.temp.product_goods_id = row.product_goods_id
        this.temp.number = row.number
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const temp = Object.assign({ product_storage_import_id: this.product_storage_import_id }, this.temp)
            updateProductStorageImport(temp).then(res => {
              this.getList()
              this.dialogFormVisible = false
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ttempData = {
            product_storage_import_id: row.id
          }
          deleteProductStorageImport(ttempData).then(response => {
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
      },
      handleSizeChange(val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    },
    created() {
      this.getList()
      this.getProductList(' ')
    }
  }
</script>
