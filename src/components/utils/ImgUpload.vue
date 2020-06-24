<template>
    <div>
        <div class="img-upload" :style="{'width': width,'height': height,'display':uploadDisplay}"
             v-on:click="uploadClick">
            <i class="el-icon-circle-plus-outline" :style="{'font-size': iconSize}"></i>
            <div>{{title}}</div>
            <input ref="filElem" type="file" class="inputUpload" @change="inputUploadChange($event)"
                   accept="image/jpg,image/jpeg,image/png">
        </div>
        <div class="img-upload-content" :style="{'width': width,'height': height,'display': contentDisplay}">
            <div class="img-upload-content__img">
                <el-image
                        class="blur"
                        :style="{'width': width,'height': height}"
                        :src="imgUrl"
                        fit="cover"></el-image>
            </div>
            <div class="img-upload-content__" :style="{'width': width,'height': height}">
                <i class="el-icon-zoom-in icon-btn" :style="{'font-size': iconSize}"
                   v-on:click="onImgPreview"></i>
                <div class="vertical-split"></div>
                <i class="el-icon-delete icon-btn" :style="{'font-size': iconSize}"
                   v-on:click="uploadContentRemove"></i>
            </div>
        </div>
        <el-image-viewer
                v-if="showViewer"
                :on-close="closeViewer"
                :url-list="[imgUrl]" />
    </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  data () {
    return {
      upload: false,
      showViewer: false,
      imgUrl: this.img
    }
  },
  name: 'ImgUpload',
  components: {
    ElImageViewer
  },
  props: {
    iconSize: {
      type: String,
      default: '26px'
    },
    title: {
      type: String,
      default: '上传图片'
    },
    width: {
      type: String,
      default: '120px'
    },
    height: {
      type: String,
      default: '80px'
    },
    img: String
  },
  watch: {
    img: function (_new) {
      this.imgUrl = _new
      if (!_new) {
        this.upload = false
      } else {
        this.upload = true
      }
    }
  },
  computed: {
    contentDisplay: function () {
      if (this.upload) {
        return 'block'
      }
      return 'none'
    },
    uploadDisplay: function () {
      if (!this.upload) {
        return 'flex'
      }
      return 'none'
    },
    imgData: {
      get: function () {
        return this.imgUrl
      },
      set: function (newValue) {
        this.imgUrl = newValue
        this.$emit('update-img', newValue)
      }
    }
  },
  methods: {
    uploadClick: function () {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    uploadContentRemove: function () {
      this.upload = false
      this.imgData = ''
    },
    onImgPreview () {
      this.showViewer = true
    },
    closeViewer () {
      this.showViewer = false
    },
    inputUploadChange (e) {
      let _this = this
      this.imageToBase64(e.target.files[0], function (imgBase64) {
        _this.imgData = imgBase64
        _this.upload = true
      })
    },
    imageToBase64 (file, callback) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        callback(reader.result)
      }
      reader.onerror = error => {
        console.log('Error: ', error)
      }
    }
  }
}
</script>

<style scoped>
.img-upload {
    background-color: #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.img-upload-content {
    position: relative;
    background-color: #e3e3e3;
}
.icon-btn {
    cursor: pointer;
}
.img-upload-content__ {
    display: none;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    align-items: center;
    justify-content: center;
}
.img-upload-content__img {
    position: absolute;
}
.img-upload-content:hover .blur {
    filter: blur(2px);
}
.img-upload-content:hover .img-upload-content__ {
    display: flex;
}
.vertical-split {
    height: 40px;
    width: 1px;
    margin: 0px 15px;
    background-color: #000000;
}
.inputUpload {
    display: none;
}
</style>
