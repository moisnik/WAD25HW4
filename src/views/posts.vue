<template>
  <div class="center-wrapper">
    <button class="button" @click="LogOut" :disabled="working">
      Log out
    </button>

    <!--making a postcomponent for every post (for-loop)-->
    <PostsComponent
      v-for="post in posts"
      :key="post.id"
      :post="post" 
    />

    <div class="bottombuttons">
    <button class="button" @click="AddPost" :disabled="working">
      Add post   
    </button>
    <button class="button" @click="DeleteAll" :disabled="working">
      Delete all
    </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostsComponent from "../components/PostsComponent.vue";

export default {
  name: "Posts",
  components: { PostsComponent },
  data() {
    return {
      posts: [],
      working: false,
      error: ""
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.working = true;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get("http://localhost:3000/api/posts", {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.posts = res.data;
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.working = false;
      }
    },
    async DeleteAll() {
      this.working = true;
      try {
        const token = localStorage.getItem('token');
        await axios.delete("http://localhost:3000/api/posts", {
          headers: { Authorization: 'Bearer ' + token }
        });
        await this.fetchPosts();
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.working = false;
      }
    },
    async AddPost(){
      this.working = true;
      try {
        this.$router.push({ name: "addpost" });
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.working = false;
      }
      
    },
    LogOut() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
<style>
.button {
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
}

.bottombuttons{
  width: 20%;
  display: flex;
  justify-content: space-between;
}
</style>