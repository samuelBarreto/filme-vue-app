<template>
  <v-container v-if="carregando">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <v-card>
          <v-img :src="unicoFilme.Poster" class="responsive"></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">{{unicoFilme.Title}}-{{unicoFilme.Year}}</h2>
              <p>{{ unicoFilme.Plot}}</p>
              <h3>Atores:</h3>
              {{unicoFilme.Actors}}
              <h4>Prêmios:</h4>
              {{unicoFilme.Awards}}
              <p>Gênero: {{unicoFilme.Genre}}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green" @click="volta">volta</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-dialog v-model="dialogo" width="500">
            <v-btn slot="activator" color="green" dark>Ver classificações</v-btn>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Avaliações</v-card-title>
              <v-card-text>
                <table style="width:100%" border="1">
                  <tr>
                    <th>Fonte</th>
                    <th>Avaliações</th>
                  </tr>
                  <tr v-for="(rating,index) in this.classificacoes" :key="index">
                    <td align="center">{{classificacoes[index].Source}}</td>
                    <td align="center">
                      <v-rating :half-increments="true" :value="classificacoes[index].Value"></v-rating>
                    </td>
                  </tr>
                </table>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialogo = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilmeApi from "@/services/FilmeApi";
export default {
  props: ["id"],

  data() {
    return {
      unicoFilme: '',
      dialogo: false,
      carregando: true,
      classificacoes: ''
    }
  },

  mounted() {
    FilmeApi.buscarFilmeUnico(this.id)
      .then(response => {
        this.unicoFilme = response;
        this.classificacoes = this.unicoFilme.Ratings;
        this.classificacoes.forEach(function(element) {
          element.Value = parseFloat(element.Value.split(/\/|%/)[0]);
          element.Value =
            element.Value <= 10 ? element.Value / 2 : element.Value / 20;
        });
        this.carregando = false;
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    volta() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}

.responsive {
  
  height: auto;
}
</style>
