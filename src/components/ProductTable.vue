<template>
  <div class="container">
    <h3>Product List</h3>
    <section class="ma3" style="text-align:left">
      <button @click="toggleBrandList()"> Open Brands </button>
      <button @click="getProductList(pageMeta.pagination.current_page+1, null)"> Next Page </button>
      
      <section v-if="showBrandList">
        <ul class="list f7" style="display: inline-block;margin: 0 10px;">
          <li style="width:180px;" v-for="(brand, idx) in brands" :key="idx" @click="getProductList(1, brand.id)">{{brand.name}}</li>
        </ul>
      </section>

    </section>
    <section class="tl pl3" v-if="pageMeta">
      <div>Total: {{pageMeta.pagination.total}}</div>
      <div>Crnt Page: {{pageMeta.pagination.current_page}}</div>
      <div>Total Page: {{pageMeta.pagination.total_pages}}</div>
      <!-- <div>{{pageMeta.links.next}}</div> -->
    </section>
    <pre class="ma3 f6" style="text-align:left;">{{pageMeta}}</pre>
    <table class="ma3">
      <div class="record" v-for="(prd, index) in products" :key="index" style="margin-bottom: 3px; border: 1px solid black">
        <tr class="table-record">
          <th>Index</th>
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
          <td>{{index}}</td>
          <td>
            <a target="_blank" v-bind:href="baseStoreUrl + prd.id +'/edit'">{{prd.id}}</a>
          </td>
          <td>
            <span>{{prd.name}}</span>
          </td>
          <td>${{prd.calculated_price}}</td>
          <td>{{prd.weight}}</td>
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
        <div v-if="!prd.imgTool" style="display: -webkit-box; background: #fff; text-align:left; padding-left: 8px;">
            <div v-for="(imgC,key) in prd.images" :key="key" style="margin: 8px;">
                <div>
                  <img v-if="imgC.is_thumbnail" style="border: 2px solid red; height:44px;" :src="imgC.url_tiny" />
                  <img v-if="!imgC.is_thumbnail" style="border: 2px solid black; height:44px;" :src="imgC.url_tiny" />
                </div>
            </div>
        </div>
        <hr />
        <div style="font-size:9px">
          <div class="ma2 tl f6 b"> Issues </div>
          <div class="ma2 errMsg" v-if="prd.images.length == 0"> "<b>Image</b> is not available" </div>
          <div class="ma2 errMsg" v-if="prd.brand_id == 0"> "<b>Brand</b> is not available" </div>
          <div class="ma2 errMsg" v-if="prd.gtin == ''"> "<b>GTIN</b> is not available" </div>
          <div class="ma2 errMsg" v-if="prd.sku == ''"> "<b>SKU</b> is not available" </div>
          <div class="ma2 errMsg" v-if="prd.upc == ''"> "<b>UPC</b> is not available" </div>
        </div>
        <div class="ma2" style="text-align:left;">
          <label>weight: </label><input type="number" v-model="prd.weight" placeholder="edit name">
          <div>{{ prd.weight*16}}o.z</div>
          <button @click="updateProduct(prd.id, prd)"> Update</button>
          <hr />
          <button class="f6" v-if="!prd.imgTool" @click="toggle(index)"> open image tool </button>
          <button class="f6" v-if="prd.imgTool" @click="toggle(index)"> close image tool </button>
          <button class="f6" @click="disableProduct(index)"> Disable Product </button>
          <button class="f6" @click="updateGTIN(index)"> update GTIN Product </button>
          <button class="f6" @click="toggle(index)"> Disable Product </button>
          <button class="f6" @click="toggle(index)"> Enable Product </button>
        </div>
        <div v-if="prd.imgTool" style="background: #cccccc; text-align:left; padding: 8px; border:1px solid black; border-radius:3px;">
          <div><router-link :to="`/update/${prd.id}`" >Product List</router-link></div>
          <h4> Bigcommerce Images </h4>
          <section style="width: 100%; display: -webkit-inline-box">
            <div v-for="(imgC,key) in prd.images" :key="key" style="margin: 8px;">
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
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import auto from 'async/auto'
import Multiselect from 'vue-multiselect'
import VueCoreImageUpload from 'vue-core-image-upload'
import fb from 'firebase'
import blobUtil from 'blob-util'
var gtin = require('gtin-generator')

export default {
  name: 'ProductTables',
  components: {
    Multiselect: Multiselect,
    'vue-core-image-upload': VueCoreImageUpload
  },
  data() {
    return {
      baseStoreUrl: 'https://tophairwigs.com/manage/products/',
      myCroppa: null,
      current_page: 1,
      brands:[],
      crntBrandId: '',
      baseURL: '',
      showBrandList: false,
      imgUrl: '',
      instance: {},
      products: [],
      brands: [],
      pageMeta: {},
      selected: '',
      imgUrl: '',
      colorName: ""
    }
  },
  created() {
    var vm = this;
    vm.baseURL = 'http://localhost:3000/api/'
    vm.instance = axios.create({
      baseURL: vm.baseURL,
      timeout: 1000000,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    this.getProductList(1)
    this.getBrandList()
  },
  mounted() {
    
  },
  methods: {
    toggleBrandList: function(){
      this.showBrandList = !this.showBrandList
    },
    updateGTIN : function(index){
      var vm = this
      var product_id = vm.products[index].id
      vm.instance.request({
        method: 'put',
        data: {
          gtin: gtin.getGTIN().toString()
        },
        url: 'updateProduct/'+product_id
      }).then((res)=>{
        console.log(res)
      })
    },
    updateProduct: function(productId, productObj) {
      var vm = this;
      let upodateObj = productObj
      this.instance.request({
        method: 'put',
        data: upodateObj,
        url: 'updateProduct/' + productId
      }).then(function(response) {
        console.log(response)
        return (response)
      })
    },
    getBrandList: function() {
      var vm = this;
      return vm.instance.request({
        method: 'get',
        url: 'brandList'
      }).then(function(res) {
        //console.log(response.data.data)
        console.log(res)
        vm.brands = res.data.data
      }).catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    },
    disableProduct: function(index){
      //call api 
      var vm = this
      var product_id = vm.products[index].id
      vm.instance.request({
        method: 'put',
        data: {
          is_visible: false
        },
        url: 'updateProduct/'+product_id
      }).then((res)=>{
        console.log(res)
      })

    },
    generateImage: function(croppa, destImg) {
      let url = croppa.generateDataUrl()
      console.log(croppa)
      if (!url) {
        alert('no image')
        return
      }
      this.imgUrl = url
    },

    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    deletePrdImg: function(prdId, imgId){
      var vm = this;
      vm.instance.request({
        method: 'get',
        url: 'deletePrdImg/'+ prdId+'/'+imgId
      }).then(function(res) {
        vm.getProductList()
      })
    },
    createPrdImg: function(prdId, imgUrl){
      var imgBody ={
        "product_id": prdId,
        "image_url": imgUrl
      }
      this.instance.request({
        method: 'post',
        data:imgBody,
        url: 'createPrdImg'
      }).then(function(response) {
        vm.getProductImgs()
      }).catch(function (error) {

      })
    },
    uploadColorImage: function(imgInfo) {
      var vm = this;
      var storageRef = fb.storage().ref()
      var imagesRef = storageRef.child('bbl/prds/' + imgInfo.id + '/' + vm.guid() + '.jpg')
      imgInfo.myCroppa.generateBlob((blob) => {
        console.log(blob)
        imagesRef.put(blob).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          var bblColors = fb.database().ref('bbl/prds/' + imgInfo.id)
          bblColors.push({ imgSrc: snapshot.downloadURL})
          vm.getProductList()
        })
      }, 'image/jpeg', 1)
      // bigcommerce API 
    },

    refresh: function() {
      var vm = this;
      var temp = vm.products
      vm.products = []
      vm.products = temp
    },
    toggle: function(index){
      this.products[index].imgTool = !this.products[index].imgTool
      this.refresh()
    },
    toggleVisibility: function(index){

    },
    deleteProduct: function(id){

    },
    getProductList: async function(pageNum, brand_id) {
      console.log(pageNum)
      var vm = this;
      vm.current_page = pageNum
      if(brand_id)
        vm.crntBrandId = brand_id
      var defaultParam = {
          // direction: 'desc',
          sort : 'id',
      
		  	  page:vm.current_page,
		  	  is_visible:1,
		  	  limit: 100,
          include: "images"
      }
      if(vm.crntBrandId != '')
        defaultParam.brand_id = vm.crntBrandId
      vm.instance.request({
        method: 'get',
        params: defaultParam,
        url: 'productList/'
      }).then(function(res) {
        vm.products = res.data.data
        vm.pageMeta = res.data.meta
        vm.current_page = vm.pageMeta.current_page

        vm.products.forEach((prd, idx) => {
          vm.products[idx].fbImgs = []
          var fbRef = fb.database().ref('bbl/prds/' + prd.id)
          fbRef.on('value', (snapshot) => {
            snapshot.forEach(function(data) {
              vm.products[idx].fbImgs.push(data.val())
            });
          })
        })
      })
    },

    getProductImgs: function() {
      var vm = this;
      vm.products.forEach((prd, idx) => {
        vm.products[idx].fbImgs = []
        var fbRef = fb.database().ref('bbl/prds/' + prd.id)
        fbRef.on('value', (snapshot) => {
          snapshot.forEach(function(data) {
            vm.products[idx].fbImgs.push(data.val())
          });
        })
        vm.instance.request({
          method: 'get',
          url: 'getProductById/' + prd.id
        }).then(function(res) {
          vm.products[idx].imgs = res.data.imgs
          vm.refresh()
        })
      })
    }
  }
}

</script>
<style>
.container{
  margin-left: auto;
  margin-right: auto;
  max-width: 1240px;
}

table {
  margin-left: auto;
  margin-right: auto;
}

.table-record {
  font-size: 12px;
}

th {
  font-size: 9px;
  text-align: center;
  border: 1px solid black;
  padding: 3px;
}

td {
  font-size: 9px;
  text-align: center;
  border: 1px solid black;
  padding: 3px;
}

.output {
  border: 1px solid black;
  width: 250px;
  height: 250px;
}

.record{
  margin-bottom: 14px;
}

.errMsg{
  font-size: 8px;
  color: red;
  text-align: left;
}
</style>