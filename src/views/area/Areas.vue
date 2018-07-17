<template>
  <div id="areas" ref="areas">
    <CtSelect @input="provinceChange" :value="area.provinceStr" :options="provinceList"></CtSelect>
    <CtSelect @input="cityChange" :value="area.cityStr" :options="cityList"></CtSelect>
    <CtSelect @input="countChange" :value="area.countStr" :options="countList"></CtSelect>
  </div>
</template>

<script>
  import AreaJson from '../../assets/city.json';
  export default {
    name: 'CtAreas',
    data () {
      return {
        msg: '全国地址',
        errTips:'',
        area:{
          provinceStr:'北京',
          cityStr:'北京市',
          countStr:'东城区',
        },
        areaList : AreaJson.cityList,
        provinceList:[],
        cityList:[],
        countList:[],
      }
    },
    props:{
      toAreaData:{
        // 默认 地址 object {provinceStr,cityStr,countStr}
        type:Object,
        default(){
          return {}
        }
      }
    },
    watch:{
      'toAreaData.provinceStr':'toDataChange'
    },
    created(){
      if(this.toAreaData.provinceStr && this.toAreaData.provinceStr != ''){
        this.area.provinceStr = this.toAreaData.provinceStr;
        this.area.cityStr = this.toAreaData.cityStr;
        this.area.countStr = this.toAreaData.countStr;
      }
      this.initList();
    },
    methods:{
      initList(){
        this.upEmit(); // 初始提交
        this.provinceList = this.areaList;

        this.provinceList.forEach((e) => {
          if(this.area.provinceStr === e.label){
            this.cityList = e.children;
          }
        });
        this.cityList.forEach((e) => {
          if(this.area.cityStr === e.label){
            this.countList = e.children;
          }
        });
      },
      toDataChange(){
        this.area.provinceStr =  this.toAreaData.provinceStr;
        this.area.cityStr =  this.toAreaData.cityStr;
        this.area.countStr =  this.toAreaData.countStr;
        this.initList();
      },
      provinceChange(val){
        this.area.provinceStr = val
        this.areaList.forEach((e) => {
          if(val === e.label){
            this.cityList = e.children;
            this.countList = [];
            this.area.cityStr = "";
            this.area.countStr = "";
          }
        });
        if(this.area.provinceStr && this.area.provinceStr != ''){
          this.upEmit();
        }
      },

      cityChange(val){
        this.area.cityStr = val
        if(this.cityList.length <= 0) return;
        this.cityList.forEach((e) => {
          if(val === e.label){
            this.countList = e.children;
            this.area.countStr = "";
          }
        });
        if(this.area.cityStr && this.area.cityStr != ''){
          this.upEmit();
        }
      },
      countChange(val){
        this.area.countStr = val
        if(this.area.countStr && this.area.countStr != ''){
          this.upEmit();
        }
      },
      upEmit(){
        this.$emit('getAreaData', this.area);
      }
    }
  }
</script>

<style scoped lang="scss">
  #areas{
    position: relative;
  }
  .err-tips{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .is-error-tips input{
    border-color: #f56c6c !important;
  }
  .select{
    width: 106px;
  }
</style>
