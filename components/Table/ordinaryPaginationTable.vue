<template>
<div>
  <slot name='fronter'></slot>
   <OrdinaryTable  :data="tableData" :formatter="commonFormatter"  :columns="tableColumns"
    :loading="listLoading" :settings="tableSetting" @sort-change="onSortChange"></OrdinaryTable>
  <pagination :disabled="listLoading" :total="listQuery.totalNum" :page.sync="listQuery.currentPageNum"
    :limit.sync="listQuery.pageSize" @pagination="onPaginationChange" />
</div>
</template>
<script>
import OrdinaryTable from "@/components/Table/ordinaryTable";
import Pagination from '@/components/Pagination'; 
export default {
    name:"ordinaryPaginationTable",
    components:{
        Pagination,
        OrdinaryTable,
    },
    data(){
        return{
            tableSetting:{
            },
            commonFormatter:null,
            tableColumns:[],
            tableData:[],
            listLoading:false,
            listQuery:{
                totalNum:"",
                currentPageNum:1,
                pageSize:30,
                orders:[{key: "time", value: -1}],
            }
        };
    },
    props:{
        formatter:{
            type:Function,
            default:function(){
                return null;
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
        totalNum:{
            type:Number,
            default:0,
        },
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        settings:{
            type:Object,
            default:function(){
                return {};
            }
        },
        defaultOrder:{
            type:Object,
            default:function(){
                return {};
            }
        }
    },
    watch:{
        formatter(){
            this.commonFormatter=this.formatter;
        },
        data(){
            this.tableData=this.data;
        },
        loading(){
            this.listLoading=this.loading;
        },
        totalNum(){
            this.listQuery.totalNum=this.totalNum;
        },
        columns(){
            this.tableColumns = this.columns;
        },
        settings(){
            this.tableSetting=this.settings;
        },
        defaultOrder(){
            this.listQuery.orders=[this.defaultOrder];
        }
        
    },
    created(){
        this.tableData=this.data;
        this.listLoading=this.loading;
        this.listQuery.totalNum=this.totalNum;
        this.tableColumns = this.columns;
        this.tableSetting=this.settings;
        this.listQuery.orders=[this.defaultOrder];
        this.commonFormatter=this.formatter;
        this.$emit("initData",this.listQuery);
    },
    methods:{
        onPaginationChange(){
            this.emitConditionChange();
        },
        emitConditionChange(){
            this.$emit("conditionChange",this.listQuery);
        },
        onSortChange: function(event) {
            const prop = event.prop;
            let order = event.order;
            this.listQuery.orders = {};
            let orderCode = 0;
            if (order == 'descending') {
                orderCode = -1;
            } else if (order == 'ascending') {
                orderCode = 1;
            } else {
                orderCode = 0;
            }
            this.listQuery.currentPageNum=1;
            this.listQuery.orders=[];
            this.listQuery.orders.push({key:prop,value:orderCode});
            this.emitConditionChange();
        },
    }
}
</script>
<style lang="scss" scoped>
</style>