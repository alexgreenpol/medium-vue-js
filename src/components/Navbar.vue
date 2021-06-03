<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand ng-binding" :to="{name: 'home'}"
        >medium</router-link
      >

      <template v-if="isAnonymous">
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{name: 'home'}"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'login'}"
            >
              Sign In
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'register'}"
            >
              Sign Up
            </router-link>
          </li>
        </ul>
      </template>

      <template v-if="isLoggedIn">
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{name: 'home'}"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'createArticle'}"
            >
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'settings'}"
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
            >
              <img
                class="user-pic"
                :src="currentUser.image"
                alt="avatar"
                v-if="currentUser.image"
              />&nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </ul>
      </template>
    </div>
  </nav>
</template>

<script>
import {getterTypes} from '@/store/modules/auth';
export default {
  name: 'MdNavbar',
  computed: {
    currentUser() {
      return this.$store.getters[getterTypes.currentUser];
    },
    isLoggedIn() {
      return this.$store.getters[getterTypes.isLoggedIn];
    },
    isAnonymous() {
      return this.$store.getters[getterTypes.isAnonymous];
    }
  }
};
</script>
