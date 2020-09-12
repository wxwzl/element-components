<template>
  <el-dialog
    class="cutPictureBox"
    :title="boxTitle"
    :visible.sync="dialogVisible"
    :width="boxStyle.width"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <div :style="containerStyleCp">
      <vueCropper
        ref="cropper"
        :img="img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :fixedBox="option.fixedBox"
        :fixedNumber="option.fixedNumber"
      ></vueCropper>
    </div>
    <div slot="footer" class="footer">
      <span class="button cut" @click="cut">裁剪</span>
      <span class="button select" @click="selectFile">重选</span>
    </div>
    <inputFile
      ref="inputFile"
      style="display: none"
      :acceptFormat="accept"
      @change="onFileSelectEnd"
    ></inputFile>
  </el-dialog>
</template>
<script>
import { VueCropper } from "vue-cropper";
import inputFile from "@/components/fileSelector/inputFile";
export default {
  name: "cutPictureBox",
  components: {
    VueCropper,
    inputFile,
  },
  props: {
    boxStyle: {
      type: Object,
      default: function () {
        return {
          width: "30%",
        };
      },
    },
    containerStyle: {
      type: Object,
      default: function () {
        return {};
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: function () {
        return "";
      },
    },
    imgSrc: {
      type: String,
      default: function () {
        return "";
      },
    },
    acceptFormat: {
      type: String,
      default: function () {
        // return ".gif,.jpeg,.jpg,.png";
        return "image/*";
      },
    },
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
    maxSize: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  watch: {
    title: {
      handler() {
        this.boxTitle = this.title;
      },
      immediate: true,
    },
    imgSrc: {
      handler() {
        this.img = this.imgSrc;
      },
      immediate: true,
    },
    acceptFormat: {
      handler() {
        this.accept = this.acceptFormat;
      },
      immediate: true,
    },
    options: {
      handler() {
        this.option = this.options;
      },
      immediate: true,
    },
    containerStyle: {
      handler() {
        this.containerStyleCp = this.containerStyle;
      },
      immediate: true,
    },
    boxStyle: {
      handler() {
        this.boxStyleCp = this.boxStyle;
      },
      immediate: true,
    },
  },
  data() {
    return {
      boxTitle: "",
      img: "",
      accept: "",
      boxStyleCp: {},
      containerStyleCp: {},
      option: {},
    };
  },
  methods: {
    onFileSelectEnd(data) {
      this.img = data.base64;
      let fileData = {
        base64: data.base64,
        blob: this.$refs.inputFile.getBlobData(),
      };
      this.$emit("onFileSelectEnd", fileData);
    },
    selectFile() {
      this.$refs.inputFile.select();
    },
    cut() {
      // this.$refs.cropper.startCrop();
      let self = this;
      if (this.option.outputDataType == "base64") {
        this.$refs.cropper.getCropData(function (data) {
          self.$emit("success", data);
          self.dialogVisible = false;
        });
      } else if (this.option.outputDataType == "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          self.$emit("success", data);
          self.dialogVisible = false;
        });
      } else {
        let base64 = new Promise(function (resolve, reject) {
          self.$refs.cropper.getCropData(function (data) {
            resolve(data);
          });
        });
        let blob = new Promise(function (resolve, reject) {
          self.$refs.cropper.getCropBlob(function (data) {
            resolve(data);
          });
        });
        Promise.all([base64, blob]).then((values) => {
          let data = {};
          data.base64 = values[0];
          data.blob = values[1];
          self.$emit("success", data);
          self.dialogVisible = false;
        });
      }
    },
    cutBlobCustom(callBack, context) {
      this.$refs.cropper.getCropBlob((data) => {
        callBack && callBack.call(context, data);
      });
    },
    cutBase64Custom(callBack, context) {
      this.$refs.cropper.getCropData((data) => {
        callBack && callBack.call(context, data);
      });
    },
    onClose() {
      this.$refs.inputFile.clear();
    },
  },
};
</script>
<style lang="less" scoped>
.cutPictureBox {
  .button {
    width: 84px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    background: #e2e2e2;
    color: #666;
    font-size: 16px;
    border-radius: 35px;
    margin: 0 20px;

    &.cut {
      background: #664ae1;
      color: #fff;
      &:hover {
        background: #513bb4;
      }
    }

    &.select {
      background: #e2e2e2;
      color: #666;
      &:hover {
        background: #d6d5d5;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.cutPictureBox.el-dialog__wrapper {
  /deep/.el-dialog {
    .el-dialog__header {
      text-align: left;
      padding: 11px 24px 10px;
      .el-dialog__headerbtn {
        top: 16px;
      }
    }
    .el-dialog__footer {
      text-align: center;
      padding: 20px 24px 20px 24px;
    }
  }
}
</style>
