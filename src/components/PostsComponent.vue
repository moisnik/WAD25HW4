<template>
  <!--create post card-->
  <div class="post-card" v-if="post">
    <div class="post-details">
      <a class="logo" href="#">
        <img
          src="/res/images/icon.png"
          alt="User logo"
          width="50"
          height="50"
        />
      </a>
        <p class="author">{{ post.Author }}</p>
        <p class="date">{{ post.formattedDate }}</p>
    </div>

    <!--If the post has an image then add it to post card -->
    <img
      v-if="post.Image"
      :src="'/' + post.Image"
      class="post-img"
      alt="Post image"
    />

    <p class="body">{{ post.Body }}</p>

    <!-- like button + like counter -->
    <i
      class="material-symbols-outlined"
      style="cursor: pointer;" 
      @click="likePostClick"
    >
    <!--icon ID, so it finds the thumbs up-->
      thumb_up
    </i>
    <span class = "likebutton">
      {{ post.likes }}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "PostsComponent",
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(["postById"]),
    post() {
      return this.postById(this.postId);
    }
  },
//mapMutations so that we can use the likePostClick() method
  methods: {
    ...mapMutations(["likePost"]),
    likePostClick() {
      this.likePost(this.postId);
    }
  }
};
</script>

<style>
.likebutton {
  margin-left: 4px;
}
</style>
