<template>
  <div class="navbar-warpper">
    <el-menu class="navbar"
             text-color="#fff"
             background-color="#252a2f"
             mode="horizontal">
      <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
      <!--<breadcrumb></breadcrumb>-->
      <span class="system-name">{{project_name}}</span>
      <el-submenu index="1" class="avatar-container">
        <img slot="title" style="cursor: pointer" class="user-img" :src="avatar+'?imageView2/1/w/80/h/80'">
        <div class="user-dropdown">
          <div class="user-dropdown-top">
            <router-link to="/user_center/user_center/user_info">
              <img class="user-dropdown-user-img" :src="avatar">
              <span class="link-hover">{{$store.state.user.name}}</span>
            </router-link>
          </div>
          <router-link to="/user_center/user_center/integral_query" class="link-hover">
            <div class="user-dropdown-item">
              <svg-icon icon-class="accumulate_points" class="svg_icon"/>
              积分:<span></span>
            </div>
          </router-link>
          <router-link to="/user_center/user_center/user_info" class="link-hover">
            <div class="user-dropdown-item">
              <svg-icon icon-class="account_setting" class="svg_icon"/>
              账户设置
            </div>
          </router-link>
          <div class="user-dropdown-bottom">
            <span class="link-hover" @click="logout">退出登录</span>
          </div>
        </div>
      </el-submenu>

      <el-submenu index="0" class="messageNotification">
        <div slot="title">
          <el-badge :value="(system_notice + important_notice)" :hidden="(system_notice + important_notice) === 0 ? true : false"  class="item">
            <i class="el-icon-message" style="font-size: 30px;margin-top: -40px;color: white"></i>
          </el-badge>
        </div>
        <div class="message-menu">
          <a url="" class="message-a">
            <span class="link-hover">重要通知</span>
            <div class="message-icon" v-show="important_notice!=0">{{important_notice}}</div>
          </a>
          <a url="" class="message-a">
            <span class="link-hover">系统消息</span>
            <div class="message-icon" v-show="system_notice!=0">{{system_notice}}</div>
          </a>
        </div>
      </el-submenu>

    </el-menu>
    <el-dialog
      title="提示"
      style="font-size: 20px"
      :visible.sync="centerDialogVisible"
      width="30%"
      class="el-title"
      center>
      <p style="text-align: center;font-size: 25px">你有新的未读消息</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUnreadNoticeData } from '@/api/user'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import bus from '@/views/layout/bus'
import CountUp from 'countup.js'
export default {
  data() {
    return {
      project_name: process.env.PRO_NAME,
      performance: 0,
      oldPerformance: 0,
      curperformance: 0,
      ranking_number: '--',
      system_notice: 0,
      important_notice: 0,
      centerDialogVisible: false,
      original_important_notice: 0,
      numAnim: null
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {

  },
  created() {
    this.refreshMessage()
    // this.getCount()
  },
  methods: {
    refreshMessage() {
      setInterval(() => {
        // this.getCount()
      }, 60000)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getCount() {
      getUnreadNoticeData({}).then(response => {
        this.system_notice = response.data.system_notice
        this.important_notice = response.data.important_notice
        // alert(this.important_notice)
        if (this.$store.state.user.important_notice < this.important_notice) {
          this.centerDialogVisible = true
          this.$store.state.user.important_notice = this.important_notice
        }
        // this.count = response.data.system_notice + response.data.important_notice
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .system-name {
    font-size: 16px;
    color: white;
    height: 50px;
    line-height: 50px;
    text-indent: 36px;
    margin-left: 10px;
  }
  .navbar {
    height: 50px;
    line-height: 50px;
    float: right;
    border: 0px;
    border-radius: 0px !important;
    position: fixed;
    z-index: 999;
    width: 100%;

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .realtime-container{
    cursor: default;
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 140px;
  }
  .avatar-container {
    display: inline-block;
    position: absolute;
    height: 50px;
    top: 0;
    right: 0px;
    /deep/ .el-submenu__title {
      padding: 0 10px;
      height: 50px;
      .el-submenu__icon-arrow{
        display: none;
      }
      &:hover {
        background-color: #191d21!important;
      }
    }
    .user-img {
      margin-top: -11px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
    }
  }
  .messageNotification {
    height: 50px;
    position: absolute;
    right: 60px;
    top: 0;
    /deep/ .el-submenu__icon-arrow {
      display: none;
    }
    /deep/ .el-submenu__title {
      height: 50px;
    }
    &:hover {
      background-color: #191d21!important;
    }
    .el-badge {
      height: 30px;
      .el-icon-message{

      }
    }
  }
}
.el-icon-star-on {
  color: #ffe600;
}
.el-title{
  .el-dialog__title{
    line-height: 24px;
    font-size: 33px !important;
    color: #303133;
  }
}
  .message-menu {
    width: 150px;
    color: white;
    .message-a {
      font-size: 14px;
      width: 100%;
      height: 20px;
      position: relative;
      display: inline-block;
      text-align: center;
      height: 24px;
      line-height: 24px;
    }
    .message-a:hover {
      background-color: #192129;
    }
    .message-icon {
      position: absolute;
      background:#f56c6c;
      border: 1px solid white;
      width: 20px;
      color: #fff;
      height: 20px;
      top: 0;
      right: 10px;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
    }
  }
  .user-dropdown {
    margin-top: 0px;
    width: 200px;
    border: 0px;
    color: #fff;
    font-size: 14px;
    height: auto;
    padding: 10px;
    .user-dropdown-top {
      padding: 0 0 10px 0;
      height: 50px;
      border-bottom: 1px solid #ffffff1a;
      .user-dropdown-user-img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      span {
        margin-left: 4px;
        vertical-align: top;
        line-height: 50px;
      }
    }
    .user-dropdown-item {
      height: 32px;
      line-height: 32px;
    }
    .user-dropdown-bottom {
      text-align: center;
      font-size: 14px;
      padding-top: 10px;
      border-top: 1px solid #ffffff1a;
    }
  }
  .el-menu--popup-bottom-start {
    margin-top: 0;
  }

</style>

