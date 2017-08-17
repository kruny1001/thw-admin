<template>
  <div class="container">
    <h3>Order List</h3>
    <table>
      <tr>
        <th>Order ID</th>
        <th>Customer ID</th>
        <th>Total Revenue</th>
        <th>Status</th>
        <th>Payment Method </th>
        <th>Date Created </th>
      </tr>
      <tr v-for="ord in orders">
        <td><span>{{ord.id}}</span></td>
        <td><span>{{ord.customer_id}}</span></td>
        <td><span style="color:#337ab7">{{Number(ord.total_inc_tax) | currency}}</span></td>
        <td><span>{{ord.status}}</span></td>
        <td><span>{{ord.payment_method}}</span></td>
        <td><span>{{ord.date_created}}</span></td>
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
      orders: []
    }
  },
  created () {
    var vm = this;
    var baseURL = 'http://127.0.0.1:3001/api'

    var instance = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'accept': 'application/json',
        'Content-Type':'application/json'
      }
    })

    var getOrderList = function () {
      return instance.request({
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        data:{
            max_date_created:new Date().toISOString(), 
            sort:"date_created:desc",
            limit:60
        },
        url: '/listOrders'
        }).then(function(response) {
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

    // axios.request({
    //     method:'GET',
    //     url: 'http://127.0.0.1:8000/orders',
    //     headers: {'Access-Control-Allow-Origin': '*'}
    //     }).then(result => console.log(result))
    getOrderList().then(function(res){
        console.log(res)
      vm.orders = res.data
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
