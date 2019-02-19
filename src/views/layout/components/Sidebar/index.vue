<template>
  <scroll-bar>
    <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    components: { SidebarItem, ScrollBar, Hamburger },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      }
    }
  }
</script>
<style>
  .sidebar-container .scroll-wrapper {
    padding-top: 50px;
  }
  #app .sidebar-container {
    background-color: #333744;
    z-index: 998;
  }

  .el-menu-item, .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
  .el-submenu .el-menu-item {
    height: 42px;
    line-height: 42px;
  }
  .scroll-wrapper .el-submenu__title:hover {
    background-color: #00c1de;
  }
  .hamburger-container {
    position: absolute;
    right: -16px;
    top: 300px;
    transition: all .3s;
  }

  .hamburger-container:hover {
    right: -24px;
  }
</style>
