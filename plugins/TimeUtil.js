let TimeUtil = {
    /**
     *
     * 进行时间的加减运算，return Date
     * @param {*} date
     * @param {*} addend day
     * @memberof TimeUtil
     */
    add(date,addend){
        let oneDayTime = 24 * 60 * 60 * 1000;
        addend = Math.floor(oneDayTime*addend);
        return new Date(date.getTime()+addend);
    },
    formatDate(date,fmt) {
        if(date instanceof  Date != true) {
            date = new Date(date)
        }
        if (!fmt) fmt = "yyyy-MM-dd";
    
        if (!date || date == null) return null;
        var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
    },

};
export default TimeUtil;