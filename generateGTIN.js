var axios = require('axios')
var gtin = require('gtin-generator')
var baseURL = "http://localhost:3000/api/"
var instance = axios.create({
    baseURL: baseURL,
    timeout: 1000000,
    headers: { 'Access-Control-Allow-Origin': '*' }
})
var targetId = [
    9391,  9729, 12516, 14723, 14806, 14843, 14854,
    14861, 14919, 14916, 14983, 15056, 15053, 15057, 15055 
]
var genGTINArr = [
    "05175949284851",
    "05175949287890",
    "05175949290913",
    "05175949293921",
    "05175949296922",
    "05175949299954",
    "05175949303002",
    "05175949306010",
    "05175949309073",
    "05175949312080",
    "05175949315098",
    "05175949318099",
    "05175949321112",
    "05175949324120",]
for(i =0; i<15; i++){
    var product_id = targetId[i]
        var genGTIN = genGTINArr[i]
        console.log(product_id, genGTIN)
        instance.request({
            method: 'put',
            data: {
              gtin : genGTIN
            },
            url: 'updateProduct/'+product_id
          }).then((res)=>{
            console.log(res)
          })
}

    

