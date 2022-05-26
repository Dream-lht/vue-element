<script setup>
import Customize from "@/components/customize/Customize.vue";
import { reactive } from "vue";

const options = reactive({
  option: [
    {
      id: Date.now(),
      startTime: "",
      endTime: "",
      number: "",
    },
  ],
});

const addRow = () => {
  //添加表单行
  options.option.push({
    id: Date.now(),
    startTime: "",
    endTime: "",
    number: "",
  });
};
</script>
<template>
  <div>
    <Customize :options="options" @addRow="addRow"></Customize>
  </div>
</template>

<style scoped lang="less">
.demo_view {
  //   width: 400px;
  //   height: 400px;
  margin: 0 auto;
}
</style>
