<template>
  <div class="container">
    <h3>Product List</h3>

    <select v-model="selected" @change="selectProduct(selected)">
      <option disabled value="">Please select Brand</option>
      <option v-for="(option, idx) in brands" :key="idx" v-bind:value="option.id">
        {{ option.name }} - {{option.id}}
      </option>
    </select>
    <table>
    <div class="record" v-for="(prd, index) in products" :key="index">  
      <tr class="table-record">
          <th>ID</th>
          <th>Name</th>
          
          <th>Calculated Price</th>
          <th>Weight</th>
          <th>availability</th>
          <th>View(s)</th>
          <th> Actual Link </th>
          <th> Edit Viwe</th>
          <th> Detail View</th>
          
      </tr>
      <tr class="table-record">
            <td><a target="_blank" v-bind:href="baseStoreUrl + prd.id +'/edit'">{{prd.id}}</a></td>
            <td><span style="font-size:12px;">{{prd.name}}</span></td>
            <td>${{prd.calculated_price}}</td>
            <td>({{prd.weight}} pound)</td>
            <td>{{prd.availability}}</td>
            <td>{{prd.view_count}}</td>
            <td><a target="_blank" v-bind:href="'http://tophairwigs.com'+prd.custom_url.url">link</a></td>
            <td> <button @click="openEditor(index)">Open</button> </td>
            <td> <router-link :to="{name: 'ProductById', params: {id: prd.id}}">Go to Detail</router-link></td>
      </tr>
        <!-- <div style="padding: 8px; border:1px solid black; border-radius:3px; overflow-x:auto;" v-html="prd.description"></div> -->
      <div  style="padding: 8px; border:1px solid black; border-radius:3px; overflow-x:auto;">
          <label>Category</label>
          <div><span style="font-size:12px;">{{prd.categories}}</span></div>
          <label>weight: </label><input type="number" v-model="prd.weight" placeholder="edit name">
           <div>{{ prd.weight*16}}o.z</div>
          <hr />
          <button @click="updateProduct(prd.id, prd)"> Update</button>

      </div>
    </div>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Router from '../router'

export default {
  name: 'Products',
  data () {
    return {
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/',
      baseURL :'',
      instance: {},
      products: [],
      crntBrandId: 949,
      brands:[],
      selected: ''
    }
  },
  methods: {
    openEditor: function(idx){
      var vm = this;
      if(vm.products[idx].editAvail == undefined)
        vm.products[idx].editAvail = true
      else{
        console.log("update")
        vm.products[idx].editAvail = !vm.products[idx].editAvail
        console.log(vm.products[idx].editAvail)
      }  
    },
    selectProduct: function(brandId){
      Router.push({ name: 'ProductsByBrand', params: { id: brandId }})
      this.crntBrandId = this.$route.params.id
      this.getProductList(this.crntBrandId)
    },
    getProductList : function (brandId) {
      var vm = this;
      return vm.instance.request({
        method: 'get',
        url: 'productList/'+brandId
        }).then(function(res) {
            //console.log(response.data.data)
            console.log(res)
            vm.products = res.data.data
            vm.pageMeta = res.meta
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
    },
    getBrandList: function(){
      var vm = this;
      return vm.instance.request({
        method: 'get',
        url: 'brandList'
        }).then(function(res) {
            //console.log(response.data.data)
            console.log(res)
            vm.brands = res.data.data
            
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
    },
    updateProduct: function(productId, productObj){
      var vm = this;
      let upodateObj = productObj
      this.instance.request({
            method: 'put',
            data: upodateObj,
            url: 'updateProduct/'+productId
      }).then(function(response) {
        console.log(response)
        return(response)
      })
        
    }
  },
  mounted(){

    // const searchInst = instantsearch({
    //   appId: '00N84365S5',
    //   apiKey: '3dbe61e6a86b9ba0eed3f941dcd637a4',
    //   indexName: 'products',
    //   urlSync: true
    // })

    // searchInst.addWidget(
    //   instantsearch.widgets.currentRefinedValues({
    //     container: '#current-refined-values',
    //     // This widget can also contain a clear all link to remove all filters,
    //     // we disable it in this example since we use `clearAll` widget on its own.
    //     clearAll: false
    //   })
    // );

    // // initialize clearAll
    // searchInst.addWidget(
    //   instantsearch.widgets.clearAll({
    //     container: '#clear-all',
    //     templates: {
    //       link: 'Reset everything'
    //     },
    //     autoHideContainer: false
    //   })
    // );

    // // initialize pagination
    // searchInst.addWidget(
    //   instantsearch.widgets.pagination({
    //     container: '#pagination',
    //     maxPages: 20,
    //     // default is to scroll to 'body', here we disable this behavior
    //     scrollTo: false
    //   })
    // );
    // // initialize RefinementList
    // searchInst.addWidget(
    //   instantsearch.widgets.refinementList({
    //     container: '#refinement-list',
    //     attributeName: 'category'
    //   })
    // );

    // searchInst.addWidget(
    //   instantsearch.widgets.searchBox({
    //     container: '#search-box',
    //     placeholder: 'Search for products'
    //   })
    // );

    // // initialize hits widget
    // searchInst.addWidget(
    //   instantsearch.widgets.hits({
    //     container: '#hits'
    //   })
    // );

    // searchInst.start()
  },
  created () {
    var vm = this;
    vm.baseURL = 'http://138.197.126.0:3000/api/'
    //vm.baseURL = 'http://localhost:3000/api/'

    vm.instance = axios.create({
      baseURL: vm.baseURL,
      timeout: 1000,
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    if(this.$route.params.id !== undefined){
      vm.crntBrandId = this.$route.params.id
    } 
    vm.selected = vm.crntBrandId;
    vm.getBrandList(vm.crntBrandId)
    vm.getProductList(vm.crntBrandId)
    
    
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
.table-record{
  font-family: roboto;
  font-size: 12px;
}
.record{
  font-family: roboto;
  margin-bottom: 10px;
}
</style>
