<template>
  <div class="container">
    <h3>Product {{productId}}</h3>
    <div style="display:flex-inline;">
        <!--
            <div>Standard</div>
            <img :src="image.url_standard">
            <div>Thumbnail</div>
            <img :src="image.url_thumbnail">
            <div>zoom</div>
            <img :src="image.url_zoom">
        -->
        <img  v-for="image in brd.imgs" :src="image.url_tiny">    
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'ProductById',
  data () {
    return {
      productId : this.$route.params.id,      
      brands: [],
      brd: {},
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
    var targetId = this.$route.params.id      
    var vm = this;
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
            //console.log(response.data.data)
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
    getProductList().then(function(res){
      vm.brd = res.data
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
