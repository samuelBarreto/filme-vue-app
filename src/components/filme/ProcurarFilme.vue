<template>
  <v-container v-if="carregando">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else-if="noData">
    <div class="text-xs-center">
      <h2>Nenhum filme na API com {{this.name}}</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in filmeResponse" :key="index" mb-2>
        <v-card>
          <v-img :src="item.Poster" class="responsive" width="600" height="400" ></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{item.Title}}</h2>
              <div>Ano: {{item.Year}}</div>
              <div>Tipo: {{item.Type}}</div>
              <div>IMDB-id: {{item.imdbID}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="unicoFilme(item.imdbID)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilmeApi from '@/services/FilmeApi'

export default {
  props: ['name'],
  data() {
    return {
      filmeResponse: [],
      carregando: true,
      noData: false
    };
  },
  methods: {
    unicoFilme(id) {
      this.$router.push('/filme/' + id)
    },

    buscarResultado(value) {
      FilmeApi.buscarColecaoDeFilmes(value)
        .then(response => {
          if (response.Response === 'True') {
            this.filmeResponse = response.Search;
            this.carregando = false
            this.noData = false
          } else {
            this.noData = true
            this.carregando = false
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  mounted() {
    this.buscarResultado(this.name)
  },
  watch: {
    name(value) {
      this.buscarResultado(value)
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
.responsive {
  width: 50%;
  height: auto;
}
</style>
