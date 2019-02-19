<template>
  <div class="hamburger-container" >
    <div class="svg-warpper" @click="toggleClick" >
      <svg-icon style="margin: 0" icon-class="sidebar" class="svg_icon hamburger" :class="{'sidebar-is-active':isActive}"/>
    </div>
    <!--<svg t="1492500959545" @click="toggleClick" class="svg-icon hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"-->
      <!--version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">-->
      <!--<path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"-->
        <!--p-id="1692"></path>-->
      <!--<path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"-->
        <!--p-id="1693"></path>-->
      <!--<path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"-->
        <!--p-id="1694"></path>-->
    <!--</svg>-->
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
  .hamburger-container {
    height: 72px;
    width: 24px;
    line-height: 24px;
    cursor: pointer;
  }
  .svg-warpper {
    position: absolute;
    left: 0;
    top: 24px;
    width: 24px;
    height: 24px;
    background: #8a8a8ab8;
  }
  .svg-warpper:before {
    content: '';
    width: 0;
    height: 0;
    top: -24px;
    left: 0;
    border: 12px solid;
    border-color: transparent transparent #8a8a8ab8 #8a8a8ab8;
    position: absolute;
  }
  .svg-warpper:after {
    content: '';
    width: 0;
    height: 0;
    left: 0;
    bottom: -24px;
    position: absolute;
    border: 12px solid;

    border-color: #8a8a8ab8 transparent transparent #8a8a8ab8;
  }
.hamburger {
  font-size: 24px;
  display: inline-block;
  cursor: pointer;
  transform: rotate(0deg);
  transform-origin: 50% 50%;
}
.sidebar-is-active {
    transform: rotate(180deg);
}
</style>
