<template>
  <div class="base-header">
    <div>1</div>
    <div>1</div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 15:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseHeader",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.base-header {
  height: 60px;
  padding: 0 20px;
  background-image: url("../assets/head_img_topBg.png");
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
