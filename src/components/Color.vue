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
  name: 'Color',
  data () {
    return {
      baseStoreUrl: 'https://store-0xh7j.mybigcommerce.com/manage/products/',
      baseURL :'',
      instance: {},
      products: [],
      crntBrandId: 949,
      brands:[],
      selected: ''
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

    var noResultsTemplate =
    '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

    var hitTemplate =
    '<div class="hit media">' +
        '<div class="media-left">' +
        '<div class="media-object" style="    background-size: cover; width: 125px; height: 125px; background-image: url(\'{{img}}\');"></div>' +
        '</div>' +
        '<div class="media-body">' +
        '<h4 class="media-heading">{{{_highlightResult.id}}} {{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</h4>' +
        '<p class="year">{{year}}</p><p class="genre">{{#genre}}<span class="badge">{{.}}</span> {{/genre}}</p>' +
        '</div>' +
    '</div>';
    // initialize hits widget
    searchInst.addWidget(
      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            empty: noResultsTemplate,
            item: hitTemplate
        },
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
section {
  background: $media-bg;
  min-height: 100%;
  z-index: 1;

  aside {
    position: fixed;
    top: $header-height + 14px;
    left: 0;
    bottom: 10px;
    width: 230px;
    background: $white;
    border-right: 1px solid $media-gray;

    .nav {
      margin: 0 20px;
      li {
        a {
          display: block;
          padding: 2px 10px;
          margin: 10px 0;
          &:hover {
            color: $white;
            background: $media-text-color;
          }
        }

        &.separator {
          height: 1px;
          background: $media-gray;
        }
      }
    }

    h5 {
      color: $media-red-dark;
      margin-left: 30px;
      text-transform: uppercase;
      font-size: 10px;
      margin-top: 20px;
    }

    .badge {
      font-size: .8em;
      background: #BBBBBB;
      position: relative;
      top: 1px;
    }

    #genres {
      label {
        display: block;
        cursor: pointer;
        padding: 4px 4px 4px 8px;
        font-weight: normal;
        font-size: .9em;
        margin: 0 0 -1px;
        &:hover {
          color: $white;
          background: $media-text-color;
        }
        input {
          display: none;
        }
      }
      .active {
        label {
          border: 1px solid $media-red-dark;
          margin-top: -1px;
        }
        .badge {
          background: $media-text-color;
        }
      }
    }

    #ratings {
      margin-left: 10px;
      .ais-stars-list--link {
        font-size: .9em;
        &:hover, &:active, &:focus {
          text-decoration: none;
        }
      }
      .ais-stars-list--count {
        font-size: 8px;
      }
      .ais-star-rating--item {
        margin-bottom: 6px;
      }
      .ais-star-rating--item__active a {
        color: $media-red-dark;
      }
    }

  }

  article {
    margin-top: $header-height + 14px;
    margin-bottom: 10px;
    margin-left: 237px;
    margin-right: 10px;
    padding: 10px 0;
    max-width: 100%;
    background: $white;
    box-shadow: 0 1px 2px $shadow-color;

    #stats {
      padding-right: 14px;
      font-size: .8em;
      line-height: 24px;
    }

    #hits {
      padding: 0 15px;
    }

    #pagination {
      .pagination a {
        background: $media-gray-light;
        padding: 3px 8px;
        color: $media-text-color;
        margin-right: 4px;
        &.active {
          border-color: darken($media-gray, 20%);
          background: $media-gray;
        }
        &:hover {
          border-color: darken($media-gray, 10%);
          background: darken($media-gray-light, 5%);
        }
      }
    }

    .hit {
      margin-bottom: 10px;
      height: 130px;
      border: 1px solid #F3F3F3;

      em {
        font-style: normal;
        background: $highlight-color;
        text-decoration: underline;
      }

      .media-object {
        height: 130px;
        width: 130px;
        overflow: hidden;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .media-heading {
        color: $media-blue;
        font-weight: normal;
        font-size: 18px;
      }
    }
  }

  .thank-you {
    font-size: .8em;
    margin-top: 18px;
    margin-left: 30px;
    a {
      color: #CE1312;
    }
  }
}

.ais-search-box--input {
  padding-left: 14px;
}

.genre, .year {
  margin: 12px 0;
}

.year {
  font-weight: bold;
}

.genre .badge {
  background: #BBBBBB;
}
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
