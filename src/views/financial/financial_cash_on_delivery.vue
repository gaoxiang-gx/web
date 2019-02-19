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
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleOpenInner1">导入代收款明细</el-button>
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
      <el-table-column min-width="100px" align="center" label="物流单号">
        <template slot-scope="scope">
          <span class="link-type" v-if="scope.row.orders_payment.orders.orders_logistics">{{scope.row.orders_payment.orders.orders_logistics.logistics_number}}</span>
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

    <el-dialog :title="innerTableTitle1" :visible.sync="innerTableVisible1">
      <div class="filter-container">
        <el-upload
          :action="baseUrl"
          :headers="uploadHeaders"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handlePictureSuccess"
          :on-progress="handleOnProgress"
          name="excel"
          :show-file-list="true"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">上传代收款明细</el-button>
        </el-upload>
      </div>
      <el-table
        v-if="innerList1 !== null"
        :key='innerTableKey1'
        :data="innerList1"
        v-loading="innerListLoading1"
        element-loading-text="给我一点时间"
        border fit highlight-current-row
        style="width: 100%"
        :row-style="setRowStyle">
        <el-table-column min-width="100px" align="center" label="所属订单号">
          <template slot-scope="scope">
            <span class="link-type">{{scope.row.orders_unique_id}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="220px" align="center" label="物流信息">
          <template slot-scope="scope">
            <el-tag>{{scope.row.logistics_name}}</el-tag>
            <span>{{scope.row.logistics_number}}</span>
            <el-tag type="danger" v-if="parseInt(scope.row.cash_on_delivery_money) !== parseInt(scope.row.money)">金额错误</el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="物流反款金额">
          <template slot-scope="scope">
            <span>￥{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="订单代收金额">
          <template slot-scope="scope">
            <span>￥{{scope.row.cash_on_delivery_money}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | paymentItemStatusFilter">{{scope.row.status|paymentItemStatusTranslator}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="添加时间">
          <template slot-scope="scope">
            <span>{{scope.row.created_at}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" v-if="innerList1 !== null">
        <el-button :disabled="(innerList1 === null) || (innerList1.length < 1)" type="primary" @click="createInnerData1">确认代收货款信息</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrdersPaymentItemList, updateCashOnDeliveryStatusMassively } from '@/api/financial'
import { updateOrdersPaymentItemMassively } from '@/api/orders'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'cashOnDeliveryFinancialManagement',
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
        orders_status_array: [3, 5, 7],
        sort: '-id',
        pay_type_code: 'cash_on_delivery',
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
      multipleSelection: [],
      baseUrl: process.env.BASE_API + '/api/finance/uploadCashOnDeliveryExcel',
      uploadHeaders: {
        'authorization': this.$store.state.user.token
      },
      fileList: [],
      innerList1: null,
      innerTotal1: null,
      innerTableKey1: 1,
      innerTableTitle1: '',
      innerListQuery1: {
        page: 1,
        page_size: 10000,
        product_weixin_id: undefined,
        status: 1,
        pay_type_code: 'weixin_pay',
        sort: '-id'
      },
      innerTemp1: {
        id: undefined,
        domain_id: undefined,
        name: '',
        code: ''
      },
      innerListLoading1: false,
      innerTableVisible1: false,
      innerDialogFormVisible1: false,
      innerRules1: {
        name: [{ required: true, message: '请正确填写名称', trigger: 'change' }]
      }
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
    },
    handleOpenInner1() {
      this.innerList1 = null
      this.fileList = []
      this.innerTableVisible1 = true
      this.innerTableTitle1 = ' 导入代收款明细'
    },
    setRowStyle(row, rowIndex) {
      console.log(row.money)
      console.log(row.cash_on_delivery_money)
      // if (parseInt(row.money) !== parseInt(row.cash_on_delivery_money)) {
      //   return 'background-color:#510000 !important;'
      // }
    },
    handlePictureSuccess(response, file, fileList) {
      this.innerListLoading1 = false
      console.log(file.name)
      this.fileList = []
      this.fileList.push(file)
      console.log(this.$store.state.user.token)
      if (response.code === 200) {
        this.innerList1 = response.data
      } else {
        this.innerList1 = []
      }
    },
    handlePreview(file) {
      console.log(1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleOnProgress(event, file, fileList) {
      this.innerList1 = []
      this.innerListLoading1 = true
      // console.log(file)
      // console.log(fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了个文件`)
    },
    getInnerList1() {
      this.innerListLoading1 = true
      this.totalMoney = 0.00
      getOrdersPaymentItemList(this.innerListQuery1).then(response => {
        this.innerList1 = response.data.data
        for (const v of this.innerList1) {
          this.totalMoney += parseFloat(v.paid_money)
        }
        this.innerTotal1 = response.data.total
        this.innerListLoading1 = false
      })
    },
    handleInnerFilter1() {
      this.innerListQuery1.page = 1
      this.getInnerList1()
    },
    handleInnerSizeChange1(val) {
      this.innerListQuery1.page_size = val
      this.getInnerList1()
    },
    handleInnerCurrentChange1(val) {
      this.innerListQuery1.page = val
      this.getInnerList1()
    },
    createInnerData1() {
      const tempParam = {}
      tempParam.payment_items_ids = []
      for (const v of this.innerList1) {
        tempParam.payment_items_ids.push(v.payment_items_id)
      }
      updateCashOnDeliveryStatusMassively(tempParam).then(response => {
        for (const v of this.innerList1) {
          v.status = 1
          const index = this.list.indexOf(v)
          this.innerList1.splice(index, 1, v)
        }
        this.$notify({
          title: '成功',
          message: '设置成功',
          type: 'success',
          duration: 2000
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
