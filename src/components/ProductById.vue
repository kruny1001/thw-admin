<template>
  <div class="container">
    <h3>Product {{productId}}</h3>
    <div style="display:flex-inline;">
        <table>
          <div class="record">
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
              <td>
                <a target="_blank" v-bind:href="baseStoreUrl + prd.id +'/edit'">{{prd.id}}</a>
              </td>
              <td>
                <span>{{prd.name}}</span>
              </td>
              <td>${{prd.calculated_price}}</td>
              <td>({{prd.weight}} pound)</td>
              <td>{{prd.availability}}</td>
              <td>{{prd.view_count}}</td>
              <td>
                <a target="_blank" v-bind:href="'http://tophairwigs.com'+prd.custom_url.url">link</a>
              </td>
              <td>
                <button @click="openEditor(index)">Open</button>
              </td>
              <td>
                <router-link :to="{name: 'ProductById', params: {id: prd.id}}">Go to Detail</router-link>
              </td>
            </tr>
            <tr class="table-record">
              <th>Avail_desc</th>
              <th>Brand_id</th>
              <th>Search Keywords</th>
              <th>Sku</th>
              <th>upc</th>
              <th>total sold</th>
              <th>Reviews_count</th>
              <th>Reviews_rating_sum</th>
              <th>meta_desc</th>
              <th>Category</th>
            </tr>
            <tr class="table-record">
              <td>{{prd.availability_description}}</td>
              <td>{{prd.brand_id}}</td>
              <td>{{prd.search_keywords}}</td>
              <td>{{prd.sku}}</td>
              <td>{{prd.upc}}</td>
              <td>{{prd.total_sold}}</td>
              <td>{{prd.reviews_count}}</td>
              <td>{{prd.reviews_rating_sum}}</td>
              <td>{{prd.meta_description}}</td>
              <td>{{prd.categories}}</td>
            </tr>

            <div style="background: #cccccc; text-align:left; padding: 8px; border:1px solid black; border-radius:3px;">
              <div><router-link :to="`/update/${prd.id}`" >Product List</router-link></div>
              <h4> Bigcommerce Images </h4>
              <section style="width: 100%; display: -webkit-inline-box">
                <div v-for="(imgC,key) in prd.imgs" :key="key" style="margin: 8px;">
                  <div>
                    <div>{{imgC.id}}</div>
                    <div>
                      <img style="height:80px" v-if="imgC.url_standard" :src="imgC.url_standard" />
                      <button style="display:block;" @click="deletePrdImg(imgC.product_id, imgC.id)"> deletePrdImg </button>
                    </div>
                    
                  </div>
                </div>
              </section>
              <h4> Google Storage Images </h4>
              <section style="width: 100%; display: -webkit-inline-box">
                <div v-for="(imgFB,key) in prd.fbImgs" :key="key" style="margin: 8px;">
                  <div>
                    <img style="height:80px" v-if="imgFB.imgSrc" :src="imgFB.imgSrc" />
                    <button @click="createPrdImg(prd.id, imgFB.imgSrc)"> Create Prd Image</button>
                  </div>
                </div>
              </section>
              <div style="margin:9px; display: -webkit-inline-box">
                <div>
                  <div> Upload</div>
                  <croppa style="padding: 3px; margin: 3px; border: 1px solid black" 
                    v-model="prd.myCroppa" :disable-drag-and-drop="false" :prevent-white-space="false" :width="550" :height="550" 
                    :quality="2" initial-size="contain" canvas-color="white">
                  </croppa>
                </div>
                <div>
                  <div> Preview</div>
                  <img id="genImg" class="output" :src="imgUrl">
                </div>
              </div>
              <button @click="generateImage(prd.myCroppa, prd.imgUrl)">Generate</button>
              <button @click="uploadColorImage(prd)">Upload</button>
            </div>
            <!-- <div style="padding: 8px; text-align:left" v-html="prd.description"></div> -->
          </div>
        </table>
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
      prd: {},
      brd: {},
      baseStoreUrl: 'https://tophairwigs.com/manage/products/',
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
    var baseURL = 'http://localhost:3000/api/'
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
            console.log(response.data.data)
            return(response)
        }).catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
            
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error 
              console.log('Error', error.message);
            }
      })
    }
    getProductList().then(function(res){
      vm.brd = res.data
      vm.prd = vm.brd.info
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
table {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}

.table-record {
  font-size: 12px;
}

th {
  text-align: left;
  padding: 3px;
}

td {
  text-align: center;
  padding: 3px;
}

.output {
  border: 1px solid black;
  width: 250px;
  height: 250px;
}
</style>
