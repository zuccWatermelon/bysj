<template>
  <div class="address-out">
    <input type="hidden" v-model="addressId" class="addressId"/>
    <input type="hidden" v-model="countyId" class="belongRegionId"/>
    <span class="item-label">装机地址：</span>
    <select class="item-in exchId" :disabled="!(statusCd == '1' || statusCd == null)" v-model="city">
      <option :value="item1.cityId" v-for="item1 in cityList">{{item1.cityName}}</option>
    </select>
    <select class="item-in " :disabled="!(statusCd == '1' || statusCd == null)" v-model="county">
      <option :value="item2.countyName" v-for="item2 in countyList">{{item2.countyName}}</option>
    </select>
    <div class="search-box">
      <input placeholder='请输入后按回车键查询'
             v-model="inputText"
             @focus="showList"
             @blur="hideList();checkAddress();"
             @keyup="changeToSearch($event)"
             class="addressDesc"
             :disabled="!(statusCd == '1' || statusCd == null)"
      />
      <div v-if="tip_for_callBackFunc" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc}}</div>
      <ul v-if="listShowOrNot && inputText" class="show-list" id="show-list" @scroll="handleScroll()">
        <li class="no-data" v-if="findNoData">--- 查询不到相关地址记录！ ---</li>
        <li v-for="item in searchResult" @mousedown="chooseItem(item,$event)">{{item.Fgfw}}</li>
        <li class="no-data" v-if="toTheBottom">--- 相关地址加载完毕 ---</li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="less">
  .address-out{
    width:100%;
    .item-label{
      display: block;
      width:16.65%;
      height:40px;
      float: left;
      line-height: 40px;
      text-align: right;
    }
    .item-in{
      width:10%;
      height:30px;
      margin:5px;
      float: left;
    }
  }
  .search-box{
    width:500px;
    height:40px;
    float:left;
    position: relative;
    input{
      width:490px;
      height:30px;
      margin:5px;
      position: relative;
    }
  }
  .show-list{
    width:490px;
    max-height:100px;
    padding-bottom:8px;
    position: absolute;
    top:35px;
    left:5px;
    overflow: auto;
    border-right:1px solid #999;
    border-bottom:1px solid #999;
    border-left:1px solid #999;
    background-color: #fff;
    li{
      width:100%;
      height:25px;
      padding:0 8px;
      line-height: 25px;
      color:#333;
      cursor: pointer;
    }
    li:hover{
      background-color: #eee;
    }
    li.no-data,li.no-data:hover{
      color:#999;
      background-color: #fff;
    }
  }
  .has-tip{
    position:absolute;
    left:0;
    bottom:5px;
    width:300px;
    font-size: 12px;
    color:red;
    line-height:16px;
    word-wrap: break-word;
    word-break: normal;
    text-align: center;
    i{
      color:red;
    }
  }
</style>

<script>
  import Data from '../../../assets/js/LocationDataOfZJ.js';
  export default {
    props:['addressDataAddressId','addressDataExchId','addressDataExch','addressDataBelongRegionId','addressDataAddressDesc','statusCd','tip_for_callBackFunc','endBool'],
    data(){
      return{
        city:'',
        county:'余杭区',
        countyId:'57106',
        inputText:'',
        addressId:'',
        listShowOrNot:false,
        findNoData:false,
        toTheBottom:false,
        listPageNum:1,
        searchResult:[],
        areaJson:Data.areaJson(),
      }
    },
    computed:{
      //从本地的LocationDataOfZJ.js获取城市和区县的编码信息
      // 并联动生成select列表数据
      cityList:function(){
        var city_list =[];
        for(var i = 0; i < this.areaJson.length; i++){
          if(this.areaJson[i].DIC_VALUE.length == 3){
            city_list.push({
              cityId:this.areaJson[i].DIC_VALUE,
              cityName:this.areaJson[i].DIC_DESC
            });
          }
        }
        return city_list;
      },
      countyList:function(){
        var county_list =[];
        for(var i = 0; i < this.areaJson.length; i++){
          if(this.areaJson[i].DIC_VALUE.length == 5 && this.areaJson[i].DIC_VALUE.substring(0,3) == this.city){
            county_list.push({
              countyId:this.areaJson[i].DIC_VALUE,
              countyName:this.areaJson[i].DIC_DESC
            });
          }
        }
        return county_list;
      },
      cityName:function(){
        let city_name = '';
        for(let i = 0; i < this.areaJson.length; i++){
          if(this.areaJson[i].DIC_VALUE == this.city){
            city_name = this.areaJson[i].DIC_DESC;
          }
        }
        return city_name;
      }


    },
    watch:{
      //*************watch里的**顺序**不能换！！！！！！！！！！！！！！！！！！！！！
      addressDataExchId:function(val){
        this.city = val;
      },
      city:function(val,oldval){
        this.countyId = '';
        this.county = '';
        this.inputText = '';
        this.addressId = '';
        this.$emit('update:addressDataExchId', val);
        this.$emit('update:addressDataExch', this.cityName);
        },
      addressDataBelongRegionId:function(val){
        this.countyId = val;
      },
      countyId:function(val){
        this.inputText = '';
        this.addressId = '';
        for(var i = 0; i < this.countyList.length; i++){
          if(this.countyList[i].countyId == this.countyId){
            this.county = this.countyList[i].countyName;
          }
        }
        this.$emit('update:addressDataBelongRegionId', val);
      },
      county:function(){
        this.inputText = '';
        this.addressId = '';
        for(var i = 0; i < this.countyList.length; i++){
          if(this.countyList[i].countyName == this.county){
            this.countyId = this.countyList[i].countyId;
          }
        }

      },
      addressDataAddressId:function(val){
        this.addressId = val;
      },
      addressDataAddressDesc:function(val){
        this.inputText = val;
      },
      inputText:function(val,oldval){
        this.$emit('update:addressDataAddressDesc', val);
      },
      addressId:function(val,oldval){
        this.$emit('update:addressDataAddressId', val);
      },
    },
    mounted:function(){
      if(this.listShowOrNot && this.inputText){
        document.getElementById("show-list").addEventListener('scroll', this.handleScroll);
      }
      this.$emit('update:endBool',true);
    },
    methods: {
      showList:function(){
        this.listShowOrNot = true;
      },
      hideList:function(){
        this.listShowOrNot = false;
      },
      chooseItem:function(item,even){
        //从地址列表中选择地址
        this.inputText = item.Fgfw;
        this.addressId = item.id;
      },
      changeToSearch:function(event){
        let _this = this;
        //input输入监听，模糊查询并返回地址列表
        if(event.keyCode==13) {
          if(!_this.county){
            _this.$alert('请确认选择城市和区县!', '错误提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.hideList();
                return false;
              }
            });
          }else {
            this.listPageNum = 1;
            this.toTheBottom = false;
            if (this.inputText) {
              this.searchResult = [];
              axios({
                method: 'post',
                url: "/netCloudOrder/addressService/queryByFgfw",
                data: {
                  "city": this.city,
                  "county": this.county,
                  "pageNo": this.listPageNum.toString(),
                  "pageSize": "10",
                  "address": this.inputText
                }
              }).then(res => {
                var lst = res.data.data;
                var code = res.data.code;
                if (code == 0) {
                  this.findNoData = true;
                } else if (code == 1) {
                  this.searchResult = lst;
                  this.findNoData = false;
                } else if (code == -1) {
                  _this.$alert('地址查询出错!', '错误提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      _this.hideList();
                      _this.findNoData = false;
                      return false;
                    }
                  });
                }
              }).catch(error => {
              });
            }
          }
        }
      },
      handleScroll:function(){
        //-----滚动显示下一页查询数据--------------------------------------
        this.listPageNum++;
        var el = document.getElementById('show-list');
        if(el.scrollHeight === el.scrollTop + 99 && !this.toTheBottom){
          axios({
            method:'post',
            url:"/netCloudOrder/addressService/queryByFgfw",
            data:{
              city:this.city,
              county:this.county,
              pageNo:this.listPageNum.toString(),
              pageSize:'10',
              address:this.inputText
            }
          }).then(res=>{
            var lst = res.data.data;
            var code = res.data.code;
            if(code == 0){
              this.toTheBottom = true;
            }else if(code == 1){
              this.searchResult = this.searchResult.concat(lst);
            }else if(code == -1){
              alert('请确认选择城市和区县！');
              this.findNoData = false;
              this.searchResult = [];
            }
          }).catch(error=>{
          });
        }
      },
      checkAddress:function () {
        if(this.tip_for_callBackFunc){
          this.$emit('checkAddress', 'addr','addressId');
        }
      }
    }
  }
</script>
