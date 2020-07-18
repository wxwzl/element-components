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
    formatDate(date){
        if(date instanceof  Date !=true){
            date= new Date(date);
        }

        let myyear = date.getFullYear(); 
        let mymonth = date.getMonth()+1; 
        let myweekday = date.getDate(); 
        
        if(mymonth < 10){ 
        mymonth = "0" + mymonth; 
        } 
        if(myweekday < 10){ 
             myweekday = "0" + myweekday; 
        } 
        return (myyear+"-"+mymonth + "-" + myweekday);  
    },

};
export default TimeUtil;