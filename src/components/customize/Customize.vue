<script setup>
import { defineProps, defineEmits } from "vue";

// 获取Props
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return { option: [] };
    },
  },
});

const emits = defineEmits(["addRow"]);

//注册按钮添加事件
const handleAddRow = () => {
  emits("addRow");
};

// 校验数字是否正确;
const checkNumber = (rule, value, callback) => {
  // 校验正则
  let pattern = /^-?\d{1,9}$/;

  // 判断是否为空
  if (value == "" || value == undefined || value == null) {
    return callback(new Error("请输入数字"));
  } else if (!pattern.test(value)) {
    return callback(new Error("请输入正负整数，且长度在9位以下"));
  } else {
    callback();
  }
};

// 校验日期 选择日期不可重叠
const checkDate = (rule, value, callback) => {
  //获取当前校验字段
  const field = rule.field.split(".");

  // 判断是否为空
  if (value === "" || value === null) {
    if (field.pop() === "startTime") {
      return callback(new Error("请选择开始时间"));
    } else {
      return callback(new Error("请选择结束时间"));
    }
  }
  //判断时间范围
  props.options.option.forEach((item) => {
    if (item.startTime !== "" && item.endTime !== "") {
      if (
        item.startTime?.getTime() < value?.getTime() &&
        value.getTime() < item.endTime.getTime()
      ) {
        return callback(new Error("抱歉，选择的时间不能重复"));
      } else if (item.startTime?.getTime() > item.endTime?.getTime()) {
        return callback(new Error("抱歉，开始时间不能大于结束时间"));
      }
    }
  });

  // 返回结果
  return callback();
};
</script>

<template>
  <div>
    <el-form :model="props.options" class="form">
      <el-row
        v-for="(rowItem, index) in options.option"
        :key="rowItem.id"
        class="row"
      >
        <el-form-item
          :prop="'option.' + index + '.startTime'"
          :rules="{ validator: checkDate, trigger: 'blur' }"
        >
          <el-date-picker
            v-model="rowItem.startTime"
            placeholder="请输入开始时间"
          />
        </el-form-item>
        -
        <el-form-item
          :prop="'option.' + index + '.endTime'"
          :rules="{ validator: checkDate, trigger: 'blur' }"
        >
          <el-date-picker
            v-model="rowItem.endTime"
            placeholder="请输入结束时间"
          />
        </el-form-item>
        <el-form-item
          :prop="'option.' + index + '.number'"
          :rules="{ validator: checkNumber, trigger: 'blur' }"
        >
          <el-input v-model="rowItem.number"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-button @click="handleAddRow">新增</el-button>
  </div>
</template>

<style lang="less" scoped>
.form {
  width: 100%;
  margin-bottom: 20px;
  .row {
    margin-bottom: 20px;
    /deep/.el-form-item {
      display: flex;
      flex-wrap: nowrap;
      margin: 0 5px;
      &:nth-child(1) {
        margin-left: 0;
      }
      .el-form-item__content {
        display: flex;
        flex-wrap: nowrap;
      }
    }
  }
}
</style>
