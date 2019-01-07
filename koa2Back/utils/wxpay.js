var xmlreader = require("xmlreader");
var fs = require("fs");
var wxpay = {
    //把金额转为分
    getmoney: function (money) {
        return parseFloat(money) * 100;
    },

    // 随机字符串产生函数  
    createNonceStr: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 32; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    // 时间戳产生函数  
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000);
    },

    //签名加密算法
    paysignjsapi: function (attach,openid,appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey) {
        var ret = {
            appid: appid, //appid
            mch_id: mch_id, //商户号
            attach:attach,
            nonce_str: nonce_str, //随机字符串
            body: body, //订单支付内容  相当标题
            notify_url: notify_url, //微信支付回调地址
            out_trade_no: out_trade_no, //自己内部的订单号
            spbill_create_ip: spbill_create_ip, //机器ip
            total_fee: total_fee, //金额 （分）
            openid:openid,
            trade_type: trade_type //一般是JSAPI -JSAPI
        };
        console.log(ret)
        var string = raw(ret);
        var key = mchkey; //商户秘钥
        string = string + '&key=' + key;
        var crypto = require('crypto');
        let b=crypto.createHash('md5').update(string,'utf8').digest('hex').toUpperCase()
        
        return b
        // 
        // return  crypto.createHash('md5').update(string,'utf8').digest('hex').toUpperCase();
       
    },
    //签名加密算法,第二次的签名返回给前端
    paysignjsapifinal: function (appid, mch_id, prepayid, noncestr, timestamp, mchkey) {
        var ret = {
            appId: appid,
            package: 'prepay_id='+prepayid,
            nonceStr: noncestr,
            signType:'MD5',
            timeStamp: timestamp
        }
       

        console.log('retretret==', ret);
        var string = raw(ret);

        var key = mchkey;
        string = string + '&key=' + key;
        console.log(string);
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
    getXMLNodeValue: function (xml) {
        xmlreader.read(xml, function (errors, response) {
            if (null !== errors) {
                console.log(errors)
                return;
            }
            console.log('长度===', response.xml.prepay_id.text().length);
            var prepay_id = response.xml.prepay_id.text();
            console.log('解析后的prepay_id==', prepay_id);
            return prepay_id;
        });
    }

}

function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}

module.exports = wxpay;