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
      <el-select  class="filter-item"
                  style="width:200px;"
                  clearable
                  @change='handleFilter'
                  v-model="listQuery.is_input"
                  placeholder="出入库"
      >
        <el-option  v-for="item in stateOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
        </el-option>
      </el-select>
      <el-select  class="filter-item"
                  style="width:200px;"
                  clearable
                  @change='handleFilter'
                  v-model="listQuery.operate_type"
                  placeholder="操作状态"
      >
        <el-option  v-for="item in stateOptions2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
        </el-option>
      </el-select>
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
        <el-table-column align="center" label="出入库" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.number < 0? 'danger': 'success'">{{scope.row.number < 0? '出库': '入库'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作类型" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.operate_type | handleTypeClass">{{scope.row.operate_type | handleType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.info}}</span>
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
          <el-form-item label="出入库" prop="is_input">
            <el-select  style="width: 100%"
                        clearable
                        v-model="temp.is_input"
                        placeholder="出入库">
              <el-option  v-for="item in stateOptions"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作类型" prop="operate_type">
            <el-select  style="width: 100%"
                        clearable
                        v-model="temp.operate_type"
                        placeholder="操作状态">
              <el-option  v-for="item in stateOptions2"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" >
            <el-input v-model="temp.info"
                      style="width: 100%"
                      type="textarea">
            </el-input>
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
  import { updateProductStorageManual, createProductStorageManual, getProductStorageManualList, deleteProductStorageManual } from '@/api/product'
  import { parseTime } from '@/utils/index'

  export default {
    components: { },
    name: 'manual_Management',
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
        is_input: undefined,
        product_storage_manual_id: undefined,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogStatus: undefined,
        dialogFormVisible: false,
        productOptions: [],
        productLoading: false,
        listQuery: {
          operate_type: undefined,
          is_input: undefined,
          date_range: [
            parseTime(new Date(new Date().getTime() - 1000 * 3600 * 24 * 7), '{y}-{m}-{d}'),
            parseTime(new Date(), '{y}-{m}-{d}')
          ],
          page: 1,
          page_size: 20,
          sort: '-id'
        },
        stateOptions: [
          { id: 0, label: '出库' },
          { id: 1, label: '入库' }
        ],
        stateOptions2: [
          { id: 0, label: '内部使用' },
          { id: 1, label: '人工退货' }
        ],
        temp: {
          product_goods_id: undefined,
          number: undefined,
          operate_type: undefined,
          info: undefined,
          is_input: undefined
        },
        rules: {
          product_goods_id: [{ required: true, message: '选择商品', trigger: 'change' }],
          number: [
            { validator: validate, trigger: 'change' }
          ],
          operate_type: [{ required: true, message: '必选', trigger: 'change' }],
          is_input: [{ required: true, message: '必选', trigger: 'change' }]
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
        getProductStorageManualList(this.listQuery).then(res => {
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
            if (this.temp.is_input === 0) {
              this.temp.number = 0 - this.temp.number
            }
            createProductStorageManual(this.temp).then(res => {
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
        if (this.productOptions.findIndex(d => d.id === row.product_goods.id) === -1) {
          this.productOptions.push(row.product_goods)
        }
        this.temp.product_goods_id = row.product_goods_id
        this.temp.number = Math.abs(row.number)
        if (row.number > 0) {
          this.temp.is_input = 1
        } else {
          this.temp.is_input = 0
        }
        this.temp.info = row.info
        this.temp.operate_type = row.operate_type
        this.product_storage_manual_id = row.id
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.temp.is_input === 0) {
              this.temp.number = 0 - this.temp.number
            }
            const temp = Object.assign({ product_storage_manual_id: this.product_storage_manual_id }, this.temp)
            updateProductStorageManual(temp).then(res => {
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
            product_storage_manual_id: row.id
          }
          deleteProductStorageManual(ttempData).then(response => {
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
      this.getProductList(' ')
      this.getList()
    },
    watch: {
      dialogFormVisible(val) {
        if (!val) {
          this.$refs['dataForm'].resetFields()
          this.temp.info = undefined
          this.temp.product_goods_id = undefined
          this.temp.number = undefined
          this.temp.operate_type = undefined
          this.temp.is_input = undefined
        }
      }
    },
    filters: {
      handleType(status) {
        const statusMap = {
          '0': '内部使用',
          '1': '人工退货'
        }
        return statusMap[status]
      },
      handleTypeClass(status) {
        const statusMap = {
          '0': 'warning',
          '1': 'primary'
        }
        return statusMap[status]
      }
    }
  }
</script>
