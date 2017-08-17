<template>
  <div class="container">
    <h3>Product List</h3>
    <span>{{customers}}</span>
    <!-- 
    // <select v-model="selected" @change="selectProduct(selected)">
    //   <option disabled value="">Please select Brand</option>
    //   <option v-for="option in brands" v-bind:value="option.id">
    //     {{ option.name }} - {{option.id}}
    //   </option>
    // </select>
    -->
    <table>
    <div class="record" v-for="(prd, index) in products">  
      <tr class="table-record">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
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
          <label>weight: </label><input type="number" v-model="prd.weight" placeholder="edit name">
           <div>{{ prd.weight*16}}o.z</div>
          <hr />
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
  name: 'Customers',
  data () {
    return {
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/',
      baseURL :'',
      customers:[],
      custInfos:[],
      instance: {},
      products: [],
      brands:[],
    }
  },
  methods: {
    getCustomer : function (customerId) {
      var vm = this;
      return vm.instance.request({
        method: 'get',
        url: 'getCustomerById/'+customerId
        }).then(function(res) {
            vm.custInfos.push(res) 
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
  },
  mounted(){},
  created () {
    var vm = this;
    vm.baseURL = 'http://localhost:3001/api/'
    vm.customers = ["93432","95404","95953","94527","84368","87590","94637","98889","95329","96033","98138","99100",
        "92646","93960","87910","89691","91932","93431","94572","95189","96065","102384", "82012","83109","87588",
        "95946","96456","83676","85056","85859","94647","96424","96496","97100","97162","98100","98942","98976",
        "101419","92943","96709","97745","98133","99303","81651","81683","82726","83303","84484","93418","94665", 
        "95271","95893","97030","97079","97385","97436","97544","97935","99211","99217","82144","83197","83293",
        "83295","89497","90481","95159","95413","95782","95831","95897","95902","96257","96559","96837","96928",
        "98081","98633","99563","99895","83427","84282","84571","84934","92730","94275","94606","95491","95522",
        "95945","96752","96768","97043","97110","97115","97397","99000","100262"]

    vm.instance = axios.create({
      baseURL: vm.baseURL,
      timeout: 1000,
      headers: {'Access-Control-Allow-Origin': '*'}
    })

    var promiseJobs = [];
    vm.customers.forEach(function(custId){
        promiseJobs.push(vm.getCustomer(custId))
    })
    axios.all(promiseJobs).then(results => {
        console.log(results)
    });
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
