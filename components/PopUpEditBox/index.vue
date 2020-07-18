<template>
   <el-dialog  :title="title" :visible="visible" width="550px" @close="emitClose">
      <el-form ref="dataForm"  :model="tempData" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <template v-for="(columnItem,index) in column">
            <el-form-item :label="$t(columnItem.label)" :key="index" :prop="columnItem.prop" :required="columnItem.required">
                <span v-if="columnItem.editType=='readOnly'">{{data[columnItem.prop]}}</span>
                <el-select v-else-if="columnItem.editType=='select'" v-model="data[columnItem.prop]" :placeholder="columnItem.placeholder">
                     <el-option v-for="item in columnItem.options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-date-picker v-else-if="columnItem.editType=='date'&&columnItem.editOption&&columnItem.editOption.range" 
                    v-model="data[columnItem.prop]" 
                    :type="columnItem.editOption.dateType" 
                    align="right" 
                    :range-separator="$t('date.rangeSeparator')"
                    :start-placeholder="$t('date.startTime')" 
                    :end-placeholder="$t('date.endTime')"
                    :picker-options="pickerOptions" 
                    :value-format="columnItem.editOption.valueFormat"
                    :default-time="columnItem.editOption.defaultTime" 
                    :default-value="columnItem.editOption.defaultValue">
                </el-date-picker>
                <el-date-picker v-else-if="columnItem.editType=='date'" 
                :type="columnItem.editOption.dateType"  
                :placeholder="columnItem.placeholder"
                :default-time="columnItem.editOption.defaultTime"  
                 v-model="data[columnItem.prop]" 
                :picker-options="pickerOptions"> </el-date-picker>
                <el-input v-else v-model="data[columnItem.prop]"></el-input>   
            </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </div>
    </el-dialog> 
</template>
<script>
export default {
    name:"PopUpEditBox",
    data:function(){
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
        };
    },
    props:{
        data:{
            type:Object,
            default:null
        },
        index:{
            type:Number,
            default:null
        },
        column:{
            type:Array,
            default:function(){
                return [];
            }
        },
        title:{
            type:String,
            default:"编辑",
        },
        visible:{
            type:Boolean,
            default:false,
        },
    },
    computed:{
        tempData:function(){
            return this.data;
        },
        rules(){
            this.walkObj(this.column,function(value,key){
                if(value&&value.rules){
                    this.rules[key]=value.rules;
                }
            },this);
        }
    },
    methods:{
        emitClose:function(){
            this.$emit("close");
        },
        onCancel(){
            this.$emit("onCancel");
        },
        onSubmit(){
            this.$emit("onSubmit",{data:this.tempData,index:this.index});
        },
        walkObj(queryobj, hanlder, context) {
            if(!queryobj){
                return ;
            }
            let keys = Object.keys(queryobj);
            let len = keys.length;
            let key, value;
            for (let i = 0; i < len; i++) {
                key = keys[i];
                value = queryobj[key];
                hanlder && hanlder.call(context, value, key, queryobj);
            }
        },
    }
}
</script>