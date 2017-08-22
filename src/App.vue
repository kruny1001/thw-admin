<template>
  <div id="app">
    <header>
      <router-link to="/"><span>Top Hair Wigs Admin</span></router-link>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header {
  margin: 0;
  height: 32px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
    display: block;
    position: relative;
    font-size: 12px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 9px;
    color:white;
    font-weight: bold;
}
</style>
