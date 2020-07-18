
/**
 * 数据格式转换器
 * 将数据转换成适配Element-UI库适用的数据格式
 *
 * @class UIDataAdpater
 */
import TimeUtil from "./TimeUtil";
class UIDataAdpater{

    constructor(){
        this.time=TimeUtil;
    }
    


    /**
     *
     *
     * @param {*} routes router.options.routes
     * @param {*} path /path1/path2
     * @memberof UIDataAdpater
     */
    findRoute(routes,path){
        let pathArray=[];
        if(typeof path=="string"|| path instanceof String){
            pathArray= path.split("/");
        }else if( path instanceof Array){
            pathArray=path;
        }
        let len=pathArray.length;
        let routeArray=routes;
        let route=null,routePath=null,targetRoute=null,pathStr=null;
        for(let i=0;i<len;i++){
            pathStr = pathArray[i];
            for(let j=0;j<routeArray.length;j++){
                route=routeArray[j];
                routePath=route.path;
                if(/^\//.test(routePath)){
                    routePath=routePath.substr(1);
                } 
                if(pathStr==routePath){
                    targetRoute=route;
                    routeArray=route.children;
                    break;
                }
           } 
        }
        return targetRoute;
    }


    getLateDateOf30(){
        let defaultTime=[];
        let now = new Date();
        let lastMonthDay = TimeUtil.add(now,-30);
        defaultTime.push(TimeUtil.formatDate(lastMonthDay));
        defaultTime.push(TimeUtil.formatDate(now));
        return defaultTime;
    }

    /**
     *
     * 判断 dom节点ele是否含有className 
     * @param {*} ele
     * @param {*} className
     * @returns
     * @memberof UIDataAdpater
     */
    hasClass(ele,className){
        let classNames=ele.className;
        let classArray=classNames.split(" ");
        if(classArray.includes(className)){
            return true;
        }
        return false;
    }

    /**
     *
     * 为ele节点添加className 
     * @param {*} ele
     * @param {*} className
     * @memberof UIDataAdpater
     */
    addClass(ele,className){
        let classNames=ele.className;
        let classArray=classNames.split(" ");
        if(classArray.includes(className)){
            return this;
        }
        ele.className = ele.className+" "+className;
        return this;
    }



    /**
     *
     *  为ele节点删除className 
     * @param {*} ele
     * @param {*} className
     * @memberof UIDataAdpater
     */
    removeClass(ele,className){
        let classNames=ele.className;
        let classArray=classNames.split(" ");
        let len=classArray.length;
        let classi=null;
        for(let i=0;i<len;i++){
            classi=classArray[i];
            if(classi==className){
                classArray.splice(i,1);
                break;
            }
        }
        ele.className = classArray.join(" ");
        return this;
    }
    /**
     * 
     * 将一个数字转成整数
     * @param {*} num
     * @returns
     * @memberof UIDataAdpater
     */
    formatNumToInt(num){
        return Math.floor(num);
    }
    /**
     *"
     * 将[{level1:"",Levek2:"",Level3:"",others:""}]这样的数据根据
     * keys[]
     * 转换成适合elementUI库里的级联选择器使用的格式。
     * @param {*} data
     * @param {*} keys
     * @returns
     * @memberof UIDataAdpater
     */
    cascaderAdapter(data,keys){
        let obj={};
        let array=[]; 
        if(data instanceof Array &&  keys instanceof Array){
            let len = keys.length;
            let item=null;
            let key=null;
            let value= null;
            let label = null;
            let dataLen = data.length;
            let temp=null;
            for(let i=0;i<dataLen;i++){
                item=data[i];
                let j=0;
                temp=obj;
                while(j<len){
                    key = keys[j];
                    value = item[key];
                    label = value;
                    if(!temp[value]){
                        temp[value]={value:value,label:label,children:{}};
                    }
                    temp=temp[value].children;
                    j++;
                }
            }
            array=this.object2Array(obj,"children");
        }
        return array;
    }

    

    object2Array(obj,recursiveKey){
        let array = [];
        this.walkObj(obj,function(value){
            if(value[recursiveKey]){
                let keys= Object.keys(value[recursiveKey]);
                // console.log(keys.length,keys);
                if(keys.length>0){
                    value[recursiveKey]=this.object2Array(value[recursiveKey],recursiveKey);
                }else{
                    delete value[recursiveKey];
                }
            }
            array.push(value);
        },this);
        return array;
    }

    
    walkArray(array, hanlder, context){
        if(!array){
            return ;
        }
        let len = array.length;
        let value;
        for (let i = 0; i < len; i++) {
            value = array[i];
            hanlder && hanlder.call(context, value, i, array);
        }
    }

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
    }
    getRoundNum(num,number){
        if(number===undefined){
            number=2;
        }
        return Math.floor(num*Math.pow(10,number))/Math.pow(10,number);
    }
}
const installObj={};
installObj.install=function(Vue){
    // Vue.elDataAdpater = new UIDataAdpater();
    Vue.prototype.$elDataAdpater = new UIDataAdpater();
    // Vue.myGlobalMethod = function () {
    //     // 逻辑...
    //   }
    
    //   // 2. 添加全局资源
    //   Vue.directive('my-directive', {
    //     bind (el, binding, vnode, oldVnode) {
    //       // 逻辑...
    //     }
    //   })
    
    //   // 3. 注入组件选项
    //   Vue.mixin({
    //     created: function () {
    //       // 逻辑...
    //     }
    //   })
    
    //   // 4. 添加实例方法
    //   Vue.prototype.$myMethod = function (methodOptions) {
    //     // 逻辑...
    //   }
};
export default installObj;