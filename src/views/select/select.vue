<template>
  <div class="moor-select" @click.stop="handleToggleMenu()">
    <span @click.stop="handleToggleMenu()" :class="{active: isShow}">{{value || '请选择'}}
        <i class="caret"></i>
    </span>

    <input v-bind:value="value" v-on:input="changeValue(value)">
    <ul v-show="isShow">
      <li v-for="option in options" :key="option.value" @click="handleSelect(option)">{{option.label}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CtSelect',
    props: {
      label:{
        type : String,
        default : function(){
          return '请选择'
        }
      },
      value: {
        type : String,
        default : function(){
          return ''
        }
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        isShow: false,
        currentOption: '',
      }
    },
    watch: {
      'options' : function (val) {
        this.options = val
      },
      'value' : function (val) {
        this.value = val
      }
    },
    mounted () {
      this.changeValue(this.value);
    },
    methods: {
      handleToggleMenu(flag) {
        this.isShow = flag === false ? false : !this.isShow;
      },
      hideMenu() {
        if (this.isShow === false) return;
        this.handleToggleMenu(false);
      },
      handleSelect(opts) {
        this.changeValue(opts.label);
        this.currentOption = opts;
      },
      changeValue(value) {
        this.$emit('input', value);
      },
    },
    mounted() {
      document.addEventListener('click', this.hideMenu);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.hideMenu);
    }
  }
</script>

<style lang="scss" scoped>
  .moor-select {
    width: 200px;
    position: relative;
    font-size: 14px;
    display: inline-block;
    span {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0;
      height: 34px;
      line-height: 34px;
      border-radius: 4px;
      border: 1px solid #999;
      padding-left: 10px;
      box-sizing: border-box;
      color: #666;
      position: relative;
      .caret {
        width: 0;
        height: 0;
        border-left: 6px solid rgba(0, 0, 0, 0);
        border-right: 6px solid rgba(0, 0, 0, 0);
        border-top: 5px solid #999;
        display: inline-block;
        position: absolute;
        right: 10px;
        transition: 200ms linear;
        transform: rotate(0);
      }
      &.active {
        border-color: #409EFF;
        .caret {
          transform: rotate(-180deg);
        }
      }
    }
    input {
      outline: none;
      display: none;
    }
  }
  ul {
    border: 1px solid #eee;
    cursor: pointer;
    margin: 5px 0 0;
    border-radius: 4px;
    color: #666;
    position: absolute;
    top: 36px;
    left: 0;
    width: 100%;
    padding:0;
    background-color: #fff;
    z-index: 9999;
    max-height: 450px;
    overflow: scroll;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  li {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    list-style: none;
    line-height: 30px;
    text-align: left;
    text-indent: 1em;
    &:hover {
      background-color: #eee;
      color: #409eff;
    }
  }
</style>
