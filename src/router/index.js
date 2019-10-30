import Vue from 'vue'
import VueRouter from 'vue-router'
import UltimoFilme from '@/components/filme/UltimoFilme'
import Filme from '@/components/filme/Filme'
import ProcurarFilme from '@/components/filme/ProcurarFilme'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'UltimoFilme',
      component: UltimoFilme
    },
    {
      path: '/filme/:id',
      name: 'Filme',
      props: true,
      component: Filme
    },
    {
      path: '/procurar/:name',
      name: 'ProcurarFilme',
      props: true,
      component: ProcurarFilme
    }
  ],
  mode: 'history'
})
