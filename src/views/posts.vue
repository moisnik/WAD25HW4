<template>
  <div class="center-wrapper">
    <button @click="resetAllLikes" class="reset-button">
      Reset all likes
    </button>

    <div v-if="error">{{ error }}</div>

    <PostsComponent
      v-for="post in posts"
      :key="post.Id"
      :post-id="post.Id" 
    />
  </div>
</template>

<script>
import PostsComponent from "../components/PostsComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "Posts",
  components: {
    PostsComponent
  },
  data() {
    return {
      error: null
    };
  },
  computed: {
    ...mapGetters(["allPosts"]),
    posts() {
      return this.allPosts;
    }
  },
  created() {
    this.$store
      .dispatch("fetchPosts")
      .catch(err => {
        this.error = err.toString();
      });
  },
  methods: {
    resetAllLikes() {
      this.$store.commit("resetLikes");
    }
  }
};
</script>

<style>
.reset-button {
  border: none;
  padding: 10px 10px;
  border-radius: 5px
}
.center-wrapper {
  margin-top: 0px;
}
</style>


