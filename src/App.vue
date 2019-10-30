<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" tag="span" style="cursor: pointer">Filmes</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field label="Pesquisa nome" v-model="procurarString"></v-text-field>
      </v-flex>
      <v-btn flat :disabled="!dadosDisponiveis" @click="pesquisarFilme">
        <span class="mr-2">Pesquisar</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      procurarString: ''
    };
  },
  methods: {
    pesquisarFilme() {
      this.$router.push('/procurar/' + this.procurarString)
      this.procurarString = ''
    }
  },
  computed: {
    dadosDisponiveis() {
      return this.procurarString !== null && this.procurarString !== ''
    }
  }
}
</script>
