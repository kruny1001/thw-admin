<template>
  <div class="container">
    <h3>Order List</h3>
<!-- 
    <div style="display:flex">
      <div class="bc-buy-button natural-aloe" style="width:295px;height:435px">
        <iframe
          src="https://ad.buybutton.store/card/v1.1/0xh7j/15057/natural-aloe?action=checkout&open_in=popup&src=buy_button&btn_color=F7B733&price_color=4ABDAC&ga_id=null"
          border="0"
          scrolling="no"
          horizontalscrolling="no"
          verticalscrolling="no"
          allowtransparency="true"
          width="100%"
          height="100%"
          style="overflow: hidden; border: none; width=100%; height=100%;">
        </iframe>
      </div>

      <div class="bc-buy-button Bohyme-229" style="width:295px;height:435px">
        <iframe
          src="https://ad.buybutton.store/card/v1.1/0xh7j/9350/Bohyme-229?action=checkout&open_in=popup&src=buy_button&ga_id=null"
          border="0"
          scrolling="no"
          horizontalscrolling="no"
          verticalscrolling="no"
          allowtransparency="true"
          width="100%"
          height="100%"
          style="overflow: hidden; border: none; width=100%; height=100%;">
        </iframe>
      </div>
    </div>
     -->

    <button @click="getAllPrds()"> Get All Products</button>
     <line-chart
      :chart-data="lineData"
      :options="{responsive: true, maintainAspectRatio: false}"
      :height="200"
      :width="100">
    </line-chart>
    <table>
      <tr>
        <th>Order ID</th>
        <th>Customer ID</th>
        <th>Total Revenue</th>
        <th>Status</th>
        <th>Payment Method </th>
        <th>Date Created </th>
        <th>Products</th>
      </tr>
      <tbody v-for="ord in orders">
        <tr >
          <td><span>{{ord.id}}</span></td>
          <td><span>{{ord.customer_id}}</span></td>
          <td><span style="color:#337ab7">{{Number(ord.total_inc_tax)}}</span></td>
          <td><span>{{ord.status}}</span></td>
          <td><span>{{ord.payment_method}}</span></td>
          <td><span>{{ord.date_created}}</span></td>
          <td><button @click="getListProductsByOrderID(ord, ord.id)"> Products</button></td>
        </tr>
        
          <div>
            <div v-for="prd in ord.custPrds">
              <div style="font-weight:bold font-size:10px;">{{prd.name}}</div> 
              <section style="margin-left:12px;">
                <div style="font-size:9px;">{{prd.base_price}} X {{prd.quantity}} = {{prd.base_total}}</div>
              <div style="font-size:9px;" v-for="opt in prd.product_options">{{opt.display_name}}: {{opt.display_value}} </div>
              </section>
            </div>
          </div>
        
      </tbody>
    </table>

    <div v-for="ord in orders"> 
      <pre> {{ord.custPrds}}</pre>
      <div v-for="prd in ord.custPrds">
        <div>{{prd.name}}</div> 
        <div>{{prd.base_price}} X {{prd.quantity}} = {{prd.base_total}}</div>
        <div style="margin-left:12px;" v-for="opt in prd.product_options">{{opt.display_name}}: {{opt.display_value}} </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import LineChart from '@/components/LineChart'
import { findIndex, filter } from 'lodash'

export default {
  name: 'brands',  
  components:{
     'line-chart': LineChart
  },
  data () {
    return {
      instance: null,
      lineData: null,
      orders: []
    }
  },
  methods: {
    getListProductsByOrderID : function (ord, orderId) {
      var vm = this;
      return vm.instance.request({
        method: 'get',
        headers: { 'Content-Type':'application/json' },
        data:{
          limit:100
        },
        url: '/getListProductsByOrderID/'+orderId
      }).then(function(response) {
        ord.custPrds = response.data
        vm.$forceUpdate()
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
        } console.log(error.config)})
    },
    getAllPrds: function(ord){
      var vm = this;
      vm.orders.forEach(ord => {
        vm.getListProductsByOrderID(ord, ord.id)
      })

    }
  },
  created () {
    
    var vm = this;
    var baseURL = 'http://192.241.138.85:3000/api';
    //var baseURL = 'http://localhost:3000/api';

    var instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'accept': 'application/json',
        'Content-Type':'application/json'
      }
    })
    vm.instance = instance

    var getOrderList = function () {
      return instance.request({
        method: 'post',
        headers: { 'Content-Type':'application/json' },
        data:{
          max_date_created:new Date().toISOString(),
          sort:"date_created:desc",
          limit: 100
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
          // http.ClientRequest in node.jsnp
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } console.log(error.config)})
    }
    // axios.request({
    //     method:'GET',
    //     url: 'http://127.0.0.1:8000/orders',
    //     headers: {'Access-Control-Allow-Origin': '*'}
    //     }).then(result => console.log(result))
    getOrderList().then( function(res) {
      vm.orders = res.data;
      vm.orders = filter(vm.orders, order => { return order.status != "Incomplete"})
      var total = vm.orders.map( x => Number(x.total_inc_tax))
      var ids = vm.orders.map(   x => x.id.toString())
      Promise.all([total, ids]).then( function(result) {
        vm.lineData = {
        labels : result[1],
          datasets : [{
            label: "Payment",
            backgroundColor: '#f87979',
            data: result[0]
          }]
        }
      })
    })


}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  td {
    margin-left:3px; margin-right:3px; padding:3px;
  }
  .container {
    text-align: left; padding: 10px;
  }
</style>
