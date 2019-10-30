import axios from 'axios'

export default {

  buscarColecaoDeFilmes(name) {
    return axios.get('&s=' + name)
      .then(response => {
        return response.data
      })
  },
  buscarFilmeUnico(id) {
    return axios.get('&i=' + id)
      .then(response => {
        return response.data
      })
  }
}
