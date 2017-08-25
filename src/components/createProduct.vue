<template>
  <div class="container">
    <input type="text" v-model="productId">
    <button @click="refreshPrd(productId)"> Refresh </button>
    <div style="width: 800px;">
      <h1>[{{prdInfo.id}}] {{prdInfo.name}}</h1>
    </div>
    <vue-tabs>
      <v-tab class="tab" title="None"></v-tab>
      <v-tab class="tab" title="Product Info">
        <pre v-if="optionShow" style="height:350px; overflow-y:scroll; font-size:9px; max-width: 450px;">{{prdInfo}}</pre>
        <h4>Basic Information</h4> Product Detail: <input type="checkbox" v-model="optionShow">
        <table v-if="tableReady">
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
                <td><div style="display:flex-inline;">
                    <img  v-for='image in prdImgs' :src='image.url_tiny' :key="image.id"/>    
                </div></td>
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
      <v-tab class="tab" title="Warning Message">
        <!-- Waring Message -->
        <pre>
          Warning
          If you delete an option value, the related variants will be automatically deleted
          
          [Option properties]
          radio_buttons, 
          rectangles, 
          dropdown, 
          product_list, 
          product_list_with_images, 
          swatch
        </pre>
      </v-tab>
    </vue-tabs>

    <!-- Product Information -->
    <div style="font-weight:bold">Options</div>

    <section style="padding: 10px; border:1px solid gray">
      <h4> Create Option </h4>
      <pre>{{crntOption}}</pre>
      <fieldset>
      <legend>Basic Information:</legend>
        <label>Name</label><input type="text" v-model="crntOption.name"> <br/>
        <label>Display Name</label><input type="text" v-model="crntOption.display_name"> <br/>
        <label>Type</label>
        <select v-on:change="onChangeCrntOptionType()" v-model="crntOption.type">
          <option selected> Select Option Type </option>
          <option v-for="typeElement in optionTypes" :key="typeElement.label" v-bind:value="typeElement.value">{{ typeElement.label }}</option>
        </select> <br/>
      </fieldset>
      

      <section v-if="crntOption.type == 'swatch'" class="flexcontainer">
        <div v-for="(ocn, idx) in optionsColor" :key="ocn" 
          @click="addOptionValue(ocn, optionsColorImg[idx])">
          <div class="ocn">{{ocn}}</div> 
          <img :src="optionsColorImg[idx]">
        </div>
      </section>

      <section v-if="crntOption.type == 'radio_buttons'" class="flexcontainer">
        <div v-for="(ocn, idx) in optionsLength" :key="ocn" 
          @click="addOptionValueLength(ocn, optionsColorImg[idx])">
          <div class="ocn">{{ocn}}</div> 
          <img :src="optionsColorImg[idx]">
        </div>
      </section>

      <section v-if="crntOption.type == 'radio_button'" class="flexcontainer">
        <!-- <input type="text" v-for="radioB in crntRadios" v-model="radioB" /> -->
      </section>

      <!-- <section v-if="crntOption.option_values.length > 1" style="border:1px solid gray;">
        <transition-group name="fade" tag="div" v-dragula="optionElement.option_values" drake="optionElement.option_values">
            <div v-if="item.type=='swatch'" class="item" v-for="(item, index) in crntOption.option_values" :key="item.id">
              <div>[{{item.id}}] </br>{{item.label}}</div>
              <img style="width:30px; height:30px;" :src="item.value_data.image_url">
            </div>  
        </transition-group>
        <transition-group name="fade" tag="div" v-dragula="optionElement.option_values" drake="optionElement.option_values">
          <div v-if="item.type!='radio_buttons'" class="item" v-for="(item, index) in optionElement.option_values" :key="item.id">
            <div>[{{item.id}}] </br>{{item.label}}</div>
          </div>  
        </transition-group>
      </section> -->
      <button @click="createOption()"> Create Color Option </button>
    </section>
    
    
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
    <hr />
    <h4>Variants</h4>
    <button @click="createVariants()"> Create Variants </button>
    <div v-for="(variant, idx) in variants" :key="idx">
      <div>
        <span>[{{idx}}] {{variant.id}} : </span>
        <span v-for="opt in variant.option_values">{{opt.label}}:</span>
        <span> Price:  <input v-model="variant.calculated_price" type="Number"></span>
        <span> Weight: <input v-model="variant.calculated_weight" type="Number"></span>
      </div>
    </div>
    <button @click="updateVariants(variants)"> update Variants</button>
    <p>You can craete variants after setting all your possible options</p>
    <div v-for="variant in variants" :key="variant.id"></div>
    <div>Price Rule</div>
    <hr />
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'
  import Multiselect from 'vue-multiselect'
  import { Vue2Dragula } from 'vue2-dragula'
  import { uniqBy } from 'lodash'

  export default {
    name: 'Create',
    components: {
      Multiselect: Multiselect,
    },
    beforeMount() {
    },
    data () {
      return {
        variants: [],
        optionsLength: ['8"', '10s', '10"','12"', '14"', '16"', '18"'],
        optionTypes: [{value: 'swatch', label:'Color'}, {value:'radio_buttons', label:'Length'}],
        crntOption: {name:"", display_name:"", option_values:[], sort_order:-1, type: ""},
        tableReady: false,
        productCols: [{labe:'ID', field:'id'},{labe:'Name', field:'name'},
          {labe:'SKU', field:'sku'},{labe:'Weight', field:'weight'},{labe:'Categories', field:'categories'},
          {labe:'Price', field:'price'},{labe:'Sale Price', field:'sale_price'},{labe:'Brand_id', field:'brand_id'}],
        prdImgs: [],
        optionShow: false,
        instance: {},
        optionCandidate: [],
        selected: null,
        optionsColor: [
          "1", "BLACK", "1B", "2", "3", "4", "6", "8", "27", "30", "33", "34", "44", "51", "60", "130", "144", "280", "350", "530", "613", "99J", "NATURAL", "NATURAL/DK", "T33", "T530",
          "P1B/27", "P1B/30", "P1B/33", "P4/30","T1B/27",,"T1B/BG"


          // "M99J530", "M430", "M2730",
          // "PBBLBK", "PBCARAMEL", "PBCINNAMON", "PBCOFFEE", "PBDKGN", "PBDKPU",
          // "KM27", "KM30", "KM530",
          // "TSGOLDEN", "TSMOCHA", 
          // "SPBLSILVER", "SPBRONZE", "SPGRAPE", "SPLATTE", "SPLEMON", "SPPHOENIX", "SPTRUFFLE", "SPNUTBROWN", "SPSUNRISE","SPBSCOTCH", 
          // "AQUABLUE", "ASHBLONDE", "BLBK", "BLSORBET", "BLUE", "BLUESILVER", "CLEAN", "DKPU", "FLAME", "GINGER", "GREY", "HONEYGLOW", "ICEBLUE", "ICEMINT", "ICEPETAL", "ICEPINK", "LAVENDER", "LILAC", "PETALPINK", "PINKGOLD", "PKSORBET", "PU", "PURPLE", "RAINBOW", "RED", "ROSEGOLD", "ROSEPINK", "SCOTCH", "SUNSET", "TEALBLUE", "TQSORBET", "VIOLET",
          // "OM17", "OM1B613RD", "OM1B99J530", "OM203", "OM239", "OM27", "OM270", "OM27613", "OM279", "OM30", "OM30GOLD", "OM30P", "OM430P", "OM530P", "OM613", "OM701", "OM71", "OM8642", "OM8642P", "OM8643", "OM8643P", "OM99J","OM99J530","OMBBRONZE","OMBG","OMHAZEL","OMBRONZE","OMBSANGRIA","OMBSUNFLOW","OMBSUNSET","OMBWINE","OMFIRERED","OMGREY","OMHAZEL","OMPOPPY","OMRD","OMROSE","OMSANGRIA","OMSUNFLOWE","OMSUNSET","OMTEALBLUE","OMTULIP","OMWINE","OP1B30","OP530J130","OP671","OP891","OP99530130","OPBLBK","OPBLONDE","OPDKPU",
          // "OTBLUESEA","OTCHERRY","OTCOCO","OTFOREST","OTGOLDIE","OTHAZEL","OTMERMAID","OTMOCHA","OTORCHID","OTPAPAYA","OTPIE","OTPINKGOLD","OTPLUM","OTROSEGOLD","OTROSEPINK","OTROYALB","OTSPICY","OTTIFFANY","OTTROPICAL","OT130","OT1B/30","OT27","OT30","OT4/30","OT530","OT613","OT99J","OTAQUABLUE","OTBLBK","OTBLUESILV","OTCOOLSILV","OTDKPU","OTEMERALD","OTFROZEN","OTMARINE","OTMARSALA","OTPURPLE","OTRD","OTSILVER","OTSILVERGR","OTTURQUOIS","OTDKGN","OH279","OH701",
          // "OF203","OF627613","OF671","OF701","OF8144613","OF891",
          // "OS1530","OS350530","OS71","OS99JPU",
          // "SOH239","SOH27GD30","SOH671","SOH995130","SOHWINE",
          // "SOP1448","SOP1B30","SOP1B99530","SOP239","SOP2730","SOP27GD30","SOP30144","SOP35030","SOP43027","SOP671","SOP995130","SOP99J350","SOPDKPU","SOPEMERALD","SOPSILVERG","SOPWINE",
          // "UN430","UNBLBK","UNDKGN","UNDKPU",
          // "P1/99J","P18/22","P1B/27","P1B/30","P1B/33","P1B/350","P1B/530","P1B/945","P1B/BG","P1B/RD","P27/30","P27/613","P30/144",
          // "P30/33","P4/27","P4/30","P4/33","P6701","P671",
          // "A107","A130","A207","A730","A740","F144","F1B/30","F1B/33","F1B/530","F2035","F207","F237","F27","F27/30","F27/613","F30","F33","F350","F4/30","F4335","F437","F530","F6751","F740","FBL/VI","FGD/613",
          // "NP1B_30","NP4_30",
          // "T99J","T1B30","T1BGREY","T144/613","T1530","T27","T27/613","T30","T33","T350","T39J","T4/27","T4230","T4233","T527","T530","T99J/350","TBLBK","TDKPU",
          // "TT27","TT30","TT33","TT530","TTBLBK","TTDKPU","TTSILVER",
          // "TSCRUNCH","TSMARLOT","TSNUDE","TSNUTMEG","TSTAFFY","TSTOFFEE",
          // "DE27","DE30","DE530","DE613","DEBL","DEPU","DERD",
          // "DN071","DN1B430","DN27GD30","DN350","DN530RD","DN99J530","DNBLBK","DNHONEY","DNSANDY",
          // "GF203","GF260","GF2828","GF701","GF8642","GF8643",
          // "H.PK",
          // "TF27/GD/30","TF350","TF350/GD","TF701","TF935099J",
          // "TP1B/27","TP1B/30","TP1B/33","TP1B/350","TP1B/530","TP27/613","TP30/144","TP4/27","TP4/30",
          // "BG","BL","GN","OR","PK","RD","YE"
        ],
        optionsColorImg: [
          //Black
          "http://www.modelmodelhair.com/Content/cache/ColorImage_835_crop_67_100_90_ffffff__13___000000__15__2369824__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1265_crop_67_100_90_ffffff__13___000000__15__2369824__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_857_crop_67_100_90_ffffff__13___000000__15__2356734__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_836_crop_67_100_90_ffffff__13___000000__15__2127093__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_837_crop_67_100_90_ffffff__13___000000__15__30160__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_838_crop_67_100_90_ffffff__13___000000__15__36963__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_839_crop_67_100_90_ffffff__13___000000__15__105299__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_840_crop_67_100_90_ffffff__13___000000__15__80625__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_843_crop_67_100_90_ffffff__13___000000__15__2955343__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_844_crop_67_100_90_ffffff__13___000000__15__3261813__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_845_crop_67_100_90_ffffff__13___000000__15__2450149__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_846_crop_67_100_90_ffffff__13___000000__15__93998__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_847_crop_67_100_90_ffffff__13___000000__15__100376__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_848_crop_67_100_90_ffffff__13___000000__15__92795__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_849_crop_67_100_90_ffffff__13___000000__15__64081__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_850_crop_67_100_90_ffffff__13___000000__15__271295__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_851_crop_67_100_90_ffffff__13___000000__15__104680__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_852_crop_67_100_90_ffffff__13___000000__15__95329__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_853_crop_67_100_90_ffffff__13___000000__15__2330477__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_854_crop_67_100_90_ffffff__13___000000__15__1853806__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_856_crop_67_100_90_ffffff__13___000000__15__3082762__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_859_crop_67_100_90_ffffff__13___000000__15__3446926__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_862_crop_67_100_90_ffffff__13___000000__15__36372__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_863_crop_67_100_90_ffffff__13___000000__15__30372__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1162_crop_67_100_90_ffffff__13___000000__15__3292962__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1170_crop_67_100_90_ffffff__13___000000__15__137923__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1065_crop_67_100_90_ffffff__13___000000__15__3093657__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1066_crop_67_100_90_ffffff__13___000000__15__99583__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1067_crop_67_100_90_ffffff__13___000000__15__2184838__0_0_0_0.jpg",
          "http://www.modelmodelhair.com/Content/cache/ColorImage_1084_crop_67_100_90_ffffff__13___000000__15__98429__0_0_0_0.jpg",
          "https://sep.yimg.com/ay/yhst-2519492840586/t1b-27-18.gif",
          "https://sep.yimg.com/ay/yhst-2519492840586/t1b-bg-17.gif"

        ],
        productObj: {
          type:"physical",
          sku:"",description:"",name:"", weight: 0, sale_price:0, categories:[],brand_id:0,
          reviews_rating_sum:0, is_free_shipping:false, is_featured:false, related_products:[],
          availability: "available"
        },
        options:[],
        variants:[],
        productId : '',      
        brands: [],
        brd: {},
        prdInfo:{},
        imgs: [],
        baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/categories/',
      }
    },
    methods:{
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
                url: 'updateVariants/'+variant.product_id+'/'+variant.id
          }).then(function(response) {
            console.log(response)
            return(response)
          })
        })
      },
      createVariants : function() {
        // when create Variants must be delete all variants 
        var vm = this;
        var targetId = vm.productId
        var count = 0;
        console.log(vm.options)
        
        if(vm.options.length == 2) {
          vm.options[0].option_values.forEach(op1 => {
            vm.options[1].option_values.forEach(op2 => {
              count++
              op1.option_id = vm.options[0].id
              op2.option_id = vm.options[1].id
              let variantBody = {
                "cost_price": 0,
                "sku":  targetId.toString()+count.toString(),
                "price": 0,
                "weight": 0,
                "image_url":"",
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
                url: 'createVariant/'+targetId
                  }).then(function(response) {
                    // console.log(response)
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
            })
          })
        } else if(vm.options.length == 1){
          vm.options[0].option_values.forEach(op1 => {
              count++
              op1.option_id = vm.options[0].id
              let variantBody = {
                "cost_price": 0,
                "sku":  targetId.toString() + String(count),
                "price": 0,
                "weight": 0,
                "image_url":"",
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
                data:variantBody,
                url: 'createVariant/'+targetId
                  }).then(function(response) {
                    
                    return(response)
                  }).catch(function (error) {
                    // if (error.response) {
                    // // The request was made and the server responded with a status code 
                    // // that falls out of the range of 2xx 
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // } else if (error.request) {
                    // // The request was made but no response was received 
                    // // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
                    // // http.ClientRequest in node.js 
                    // console.log(error.request);
                    // } else {
                    // // Something happened in setting up the request that triggered an Error 
                    // console.log('Error', error.message);
                    // }
                    // console.log(error.config);
                })
            })
        }
      },
      getVariantsByProductId: function(targetId){
        return this.instance.request({
        method: 'get',
        url: 'getVariantsByProductId/'+targetId
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
      },
      onChangeCrntOptionType: function(){
        var vm=this;
        if(vm.crntOption.type == 'swatch'){
          vm.crntOption.name = "Color"
          vm.crntOption.display_name = "Color"
        }
        else{
          vm.crntOption.name = "Length"
          vm.crntOption.display_name = "Length"
        }
        
      },
      updateOption: function(prdId, optionObj ){
        console.log(optionObj)
      },
      addOptionValueLength: function(label){
        var vm = this;
        var index = vm.crntOption.option_values.length
        var optionValue = {
          label:label,
          sort_order:index, 
          value_data: {},
        }
        vm.crntOption.option_values.push(optionValue)
        vm.crntOption.option_values = uniqBy(vm.crntOption.option_values, 'label')
      },
      addOptionValue: function(label, imgSrc){
        var vm = this;
        var index = vm.crntOption.option_values.length
        var optionValue = {
          label:label,
          sort_order:index, 
          value_data: {
            "image_url": imgSrc
          },
        }
        vm.crntOption.option_values.push(optionValue)
        vm.crntOption.option_values = uniqBy(vm.crntOption.option_values, 'label')
      },
      createOption: function(){
        var vm = this
        let body =vm.crntOption
        var baseURL = 'http://138.197.126.0:3000/api/'
        //var baseURL = 'http://localhost:3000/api/'
        var instance = axios.create({
          baseURL: baseURL,
          timeout: 10000,
          headers: {'Access-Control-Allow-Origin': '*'}
        })
        instance.request({
          method: 'post',
          data: body,
          url: 'createOption/'+vm.productId
          }).then(function(response) {
            return(response)
        })
      },
      
      deleteOptionById: function(prdId, optionId) {
        var vm = this;
        var baseURL = 'http://138.197.126.0:3000/api/'
        //var baseURL = 'http://localhost:3000/api/'
        var instance = axios.create({
          baseURL: baseURL,
          timeout: 10000,
          headers: {'Access-Control-Allow-Origin': '*'}
        })
        instance.request({
          method: 'delete',
          url: 'deleteOptionById/'+vm.productId+'/'+optionId
          }).then(function(response) {
            return(response)
        })  
      },

      getProductList: function (targetId) {
        return this.instance.request({
          method: 'get',
          url: 'getProductById/'+targetId
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
      },
      getOptions: function(targetId) {
        return this.instance.request({
        method: 'get',
        url: 'getOptions/'+targetId
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
      },
      refreshPrd: function(productId){
        var vm = this;
        vm.getOptions(productId).then(res => {
          vm.options = res.data.data
          vm.optionMeta = res.data.meta
        })
        vm.getProductList(productId).then(function(res){
          vm.prdImgs = res.data.imgs
          vm.prdInfo = res.data.info
          vm.tableReady = true;
        })
        vm.getVariantsByProductId(productId).then(function(res){
          vm.variants = res.data.data;
        })
      }
    },
    created () {
      const $service = this.$dragula.$service
      //$service.options('items', {direction: 'vertical'})
      //$service.eventBus.$on('drop', (args) => console.log(args)) //
      var vm = this;
      var targetId = 10629 //14825
      vm.productId = 10629; //14825
      var baseURL = 'http://138.197.126.0:3000/api/'
      //var baseURL = 'http://localhost:3000/api/'

      vm.instance = axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: {'Access-Control-Allow-Origin': '*'}
      })
      vm.getOptions(targetId).then(res => {
          vm.options = res.data.data
          vm.optionMeta = res.data.meta
      })
      vm.getProductList(targetId).then(function(res){
        vm.prdImgs = res.data.imgs
        vm.prdInfo = res.data.info
        vm.tableReady = true;
      })
      vm.getVariantsByProductId(targetId).then(function(res){
        vm.variants = res.data.data;
        vm.variants = _.orderBy(vm.variants, ["sku"])
        console.log(vm.variants)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .tab{
    padding: 10px; 
    background: rgba(128, 128, 128, 0.2);
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

  td{margin-left:3px; margin-right:3px; padding:3px;}
  .container{
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
  .flexcontainer .ocn { font-weight:bold; font-size:10px; text-align:center}
</style>
