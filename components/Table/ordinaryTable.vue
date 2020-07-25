<template>
    <el-table 
    v-loading="listLoading" 
    :data="tableData" 
    stripe 
    border
    :row-key="tableSetting.rowKey"
    :show-header="tableSetting.showHeader"
    :tree-props="tableSetting.treeProps"
    :highlight-current-row="true"
    :cell-style="tableSetting.cellStyle"
    :fit='true'
    @sort-change="onSortChange"
    :header-cell-style="tableSetting.headerCellStyle?tableSetting.headerCellStyle:{background:'#F2F6FC'}">
        <slot name="expand"></slot>
         <!--渲染字段列-->
        <template v-for="(columnItem,index) in tableColumns">
            <!-- <template v-if="tableSetting.hideHeader">
                <el-table-column  :label="$t(columnItem.label)" 
                        :min-width="columnItem.width?columnItem.width:'180'" 
                        :key="index+1"
                        :prop="columnItem.prop"
                        :align="columnItem.align"
                        :show-overflow-tooltip="true"
                        :formatter='columnItem.formatter?columnItem.formatter:commonFormatter' >
                        <template slot="header">""</template>
                </el-table-column>
            </template> -->
            <template v-if='columnItem.tip'>
                <el-table-column 
                :label="tableSetting.i18n!==false?$t(columnItem.label):columnItem.label" 
                :min-width="columnItem.width?columnItem.width:'180'" 
                :key="index+1"
                :prop="columnItem.prop"
                :show-overflow-tooltip="true"
                :sortable="columnItem.sortable" 
                :formatter='columnItem.formatter?columnItem.formatter:commonFormatter'
                :align="columnItem.align">
                    <template slot="header">
                            {{tableSetting.i18n!==false?$t(columnItem.label):columnItem.label}}
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">
                                <span v-html="tableSetting.i18n!==false?$t(columnItem.tipLabel):columnItem.tipLabel"></span>
                            </div>
                            <i class="el-icon-question"></i>
                        </el-tooltip> 
                    </template>
                </el-table-column>
            </template>
            <template v-else>
                <el-table-column  :label="tableSetting.i18n!==false?$t(columnItem.label):columnItem.label" 
                        :min-width="columnItem.width?columnItem.width:'180'" 
                        :key="index+1"
                        :prop="columnItem.prop"
                        :align="columnItem.align"
                        :show-overflow-tooltip="true"
                        :sortable="columnItem.sortable" 
                        :formatter='columnItem.formatter?columnItem.formatter:commonFormatter' >
                </el-table-column>
            </template>
        </template>
    </el-table>
</template>
<script>
export default {
    name:"ordinaryTable",
    data(){
        return {
            tableData:[],
            commonFormatter:null,
            tableColumns:[],
            listLoading:false,
            tableSetting:{},
        };
    },

    props:{
        formatter:{
            type:Function,
            default:function(row, column, cellValue, index){
                return cellValue;
            }
        },
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        data:{
            type:Array,
             default:function(){
                return [];
            }
        },
        loading:{
            type:Boolean,
            default:false,
        },
        settings:{
            type:Object,
            default:function(){
                return {};
            }
        },
    },
    watch:{
        formatter(){
            this.commonFormatter=this.formatter;
        },
        columns(){
            this.tableColumns=this.columns;
        },
        data(){
            this.tableData=this.data;
        },
        loading(){
            this.listLoading=this.loading;
        },
        settings(){
            this.tableSetting=this.settings;
        }
    },
    created(){
        this.commonFormatter=this.formatter;
        this.tableColumns=this.columns;
        this.tableData=this.data;
        this.listLoading=this.loading;
        this.tableSetting=this.settings;
    },
    methods:{
        onSortChange: function(event) {
            this.$emit("sort-change",event);
        }
    }
}
</script>