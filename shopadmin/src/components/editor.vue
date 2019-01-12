<!--  -->
<template>
  <div>
    <Upload
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png','gif']"
      :max-size="2048"
      multiple
      :action="action"
    >
      <Button icon="ios-cloud-upload-outline"></Button>
    </Upload>
    <quill-editor v-model="content" :options="editorOption" ref="QuillEditor"></quill-editor>
  </div>
</template>

<script>
 
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];
export default {
    props:{
       contentp:{
           type:String,
           default:''
       } 
    },
  data() {
    return {
      action:this.upLoadUrl,
      imgUrl:this.imgUrl,
      content:'',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('.ivu-upload .ivu-btn').click()
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },

  components: {},

  computed: {},

  created() {
     this.content=this.contentp
  },

  methods: {
    handleSuccess(res) {
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", `${this.imgUrl}${res.Data}`);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        Message.error("图片插入失败");
      }
    }
  },
  watch: {
      content(newVal){
          this.$emit('success',this.content)
      },
      contentp(newVal){
        this.content=newVal
      }
  },
};
</script>
<style  scoped>
.ivu-upload {
  display: none;
}
</style>