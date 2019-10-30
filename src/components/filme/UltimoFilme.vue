<template>
  <v-container v-if="carregando">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in respostaiIteira" :key="index" mb-2>
        <v-card>
          <v-img :src="item.Poster" aspect-ratio="1"></v-img>

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
  data() {
    return {
      respostaiIteira: [],
      carregando: true
    }
  },
  mounted() {
    FilmeApi.buscarColecaoDeFilmes('Marvel')
      .then(response => {
        this.respostaiIteira = response.Search
        this.carregando = false
      })
      .catch(error => {
        console.log(error)
      });
  },
  methods: {
    unicoFilme(id) {
      this.$router.push('/filme/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
