<template>
  <div class="manage">
    <ul class="manage-user">
      <li v-for="(item, index) in tableUsers.table" :key="index">
        <img src="../assets/head_img_04.png" />
        <div>
          <div>{{ item.name }}</div>
          <div>{{ item.phone }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 16:40
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "ManageUser",
  components: {},
  props: {
    activeName: String,
    areaId: Number
  },
  data() {
    return {
      // todo 人员列表
      tableUsers: {
        table: [],
        page: {
          current: 1,
          total: 0,
          MaxResultCount: 10
        }
      }
    };
  },
  computed: {},
  watch: {
    activeName: function(val) {
      val === "third" && this.getAdminList();
    },
    areaId: function(id) {
      this.tableUsers.page.AreaId = id;
      this.getAdminList();
    }
  },
  created() {},
  mounted() {},
  methods: {
    // todo 获取人员列表
    getAdminList() {
      this.axios
        .get(this.API.GET_AREA_USER_LIST, {
          params: this.tableUsers.page
        })
        .then(res => {
          if (res.success) {
            this.tableUsers.table = res.result.userlist;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.manage {
  &-user {
    li {
      display: flex;
      align-items: center;
      img {
        margin: 10px;
      }
    }
  }
}
</style>
