<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-cascader
        class="filter-item"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="手机号" v-model="listQuery.phone">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.nickname">
      </el-input>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div>

    <el-table :span-method="objectSpanMethod" :stripe="true" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label=ID width="50px">
        <template slot-scope="scope">
          <span>{{scope.row.user.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="状态" width="70px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusTranslator}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="手机号" width="120px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleInnerUpdate1(scope.row)">{{scope.row.user.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="用户名">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.user_account_type.type_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" align="center" label="角色">
        <template slot-scope="scope">
          <span v-if="scope.row.user_account_role">{{scope.row.user_account_role.role_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="所属部门">
        <template slot-scope="scope">
          <span type="info" v-if="scope.row.user_account_department !== null && scope.row.user_account_department !== undefined">{{scope.row.user_account_department.department_name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="所属分组">
        <template slot-scope="scope">
          <span>{{scope.row.user_account_group.group_name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="320" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getUserAuthList(scope.row)">权限管理</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!=0" size="small" type="warning" @click="handleModifyStatus(scope.row,0)">冻结
          </el-button>
          <el-button v-if="scope.row.status!=1" size="small" type="success" @click="handleModifyStatus(scope.row,1)">激活
          </el-button>
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
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px" style='width: 90%; margin-left:5%;'>
        <el-form-item label="手机号码" prop="user.phone">
          <el-input v-model="temp.user.phone" :disabled="inputDisable"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="temp.nickname" :disabled="inputDisable"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="user_account_role.id">
          <el-select v-model="temp.user_account_role.id" placeholder="请选择用户权限">
            <el-option
              v-for="item in roleOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户部门">
          <el-select
            v-model="temp.user_account_department_id"
            placeholder="请选择部门"
            @change="handleGetGroup"
            remote
            filterable
            :remote-method="getDepartList"
            :loading="getDepartLoading"
          >
            <el-option
              v-for="item in departOptions"
              :key="item.id"
              :label="item.department_name"
              class="bg"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="temp.user_account_group_id" placeholder="请选择用户组" clearable>
            <el-option
              v-for="item in groupOptions"
              :key="item.id"
              :label="item.group_name"
              class="bg"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="innerTableTitle1" :visible.sync="innerTableVisible1" width="90%" >
      <div class="filter-container" align="right">
        <el-button align="right" class="filter-item" style="margin-left: 10px;" @click="handleInnerCreate1" type="primary" icon="el-icon-edit">添加</el-button>
      </div>

      <el-table :stripe="true" :key='innerTableKey1' :data="innerList1" v-loading="innerListLoading1" element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%">
        <el-table-column align="center" label="序号" width="65" >
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="center" label="名称">
          <template slot-scope="scope">
            <span class="link-type" @click="handleInnerUpdate1(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.updated_at}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="320" class-name="small-padding">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleInnerUpdate1(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleInnerDelete1(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!innerListLoading1" class="pagination-container">
        <el-pagination background @size-change="handleInnerSizeChange1" @current-change="handleInnerCurrentChange1" :current-page.sync="innerListQuery1.page"
                       :page-sizes="[5,10,50, 100]" :page-size="innerListQuery1.page_size" layout="total, sizes, prev, pager, next, jumper" :total="innerTotal1">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="innerDialogFormVisible1">
      <el-form :rules="innerRules1" ref="innerDataForm1" :model="innerTemp1" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="innerTemp1.phone" :disabled="phoneDisabled"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="innerTemp1.password"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button @click="innerDialogFormVisible1 = false">取 消</el-button>
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="createInnerData1">确 定</el-button>-->
        <el-button type="primary" @click="updateInnerData1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogAuthTitle +' 权限管理'" :visible.sync="dialogAuthVisible" width="30%">
      <el-tree
        :data="menudata"
        size="font-size: 25px;"
        :props="defaultProps"
        ref="tree"
        show-checkbox
        node-key="idd"
        :default-expand-all="false"
      >
      </el-tree>
      <div  slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAccountAuthList">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserList, createUserAccount, updateUserAccount, updateUserPassword } from '@/api/user'
  import { getUserAccountRoleList } from '@/api/user_role'
  import { getUserAccountGroupTree } from '@/api/user_group'
  import { getUserAccountDepartmentList } from '@/api/user_department'
  import { getUserAccountTypeList, getUserAccountGroupList } from '@/api/user_group'
  import waves from '@/directive/waves'
  import ElFormItem from 'element-ui/packages/form/src/form-item' // 水波纹指令
  import { getAccountRolePermission, getPermissionByMenu, getAccountPermission, editUserAccountPermission } from '@/api/auth'
  export default {
    components: { ElFormItem },
    name: 'userManage',
    directives: {
      waves
    },
    data() {
      return {
        nodeObject: {},
        scrollTop: 0,
        tableKey: 0,
        list: [],
        data: [],
        menudata: [],
        options: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          page_size: 20,
          copyright: undefined,
          domain_name: undefined,
          ip: undefined,
          sort: '-id'
        },
        defaultProps: {
          children: 'children',
          label: (data, node) => {
            return data.menu_name ? data.menu_name : data.permission_name
          },
          disabled: (data, node) => {
            if (data.idd && this.roleArry.indexOf(data.idd) > -1) {
              return true
            }
          }
        },
        tempData: {
          user_account_id: undefined,
          permission_list: []
        },
        selectedOptions: [],
        active: '',
        roleArry: [],
        accountArry: [],
        disabledCheck: [],
        checkedList: [],
        checkedList2: [],
        checkList: [],
        checkedId: [],
        authList: [],
        accountAuthList: [],
        tempAuthData: {
          user_account_id: undefined
        },
        dialogAuthVisible: false,
        dialogAuthTitle: undefined,
        isdisable: false,
        importanceOptions: [1, 2, 3],
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showAuditor: false,
        temp: {
          id: undefined,
          nickname: '',
          user: {
            id: '',
            phone: ''
          },
          user_account_group_id: undefined,
          user_account_type: {
            id: undefined,
            type_name: ''
          },
          user_account_group: {
            id: undefined,
            group_name: ''
          },
          user_account_role: {
            id: undefined,
            role_name: ''
          }
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          user: {
            phone: [{ required: true, message: '请正确填写账号', trigger: 'change' }]
          },
          nickname: [{ required: true, message: '请正确填写用户名', trigger: 'change' }],
          user_account_type: {
            id: [{ required: true, message: '请选择', trigger: 'change' }]
          },
          user_account_role: {
            id: [{ required: true, message: '选择权限', trigger: 'change' }]
          }
        },
        innerList1: null,
        innerTotal1: null,
        innerTableKey1: 1,
        innerTableTitle1: '',
        innerListQuery1: {
          page: 1,
          page_size: 5,
          domain_id: undefined,
          sort: '-id'
        },
        innerTemp1: {
          id: undefined,
          password: '',
          phone: ''
        },
        PermissionByMenuList: [],
        innerListLoading1: false,
        innerTableVisible1: false,
        innerDialogFormVisible1: false,
        innerRules1: {
          name: [{ required: true, message: '请正确填写名称', trigger: 'change' }]
        },
        colSpanRegular: [],
        countNumber: [],
        countIndex: [],
        typeDisable: false,
        groupOptions: [],
        departOptions: [],
        getDepartLoading: false,
        roleOptions: [],
        inputDisable: false,
        typeBackground: 'danger',
        roleBackground: 'info',
        groupBackground: 'info',
        phoneDisabled: true
      }
    },
    watch: {
      dialogAuthVisible(val) {
        if (val === false) {
          this.active = ''
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'warning',
          1: 'success',
          2: 'danger'
        }
        return statusMap[status]
      },
      statusTranslator(status) {
        const statusTransMap = {
          0: '冻结',
          1: '开启',
          2: '已删除'
        }
        return statusTransMap[status]
      }
    },
    created() {
      this.getList()
      this.getUserAccountRoleList()
      this.getUserAccountGroupTree()
    },
    methods: {
      getUserAccountGroupTree() {
        getUserAccountGroupTree().then(res => {
          this.options = res.data
        })
      },
      handleChange() {

      },
      traverseTree(node) {
        if (!node) {
          return
        }
        this.traverseNode(node)
        if (node.children && node.children.length > 0) {
          var i = 0
          for (i = 0; i < node.children.length; i++) {
            this.traverseTree(node.children[i])
          }
        }
      },
      traverseNode(data) {
        if (data.permission_name) {
          data['idd'] = data['id']
          delete data['id']
        }
      },
      getPermissionByMenuList() {
        getPermissionByMenu().then(res => {
          for (const v of res.data) {
            this.traverseTree(v)
          }
          this.menudata = res.data
        })
      },
      handleModifyStatus(row, status) {
        const tempData = {}
        tempData.user_account_id = row.id
        tempData.status = status
        updateUserAccount(tempData).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          for (const v of this.list) {
            if (v.id === row.id) {
              const index = this.list.indexOf(v)
              v.status = status
              this.list.splice(index, 1, v)
              break
            }
          }
        })
      },
      handleGetGroup() {
        this.temp.user_account_group_id = undefined
        if (this.temp.user_account_type.id && this.temp.user_account_department_id) {
          this.getGroupList()
        }
      },
      handleGetRoles(state) {
        this.temp.user_account_role.id = state
        getUserAccountRoleList({ user_account_type_id: this.temp.user_account_type.id, status: 1 }).then(response => {
          this.roleOptions = response.data.data.map(v => ({
            key: v.id,
            label: v.role_name
          }))
        })
      },
      getDepartList(query) {
        if (query !== '') {
          this.getDepartLoading = true
          getUserAccountDepartmentList({ page_size: 0 }).then(response => {
            this.departOptions = response.data
            this.getDepartLoading = false
          })
        }
      },
      getGroupList() {
        if (this.temp.user_account_type.id && this.temp.user_account_department_id) {
          getUserAccountGroupList({ user_account_type_id: this.temp.user_account_type.id, user_account_department_id: this.temp.user_account_department_id }).then(response => {
            if (response.data.data) {
              this.groupOptions = response.data.data.map(v => ({
                id: v.id,
                group_name: v.group_name
              }))
            }
          })
        }
      },
      restAuthList() {
        this.checkedList = []
        this.checkedList2 = []
      },
      getUserAuthList(row) {
        this.roleArry = []
        this.accountArry = []
        this.dialogAuthTitle = row.nickname
        this.dialogAuthVisible = true
        this.getPermissionByMenuList()
        const temp = {}
        temp.user_account_role_id = row.user_account_role.id
        this.tempData.user_account_id = row.id
        this.restAuthList()
        const temprole = []
        getAccountRolePermission(temp).then(res => {
          for (const v of res.data.user_permission) {
            temprole.push(v.id)
          }
        })
        const ttemp = {
          user_account_id: row.id
        }
        getAccountPermission(ttemp).then(res => {
          for (const v of res.data.user_permission) {
            this.accountArry.push(v.id)
          }
          for (let i = 0; i < this.accountArry.length; i++) {
            for (let j = 0; j < temprole.length; j++) {
              if (this.accountArry[i] === temprole[j]) {
                temprole.splice(j, 1)
              }
            }
          }
          this.roleArry = temprole
          this.$refs.tree.setCheckedKeys(this.accountArry)
        })
      },
      // getUserAccountList() {
      //   getUserAccountMenuAuthRelationList(this.tempAuthData).then(res => {
      //     this.checkedList2 = res.data.auth_list
      //     for (var i = 0; i < this.checkedList2.length; i++) {
      //       for (var j = 0; j < this.checkedList.length; j++) {
      //         if (this.checkedList2[i] === this.checkedList[j]) {
      //           this.checkedList.splice(j, 1)
      //         }
      //       }
      //     }
      //     // console.log(this.checkedList)
      //     // this.checkedList2.push(...this.checkedList)
      //     // console.log(this.checkedList2)
      //     // for (const v of this.checkedList2) {
      //     //   for (const k of this.checkedList) {
      //     //     if (v === k) {
      //     //       document.getElementById('checkbox').setAttribute('disabled', true)
      //     //       // this.isdisable = true
      //     //     }
      //     //   }
      //     // }
      //   })
      // },
      getUserAccountRoleList() {
        getUserAccountRoleList(this.listQuery).then(response => {
          this.roleOptions = response.data.data.map(v => ({
            key: v.id,
            label: v.role_name
          }))
        })
      },
      updateAccountAuthList() {
        const keyArry = this.$refs.tree.getCheckedKeys()
        for (let v = 0; v < keyArry.length; v++) {
          console.log(v)
          if (keyArry[v] === undefined) {
            keyArry.splice(v, 1)
            v--
          }
        }
        console.log(keyArry)
        this.tempData.permission_list = keyArry
        editUserAccountPermission(this.tempData).then(res => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          this.dialogAuthVisible = false
        })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1) {
          const spannum = this.countNumber[this.countIndex[rowIndex]]
          if (spannum) {
            return {
              rowspan: spannum,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      countRowSpan() {
        var i = 0
        this.countNumber = []
        const countHas = []
        this.countIndex = []
        for (const v of this.list) {
          if (countHas.indexOf(v.user.id) < 0) {
            countHas.push(v.user.id)
            this.countIndex[i] = v.user.id
            this.countNumber[v.user.id] = 1
          } else {
            this.countNumber[v.user.id] += 1
          }
          i++
        }
      },
      getList() {
        this.listLoading = true
        this.list = []
        getUserList(this.listQuery).then(response => {
          const tempData = response.data.data
          for (const v of tempData) {
            for (const vv of v.user_account) {
              const cellData = {}
              cellData.user = {
                id: v.id,
                phone: v.phone
              }
              cellData.id = vv.id
              cellData.nickname = vv.nickname
              cellData.status = vv.status
              cellData.updated_at = vv.updated_at
              cellData.user_account_type = vv.user_account_type
              cellData.user_account_type_id = vv.user_account_type_id
              cellData.user_account_group = vv.user_account_group
              cellData.user_account_group_id = vv.user_account_group_id
              cellData.user_account_role = vv.user_account_role
              cellData.user_account_role_id = vv.user_account_role_id
              cellData.user_account_department = vv.user_account_department
              cellData.user_account_department_id = vv.user_account_department_id === 0 ? undefined : vv.user_account_department_id
              this.list.push(cellData)
            }
          }
          this.countRowSpan()
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
          nickname: '',
          user: {
            id: '',
            phone: ''
          },
          user_account_department_id: undefined,
          user_account_type_id: undefined,
          user_account_type: {
            id: undefined,
            type_name: ''
          },
          user_account_group_id: undefined,
          user_account_group: {
            id: undefined,
            group_name: ''
          },
          user_account_role_id: undefined,
          user_account_role: {
            id: undefined,
            role_name: ''
          }
        }
      },
      handleCreate() {
        this.resetTemp()
        this.inputDisable = false
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.phone = this.temp.user.phone
            this.temp.user_account_type_id = this.temp.user_account_type.id
            this.temp.user_account_role_id = this.temp.user_account_role.id
            createUserAccount(this.temp).then(response => {
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
        console.log(row)
        this.temp = Object.assign({}, row)
        this.handleGetRoles(this.temp.user_account_role.id)
        this.getGroupList()
        this.inputDisable = true
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
            tempData.user_account_id = this.temp.id
            tempData.user_account_group_id = this.temp.user_account_group_id
            tempData.user_account_department_id = this.temp.user_account_department_id
            tempData.user_account_role_id = this.temp.user_account_role.id
            updateUserAccount(tempData).then(response => {
              if (response.data) {
                this.temp.user_account_group = response.data.user_account_group
                this.temp.user_account_role = response.data.user_account_role
              }
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
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            title: '危险操作',
            message: '不支持删除用户操作， 请联系系统管理员',
            type: 'error',
            duration: 4000
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
        this.innerTableTitle1 = row.domain_name + ' -- 附加代码'
        this.temp = Object.assign({}, row) // copy obj
        this.getInnerList1()
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
          domain_id: this.temp.id,
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
      // createInnerData1() {
      //   this.$refs['innerDataForm1'].validate((valid) => {
      //     if (valid) {
      //       createDomainExtraCode(this.innerTemp1).then(response => {
      //         this.innerTotal1++
      //         this.innerTemp1 = response.data
      //         this.innerList1.unshift(this.innerTemp1)
      //         this.innerDialogFormVisible1 = false
      //         this.$notify({
      //           title: '成功',
      //           message: '创建成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     }
      //   })
      // },
      handleInnerUpdate1(row) {
        this.innerTemp1 = {}
        this.innerTemp1.user_id = row.user.id
        this.innerTemp1.phone = row.user.phone
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
            tempData.user_id = this.innerTemp1.user_id
            tempData.phone = this.innerTemp1.phone
            tempData.password = this.innerTemp1.password
            updateUserPassword(tempData).then(() => {
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
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            title: '危险操作',
            message: '不支持删除用户操作， 请联系系统管理员',
            type: 'error',
            duration: 2000
          })
          // const ttempData = {
          //   domain_extra_code_id: row.id
          // }
          // deleteDomainExtraCode(ttempData).then(response => {
          //   this.$notify({
          //     title: '成功',
          //     message: '删除成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          //   const index = this.innerList1.indexOf(row)
          //   this.innerList1.splice(index, 1)
          //   this.innerTotal1--
          // })
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
      this.getPermissionByMenuList()
      window.scrollTo(0, this.scrollTop)
    }
  }
</script>
<style>
  .is-disabled>.el-checkbox__inner::after {
    transform: rotate(45deg) scaleY(1);
  }
</style>
