<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="orderNumber" label="序号"/>
    <el-table-column prop="accountId" label="账号"/>
    <el-table-column prop="accountName" label="账号名"/>
    <el-table-column prop="nickname" label="昵称"/>
    <el-table-column prop="realName" label="真实姓名"/>
    <el-table-column prop="phoneNumber" label="手机"/>
    <el-table-column prop="email" label="邮箱"/>
    <el-table-column prop="count" label="数量"/>
    <el-table-column prop="deleteFlag" label="删除"/>
  </el-table>
</template>

<script>
  export default {
    props: ["data"]
  }
</script>
