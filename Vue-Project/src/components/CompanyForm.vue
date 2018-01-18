<!--添加客户（企业）-->
<template>
  <form class="company">
    <input type="text" v-model="companyForm.name" placeholder="公司全称" />
    <input type="text" v-model="companyForm.company_num" placeholder="营业执照注册号" />
    <section class="file clearfix">

      <section :class="['file-box',{hasPic:companyForm.company_pic}]" @click="fileFun(0)"><p v-if="!companyForm.company_pic">上传执照照片</p><img v-if="companyForm.company_pic" :src="companyForm.company_pic"/></section>
      <i>请上传最新年检的营业执照，格式为JPG、PNG、2M以内</i>
      <section :class="['file-box',{hasPic:companyForm.company_pic1}]" @click="fileFun(1)"><p v-if="!companyForm.company_pic1">正面</p><img v-if="companyForm.company_pic1" :src="companyForm.company_pic1"/></section>
      <section :class="['file-box',{hasPic:companyForm.company_pic2}]" @click="fileFun(2)"><p v-if="!companyForm.company_pic2">反面</p><img v-if="companyForm.company_pic2" :src="companyForm.company_pic2"/></section>
      <input id="pic" data="company_pic" type="file" @change="onFileChange" />
      <input id="pic1" data="company_pic1" type="file" @change="onFileChange" />
      <input id="pic2" data="company_pic2" type="file" @change="onFileChange" />
    </section>
    <p class="ps">请上传法人或经办人手持身份证正面和方面照片，格式为JPG、PNG，2M以内</p>
    <input class="per_name" placeholder="法人或经办人姓名" v-model="companyForm.per_name" />
    <input placeholder="法人或经办人身份证号" v-model="companyForm.per_num" />
    <input placeholder="手机号" v-model="companyForm.phone"  />
    <CitySelect :width="width" @areaChangeWatch = "areaChange"></CitySelect>
    <input type="text" placeholder="详细地址" v-model="companyForm.addr"  />
    <section class="btn-box clearfix">
      <p @click="submit">提交</p>
      <p @reset="reset">取消</p>
    </section>
  </form>
</template>
<style scoped lang="less">
  /*企业注册*/
  .company{
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
    margin: 0;
  }
  .btn-box {
    padding-top: 20px;
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
        width:"120",
        companyForm:{
          "type":0,
          "name":"",
          "company_num":"",
          "company_pic": "",
          "company_pic1":"",
          "company_pic2":"",
          "per_name":"",
          "per_num":"",
          "phone":"",
          "province":"省",
          "city":"市",
          "district":"区",
          "addr":""
        },
        file:[]
      }
    },
    methods:{
      fileFun(num){
        if(num==0){
          $('#pic').click();
        } else if(num==1){
          $('#pic1').click();
        } else if(num==2){
          $('#pic2').click();
        }
      },
      onFileChange(e) {
        var self = this;
        var file = e.target.files || e.dataTransfer.files;
        var target = e.target || e.dataTransfer;
        var img = target.getAttribute('data');
        if(img=='pic'){
          this.file[0]=file[0];
        } else if(img=='pic2'){
          this.file[1]=file[0];
        } else if(img=='pic3'){
          this.file[2]=file[0];
        }
        if(typeof FileReader==='undefined'){
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload =function(e){
          self.companyForm[img]=e.target.result;
        };
      },
      areaChange(area){
        this.companyForm.province = area.province;
        this.companyForm.city = area.city;
        this.companyForm.district = area.district;
        console.log(this.companyForm,"表单");
      },
      submit(){
        var self = this;
        var formData=new FormData();
        formData.append('custType',0);
        formData.append('custName',self.companyForm.name);
        formData.append('custNumber',self.companyForm.company_num);
        formData.append('contactName',self.companyForm.per_name);
        formData.append('contactAddr',self.companyForm.addr);
        formData.append('telephone',self.companyForm.phone);
        formData.append('file',self.file[0]);
        formData.append('file1',self.file[1]);
        formData.append('file2',self.file[2]);
        formData.append('certNum',self.companyForm.per_num);
        formData.append('province',self.companyForm.province);
        formData.append('city',self.companyForm.city);
        formData.append('county',self.companyForm.district);
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
              this.$emit('successFun',true,self.companyForm.name);
            }
          }
        ).catch(
          (error)=>{
            console.log(error);
          });
      },
      reset(){
        for (var i in this.companyForm){
          this.companyForm[i]="";
        }
      }
    }
  }
</script>
