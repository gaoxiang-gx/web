<template>
  <div class="app-container calendar-list-container">


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>

  </div>
</template>

<script>
import { getUserAccountGroupList, getUserAccountGroupTree, createUserAccountGroup, updateUserAccountGroup, deleteUserAccountGroup } from '@/api/user_group'
import { getUserAccountDepartmentList } from '@/api/user_department'
import { getSupportMemberList } from '@/api/support_member'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'agentsroos',
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
        user_account_department_id: undefined,
        group_name: undefined,
        sort: '-id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showAuditor: false,
      temp: {
        id: undefined,
        group_name: '',
        pid: undefined
      },
      defaultProps: {
        children: 'child',
        label: 'group_name'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        group_name: [{ required: true, message: '填写小组名称', trigger: 'change' }]
      },
      userAccountGroupTree: [],
      payOptions: [],
      userDepaerOptions: [],
      payLoading: false,
      typeDisable: false,
      groupBackground: 'danger'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
    this.getUserAccountGroupTree()
  },
  deactivated() {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  },
  activated() {
    this.getList()
    this.getUserAccountGroupTree()
    window.scrollTo(0, this.scrollTop)
  },
  methods: {
    handlecheck(obj) {
      const checked = this.$refs.tree.getCheckedKeys()
      if (checked.length === 1) {
        this.$refs.tree.setCheckedKeys([obj.id])
        this.temp.pid = obj.id
      } else if (checked.length === 0) {
        this.$refs.tree.setCheckedKeys([])
        this.temp.pid = undefined
      } else {
        this.$refs.tree.setCheckedKeys([obj.id])
        this.temp.pid = obj.id
      }
    },
    getUserAccountGroupTree() {
      getUserAccountGroupTree().then(res=> {
        this.userAccountGroupTree = res.data
      })
    },
    getUserAccountList(query) {
      if (query !== '') {
        this.payLoading = true
        getSupportMemberList({ nickname: query, status: 1 }).then(response => {
          this.payOptions = response.data.data.map(v => ({
            id: v.id,
            nickname: v.nickname
          }))
          this.payLoading = false
        })
      }
    },
    getList() {
      this.listLoading = true
      getUserAccountGroupList(this.listQuery).then(response => {
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
        group_name: '',
        pid: undefined,
      }
    },
    handleCreate() {
      this.getUserAccountGroupTree()
      this.resetTemp()
      this.typeDisable = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUserAccountGroup(this.temp).then(response => {
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
    handleUpdate(row) {
      this.payOptions = []
      if (row.pay_to_user_account !== null && row.pay_to_user_account !== 0) {
        this.payOptions = [row.pay_to_user_account]
      }
      this.temp = Object.assign({}, row) // copy obj
      this.typeDisable = true
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = {}
          tempData.group_name = this.temp.group_name
          tempData.user_account_group_id = this.temp.id
          tempData.user_account_department_id = this.temp.user_account_department_id
          tempData.user_account_type_id = this.temp.user_account_type.id
          updateUserAccountGroup(tempData).then(() => {
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
      this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ttempData = {
          user_account_group_id: row.id
        }
        deleteUserAccountGroup(ttempData).then(response => {
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
  }
}
</script>
