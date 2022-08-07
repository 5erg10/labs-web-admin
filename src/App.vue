<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>

import Vue from 'vue'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import config from '@/config/credentials'
import '@/filters'

import Auth from '@/libs/auth'
import Storage from '@/libs/storage'
import Database from '@/libs/database'

import Alert from '@/components/Alert'

export default {
  name: 'App',
  data() {
		return {
			config
		}
	},
	created() {
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();

		let sdk = firebase.initializeApp(this.config.firebase);
		Vue.prototype.$auth = new Auth(sdk);
		Vue.prototype.$database = new Database(sdk);
	},
	components: {
		Alert
	}
}
</script>

<style>
  body::-webkit-scrollbar { width: 0 !important }
	body { -ms-overflow-style: none; }
	body { overflow: -moz-scrollbars-none; }

	.fade-enter-active, .fade-leave-active {
		transition-property: opacity;
		transition-duration: .25s;
	}

	.fade-enter-active {
		transition-delay: .25s;
	}

	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>
