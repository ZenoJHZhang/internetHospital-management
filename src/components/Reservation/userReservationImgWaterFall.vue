<template>
  <div id="content">
    <vue-waterfall-easy
      :height="400"
      :max-cols="3"
      :gap="50"
      :img-width="200"
      :loading-dot-count="0"
      :imgs-arr="imgsArr"
      @click="clickFn"
    />
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'UserReservationImgWaterFall',
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      imgsArr: []
    }
  },
  mounted() {
    this.imgsArr = this.initImgsArr() // 初始化第一次（即页面加载完毕时）要加载的图片数据
  },
  methods: {
    initImgsArr() {
      // 初始化图片数组的方法，把要加载的图片装入
      const obj = localStorage.getItem('userReservation')
      const userReservation = JSON.parse(obj)
      // 初始化图片数组的方法，把要加载的图片装入
      const arr = [

      ]
      userReservation.imgPathList.forEach(e => {
        const value = { src: '' }
        value.src = e
        arr.push(value)
      })
      return arr
    },
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault()
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() === 'img') {
        window.open(value.src)
      }
    }
  }
}
</script>

<style>
#content {
  bottom: 0;
  width: 100%;
}
.vue-waterfall-easy {
  position: relative;
  width: 100%;
}
.img-box {
  display: inline-block;
  width: 30%;
  box-sizing: border-box;
  transition: left 1s, top 1s;
}
.img-inner-box {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.img-wraper {
  width: 100%;
  background: yellow;
}
.vue-waterfall-easy-container .vue-waterfall-easy-scroll {
  overflow-y: auto !important;
}
</style>

