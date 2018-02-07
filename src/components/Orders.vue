<template>
  <div class="container">
    <h3>Order List</h3>
    <button @click="getAllPrds()"> Get All Products</button>
     <line-chart
      :chart-data="lineData"
      :options="{responsive: true, maintainAspectRatio: false}"
      :height="200"
      :width="100">
    </line-chart>

    <!-- <table>
      <tr class="f7">
        <th>Order ID</th>
        <th>Customer ID</th>
        <th>Total Revenue</th>
        <th>Status</th>
        <th>Payment Method </th>
        <th>Date Created </th>
        <th>Products</th>
        <th> IP </th>
        <th> Card Type </th>
        <th> Card ID </th>
      </tr>
      <tbody v-for="(ord, idx) in orders" :key="idx">
        <tr class="b bg-light-green" >
          <td><span class="f7">{{ord.id}}</span></td>
          <td><span class="f7">{{ord.customer_id}}</span></td>
          <td><span class="f7" style="color:#337ab7">{{Number(ord.total_inc_tax)}}</span></td>
          <td><span style="font-size:8px">{{ord.status}}</span></td>
          <td><span class="f7">{{ord.payment_method}}</span></td>
          <td><span style="font-size:8px">{{ord.date_created}}</span></td>
          <td><button @click="getListProductsByOrderID(ord, ord.id)"> Products</button></td>
          <td style="font-size:8px"> {{ord.ip_address}}</td>
          <td> {{ord.credit_card_type}}</td>
          <td style="font-size:8px"> {{ord.cart_id}}</td>
        </tr>
        
        <tr class="b bg-light-green" >
          <div>
            <div class="pa3" v-for="(prd, idx) in ord.custPrds" :key="idx">
              <div class="f6 b">[{{prd.product_id}}] {{prd.name}} - {{prd.weight}}</div>
              <section style="margin-left:12px;">
                <div class="f7">{{prd.base_price}} X {{prd.quantity}} = {{prd.base_total}}</div>
              <div class="f7" v-for="(opt, idx) in prd.product_options" :key="idx">{{opt.display_name}}: {{opt.display_value}} </div>
              </section>
            </div>
          </div>
        </tr>
      </tbody>
    </table> -->

    <div class="">
      <div class="grid-container f7 b center">
        <div>Order ID</div>
        <div>Customer ID</div>
        <div>Revenue</div>
        <div>Status</div>
        <div>Payment Medivod </div>
        <div>Date Created </div>
        <div>Products</div>
        <div> IP </div>
        <div> Card Type </div>
        <div> Card ID </div>
      </div>

      <section v-for="(ord, idx) in orders" :key="idx">
        <div class="grid-container b bg-light-green" >
          <div><span class="f7">{{ord.id}}</span></div>
          <div><span class="f7">{{ord.customer_id}}</span></div>
          <div><span class="f7" style="color:#337ab7">{{Number(ord.total_inc_tax)}}</span></div>
          <div><span style="font-size:8px">{{ord.status}}</span></div>
          <div><span class="f7">{{ord.payment_method}}</span></div>
          <div><span style="font-size:8px">{{ord.date_created}}</span></div>
          <div><button @click="getListProductsByOrderID(ord, ord.id)"> Products</button></div>
          <div style="font-size:8px"> {{ord.ip_address}}</div>
          <div class="f7"> {{ord.credit_card_type}}</div>
          <div style="font-size:8px"> {{ord.cart_id}}</div>
        </div>
        
        <div class="b bg-light-green" >
          <div>
            <div class="pa3" v-for="(prd, idx) in ord.custPrds" :key="idx">
              <div class="f6 b">[{{prd.product_id}}] {{prd.name}} - {{prd.weight}}</div>
              <section style="margin-left:12px;">
                <div class="f7">{{prd.base_price}} X {{prd.quantity}} = {{prd.base_total}}</div>
              <div class="f7" v-for="(opt, idx) in prd.product_options" :key="idx">{{opt.display_name}}: {{opt.display_value}} </div>
              </section>
            </div>
          </div>
        </div>
      </section>
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
          limit:20
        },
        url: '/getListProductsByOrderID/'+orderId
      }).then(function(response) {
        ord.custPrds = response.data
        vm.$forceUpdate()
        return(response)
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
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
    // var baseURL = 'http://138.197.126.0:3000/api';
    var baseURL = 'http://localhost:3000/api';
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
          limit: 200
        },
        url: '/listOrders'
      }).then(function(response) {
        return(response)
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        } console.log(error.config)})
    }

    getOrderList().then( function(res) {
      vm.orders = res.data;
      //vm.orders = filter(vm.orders, order => { return order.status != "Incomplete"})
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
<style scoped>
  td {
    margin-left:3px; margin-right:3px; padding:3px;
  }

  .container {
    text-align: left; padding: 10px;
  }

  .grid-container{
    display: grid; 
    grid-template-columns: 80px 80px 80px 140px 120px 80px 80px 80px 80px 230px;
    grid-template-rows: 25%;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }
</style>
