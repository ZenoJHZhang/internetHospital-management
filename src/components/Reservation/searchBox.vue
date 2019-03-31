<template>
  <div>
    <div>{{ item.value }}</div>
    <div>{{ item.address }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {}
}
</script>

