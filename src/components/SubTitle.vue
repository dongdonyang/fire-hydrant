<template>
  <div class="sub-title">
    <img src="../assets/home_img_01.png" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 10:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "SubTitle",
  components: {},
  props: {
    title: String
  },
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
.sub-title {
  line-height: 40px;
  color: #17cbff;
  font-size: 16px;
  span {
    margin-left: 10px;
  }
}
</style>
