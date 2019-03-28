
<template>
  <div>
    <div ref="container" class="container">
      <div class="bigVideo">
        <video id="remoteVideo" class="video" autoplay playsinline/>
        <p>等待患者中</p>
      </div>
      <div id="smallVideo" class="smallVideo">
        <video id="localVideo" class="video" muted autoplay playsinline/>
      </div>
    </div>
  </div>
</template>

<script>
import RTCMultiConnection from 'rtcmulticonnection'
export default {
  data() {
    return {
      predefinedRoomId: '',
      connection: ''
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.connectVideo()
      this.predefinedRoomId = localStorage.getItem('userReservationUuId')
      this.openOrJoinRoom()
    })
  },
  destroyed() {
    this.connection.closeSocket()
  },
  methods: {
    openOrJoinRoom() {
      this.connection.openOrJoin(this.predefinedRoomId, function(
        isRoomExist,
        roomid,
        error
      ) {
        if (error) {
          if (error === this.connection.errors.ROOM_NOT_AVAILABLE) {
            this.$message.error('视频问诊间不存在')
            return
          }
          if (error === this.connection.errors.ROOM_FULL) {
            this.$message.error('视频问诊间已满')
            return
          }
          this.$message.error(error)
        }
      })
    },
    connectVideo() {
      this.connection = new RTCMultiConnection()

      // this line is VERY_important
      this.connection.socketURL =
        'https://rtcmulticonnection.herokuapp.com:443/'

      // all below lines are optional; however recommended.

      this.connection.session = {
        audio: true,
        video: true
      }

      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      }

      this.connection.onstream = function(event) {
        if (event.type === 'local') {
          document.getElementById('localVideo').srcObject = event.stream
        } else if (event.type === 'remote') {
          document.getElementById('remoteVideo').srcObject = event.stream
        }
      }
    }
  }
}
</script>
<style scoped>
.container {
  position: relative;
  width: 80%;
  padding: 0;
  height: 600px;
  padding-left: 10%;
}
.bigVideo {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
.smallVideo {
  position: absolute;
  display: inline-block;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 150px;
  cursor: pointer;
}
.smallVideo:hover {
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0.2;
}
.video {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bigVideo p {
  margin-top: 25%;
  text-align: center;
  color: #e2e2e2;
  vertical-align: middle;
}
</style>
