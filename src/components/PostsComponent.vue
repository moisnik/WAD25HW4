<template>
  <!--create post card-->
  <div class="post-card" v-if="post" @click="openPost">
    <div class="post-details">
        <p class="date">{{ formatDate(post.date) }}</p>
    </div>

    <p class="body">{{ post.body }}</p>

  </div>
</template>

<script>
export default {
  name: "PostsComponent",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
    },
    openPost() { // on click --> open post
      this.$router.push({ name: "viewpost", params: { id: String(this.post.id) } });
    }
  }
};
</script>
