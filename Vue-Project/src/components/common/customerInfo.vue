<template>
  <div class="container">
    <div class="form-signin">
      <div class="form-group">
          <div class="form-signin-heading">客户信息</div>
          <input type="text" id="customer_name" class="form-control" placeholder="请输入客户名称">
      </div>

      <div  class="form-group">
        <div class="form-signin-heading">证件号码</div>
        <input type="text" id="customer_number" class="form-control" placeholder="请输入证件号码">
      </div>

      <div  class="form-group">
        <div class="form-signin-heading">业务号码</div>
        <input type="text" id="business_number" class="form-control" placeholder="请输入业务号码">
      </div>
      <div  class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit">查询</button>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .form-signin {
    max-width: 230px;
    padding: 15px;
    margin: 0 auto;
    background-color: #9acfea;
  }
  .form-signin-heading{
      margin: 10px;
      font-size: 20px;
  }

</style>
