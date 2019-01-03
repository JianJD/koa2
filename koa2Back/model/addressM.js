var query=require('../mysqlLib/pool');
exports.createdAddress=(value,Type)=>{
    if(Type==0)
    {
        let sql='INSERT INTO addressReceive SET userId=?,receiver=?,receiverPhone=?,receiverProvince=?,receiverCity=?,receiverArea=?,receiverAddress=?,isDefault=?,createAt=Now(),updateAt=Now();';
        return query(sql,value);
    }else
    {
        let sql='UPDATE addressReceive SET userId=?,receiver=?,receiverPhone=?,receiverProvince=?,receiverCity=?,receiverArea=?,receiverAddress=?,isDefault=?, updateAt=Now() WHERE addressId=?;';
        return query(sql,value);  
    }
    
}
exports.delAddress=(addressId)=>{
    let sql=`DELETE FROM addressReceive WHERE addressId='${addressId}';`;
    return query(sql)
}
exports.findAddressByUserId=(userId)=>{
    let sql=`SELECT * FROM addressReceive WHERE userId='${userId}' ORDER BY isDefault desc , updateAt asc;`
    return query(sql)
}
exports.findAddressById=(addressId)=>{
    let sql=`SELECT * FROM addressReceive WHERE addressId='${addressId}';`
    return query(sql)
}
exports.changeDefaultTrue=(addressId)=>{
    let sql=`update addressReceive set isDefault=1 where addressId='${addressId}';`
    return query(sql)
}
exports.changeDefaultFalse=(addressId)=>{
    let sql='';
    if(addressId!='')
    {
         sql=`update addressReceive set isDefault=0 where addressId<>'${addressId}';` 
    }else
    {
         sql=`update addressReceive set isDefault=0;`
    }
    
    return query(sql)
}
