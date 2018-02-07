<template>
	<div>
		<section>
			<div> Get Problematic List</div>
			<ul class="list grid-container">
				<li  v-for="(prob, idx) in problems.target" :key="idx">{{prob}}</li>
			</ul>

			<!-- products -->
			<table class="ma3 f7">
				<div class="pa2 record" v-for="(prd, index) in products" :key="index" style="margin-bottom: 3px; border: 2px solid black">
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

		</section>
		<section>
			<div></div>
		</section>
	</div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import LineChart from '@/components/LineChart'
import { findIndex, filter } from 'lodash'
import fb from 'firebase'

export default {
	name: 'diag',
	components: {
		'line-chart': LineChart
	},
	data() {
		return {
			instance: null,
			baseStoreUrl: 'https://tophairwigs.com/manage/products/',
			problems: [],
			products: [],
			baseURL: 'http://localhost:3000/api/'
		}
	},
	created(){
		var vm = this;
		vm.instance = axios.create({
      baseURL: vm.baseURL,
      timeout: 1000000,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
		var bblWatermark = fb.database().ref('bbl/problems/watermark')
		bblWatermark.on('value', (snap)=>{
			vm.problems =  snap.val()
			console.log(vm.problems)
			vm.getProblems(vm.problems.target)
		})


	},
	methods: {
		getProblems(targetObj){
			var vm = this;
			console.log(targetObj)
			targetObj.forEach((prd_id)=>{
				vm.instance.request({
          method: 'get',
          url: 'getProductById/' + prd_id
        }).then(function(res) {
          vm.products.push(res.data.info)
      	})
			})
			
		},
		updateProb(probObj){

		}, 
		deleteProb(probId){

		}

	}
}
</script>
<style>
.grid-container{
    display: grid; 
    grid-template-columns: 80px 80px 80px 140px 120px 80px 80px 80px 80px;
    grid-template-rows: 25%;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }
</style>