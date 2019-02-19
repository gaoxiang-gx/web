<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-date-picker
        class="filter-item"
        v-model="listQuery.date_range"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        align="right"
        unlink-panels
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
        @change='handleFilter'>
      </el-date-picker>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="客服" v-model="listQuery.support_member_nickname">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="微信号" v-model="listQuery.weixin_account">
      </el-input>
      <el-select clearable @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in paymentItemStatusOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      :stripe="true"
      @selection-change="handleSelectionChange"
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border fit highlight-current-row
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column align="center" label="付款ID" width="85">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="客服">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.orders_payment.orders.support_member.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="微信号">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.orders_payment.orders.product_weixin.weixin_account}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="金额">
        <template slot-scope="scope">
          <span>￥{{scope.row.paid_money}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="所属订单号">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.orders_payment.orders.orders_unique_id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | paymentItemStatusFilter">{{scope.row.status|paymentItemStatusTranslator}}</el-tag>
          <el-tag v-if="scope.row.cash_date" :type="'success'">{{scope.row.cash_date}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="添加时间">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;text-align: right;margin-right:20px;">
      <span style="font-size: 40px !important; text-align: left;display: inline-block;padding-right: 50px;line-height: 60px;height: 60px;vertical-align: -16%;">￥{{totalMoney}}</span>
      <el-button v-if="listQuery.status === 1" type="success" @click="updatePaymentItemStatus()">确认提现</el-button>
    </div>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[20,50,100,200]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getOrdersPaymentItemList } from '@/api/financial'
import { updateOrdersPaymentItemMassively } from '@/api/orders'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'wxFinancialManagement',
  components: {},
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
        status: undefined,
        support_member_nickname: '',
        weixin_account: '',
        sort: '-id',
        pay_type_code: 'weixin_pay',
        date_range: ''
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showAuditor: false,
      temp: {
        id: undefined,
        domain_id: undefined,
        domain: { id: undefined, domain_name: undefined },
        domain_prefix: '',
        info: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        domain_prefix: [{ required: true, message: '请正确填写域名名称', trigger: 'change' }]
      },
      paymentItemStatusOptions: [
        { key: 0, display_name: '未确认' },
        { key: 1, display_name: '已确认' },
        { key: 2, display_name: '已删除' },
        { key: 3, display_name: '已提现' }
      ],
      pickerOptions2: {
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
      },
      multipleSelection: []
    }
  },
  computed: {
    totalMoney: function() {
      let total_money = 0.00
      for (const v of this.multipleSelection) {
        total_money += Math.round(parseFloat(v.paid_money) * 100) / 100
      }
      return total_money
    }
  },
  filters: {
    paymentItemStatusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success',
        2: 'danger',
        3: ''
      }
      return statusMap[status]
    },
    paymentItemStatusTranslator(status) {
      const statusMap = {
        0: '未确认',
        1: '已确认',
        2: '已删除',
        3: '已提现'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.listLoading = true
      getOrdersPaymentItemList(this.listQuery).then(response => {
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
    resetTemp() {
      this.temp = {
        id: undefined,
        domain_id: undefined,
        domain: { id: undefined, domain_name: undefined },
        domain_prefix: '',
        info: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updatePaymentItemStatus() {
      this.$confirm('确认提现？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'info',
            message: '请先选择要提现的条目'
          })
          return
        }
        const ttempData = {}
        const paymentItemIds = []
        for (const v of this.multipleSelection) {
          paymentItemIds.push(v.id)
        }
        ttempData.orders_payment_item_ids = paymentItemIds
        ttempData.status = 3
        updateOrdersPaymentItemMassively(ttempData).then(response => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '提现成功',
            type: 'success',
            duration: 2000
          })
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
