exports.timeFormat=function(){
    let date=new Date();
    let time=`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
     return time
}
exports.reponseData=function(code,Data,msg){
    return {
        code,
        Data,
        msg
    }
}

