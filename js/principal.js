new Vue({
    el: '#app',
    data () {
      return {
        data: null
      }
    },
    mounted () {
      axios
        .get('https://pokeapi.co/api/v2/pokemon/')
        .then(response => (this.info = response))
    }
  })