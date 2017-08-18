<template>
  <div class="container">
    <h3>Product {{productId}}</h3>
    <div>Images</div>
    <div style="display:flex-inline;">
        <!-- 
        <div>Standard</div>
        <img :src="image.url_standard">
        <div>Thumbnail</div>
        <img :src="image.url_thumbnail">
        <div>zoom</div>
        <img :src="image.url_zoom">
        <img  v-for="image in prdImgs.imgs" :src="image.url_tiny">    
        -->
        <img  v-for="image in prdImgs" :src="image.url_tiny">    
    </div>
    <hr />
    <div>Option</div>
    <pre style="height:350px; overflow-y:scroll">{{prdInfo}}</pre>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Weight</th>
            <th>Categories</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Brand_id</th>
        </tr>
        <tr style="border:1px solid grey;">
            <td>{{prdInfo.id}}</td>
            <td>{{prdInfo.name}}</td>
            <td>{{prdInfo.sku}}</td>
            <td>{{prdInfo.weight}}</td>
            <td>{{prdInfo.categories}}</td>
            <td>{{prdInfo.price}}</td>
            <td>{{prdInfo.sale_price}}</td>
            <td>{{prdInfo.brand_id}}</td>
        </tr>
        <tr>
          <th>Description</th>
        </tr>
        <tr>
          <td v-html="prdInfo.description"></td>
        </tr>
        <tr>
          <th>Variants</th>
        </tr>
    </table>
    <hr />
    <div>Options</div>
    <pre style="height:350px; overflow-y:scroll">{{options}}</pre>
    <div v-for="optionElement in options">
      <div style="font-weight:bold;">Possible Options, 
        Option ID: {{optionElement.id}}, Product ID: {{optionElement.product_id}}
      </div>
      <div v-for="value in optionElement.option_values">
        {{value.label}}
      </div>  
    </div>

    <hr />
    <div>Price Rule</div>
    <hr />
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'brands',
  data () {
    return {
      productObj: {
          type:"physical",
          sku:"",description:"",name:"", weight: 0, sale_price:0, categories:[],brand_id:0,
          reviews_rating_sum:0, is_free_shipping:false, is_featured:false, related_products:[],
          availability: "available"
      },
      options:[],
      variants:[],
      productId : '',      
      brands: [],
      brd: {},
      prdInfo:{},
      imgs: [],
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/categories/',
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      console.log('change')
    }
  },
  created () {
    
    var targetId = 15040
    var vm = this;
    vm.productId = 15040;
    var baseURL = 'http://localhost:3001/api/'
    var instance = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    var getProductList = function () {
      return instance.request({
        method: 'get',
        url: 'getProductById/'+targetId
        }).then(function(response) {
            console.log(response.data)
            return(response)
        }).catch(function (error) {
            if (error.response) {
            // The request was made and the server responded with a status code 
            // that falls out of the range of 2xx 
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received 
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
            // http.ClientRequest in node.js 
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error 
            console.log('Error', error.message);
            }
            console.log(error.config);
      })
    }

    var getOptions = function(targetId) {
        //localhost:3001/api/getOptions/15040
        return instance.request({
        method: 'get',
        url: 'getOptions/'+targetId
        }).then(function(response) {
            console.log(response.data)
            return(response)
        }).catch(function (error) {
            if (error.response) {
            // The request was made and the server responded with a status code 
            // that falls out of the range of 2xx 
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received 
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
            // http.ClientRequest in node.js 
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error 
            console.log('Error', error.message);
            }
            console.log(error.config);
      })
    }
    getOptions("15040").then(res => {
        vm.options = res.data.data
        vm.optionMeta = res.data.meta
    })
    getProductList().then(function(res){
      vm.prdImgs = res.data.imgs
      vm.prdInfo = res.data.info
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
td{margin-left:3px; margin-right:3px; padding:3px;}
.container{
    text-align: left;
    padding: 10px;
}
</style>
