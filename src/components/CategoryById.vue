<template>
  <div class="container">
    <h3>Category List</h3>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>image_url</th>
        <th>is_visible</th>
        <th>page_title</th>
        <th>meta_keywords</th>
        <th>custom_url.is_customized</th>
        <th>custom_url.url</th>
        <th>Products List </th>
      </tr>
      <tr>
        <td><span>{{brd.id}}</span></td>
        <td><span style="font-size:12px;">{{brd.name}}</span></td>
        <td><span>{{brd.image_url}}</span></td>
        <td><span>{{brd.is_visible}}</span></td>
        <td><span>{{brd.page_title}}</span></td>
        <td><span>{{brd.meta_keywords}}</span></td>
        <td><span>{{brd.custom_url.is_customized}}</span></td>
        <td><span>{{brd.custom_url.url}}</span></td>
        <td><a target="_blank" v-bind:href="baseStoreUrl + brd.id +'/edit'">Link</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'brands',
  data () {
    return {
      brands: [],
      brd: {},
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/categories/',
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
        url: 'getCategryById/'+targetId
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
