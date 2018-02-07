<template>
    <section class="tl ph3">
        <div>Find items by weight</div>
        <button @click="getProductList(1, 5)">Find Items by Weight</button>
        <table class="f7 bg-light-green ma3">
        <div class="record" v-for="(prd, index) in products" :key="index" style="margin-bottom: 3px;">
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
            <hr /></div>
        </table>
    </section>
</template>
<script>
/* eslint-disable */
import fb from 'firebase'
import axios from 'axios'

export default {
    name: 'FindItems',
    data() {
        return {
            youtubeLinks: [],
            link: '',
            baseStoreUrl: 'https://tophairwigs.com/manage/products/',
            baseURL: 'http://localhost:3000/api/',
            title: '',
            maxWeight: 1,
            current_page: 1,
            products: [],
            pageMeta: {},
            instance: {}

        }
    },
    created() {
        var vm = this;
        var ref = fb.database().ref('social/youtube')
        ref.on('value', (snap) => {
            snap.forEach(function(item) {
                var itemVal = item.val();
                itemVal.key = item.key;
                vm.youtubeLinks.push(itemVal)
            });

        })
        vm.instance = axios.create({
            baseURL: vm.baseURL,
            timeout: 1000000,
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
    },
    methods: {
        getProductList: async function(pageNum, maxWeightCust) {
            var vm = this;
            if (maxWeightCust != 0)
                vm.maxWeight = maxWeightCust
            console.log(pageNum)
            
            vm.current_page = pageNum
            var defaultParam = {
                direction: 'desc',
                // sort: 'weight',
                page: vm.current_page,
                weight: vm.maxWeight,
                is_visible: 1,
                limit: 100,
                include: "images,variants "
            }
            if (vm.crntBrandId != '')
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
            }).catch(function(error) {
                if (error.response) {
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
        findWegiht: function(maxWeight) {
            if (maxWeight)
                vm.maxWeight = maxWeight

        },
        newContent: function(type, link, title) {
            if (type == 'youtube') {
                var ref = fb.database().ref('social/youtube')
                ref.push({ link: link, title: title })
            }
        },
        updateContent: function() {

        }
    }
}
</script>
<style></style>