<template>
  <div class="home-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Feed :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">
          Popular tags
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed.vue';

export default {
  name: 'MdGlobalFeed',
  components: {
    Feed
  },
  data() {
    return {
      apiUrl: '/articles'
    };
  }
};
</script>
