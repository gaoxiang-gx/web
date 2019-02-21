<template>
  <div class="sidebar-warrper" @mouseenter="mouseEnter">
    <div class="sidebar">
      <!--<div class="sidebar-all-warpper">-->
        <!--<div class="sidebar-all">-->
          <!--<div class="svg-icon-warpper">-->
            <!--<svg-icon icon-class="appstore add" class="svg_icon"/>-->
          <!--</div>-->
          <!--<span>产品与服务</span>-->
        <!--</div>-->
      <!--</div>-->
      <div class="sidebar-item" v-for="item in $store.state.user.getaways" :key="item.type_code">
        <a :href="item.api_url">
          <div class="svg-icon-warpper">
            <svg-icon :icon-class="item.type_code + '_home_sidebar'" class="svg_icon"/>
          </div>
          <span>{{item.type_name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItem: [
        {
          name: '推广',
          icon: 'promote',
          url: ''
        },
        {
          name: '客服',
          icon: 'support',
          url: ''
        },
        {
          name: '仓库',
          icon: 'stock',
          url: ''
        },
        {
          name: '数据',
          icon: 'data',
          url: ''
        }
      ]
    }
  },
  methods: {
    mouseEnter() {
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-warrper {
    border-top: 1px solid #3b4044;
    z-index: 9999;
    position: fixed;
    height: auto;
    top: 50px;
    left: 0;
  }
  .svg-icon-warpper {
    width: 36px;
    display: block;
    position: absolute;
    font-size: 16px;
    color: #bbb;
    top: 0;
    left: 0;
  }
.sidebar {
  width: 36px;
  height: 100vh;
  background: #252a2f;
  transition: .5s;
  &:hover {
    width: 216px;
  }
  .sidebar-item {
    width: 100%;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    a {
      color: white;
    }
    &:hover {
      background: #192129;
    }
    &:hover .svg-icon-warpper{
      color: white;
    }
    &:hover span{
      color: #00c1de;
    }
  }
  .sidebar-all-warpper {
    width: 100%;
    height: 40px;
    padding: 4px 0;
    border-bottom: 1px solid #ffffff1a;
    border-top: 1px solid #ffffff1a;
    &:hover .sidebar-list {
      width: 700px;
    }
    &:hover .sidebar-all {
      background: #00c1de;
    }
    .sidebar-all {
      width: 100%;
      overflow: hidden;
      height: 40px;
      cursor: pointer;
      position: relative;
    }
  }
  .sidebar-list {
    width: 0px;
    height: 300px;
    background: red;
    position: absolute;
    left: 100%;
    top: -1px;
    transition: .8s;
  }
  >div {
    width: 230px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    position: relative;
  }
  span {
    width: 180px;
    display: block;
    text-align: left;
    font-size: 14px;
    margin-left: 36px;
  }
}
</style>
