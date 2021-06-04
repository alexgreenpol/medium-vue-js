<template>
  <div>
    <div v-if="isLoading">Loading ...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">Add to favorites</div>
        </div>
        <router-link
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          Tags
        </router-link>
      </div>
      Pagination
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed';

export default {
  name: 'MdFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.feed.isLoading;
    },
    feed() {
      console.log(this.$store.state.feed.data);
      return this.$store.state.feed.data;
    },
    error() {
      return this.$store.state.feed.error;
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  }
};
</script>
