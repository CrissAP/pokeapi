new Vue({
    el: '#app',
    data() {
        return {
            pokemones: null,
            paginaAnterior: null,
            paginaActual: null,
            paginaSiguiente: null,
            detallesPokemon: '',
            especiePokemon: '',
            evolucionesPokemon: '',
        }
    },
    mounted() {
        this.ObtnerDatos('https://pokeapi.co/api/v2/pokemon/')
        let paginaA = this.PaginaActual()
        if (paginaA && paginaA > 0) {
            let offset = (paginaA - 1) * 20
            this.ObtnerDatos("https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20")
        } else {
            this.ObtnerDatos("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
        }
    },
    methods: {
        ObtnerDatos(url) {
            axios
                .get(url)
                .then(response => {
                    this.pokemones = response.data;
                    this.Paginacion(this.pokemones.count)
                })
        }
        ,
        Paginacion(total) {
            let canPaginas = Math.ceil(total / 20)
        },
        PaginaActual() {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            let pagina = parseInt(urlParams.get('page'));
            if (!(pagina && pagina > 0)) {
                pagina = 1
            }
            this.paginaAnterior = pagina - 1
            this.paginaActual = pagina
            this.paginaSiguiente = pagina + 1
            return pagina
        },
        ObtenerDatosPokemon(url) {
            this.detallesPokemon=''
            axios
                .get(url)
                .then(response => {
                    this.detallesPokemon = response.data;
                    this.ObtenerEspeciePokemon(this.detallesPokemon.name)
                })
        },
        ObtenerEspeciePokemon(name){
            axios
                .get('https://pokeapi.co/api/v2/pokemon-species/'+name)
                .then(response => {
                    this.especiePokemon = response.data;
                    this.ObtenerEvolucionesPokemon(this.especiePokemon.evolution_chain.url)
                })
        },
        ObtenerEvolucionesPokemon(url){
            axios
                .get(url)
                .then(response => {
                    this.evolucionesPokemon = response.data;
                })
        }
    },
})