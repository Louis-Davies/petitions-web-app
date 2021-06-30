import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import PetitionDetails from './PetitionDetails';
import MyPetitions from './MyPetitions';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Create from './Create';
import EditPetition from './EditPetition';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import SocialSharing from 'vue-social-sharing';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from 'vuelidate';
import VueCookies from 'vue-cookies';
import {EventBus} from './event-bus'

Vue.prototype.$eventBus = EventBus;

Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(SocialSharing);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/petitions",
    component: Petitions
  },
  {
    path: "/petitions/startPetition",
    component: Create
  },
  {
    path: "/petitions/myPetitions",
    component: MyPetitions
  },
  {
    path: "/petitions/:petitionId",
    component: PetitionDetails
  },
  {
    path: "/petitions/:petitionId/edit",
    component: EditPetition
  },
  {
    path: "/MyProfile",
    component: MyProfile
  },
  {
    path: "/MyProfile/edit",
    component: EditProfile
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
