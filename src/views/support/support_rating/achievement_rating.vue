<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-if="($store.state.user.roles === 'administrator' || $store.state.user.roles === 'supportManager' || $store.state.user.roles === 'supportDirector')" @change='handleGroupFilter' style="width: 120px" class="filter-item" v-model="listQuery.support_user_account_group_id" placeholder="客服部门">
        <el-option v-for="item in userGroupOptions" :key="item.group_name" :label="item.group_name" :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        class="filter-item"
        v-model="listQuery.date_time"
        align="right"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        :picker-options="pickerOptions1"
        @change="handleFilter">
      </el-date-picker>
      <el-button class="filter-item" style="float:right;" @click="getList" type="primary">刷新</el-button>
    </div>
    <el-table :stripe="true" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="头像">
        <template slot-scope="scope">
          <span class="link-type">
              <img style="height:150px;" :src="scope.row.head_img" v-if="scope.row.is_top_three"/>
            <img style="height:80px;" :src="scope.row.head_img" v-else/>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="姓名">
        <template slot-scope="scope">
          <span class="link-type_top_three" v-if="scope.row.is_top_three">{{scope.row.nickname}}</span>
          <span class="link-type" v-else>{{scope.row.nickname}}</span>

        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="业绩">
        <template slot-scope="scope">
          <span class="link-type_top_three" v-if="scope.row.is_top_three">￥{{scope.row.total_sales}}</span>
          <span class="link-type" v-else>￥{{scope.row.total_sales}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="在售产品">
        <template slot-scope="scope">
          <el-tag :key="item.id" v-for="item in scope.row.support_product">{{item.product_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="入职时间">
        <template slot-scope="scope">
          <span>{{scope.row.created_at.slice(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="销售额进度">
        <template slot-scope="scope">
          <span class="link-type">
            <div class="outer_progress">
              <p class="inner_progress" v-bind:style="{ width: (scope.row.total_sales / max) * 100 + '%' }"></p>
            </div>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { getRealTimeRanking } from '@/api/support_rating'
  import { getUserAccountGroupList } from '@/api/user_group'
  import { parseTime } from '@/utils/index'
  export default {
    name: 'achievementRank',
    components: { },
    directives: {
      waves
    },
    data() {
      return {
        scrollTop: 0,
        rowKey: 0,
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          date_time: parseTime(new Date(), '{y}-{m}-{d}'),
          support_user_account_group_id: undefined,
          page: 1,
          page_size: 50
        },
        userGroupOptions: [],
        max: 10000,
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    filters: {

    },
    created() {
      if (this.$store.state.user.roles === 'administrator' || this.$store.state.user.roles === 'supportManager' || this.$store.state.user.roles === 'supportDirector') {
        this.getGroupList()
      } else {
        this.getList()
      }
    },
    methods: {
      getGroupList() {
        getUserAccountGroupList({ user_account_type_id: 2 }).then(response => {
          if (response.data.data) {
            this.userGroupOptions = response.data.data
            if (this.listQuery.support_user_account_group_id === undefined) {
              this.listQuery.support_user_account_group_id = this.userGroupOptions[(this.userGroupOptions.length - 1)].id
              this.getList()
            }
          }
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
      handleGroupFilter() {
        this.getList()
      },
      getList() {
        this.listLoading = true
        getRealTimeRanking(this.listQuery).then(response => {
          this.list = response.data.data
          if (this.list.length > 0) {
            if (this.list[0].total_sales > 0) {
              this.max = this.list[0].total_sales
            }
          }
          for (const v of this.list) {
            const index = this.list.indexOf(v)
            if (index < 3) {
              v.is_top_three = true
            } else {
              v.is_top_three = false
            }
            this.list.splice(index, 1, v)
          }
          this.total = response.data.total
          ++this.tableKey
          this.listLoading = false
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
<style>
  .outer_progress {
    height: 18px;
    width: 100%;
    padding: 1px;
    background-color: #8c939d;
  }
  .inner_progress {
    height: 15px;
    margin: 0px;
    background-color: #66b1ff;
    width: 10%;
  }
  .link-type {
    font-size: 16px;
  }
  .link-type_top_three {
    font-size: 30px;
    font-weight: 600;
    color: #ff4d51;
    line-height: 40px;
  }
</style>
