<template>
    <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key='index'>
        <template >
            <img :src="imgUrl+item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
        </template>
        
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="uploadList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        type="drag"
        :action="action"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <img :src="imgUrl + url" v-if="visible" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
    export default {
        props:{
            uploadList:{
                type:Array,
                default:[]
            },
            one:{
                type:Boolean,
                default:false
            },
            index:{
                type:[Number,String],
                default:'null'
            }
        },
        data () {
            return {
                url: '',
                visible: false,
                imgUrl:this.imgUrl,
                action:this.upLoadUrl
            }
        },
        methods: {
            handleView (name) {
                this.url = name;
                this.visible = true;
            },
            handleRemove (index) {
               this.uploadList.splice(index,1)
            },
            handleSuccess (res, file) {
                if(!this.one)
                {
                     this.uploadList.push({
                            name:'pic',
                            url:res.Data
                        })
                }else{
                    if(this.uploadList.length>0)
                    {
                    this.uploadList.splice(0,1,{
                            name:'pic',
                            url:res.Data
                        })
                    }else
                    {
                    this.uploadList.push({
                            name:'pic',
                            url:res.Data
                        })
                    }
                }
               
                 if(this.index=='null')
                 {
                     this.$emit('success',this.uploadList)
                 }else
                 {
                     let data={
                         url:this.uploadList,
                         index:this.index
                     }
                     this.$emit('success',data)
                 }
                
            },
            
        },
        
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
