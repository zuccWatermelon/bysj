<template>
  <section class="select-list clearfix">
    <section class="select-item" :style="{width: width+'px'}">
      <select v-model="province" id="province">
        <option>{{province}}</option>
        <option v-for="(value,key) in areaData.province" :data-id="key">{{value}}</option>
      </select>
      <!--<label class="select-btn"></label>-->
    </section>
    <section class="select-item" :style="{width: width+'px'}">
      <select v-model="city" id="city">
        <option>{{city}}</option>
        <option v-for="(value,key) in cityObj" :data-id="key">{{value}}</option>
      </select>
      <!--<label class="select-btn"></label>-->
    </section>
    <section class="select-item" :style="{width: width+'px'}">
      <select v-model="district" id="district">
        <option>{{district}}</option>
        <option v-for="(value,key) in districtObj" :data-id="key">{{value}}</option>
      </select>
      <!--<label class="select-btn"></label>-->
    </section>
  </section>
</template>
<style scoped lang="less">
  .select-list{
    padding-top: 20px;
  }
  .select-item{
    float: left;
    position: relative;
    width: 120px;
    height: 40px;
    margin-right: 20px;
    font-size: 18px;
    color: #333;
    select{
      width:100%;
      height: 100%;
      border: 1px #ccc solid;
      padding-left: 10px;
      margin: 0;
      line-height: 40px;
      background: url("../../assets/img/select.png") right no-repeat;
    }
    option{
      font-size: 14px;
      line-height: 40px;
    }
  }
</style>
<script>
  import LocationData from '../../assets/js/LocationData.js';
  export default{
    props:['width'],
    data(){
      return{
        areaData: LocationData.areaData(),
        province:"省",
        city:"市",
        district:"县/区",
        cityObj:{},
        districtObj:{},
        currentArea:{
          province:"",
          city:"",
          district:""
        }
      }
    },
    methods:{
      cityFun(){
        var provinceId = $('#province option:selected').attr('data-id');
        this.cityObj = this.areaData.city[provinceId];
        this.city='市';
      },
      districtFun(){
        var cityId = $('#city option:selected').attr('data-id');
        this.districtObj = this.areaData.district[cityId];
        this.district='县/区';
      },
      sendArea(){
        var self = this;
        self.currentArea.province = self.province=='省'?'':self.province;
        self.currentArea.city = self.city=='市'?'':self.city;
        self.currentArea.district = self.district=='县/区'?'':self.district;
        this.$emit('areaChangeWatch',this.currentArea);
      }
    },
    watch:{
      province() {
        this.cityFun();
        this.sendArea();
      },
      city(){
        this.districtFun();
        this.sendArea();
      },
      district(){
        this.sendArea();
      }
    }
  }
</script>
