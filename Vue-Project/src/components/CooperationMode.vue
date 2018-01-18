<template>
  <form class="companyInfo">
      <div class="info">
        <section>
          <label>产品列表：</label>
          <select>
            <option>天翼云</option>
            <option>畅捷通</option>
          </select>
        </section>
        <section>
          <label>合作模式：</label>
          <select>
            <option>合作模式1</option>
            <option>合作模式2</option>
            <option>合作模式3</option>
          </select>
        </section>
        <section>
          <label>优惠折扣：</label>
          <select>
            <option>优惠折扣1</option>
            <option>优惠折扣2</option>
            <option>优惠折扣3</option>
          </select>
        </section>
        <section>
          <label>结算周期：</label>
          <select>
            <option>结算周期1</option>
            <option>结算周期2</option>
            <option>结算周期3</option>
          </select>
        </section>
        <a class="submit" href="javascript:void(0);" @click="submit()">申请合作</a>
      </div>
  </form>
</template>

<style scoped lang="less">
  .companyInfo{
    width: 1000px;
    padding-top: 25px;
    overflow: hidden;
    margin: 0 auto;
  }
  .info{
    width: 770px;
    margin: 0 auto;
    height: 500px;
     section{
      margin: 0 auto;
      padding-left: 150px;
      padding-bottom: 30px;
      label{
        width: 93px;
        height: 34px;
        color: #676a6c;
        font-size: 18px;
        font-weight: 400;
        line-height: 34px;
      }

      select{
        width: 377px;
        height: 34px;
        border: 1px #e5e6e7 solid;
        border-radius: 4px;
        padding-left: 10px;
        font-size: 18px;
      }
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

</script>
