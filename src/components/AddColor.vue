<template>
  <div>
    <label>Makers</label>
    <select v-model="makerSelected">
        <option selected value="mm">Model Model</option>
        <option value="eq"> Equal </option>
    </select><br>
    <label>Color Name</label> <input type="text" v-model="crntColorObj.name"> <br>
    <label>ImgURL</label> <input type="text" v-model="crntColorObj.imgUrl"><br>
    <button @click="updateColor(makerSelected, crntColorObj)"> Add </button>
    <section class="flexcontainer">
        <div class="ocn" v-for="color in colors" :key="color.name">
            <div>{{color.name}}</div>
            <img style="max-width:67px;" :src="color.imgUrl" alt="">
        </div>
    </section>
  </div>
  
</template>

<script>
/* eslint-disable */
import fb from 'firebase'

export default {
    name: 'AddColor',
    beforeMount() {},
    data () {
        return {
            colors: [],
            makerSelected: "mm",
            colorRef: {},
            crntColorObj: {name:'', imgUrl:''}
        }
    },
    methods: {
        updateColor: function(maker, colorObj){
            console.log(maker, colorObj)
            var vm = this;
            if(maker == 'mm')
                vm.colorRef.child('mm/colors/'+colorObj.name).set({name: colorObj.name, imgUrl: colorObj.imgUrl})
            else {
                vm.colorRef.child('mm/colors'+colorObj.name).set({name: colorObj.name, imgUrl: colorObj.imgUrl})
            }
        }
    },
    created(){
        var config = {
            apiKey: "AIzaSyBNiqf21f9wbn6Pnv2kKhhvFv6SM7Z5VpE",
            authDomain: "bbl-dev.firebaseapp.com",
            databaseURL: "https://bbl-dev.firebaseio.com",
            projectId: "bbl-dev",
            storageBucket: "bbl-dev.appspot.com",
            messagingSenderId: "713823656240"
        };
        fb.initializeApp(config);

        var ref = fb.database().ref('color')
        this.colorRef = ref

        var vm = this;
        ref.child('mm/colors').once('value', snap => {
            vm.colors = snap.val()
            console.log(vm.colors)
        })
    }
}
</script>

<style>
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
