<template>
  <div class="container">
    <!-- Refresh Button  -->
    <input class="f6" type="text" v-model="productId">
    <button class="f6" @click="refreshPrd(productId)"> Refresh </button>

    <div style="width: 800px;">
      <h1 class="f6">[{{prdInfo.id}}] {{prdInfo.name}}</h1>
    </div>
    <vue-tabs>
      
      <v-tab class="f6 tab" title="Product Info">
        <pre v-if="optionShow" style="height:350px; overflow-y:scroll; font-size:9px; max-width: 450px;">{{prdInfo}}</pre>
        <h4>Basic Information</h4> Product Detail: <input type="checkbox" v-model="optionShow">
        <table class="f7" v-if="tableReady">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Weight</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>Brand_id</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border:1px solid grey;">
              <td>{{prdInfo.id}}</td>
              <td>
                <div style="display:flex-inline;">
                  <img v-for='image in prdImgs' :src='image.url_tiny' :key="image.id" />
                </div>
              </td>
              <td>{{prdInfo.name}}</td>
              <td>{{prdInfo.sku}}</td>
              <td>{{prdInfo.weight}}</td>
              <td>{{prdInfo.categories}}</td>
              <td>{{prdInfo.price}}</td>
              <td>{{prdInfo.sale_price}}</td>
              <td>{{prdInfo.brand_id}}</td>
            </tr>
          </tbody>
        </table>
        <h4>Description</h4>
        <div style="border: 1px solid gray; padding: 8px;" v-html="prdInfo.description">
        </div>
      </v-tab>
      <v-tab class="f6 tab" title="Options">

        <pre v-if="optionShow" style="height:350px; overflow-y:scroll; font-size:9px; max-width: 450px;">{{options}}</pre>
        <section v-for="optionElement in options" :key="optionElement.id">
          <div style="font-weight:bold;">Possible Options, Option ID: {{optionElement.id}}, Product ID: {{optionElement.product_id}}</div>
          <transition-group name="fade" tag="div" v-dragula="optionElement.option_values" drake="optionElement.option_values">
            <div v-if="optionElement.type=='swatch'" class="item" v-for="(item, index) in optionElement.option_values" :key="item.id">
              <div>[{{item.id}}] </br>{{item.label}}</div>
              <img style="width:30px; height:30px;" :src="item.value_data.image_url" />
            </div>
            <div v-if="optionElement.type=='radio_buttons'" class="item" v-for="(item, index) in optionElement.option_values" :key="item.id">
              <div>[{{item.id}}] </br>{{item.label}}</div>
            </div>
          </transition-group>
          <button @click="deleteOptionById(optionElement.product_id, optionElement.id)">Delete </button>
          <button @click="updateOption(optionElement.product_id, optionElement)">Update </button>

          <pre v-if="optionShow" style="background:gray; height:350px; overflow-y:scroll; font-size:9px; max-width: 450px;">
              {{optionElement.option_values}}
            </pre>

          <pre v-if="optionShow" style="background:gray; height:350px; overflow-y:scroll; font-size:9px; max-width: 450px;">
              {{optionCandidate}}
            </pre>
        </section>

        <!-- Product Information -->
        <div class="f6 b">Options</div>
        <section style="padding: 10px; border:1px solid gray">
          <h4 class="f6 b"> Create Option </h4>
          <pre class="f7 b">{{crntOption}}</pre>

          <fieldset>
            <legend>Basic Information:</legend>
            <label>Name</label><input type="text" v-model="crntOption.name"> <br/>
            <label>Display Name</label><input type="text" v-model="crntOption.display_name"> <br/>
            <label>Type</label>
            <select v-on:change="onChangeCrntOptionType()" v-model="crntOption.type">
              <option selected> Select Option Type </option>
              <option v-for="typeElement in optionTypes" :key="typeElement.label" v-bind:value="typeElement.value">{{ typeElement.label }}</option>
            </select>
          </fieldset>

          <section v-if="crntOption.type == 'swatch'" class="flexcontainer">
            <div> Color option </div>
            <div v-for="(ocn, idx) in optColors" :key="ocn" @click="addOptionValue(ocn.name, ocn.imgSrc)">
              <div class="ocn">{{ocn.name}}</div>
              <img style="width:100px; height:100px;" :src="ocn.imgSrc">
            </div>
          </section>

          <section v-if="crntOption.type == 'radio_buttons'" class="flexcontainer">
            <div> Length option </div>
            <button v-for="(len, idx) in optionsLength" :key="idx" @click="addOptionValueLength(idx, len)">
              <div class="ocn">{{len}}</div>
              <!-- <img :src="ocn.imgSrc"> -->
            </button>

          </section>

          <!-- <section v-if="crntOption.type == 'radio_button'" class="flexcontainer">
              <input type="text" v-for="radioB in crntRadios" v-model="radioB" />
            </section> -->

          <!-- <section v-if="crntOption.option_values.length > 1" style="border:1px solid gray;">
              <transition-group name="fade" tag="div" v-dragula="optionElement.option_values" drake="optionElement.option_values">
                  <div v-if="item.type=='swatch'" class="item" v-for="(item, index) in crntOption.option_values" :key="item.id">
                    <div>[{{item.id}}] </br>{{item.label}}</div>
                    <img style="width:30px; height:30px;" :src="item.value_data.image_url">
                  </div>  
              </transition-group> -->

          <!-- <transition-group name="fade" tag="div" v-dragula="optionElement.option_values" drake="optionElement.option_values">
                <div v-if="item.type!='radio_buttons'" class="item" v-for="(item, index) in optionElement.option_values" :key="item.id">
                  <div>[{{item.id}}] </br>{{item.label}}</div>
                </div>  
              </transition-group> -->

        </section>

        <button @click="createOption()"> Create Color Option </button>
        </section>
      </v-tab>

      <v-tab class="f6 tab" title="Add Color Option">
        <div>Upload image</div>
        <a href="http://www.itsawig.com/color-chart" target="_blank"> it's a wig color chart</a>
        <div class="center">
          <!--:initial-image="initImg"-->
          <croppa v-model="myCroppa" :disable-drag-and-drop="false" :prevent-white-space="true" :width="130" :height="130" initial-size="cover" canvas-color="transparent"></croppa>
          <button @click="generateImage">Generate</button>
          <button @click="uploadColorImage">Upload</button>
          <input v-model="colorName" placeholder="edit me">
          <img id="genImg" class="output" :src="imgUrl">
        </div>
        <div>Color Name</div>
        <div>Brand Name</div>
      </v-tab>
      <v-tab class="f6 tab" title="Variants">
        <h4>Variants</h4>
        <button @click="createVariants()"> Create Variants </button>
        <div v-for="(variant, idx) in variants" :key="idx">
          <div>
            <span>[{{idx}}] {{variant.id}} : </span>
            <span v-for="(opt, idx) in variant.option_values" :key="idx">{{opt.label}}:</span>
            <span> Price: <input v-model="variant.calculated_price" type="Number"></span>
            <span> Weight: <input v-model="variant.calculated_weight" type="Number"></span>
          </div>
        </div>
        <button @click="updateVariants(variants)"> update Variants</button>
        <p>You can craete variants after setting all your possible options</p>
        <div v-for="variant in variants" :key="variant.id"></div>
        <div>Price Rule</div>
        <hr />
      </v-tab>

      <v-tab class="f6 tab" title="Sales Info">
        <div> Total Sold:  {{prdInfo.total_sold}}</div>
        <div> Total Revenue:  {{prdInfo.total_sold * prdInfo.calculated_price}}</div>
        <div> Total Views: {{prdInfo.view_count}}</div>
        <div> Retail Price: {{prdInfo.retail_price}}</div>
        <div> Calculated Price: {{prdInfo.calculated_price}}</div>
        <div> Preformance: {{prdInfo.total_sold/prdInfo.view_count * 100}}</div>
      </v-tab>

    </vue-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import { Vue2Dragula } from 'vue2-dragula'
import { uniqBy } from 'lodash'
import VueCoreImageUpload from 'vue-core-image-upload'
import fb from 'firebase'
import blobUtil from 'blob-util'

export default {
  name: 'Update',
  components: {
    'Multiselect': Multiselect,
    'vue-core-image-upload': VueCoreImageUpload
  },
  beforeMount() {
  },
  data() {
    return {
      productId: '',
      colorName: "",
      myCroppa: null,
      imgUrl: '',
      variants: [],
      optionsLength: ['8"', '10s', '10"', '12"', '14"', '16"', '18"', '20"', '22"'],
      optionTypes: [{ value: 'swatch', label: 'Color' }, { value: 'radio_buttons', label: 'Length' }],
      crntOption: { name: "", display_name: "", option_values: [], sort_order: -1, type: "" },
      tableReady: false,
      productCols: [{ labe: 'ID', field: 'id' }, { labe: 'Name', field: 'name' },
      { labe: 'SKU', field: 'sku' }, { labe: 'Weight', field: 'weight' }, { labe: 'Categories', field: 'categories' },
      { labe: 'Price', field: 'price' }, { labe: 'Sale Price', field: 'sale_price' }, { labe: 'Brand_id', field: 'brand_id' }],
      prdImgs: [],
      optionShow: false,
      instance: {},
      optionCandidate: [],
      selected: null,
      optionsColor: [],
      productObj: {
        type: "physical",
        sku: "", description: "", name: "", weight: 0, sale_price: 0, categories: [], brand_id: 0,
        reviews_rating_sum: 0, is_free_shipping: false, is_featured: false, related_products: [],
        availability: "available"
      },
      options: [],
      variants: [],
      productId: '',
      brands: [],
      brd: {},
      prdInfo: {},
      imgs: [],
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/categories/',
    }
  },
  methods: {
    uploadColorImage: function() {
      var vm = this;
      var storageRef = fb.storage().ref();
      console.log("upload Color: ", storageRef)
      var imagesRef = storageRef.child('bbl/color/' + vm.colorName + '.jpg');
      var img = document.getElementById('genImg');
      blobUtil.imgSrcToBlob(img.src).then(function(blob) {
        imagesRef.put(blob).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          var bblColors = fb.database().ref('bbl/colors')
          bblColors.push({ name: vm.colorName, imgSrc: snapshot.downloadURL })
        });
      }).catch(function(err) {
      });
    },
    generateImage: function() {
      let url = this.myCroppa.generateDataUrl()
      if (!url) {
        alert('no image')
        return
      }
      this.imgUrl = url
    },
    updateVariants: function(targetVariants) {
      var vm = this;
      console.log(targetVariants)
      targetVariants.forEach(variant => {
        let upodateObj = {
          calculated_price: variant.calculated_price,
          price: variant.calculated_price,
          cost_price: variant.calculated_price,
          calculated_weight: variant.calculated_weight,
          weight: variant.calculated_weight,
          image_url: variant.image_url
        }
        this.instance.request({
          method: 'put',
          data: upodateObj,
          url: 'updateVariants/' + variant.product_id + '/' + variant.id
        }).then(function(response) {
          console.log(response)
          return (response)
        })
      })
    },
    createVariants: function() {
      // when create Variants must be delete all variants 
      var vm = this;
      var targetId = vm.productId
      var count = 0;
      console.log(vm.options)

      if (vm.options.length == 2) {
        vm.options[0].option_values.forEach(op1 => {
          vm.options[1].option_values.forEach(op2 => {
            count++
            op1.option_id = vm.options[0].id
            op2.option_id = vm.options[1].id
            let variantBody = {
              "cost_price": 0,
              "sku": targetId.toString() + count.toString(),
              "price": 0,
              "weight": 0,
              "image_url": "",
              "purchasing_disabled": false,
              "purchasing_disabled_message": "",
              "upc": "",
              "inventory_level": 0,
              "inventory_warning_level": 0,
              "bin_picking_number": "",
              "product_id": targetId,
              "option_values": [
                op1, op2
              ]
            }

            var myJSONString = JSON.stringify(variantBody);
            variantBody = myJSONString.replace(/\\n/g, "\\n")
              .replace(/\\'/g, "\\'")
              .replace(/\\"/g, '\\"')
              .replace(/\\&/g, "\\&")
              .replace(/\\r/g, "\\r")
              .replace(/\\t/g, "\\t")
              .replace(/\\b/g, "\\b")
              .replace(/\\f/g, "\\f")

            variantBody = JSON.parse(variantBody)
            console.log(variantBody.sku)
            return this.instance.request({
              method: 'post',
              data: variantBody,
              url: 'createVariant/' + targetId
            }).then(function(response) {
              // console.log(response)
              return (response)
            }).catch(function(error) {
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
          })
        })
      } else if (vm.options.length == 1) {
        vm.options[0].option_values.forEach(op1 => {
          count++
          op1.option_id = vm.options[0].id
          let variantBody = {
            "cost_price": 0,
            "sku": targetId.toString() + String(count),
            "price": 0,
            "weight": 0,
            "image_url": "",
            "purchasing_disabled": false,
            "purchasing_disabled_message": "",
            "upc": "",
            "inventory_level": 0,
            "inventory_warning_level": 0,
            "bin_picking_number": "",
            "product_id": targetId,
            "option_values": [
              op1
            ]
          }
          return this.instance.request({
            method: 'post',
            data: variantBody,
            url: 'createVariant/' + targetId
          }).then(function(response) {
            return (response)
          }).catch(function(error) {
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {

            }
          })
        })
      }
    },
    getVariantsByProductId: function(targetId) {
      return this.instance.request({
        method: 'get',
        url: 'getVariantsByProductId/' + targetId
      }).then(function(response) {
        return (response)
      }).catch(function(error) {
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
    onChangeCrntOptionType: function() {
      var vm = this;
      if (vm.crntOption.type == 'swatch') {
        vm.crntOption.name = "Color"
        vm.crntOption.display_name = "Color"
      }
      else {
        vm.crntOption.name = "Length"
        vm.crntOption.display_name = "Length"
      }

    },
    updateOption: function(prdId, optionObj) {
      console.log(optionObj)
    },

    addOptionValueLength: function(idx, label) {
      var vm = this;
      console.log(vm.crntOption.option_values)
      var index = vm.crntOption.option_values.length
      var optionValue = {
        label: label,
        sort_order: index,
        value_data: {},
      }
      vm.crntOption.option_values.push(optionValue)
      vm.crntOption.option_values = uniqBy(vm.crntOption.option_values, 'label')
    },

    addOptionValue: function(label, imgSrc) {
      var vm = this;
      var index = vm.crntOption.option_values.length
      var optionValue = {
        label: label,
        sort_order: index,
        value_data: {
          "image_url": imgSrc
        },
      }
      vm.crntOption.option_values.push(optionValue)
      vm.crntOption.option_values = uniqBy(vm.crntOption.option_values, 'label')
    },

    createOption: function() {
      var vm = this
      let body = vm.crntOption
      // var baseURL = 'http://192.241.138.85:3000/api/'
      var baseURL = 'http://localhost:3000/api/'
      var instance = axios.create({
        baseURL: baseURL,
        timeout: 10000000,
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      instance.request({
        method: 'post',
        data: body,
        url: 'createOption/' + vm.productId
      }).then(function(response) {
        return (response)
      })
    },

    deleteOptionById: function(prdId, optionId) {
      var vm = this;
      // var baseURL = 'http://192.241.138.85:3000/api/'
      var baseURL = 'http://localhost:3000/api/'
      var instance = axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      instance.request({
        method: 'delete',
        url: 'deleteOptionById/' + vm.productId + '/' + optionId
      }).then(function(response) {
        return (response)
      })
    },

    getProductList: function(targetId) {
      return this.instance.request({
        method: 'get',
        url: 'getProductById/' + targetId
      }).then(function(response) {
        return (response)
      }).catch(function(error) {
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
    getOptions: function(targetId) {
      return this.instance.request({
        method: 'get',
        url: 'getOptions/' + targetId
      }).then(function(response) {
        return (response)
      }).catch(function(error) {
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
    refreshPrd: function(productId) {
      var vm = this;
      vm.getOptions(productId).then(res => {
        vm.options = res.data.data
        vm.optionMeta = res.data.meta
      })
      vm.getProductList(productId).then(function(res) {
        vm.prdImgs = res.data.imgs
        vm.prdInfo = res.data.info
        vm.tableReady = true;
      })
      vm.getVariantsByProductId(productId).then(function(res) {
        vm.variants = res.data.data;
      })
    }
  },
  created() {
    const $service = this.$dragula.$service
    //$service.options('items', {direction: 'vertical'})
    //$service.eventBus.$on('drop', (args) => console.log(args)) //
    var vm = this;
    var targetId = this.$route.params.id
    vm.productId = this.$route.params.id
    // var baseURL = 'http://192.241.138.85:3000/api/'
    var baseURL = 'http://localhost:3000/api/'


    var bblColors = fb.database().ref('bbl/colors')
    bblColors.on('value', function(snapshot) {
      vm.optColors = snapshot.val();
    });
    vm.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    vm.getOptions(targetId).then(res => {
      vm.options = res.data.data
      vm.optionMeta = res.data.meta
    })
    vm.getProductList(targetId).then(function(res) {
      vm.prdImgs = res.data.imgs
      vm.prdInfo = res.data.info
      vm.tableReady = true;
    })
    vm.getVariantsByProductId(targetId).then(function(res) {
      vm.variants = res.data.data;
      vm.variants = _.orderBy(vm.variants, ["sku"])
      // console.log(vm.variants)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tab {
  padding: 10px;
  background: rgba(128, 128, 128, 0.2);
}
.tab .title{
  font-size:12px;
}
.tab a{
  padding: 2px 0px;
}
.gu-mirror {
  position: absolute;
  pointer-events: none;
  transition: all 0s !important;
}

.item {
  display: inline-block;
  width: 80px;
  font-size: 10px;
  padding: 5px;
  border: 1px #aaa solid;
  cursor: move;
  background: white;
  transition: all 1s;
  text-align: center;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-active {
  position: absolute;
}

td {
  margin-left: 3px;
  margin-right: 3px;
  padding: 3px;
}

.container {
  text-align: left;
  padding: 10px;
}

.flexcontainer {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: left;
  /* You can set flex-wrap and flex-direction individually */
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  /* Or do it all in one line with flex flow */
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  /* tweak the where items line up on the row */
  /* valid values are: flex-start, flex-end, space-between, space-around, stretch */
  -webkit-align-content: flex-end;
  align-content: flex-end;
}

.flexcontainer .ocn {
  font-weight: bold;
  font-size: 10px;
  text-align: center
}
</style>
