<template>
  <form class="companyInfo">
    <div class="info-box clearfix">
      <div class="info">
        <section><label>企业名称：</label><input type="text"  /></section>
        <section><label>行业类型：</label><select>
          <option>互联网1</option>
          <option>互联网2</option>
          <option>互联网3</option>
        </select></section>
        <section><label>企业规模：</label><select>
          <option>50人以下</option>
          <option>50-100人</option>
          <option>100人以上</option>
        </select></section>
        <section>
          <label>企业地址：</label><CitySelect :width="width" @areaChangeWatch = "areaChange"></CitySelect>
        </section>
        <section class="addr"><input type="text" /></section>
      </div>
      <div class="info">
        <section><label>法人或经办人姓名：</label><input type="text"  /></section>
        <section><label>法人或经办人手机：</label><input type="text"  /></section>
        <section><label>法人或经办人邮箱：</label><input type="text"  /></section>
        <section><label>法人或经办人身份证号码：</label><input style="width: 312px;"  type="text"  /></section>
        <section><label>企业营业执照号：</label><input style="margin-left: 17px;" type="text"  /></section>
      </div>
    </div>
    <section class="pic">
      <label>企业证件扫描：</label>
      <section class="pic1"><p>上传营业执照</p><img src="" /></section>
      <section class="pic2"><p>上传营业执照</p><img src="" /></section>
      <section class="pic3"><p>上传营业执照</p><img src="" /></section>
      <p class="ps">企业营业执照扫描图、法人或经办人手持身份证正反扫描图，支持.jpg，.png，.jpeg格式，不可大于15M。</p>
      <input id="pic-file" data="company_pic" type="file" />
      <input id="pic-file1" data="company_pic1" type="file" />
      <input id="pic-file2" data="company_pic2" type="file" />
    </section>
    <a class="submit" href="javascript:void(0);" @click="submit">下一步</a>
  </form>
</template>
<style scoped lang="less">
  *{
    margin:0;
    padding:0;
  }
  a:focus{
    text-decoration: none;
  }
  .companyInfo{
    width: 1000px;
    padding-top: 25px;
    margin: 0 auto;
    overflow: hidden;
  }
  .info-box{
    width: 200%;
  }
  .info{
    float: left;
    margin-right: 34px;
  }
  section{
    padding-bottom: 30px;
  }
  label{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
  input,select{
    width: 360px;
    height: 40px;
    border: #ccc 1px solid;
    padding-left: 20px;
    font-size: 15px;
    line-height: 40px;
    color: #999999;
  }

  .select-list{
    display: inline-block;
    padding: 0!important;
    vertical-align: middle;
  }
  .addr{
    padding-left: 80px;
  }
  .pic{
    font-size: 0;
    label{
      vertical-align: top;
    }
    section{
      display: inline-block;
      width: 163px;
      height: 80px;
      background: url("../assets/img/file.png") center no-repeat;
      cursor: pointer;
      border: 1px #ccc solid;
      margin-right: 20px;
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
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 188px;
        height: 78px;
      }
    }
    input{
      display: none;
    }

    .ps{
      display: inline-block;
      width: 285px;
      font-size: 14px;
      line-height: 24px;
      color: #333;
    }
  }
  .submit{
    display: block;
    width: 304px;
    height: 40px;
    background: #347aea;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 0;
    padding: 0;
    margin: 0 auto;
  }
</style>
<script>
  import CitySelect from './common/CitySelect.vue'
  export default{
    components:{
      CitySelect
    },
    props:['step'],
    data(){
        return{
          width:"107",
          companyForm:{
            name:"",
            type:"",
            scale:"",
            province:"",
            city:"",
            district:"",
            addr:"",
            peopleName:"",
            peoplePhone:"",
            peopleEmail:"",
            peopleNum:"",
            companyNum:"",
            pic1:"",
            pic2:"",
            pic3:""
          }
        }
    },
    methods:{
      areaChange(area){
        this.companyForm.province = area.province;
        this.companyForm.city = area.city;
        this.companyForm.district = area.district;
        console.log(this.companyForm,"表单");
      },
      submit(){
        this.$emit('step',3);
      },
      submit(){
        this.$emit('step',3);
      }
    }
  }
</script>
