<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="在售">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <!--<el-date-picker class="filter-item"-->
                      <!--v-model="listQuery.date_range"-->
                      <!--type="daterange"-->
                      <!--format="yyyy-MM-dd"-->
                      <!--value-format="yyyy-MM-dd"-->
                      <!--align="right"-->
                      <!--unlink-panels-->
                      <!--range-separator="~"-->
                      <!--start-placeholder="开始日期"-->
                      <!--end-placeholder="结束日期"-->
                      <!--:picker-options="pickerOptions"-->
                      <!--@change='handleFilter'>-->
      <!--</el-date-picker>-->
      <!--<el-select  class="filter-item"-->
                  <!--style="width:200px;"-->
                  <!--@change='handleFilter'-->
                  <!--v-model="listQuery.product_id"-->
                  <!--filterable-->
                  <!--clearable-->
                  <!--remote-->
                  <!--placeholder="请选择商品"-->
                  <!--:remote-method="getProductList"-->
                  <!--:loading="productLoading">-->
        <!--<el-option  v-for="item in productOptions"-->
                    <!--:key="item.id"-->
                    <!--:label="item.goods_name"-->
                    <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-table :key='tableKey'
                :data="list"
                v-loading="listLoading"
                element-loading-text="给我一点时间"
                border
                fit
                highlight-current-row
                style="width: 100%"
                stripe>
        <el-table-column align="center" label="商品名称" min-width="260px">
          <template slot-scope="scope">
            <span>{{scope.row.goods_name}}</span>
            <el-tag style="height:20px;line-height:20px;" :type="scope.row.status | statusFilter">{{scope.row.status | statusTranslator}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属产品" min-width="100">
          <template slot-scope="scope" >
            <el-tag type="primary" v-for="item in scope.row.product" :key="item.id">{{item.product_name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="剩余库存" >
          <template slot-scope="scope">
            <span>{{scope.row.stock}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="日均消耗">
          <template slot-scope="scope">
            <span>{{scope.row.average_cost}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="生产周期" >
        <template slot-scope="scope">
          <span>{{scope.row.production_cycle}}天</span>
        </template>
      </el-table-column>
        <el-table-column align="center" label="可用天数" min-width="150" >
          <template slot-scope="scope">
            <span v-if="scope.row.average_cost !== 0">{{parseInt(scope.row.stock / scope.row.average_cost)}}天</span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="库存状态" min-width="150" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.stock === 0"  type="danger">已断货</el-tag>
            <el-tag v-else-if="scope.row.stock / scope.row.average_cost > scope.row.production_cycle || scope.row.stock / scope.row.average_cost === scope.row.production_cycle" type="success">库存充裕</el-tag>
            <el-tag v-else="scope.row.stock / scope.row.average_cost < scope.row.production_cycle" type="warning">库存告警</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import { getProductGoodsList } from '@/api/product_goods'

  export default {
    components: { },
    name: 'inventoryWarning',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        scrollTop: 0,
        list: null,
        total: null,
        listLoading: false,
        productOptions: [],
        productLoading: false,
        listQuery: {
          product_id: undefined,
          date_range: '',
          page: 1,
          page_size: 20,
          sort: '-id',
          status: 1
        },
        statusOptions: [{ label: '非在售', key: 0 }, { label: '在售', key: 1 }],
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
        getProductGoodsList(this.listQuery).then(response => {
          this.list = response.data.data
          this.listLoading = false
          this.total = response.data.total
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
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'info',
          1: 'success'
        }
        return statusMap[status]
      },
      statusTranslator(status) {
        const statusMap = {
          0: '非在售',
          1: '在售'
        }
        return statusMap[status]
      }
    }
  }
</script>
