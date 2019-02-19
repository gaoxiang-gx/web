<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select  @change='handleFilter2'
                  clearable
                  filterable
                  placeholder="部门"
                  class="filter-item"
                  style="width:150px"
                  :loading="departmentLoading"
                  v-model="listQuery.support_user_account_department_id">
        <el-option v-for="item in departmentOptions"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-select
        @change='handleFilter'
        clearable
        filterable
        placeholder="作者"
        class="filter-item"
        style="width:150px"
        remote
        :remote-method="getUserAccountList"
        :loading="userAccountLoading"
        v-model="listQuery.account_id">
        <el-option v-for="item in userAccountOptions" :key="item.id" :label="item.nickname" :value="item.id">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入文章标题" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div>

    <el-table :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              style="width: 100%"
              stripe>
      <el-table-column align="center" label="ID" width="70px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核" width="90px">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.is_verified == 0">未通过</el-tag>
          <el-tag type="success" v-else>通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" min-width="250px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdateSpeech(scope.row)">{{scope.row.title}}</span>&nbsp<el-tag v-if="scope.row.is_perfect == 1" style="background: #f78989;color: white;">精</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="知识树标签" min-width="200px">
        <template slot-scope="scope">
          <el-tag size="mini" type="primary" v-for="item in scope.row.tag" :key="item.tag_name" style="margin-right: 5px">{{item.tag_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.author.nickname}}</span><br/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_verified == 0" type="success" size="mini" @click="handleVerified(scope.row)">审核</el-button>
          <el-button type="primary" size="mini" @click="handleUpdateSpeech(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleeditSpeechTag(scope.row)">标签设置</el-button>
          <el-button type="danger" size="mini" @click="handledeleteSpeech(scope.row)"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog class="articleDialog" :visible.sync="dialogFormVisible" width="80%">
      <div slot="title">
        {{textMap[dialogStatus]}}
      </div>
      <el-form :rules="speechRules" ref="DataForm" :model="tempSpeech" label-position="left" label-width="100px" >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="tempSpeech.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" class="contents">
          <div id="editorElem1" style="text-align:left;" class="wangeditor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="createSpeech">确 定</el-button>
        <el-button v-else type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog class="dialog_tag" :visible.sync="dialogFormVisibleTag" width="40%" >
      <div slot="title">文章标签</div>
      <el-tree :data="tagTree"
               :props="defaultProps"
               default-expand-all
               ref="tree"
               node-key="id"
               check-strictly
               show-checkbox
               @node-click="">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTag = false">取 消</el-button>
        <el-button type="primary" @click="editSpeechTag">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="imageDialogVisible2" width="60%" class="previewDialog">
      <h1 style="text-align: center" v-html="previewdata.title"></h1>
      <p style="text-align: left;font-weight: 600;margin-bottom: 40px">
        <span >{{previewdata.author.nickname}}&nbsp&nbsp&nbsp{{previewdata.updated_at}}</span>
      </p>
      <div style="font-size: 16px;margin-top: 20px" v-html="previewdata.content"></div>
    </el-dialog>
  </div>
</template>

<script >
  import { createCopywriteArtical, deleteCopywriteArtical, checkCopywriteArtical, updateCopywriteArtical, editCopywriteArticalTag, getCopywriteArticalList } from '@/api/copywrite'
  import { getTagTree } from '@/api/tag'
  import { wangEditor } from '@/utils/wang'
  import { getUserAccountDepartmentGroupTree } from '@/api/user_department'
  import { getSupportMemberList } from '@/api/support_member'
  export default {
    name: 'article_knowledge',
    data() {
      return {
        wangeditor1: wangEditor('#editorElem1', this.handleWangeditor),
        speech: undefined,
        editorContent: '',
        tableKey: 0,
        previewdata: {
          author: {
            nickname: undefined
          },
          title: undefined,
          content: undefined
        },
        total: undefined,
        listLoading: false,
        imageDialogVisible2: false,
        list: [],
        listQuery: {
          page: 1,
          page_size: 20,
          sort: '-id',
          support_user_account_department_id: undefined,
          is_perfect: undefined,
          title: undefined,
          account_id: undefined,
          tag_id: undefined
        },
        userAccountLoading: false,
        userAccountOptions: [],
        dialogStatus: '',
        dialogFormVisible: false,
        dialogFormVisibleTag: false,
        dialogFormVisibleUpdate2: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        perfectOptions: [{ label: '是', key: 1 }, { label: '否', key: 0 }],
        filteroptions: [
          { id: 1, label: '强制' },
          { id: 0, label: '非强制' }
        ],
        filteroptions2: [
          { id: 1, label: '过审' },
          { id: 0, label: '未通过' }
        ],
        speechRules: {
          title: [{ required: true, message: '填写标题', trigger: 'change' }]
        },
        tagTree: undefined,
        tagTree2: undefined,
        tempSpeechTag: {
          artical_id: undefined,
          tag_ids: []
        },
        tempUpdate: {
          artical_id: undefined,
          title: undefined,
          content: undefined
        },
        tempUpdateId: undefined,
        departmentOptions: [],
        departmentLoading: false,
        tempSpeech: {
          title: undefined,
          content: undefined
        },
        temptagarray: [],
        temptagarray2: [],
        defaultProps: {
          children: 'child',
          label: 'tag_name'
        }
      }
    },
    mounted() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.wangeditor1.create()
        this.dialogFormVisible = false
      })
    },
    methods: {
      getUserAccountList(query) {
        if (query !== '') {
          this.userAccountLoading = true
          getSupportMemberList({ nickname: query }).then(response => {
            this.userAccountOptions = response.data.data
            this.userAccountLoading = false
          })
        }
      },
      handlPreview(row) {
        this.imageDialogVisible2 = true
        this.previewdata = row
      },
      getList() {
        this.listLoading = true
        getCopywriteArticalList(this.listQuery).then(res => {
          this.list = res.data.data
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleeditSpeechTag(row) {
        const tagArray = []
        for (const v in row.tag) {
          tagArray.push(row.tag[v].id)
        }
        this.tempSpeechTag.artical_id = row.id
        this.dialogFormVisibleTag = true
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(tagArray)
          // this.$refs.tree2.setCheckedKeys(tagArray)
        })
      },
      handleFilter2() {
        this.listQuery.account_id = undefined
        this.listQuery.page = 1
        this.getList()
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
      handleVerified(row) {
        this.$confirm('审核通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkCopywriteArtical({ artical_id: row.id, is_verified: 1 }).then(response => {
            this.$notify({
              title: '审核通过',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      handledeleteSpeech(row) {
        this.$confirm('此操作将永久删除该话术, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCopywriteArtical({ artical_id: row.id }).then(response => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.tempSpeech.title = undefined
        this.wangeditor1.txt.clear()
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['DataForm'].clearValidate()
        })
      },
      createSpeech() {
        this.$refs['DataForm'].validate((valid) => {
          if (valid) {
            this.tempSpeech.content = this.wangeditor1.txt.html()
            createCopywriteArtical(this.tempSpeech).then(() => {
              this.getList()
              this.dialogFormVisible = false
            })
          }
        })
      },
      getUserAccountDepartment() {
        this.departmentLoading = true
        getUserAccountDepartmentGroupTree({ user_account_type: 'support' }).then(res => {
          this.departmentOptions = res.data.map(item => {
            return {
              id: item.id,
              label: item.department_name
            }
          })
          this.departmentLoading = false
        })
      },
      getTagTree() {
        getTagTree({ tag_type_code: 'artical', is_customized: 0, sort: '+id' }).then(res => {
          this.tagTree = res.data
        })
      },
      editSpeechTag() {
        this.temptagarray = this.$refs.tree.getCheckedKeys()
        // this.temptagarray2 = this.$refs.tree2.getCheckedKeys()
        this.tempSpeechTag.tag_ids = []
        if (this.temptagarray.length > 0) {
          this.tempSpeechTag.tag_ids.push(...this.temptagarray)
        }
        // if (this.temptagarray2.length > 0) {
        //   this.tempSpeechTag.tag_ids.push(...this.temptagarray2)
        // }
        editCopywriteArticalTag(this.tempSpeechTag).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogFormVisibleTag = false
          this.getList()
        })
      },
      handleUpdateSpeech(row) {
        this.dialogStatus = 'update'
        this.tempUpdateId = row.id
        this.tempSpeech.title = row.title
        this.wangeditor1.txt.html(row.content)
        this.dialogFormVisible = true
      },
      updateData() {
        this.$refs['DataForm'].validate((valid) => {
          if (valid) {
            const parm = {
              artical_id: this.tempUpdateId,
              title: this.tempSpeech.title,
              content: this.wangeditor1.txt.html()
            }
            updateCopywriteArtical(parm).then(() => {
              this.getList()
              this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            })
          }
        })
      }
    },
    created() {
      this.getList()
      this.getUserAccountDepartment()
      this.getTagTree()
    }
  }
</script>

<style scoped>
  .content >>> .el-textarea__inner {
    background: #9df3478f;
  }
  .articleDialog >>> .el-dialog{
    margin-top: 10vh!important;
  }
  .articleDialog >>> .el-dialog__body{
    padding: 0px 20px;
  }
</style>
