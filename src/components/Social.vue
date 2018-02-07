<template>
    <section class="tl ph3">
        <h2>Instagram</h2>
        
        <h2>Youtubue</h2>
        <div class="ma2" v-for="ylink in youtubeLinks" :key="ylink.key">
          <a class="code" :href="ylink.link" target="_blank">{{ylink.title}}</a>
        </div>
        <section>
          <span><b>Link: </b><input v-model="link" type="text"> </span>
          <span><b>Title: </b><input v-model="title" type="text"></span>
          <button @click="newContent('youtube', link, title)"> upload youtube </button>
        </section>

        <h2> Twitter </h2>
        <p> Styles </p>
    </section>
</template>
<script>
/* eslint-disable */
import fb from 'firebase'
export default {
  name: 'Social',
  data () {
    return {
      youtubeLinks: [],
      link:'',
      title:''
    }
  },
  created() {
    var vm = this;
    var ref = fb.database().ref('social/youtube')
    ref.on('value', (snap)=>{
      snap.forEach(function(item) {
        var itemVal = item.val();
        itemVal.key = item.key;
        vm.youtubeLinks.push(itemVal)
      });
      
    })
  },
  methods: {
    newContent: function(type, link, title){
      if(type=='youtube'){
        var ref = fb.database().ref('social/youtube')
        ref.push({link: link, title: title})
      }
    },
    updateContent: function(){
      
    }
  }
}
</script>
<style></style>