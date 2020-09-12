<template>
  <input
    type="file"
    ref="inputNode"
    @change="changeFile($event)"
    :accept="accept"
  />
</template>
<script>
export default {
  name: "inputFile",
  props: {
    acceptFormat: {
      type: String,
      default: function () {
        return "image/*";
      },
    },
    maxSize: {
      type: Number,
      default: 0,
    },
    errorTips: {
      type: Object,
      default: function () {
        return {
          maxSizeError: "上传的图片大小不能超过 ${maxSize}MB!",
        };
      },
    },
  },
  watch: {
    acceptFormat: {
      handler() {
        this.accept = this.acceptFormat;
      },
      immediate: true,
    },
  },
  data() {
    return {
      base64: "",
      accept: "",
    };
  },
  methods: {
    select() {
      this.$refs.inputNode.click();
    },
    clear() {
      this.$refs.inputNode.value = null;
    },
    changeFile(event) {
      let file = event.target.files[0];
      this.file = file;
      if (this.maxSize) {
        let isLt8M = file.size / 1024 / 1024 < this.maxSize;
        if (!isLt8M) {
          this.$message.error(this.errorTips.maxSizeError);
          return false;
        }
      }
      this.readAsDataURL(function (data) {
        this.$emit("change", {
          base64: data,
        });
      }, this);
    },
    readAsDataURL(callBack, context) {
      if (this.file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          let data = e.target.result;
          callBack && callBack.call(context, data);
        };
        reader.readAsDataURL(this.file);
      }
    },
    getBlobData() {
      return this.file;
    },
    readAsArrayBuffer() {
      if (this.file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          let data = e.target.result;
          callBack && callBack.call(context, data);
        };
        reader.readAsArrayBuffer(this.file);
      }
    },
  },
};
</script>
