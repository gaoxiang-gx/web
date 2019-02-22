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
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="客服" v-model="listQuery.support_member_nickname">-->
      <!--</el-input>-->
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="微信号" v-model="listQuery.weixin_account">-->
      <!--</el-input>-->
      <el-select clearable @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.is_used" placeholder="状态">
        <el-option v-for="item in isUsedOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select clearable @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.user_account_group_id" placeholder="客服部门">
        <el-option v-for="item in userGroupOptions" :key="item.id" :label="item.group_name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.pay_type_id" placeholder="付款方式">
        <el-option v-for="item in OrdersPayTypeOptions" :key="item.id" :label="item.type_name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <p style="text-align: right;padding-right:20px;font-size:22px;">
        <span>总金额：<span style="color:red;">{{paid_money_total}}</span></span>
      </p>
    </div>

    <el-table :stripe="true" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="付款方式">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.orders_pay_type.type_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="凭证图片">
        <template slot-scope="scope">
            <span class="link-type" @click="handleOpenImage(scope.row.image_url)">
              <img style="height:100%;width:100%;" :src="scope.row.image_url"/>
            </span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="付款金额">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.paid_money}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.orders_payment_items !== null">{{scope.row.orders_payment_items.orders_payment.orders.support_member.nickname}}</el-tag>
          <el-tag :type="scope.row.is_used | statusFilter">{{scope.row.is_used|statusTranslator}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="订单号">
        <template slot-scope="scope">
          <span class="link-type" v-if="scope.row.orders_payment_items !== null">{{scope.row.orders_payment_items
.orders_payment.orders.orders_unique_id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" align="center" label="添加时间">
        <template slot-scope="scope">
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="付款方式" prop="pay_type_id">
          <el-select v-model="temp.pay_type_id"
                     filterable
                     remote
                     :remote-method="queryOrderPayTypeList"
                     :loading="payTypeLoading"
                     placeholder="请选择付款方式">
            <el-option
              v-for="item in payTypeOptions"
              :key="item.type_name"
              :label="item.type_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打款金额" prop="paid_money">
          <el-input v-model="temp.paid_money"></el-input>
        </el-form-item>
        <el-form-item label="截图">
          <el-upload
            :action="baseUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePictureSuccess"
            name="image">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imageDialogVisible">
      <img width="100%" :src="publicImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { getDomainSubExtraCodeList, createDomainSubExtraCode, updateDomainSubExtraCode } from '@/api/domain_sub'
import { getDomainList } from '@/api/domain'
import { getOrdersPayProofList, getOrdersPayTypeList } from '@/api/orders'
import { createPayProof, updatePayProof, deletePayProof } from '@/api/financial'
import { getUserAccountGroupList } from '@/api/user_group'
import waves from '@/directive/waves' // 水波纹指令
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
export default {
  name: 'financialTransfer',
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
        is_used: undefined,
        sort: '-id',
        pay_type_id: undefined,
        user_account_group_id: undefined,
        user_account_type_id: 2
      },
      paid_money_total: 0,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      userGroupOptions: [],
      OrdersPayTypeOptions: [],
      showAuditor: false,
      temp: {
        id: undefined,
        pay_type_id: undefined,
        image_url: '',
        paid_money: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
      },

      innerList1: null,
      innerTotal1: null,
      innerTableKey1: 1,
      innerTableTitle1: '',
      innerListQuery1: {
        page: 1,
        page_size: 5,
        domain_sub_id: undefined,
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
      },
      domainOptions: [],
      publicImageUrl: '',
      imageDialogVisible: false,
      isUsedOptions: [{ label: '未认领', key: 0 }, { label: '已认领', key: 1 }],
      baseUrl: process.env.BASE_API + '/api/document/uploadImage',
      payTypeLoading: false,
      payTypeOptions: [],
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
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'gray',
        0: 'success'
      }
      return statusMap[status]
    },
    statusTranslator(status) {
      const statusTransMap = {
        1: '已认领',
        0: '未认领'
      }
      return statusTransMap[status]
    }
  },
  created() {
    this.getList()
    this.queryOrderPayTypeList(' ')
    this.getUserAccountGroupList()
    this.getPayTypeList()
  },
  methods: {
    getPayTypeList() {
      getOrdersPayTypeList({}).then(response => {
        if (response.data) {
          this.OrdersPayTypeOptions = response.data
        }
      })
    },
    getUserAccountGroupList() {
      getUserAccountGroupList({ type_code: 'support' }).then(response => {
        if (response.data.data) {
          this.userGroupOptions = response.data.data
        }
      })
    },
    queryOrderPayTypeList(query) {
      if (query !== '') {
        this.payTypeLoading = true
        getOrdersPayTypeList({ type_name: query }).then(response => {
          this.payTypeOptions = response.data
          this.payTypeLoading = false
        })
      } else {
        this.payTypeOptions = []
      }
    },
    handlePictureSuccess(response, file, fileList) {
      this.temp.image_url = process.env.BASE_API + response.data.url
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.publicImageUrl = file.url
      this.imageDialogVisible = true
    },
    handleOpenImage(imageUrl) {
      this.publicImageUrl = imageUrl
      this.imageDialogVisible = true
    },
    queryDomainList(query) {
      getDomainList({ domain_name: query }).then(response => {
        if (!response.data.data) return
        console.log(response)
        this.domainOptions = response.data.data.map(v => ({
          id: v.id,
          domain_name: v.domain_name
        }))
      })
    },
    getList() {
      this.listLoading = true
      getOrdersPayProofList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.paid_money_total = response.data.paid_money_total
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
      const tempData = {}
      tempData.domain_sub_id = row.id
      tempData.status = status
      row.status = status
      updatePayProof(tempData).then(() => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
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
          createPayProof(this.temp).then(response => {
            this.list.unshift(response.data)
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
      this.temp = Object.assign({}, row) // copy obj
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
          tempData.orders_pay_proof_id = this.temp.id
          updatePayProof(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
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
      this.$confirm('此操作将永久删除该付款凭证, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ttempData = {}
        ttempData.orders_pay_proof_id = row.id
        deletePayProof(ttempData).then(response => {
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
    handleOpenInner1(row) {
      this.innerTableVisible1 = true
      this.innerTableTitle1 = row.domain_prefix + '.' + row.domain.domain_name + ' -- 附加代码'
      this.temp = Object.assign({}, row) // copy obj
      this.getInnerList1()
    },
    getInnerList1() {
      this.innerListQuery1.domain_sub_id = this.temp.id
      this.innerTemp1.domain_id = this.temp.id
      this.innerListLoading1 = true
      getDomainSubExtraCodeList(this.innerListQuery1).then(response => {
        this.innerList1 = response.data.data
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
    resetInnerTemp1() {
      this.innerTemp1 = {
        id: undefined,
        domain_sub_id: this.temp.id,
        name: '',
        code: ''
      }
    },
    handleInnerCreate1() {
      this.resetInnerTemp1()
      this.dialogStatus = 'create'
      this.innerDialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['innerDataForm1'].clearValidate()
      })
    },
    createInnerData1() {
      this.$refs['innerDataForm1'].validate((valid) => {
        if (valid) {
          createDomainSubExtraCode(this.innerTemp1).then(response => {
            this.innerTotal1++
            this.innerTemp1 = response.data
            this.innerList1.unshift(this.innerTemp1)
            this.innerDialogFormVisible1 = false
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
    handleInnerUpdate1(row) {
      this.innerTemp1 = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.innerDialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['innerDataForm1'].clearValidate()
      })
    },
    updateInnerData1() {
      this.$refs['innerDataForm1'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.innerTemp1)
          tempData.domain_sub_extra_code_id = this.innerTemp1.id
          updateDomainSubExtraCode(tempData).then(() => {
            for (const v of this.innerList1) {
              if (v.id === this.innerTemp1.id) {
                const index = this.list.indexOf(v)
                this.innerList1.splice(index, 1, this.innerTemp1)
                break
              }
            }
            this.innerDialogFormVisible1 = false
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
    handleInnerDelete1(row) {
      this.$confirm('此操作将永久删除该附加代码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ttempData = {
          domain_sub_extra_code_id: row.id
        }
        deletePayProof(ttempData).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.innerList1.indexOf(row)
          this.innerList1.splice(index, 1)
          this.innerTotal1--
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
