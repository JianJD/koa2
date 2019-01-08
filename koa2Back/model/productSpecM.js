var query=require('../mysqlLib/pool');
exports.createSpec=(value)=>{
    let sql=`INSERT INTO productionspec (productId,specImg,color,price,stock,size) VALUES ?;`
    return query(sql,[value])
}


exports.delSpec=(value)=>{
    let sql=`DELETE FROM productionspec WHERE productId= '${value}';`
    return query(sql)
}
exports.findSpecByProductId=(value)=>{
    let sql=`SELECT * FROM productionspec WHERE productId='${value}';`
    return query(sql)
}
exports.findSpecBySpecId=(value)=>{
    let sql=`SELECT color,size,price,productId FROM productionspec WHERE specId in (${value});`
    return query(sql)
}