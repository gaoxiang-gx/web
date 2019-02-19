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
      <el-select @change='handleGroupFilter' style="width: 120px" class="filter-item" v-model="listQuery.user_account_group_id" placeholder="客服部门">
        <el-option v-for="item in userGroupOptions" :key="item.group_name" :label="item.group_name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable @focus="getGroupTeamList" @change='handleGroupTeamFilter' style="width: 120px" class="filter-item" v-model="listQuery.user_account_group_team_id" placeholder="客服组">
        <el-option v-for="item in userGroupTeamOptions" :key="item.team_name" :label="item.team_name" :value="item.id">
        </el-option>
      </el-select>
      <el-select
        class="filter-item"
        @change='handleUserAccountFilter'
        v-model="listQuery.user_account_ids"
        multiple
        filterable
        remote
        placeholder="请选择客服"
        :remote-method="getUserAccountList"
        :loading="userAccountLoading">
        <el-option
          v-for="item in userAccountOptions"
          :key="item.nickname"
          :label="item.nickname"
          :value="item.id">
        </el-option>
      </el-select>
      <div style="float:right;padding-right: 30px;padding-top:10px">
        <span>编辑模式</span>
        <el-switch
          v-model="editable"
          active-color="#13ce66"
          inactive-color="rgb(198, 196, 196)">
        </el-switch>
      </div>
    </div>
    <full-calendar class="test-fc" :events="fcEvents"
                   lang="zh"
                   first-day='0' locale="zh-cn"
                   @moreClick="moreClick"
                   @eventClick="eventClick"
                   @dayClick="dayClick">
    </full-calendar>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import fullCalendar from 'vue-fullcalendar'
import { getSupportMemberSchedule, updateSupportMemberSchedule } from '@/api/support_schedule'
import { getUserAccountGroupList } from '@/api/user_group'
import { getUserAccountGroupTeamList } from '@/api/user_group_team'
import { getUserAccountList } from '@/api/user'
export default {
  name: 'PassengerServiceScheduling',
  components: { fullCalendar },
  directives: {
    waves
  },
  data() {
    return {
      scrollTop: 0,
      listQuery: {
        user_account_group_id: 2,
        user_account_group_team_id: undefined,
        user_account_ids: []
      },
      fcEvents: [],
      userGroupOptions: [],
      userGroupTeamOptions: [],
      userAccountOptions: [],
      userAccountLoading: false,
      editable: false,
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

  },
  created() {
    this.getGroupList()
    this.getList()
  },
  methods: {
    handleFilter() {
      this.getList()
    },
    handleGroupFilter() {
      this.listQuery.user_account_ids = []
      // this.getList()
    },
    handleGroupTeamFilter() {
      this.listQuery.user_account_ids = []
      this.getList()
    },
    handleUserAccountFilter() {
      this.listQuery.user_account_group_team_id = undefined
      this.getList()
    },
    getUserAccountList(query) {
      if (query !== '') {
        this.userAccountLoading = true
        getUserAccountList({ nickname: query, user_account_type_code: 'support', user_account_group_id: this.listQuery.user_account_group_id, status: 1 }).then(response => {
          this.userAccountOptions = response.data.data
          this.userAccountLoading = false
        })
      } else {
        this.userAccountOptions = []
      }
    },
    getGroupList() {
      getUserAccountGroupList({ user_account_type_id: 2 }).then(response => {
        if (response.data.data) {
          this.userGroupOptions = response.data.data
        }
      })
    },
    getGroupTeamList() {
      const params = {}
      params.user_account_type_id = 2
      params.user_account_group_id = this.listQuery.user_account_group_id
      if (!params.user_account_group_id) {
        return
      }
      getUserAccountGroupTeamList(params).then(response => {
        if (response.data.data) {
          this.userGroupTeamOptions = response.data.data
        }
      })
    },
    getList() {
      if ((this.listQuery.user_account_ids.length === 0) && (!this.listQuery.user_account_group_team_id)) {
        this.fcEvents = []
        return
      }
      getSupportMemberSchedule(this.listQuery).then(response => {
        this.fcEvents = response.data
      })
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      if (!this.editable) {
        return
      }
      let online_type = ''
      if (event.online_type === 'offline') {
        online_type = 'online_day'
      }
      if (event.online_type === 'online_day') {
        online_type = 'online_night'
      }
      if (event.online_type === 'online_night') {
        online_type = 'offline'
      }
      updateSupportMemberSchedule({ support_user_account_id: event.user_account_id, online_type: online_type, online_date: event.start }).then(response => {
        event.online_type = online_type
        if (event.cssClass.indexOf('mini') >= 0) {
          event.cssClass = 'mini_' + online_type
        } else {
          event.cssClass = online_type
        }
      })
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      console.log('moreClick', day, events, jsEvent)
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
  .online_day {
    background-color: #ffff00 !important;
    display: block !important;
    text-align: center;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    font-weight: bold;
  }
  .online_night {
    background-color: #4454ce !important;
    color: #fff !important;
    display: block !important;
    text-align: center;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    font-weight: bold;
  }
  .offline {
    background-color: #cecaca !important;
    display: block !important;
    text-align: center;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    font-weight: bold;
    color: #fff !important;
  }
  .mini_online_day {
    background-color: #ffff00 !important;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    width: 40%;
    text-align: center;
  }
  .mini_online_night {
    background-color: #4454ce !important;
    color: #fff !important;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    width: 40%;
    text-align: center;
  }
  .mini_offline {
    background-color: #cecaca !important;
    color: #fff !important;
    font-size: 14px !important;
    padding: 5px 0px !important;
    height: 25px !important;
    width: 40%;
    text-align: center;
  }
  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {
    display: inline-block;
  }
  .full-calendar-body .dates .week-row .day-cell {
    height: 175px !important;
  }
  .full-calendar-body .dates .dates-events .events-week .events-day {
    height: 175px !important;
  }
  .comp-full-calendar {
    max-width: 1920px !important;
  }
</style>
