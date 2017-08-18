<template>
  <div class="container">
    <h3>Product List</h3>
    <div id="current-refined-values">
      <!-- CurrentRefinedValues widget will appear here -->
    </div>
    <div id="clear-all">
      <!-- ClearAll widget will appear here -->
    </div>
    <div id="refinement-list">
      <!-- RefinementList widget will appear here -->
    </div>
    <div id="search-box">
      <!-- SearchBox widget will appear here -->
    </div>
    <div id="hits">
      <!-- Hits widget will appear here -->
    </div>
    <div id="pagination">
      <!-- Pagination widget will appear here -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Router from '../router'
import instantsearch from 'instantsearch.js'

export default {
  name: 'Products',
  data () {
    return {
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/',
      baseURL :'',
      instance: {},
      products: [],
      crntBrandId: 949,
      brands:[],
      selected: '',
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  methods: {
  },
  mounted(){
    const searchInst = instantsearch({
      appId: '00N84365S5',
      apiKey: '3dbe61e6a86b9ba0eed3f941dcd637a4',
      indexName: 'products',
      urlSync: true
    })

    searchInst.addWidget(
      instantsearch.widgets.currentRefinedValues({
        container: '#current-refined-values',
        // This widget can also contain a clear all link to remove all filters,
        // we disable it in this example since we use `clearAll` widget on its own.
        clearAll: false
      })
    );

    // initialize clearAll
    searchInst.addWidget(
      instantsearch.widgets.clearAll({
        container: '#clear-all',
        templates: {
          link: 'Reset everything'
        },
        autoHideContainer: false
      })
    );

    // initialize pagination
    searchInst.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination',
        maxPages: 20,
        // default is to scroll to 'body', here we disable this behavior
        scrollTo: false
      })
    );
    // initialize RefinementList
    searchInst.addWidget(
      instantsearch.widgets.refinementList({
        container: '#refinement-list',
        attributeName: 'category'
      })
    );

    searchInst.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for products'
      })
    );

    // initialize hits widget
    searchInst.addWidget(
      instantsearch.widgets.hits({
        container: '#hits'
      })
    );

    searchInst.start()
  },
  created () { 
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
