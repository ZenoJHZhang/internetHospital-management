<template>
  <el-dialog :visible.sync="this.$store.state.errorTokenVisible" :show-close="false" title="提示" width="30%">
    <span>{{ this.$store.state.errorTokenMessage }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="pageReverse()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    pageReverse() {
      this.$store.state.errorTokenVisible = false
    }
  }
}
</script>
