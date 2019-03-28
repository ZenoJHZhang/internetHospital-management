<template>
  <div>
    <img src="@/assets/noComment.png">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
      required: true
    }
  }
}
</script>

<style scoped>
div{
    text-align: center;
}
</style>
