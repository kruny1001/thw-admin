<template>
  <div class="container">
    <h3>Category List</h3>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Page Title</th>
        <th>Search Keywords</th>
        <th>Get Detail</th>
        <th>Products List </th>
      </tr>
      <tr v-for="brd in brands">
        <td><span>{{brd.id}}</span></td>
        <td><span style="font-size:12px;">{{brd.name}}</span></td>
        <td><span>{{brd.page_title}}</span></td>
        <td><span>{{brd.search_keywords}}</span></td>
        <td><router-link :to="{name: 'categoryById', params: {id: brd.id}}">Go to Detail</router-link></td>
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
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/categories/'
    }
  },
  created () {
    var vm = this;
    var baseURL = 'http://localhost138.197.126.0:3000/api/'
    var instance = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      headers: {'Access-Control-Allow-Origin': '*'}
    })

    var getProductList = function () {
      return instance.request({
        method: 'get',
        //url: 'brandList'
        url: 'getCategories'
        }).then(function(response) {
            //console.log(response.data.data)
            console.log(response)
            return(response.data)
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
      console.log(res)
      vm.brands = res.data
      vm.pageMeta = res.meta
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
