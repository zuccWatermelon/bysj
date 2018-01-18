<!--添加客户（个人）-->
<template>
  <form class="personal">
    <input type="text" v-model="personalForm.name" placeholder="真实姓名" />
    <input type="text" v-model="personalForm.phone" placeholder="手机号码" />
    <CitySelect @areaChangeWatch = "areaChange"></CitySelect>
    <input type="text"  placeholder="详细地址" v-model="personalForm.addr" />
    <input type="text" placeholder="身份证号码" v-model="personalForm.num" />
    <section class="file clearfix">
      <section :class="['file-box',{hasPic:personalForm.pic1}]" @click="fileFun(1)"><p v-if="!personalForm.pic1">正面</p><img v-if="personalForm.pic1" :src="personalForm.pic1"/></section>
      <section :class="['file-box',{hasPic:personalForm.pic2}]" @click="fileFun(2)"><p v-if="!personalForm.pic2">反面</p><img v-if="personalForm.pic2" :src="personalForm.pic2"/></section>
      <input id="pic1" data="pic1" type="file" @change="onFileChange" />
      <input id="pic2" data="pic2" type="file" @change="onFileChange" />
    </section>
    <p class="ps">请上传法人或经办人手持身份证正面和方面照片，格式为JPG、PNG,2M以内</p>
    <section class="btn-box clearfix">
      <p @click="submit">提交</p>
      <p @reset="reset">取消</p>
    </section>
  </form>
</template>
<style scoped lang="less">
  /*企业注册*/
  .personal{
    padding: 10px 0 0 88px;
    input{
      display: block;
      margin-top: 20px;
      width: 400px;
      height: 40px;
      padding-left: 20px;
      font-size: 18px;
      border: 1px #ccc solid;
    }
    .per_name{
      margin-top: 14px;
    }
  }
  .file{
    input{
      display: none;
    }
    i{
      float: left;
      font-style: normal;
      width: 190px;
      height: 86px;
      margin-top: 14px;
      vertical-align: top;
      font-size: 18px;
      color: #333;
      line-height: 30px;
      letter-spacing: 1px;
    }

  }
  .file-box{
    float: left;
    width: 190px;
    height: 80px;
    background: url("../assets/img/file.png") center no-repeat;
    cursor: pointer;
    border: 1px #ccc solid;
    margin: 20px 20px 0 0;
    position: relative;
    p{
      padding-top: 47px;
      text-align: center;
      color: #ccc;
      font-size: 14px;
      line-height: 32px;
      margin: 0;
    }
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 188px;
      height: 78px;
    }
  }
  .hasPic{
    background: none;
  }
  .ps{
    width: 400px;
    color: #333;
    font-size: 14px;
    line-height: 24px;
    padding-top: 8px;
    margin:0;
  }
  .btn-box {
    padding-top: 12px;
  }
  .btn-box p{
    float: left;
    width: 190px;
    height: 40px;
    background: #347aea;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border: 1px #ccc solid;
    margin-right: 20px;
    font-size: 18px;
    cursor: pointer;
  }
</style>
<script>
  import CitySelect from './common/CitySelect.vue';
  export default{
    components:{
      CitySelect
    },
    data(){
      return {
        personalForm:{
          type:1,
          name:"",
          phone:"",
          pic1:"",
          pic2:"",
          num:"",
          province:"省",
          city:"市",
          district:"区",
          addr:""
        },
        file:[]
      }
    },
    methods:{
      fileFun(num){
        if(num==1){
          $('#pic1').click();
        } else if(num==2){
          $('#pic2').click();
        }
      },
      onFileChange(e) {
        var self = this;
        var file = e.target.files || e.dataTransfer.files;
        var target = e.target || e.dataTransfer;
        var img = $(target).attr('data');
        if(img=='pic1'){
            this.file[0]=file[0];
        } else if(img=='pic2'){
          this.file[1]=file[0];
        }
        if(typeof FileReader==='undefined'){
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload =function(e){
          self.personalForm[img]=e.target.result;
        };
      },
      areaChange(area){
        this.personalForm.province = area.province;
        this.personalForm.city = area.city;
        this.personalForm.district = area.district;
        console.log(this.personalForm,"表单");
      },
      submit(){
        var self = this;
        var formData=new FormData();
        formData.append('custType',0);
        formData.append('custName',self.personalForm.name);
        formData.append('contactAddr',self.personalForm.addr);
        formData.append('telephone',self.personalForm.phone);
        formData.append('file',self.file[0]);
        formData.append('file1',self.file[1]);
        formData.append('certNum',self.personalForm.num);
        formData.append('province',self.personalForm.province);
        formData.append('city',self.personalForm.city);
        formData.append('county',self.personalForm.district);
        console.log(formData);
        axios({
          method:"post",
          url:'/api/customerSrv/addCustomerInfo',
          data:formData,
          headers:{
            "content-Type":"application/x-www-form-urlencoded"
          }
        }).then(
          res=>{
            if(res.data.code=='0'||res.data.data.code==0){
              self.$emit('successFun',true,self.personalForm.name);
            }
          }
        ).catch(
          (error)=>{
            console.log(error);
          });
      },
      reset(){
        for (var i in this.personalForm){
          this.personalForm[i]="";
        }
      }
    }
  }
</script>

