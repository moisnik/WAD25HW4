<template>
  <div class="center-wrapper">
    <div class="post-card">
      <h3>A post</h3>

      <br></br>
      <div v-if="post" class="card">

        <!-- edititav sisu -->
        <div class="edit-body">
          <p>Body</p>
          <textarea v-model="body" rows="1" class="textbox"></textarea>
        </div>
        <div class="buttons">
          <button class="button" @click="updatePost" :disabled="working">Update</button>
          <button class="button" @click="deletePost" :disabled="working">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  name: "PostView",
  data() {
    return{
      post: null,
      body: "",
      working:false,
      error: ""
    }
  },
  async created() {
    await this.fetchPost();
  },
  methods: {
    async fetchPost() {
      this.working = true;
      try {
        const token = localStorage.getItem('token');
        const id = this.$route.params.id;
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        this.post = res.data;
        this.body = res.data.body; // post body to the text area
      } catch (err) {
        this.error = "Could not load post.";
      } finally {
        this.working = false;
      }
    },
    async updatePost() {
      this.working = true;
      try {
        const token = localStorage.getItem('token');
        const id = this.$route.params.id;

        await axios.put(`http://localhost:3000/api/posts/${id}`, {
          body: this.body
        }, {
          headers: { Authorization: 'Bearer ' + token }
        });

        await this.fetchPost();
      } catch (err) {
        this.error = "Update failed.";
      } finally {
        this.working = false;
      }
    },

    async deletePost() {
      this.working = true;
      try {
        const token = localStorage.getItem('token');
        const id = this.$route.params.id;

        await axios.delete(`http://localhost:3000/api/posts/${id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });

        // after deleting the post go back to posts page
        this.$router.push({ name: "posts" });
      } catch (err) {
        this.error = "Delete failed.";
      } finally {
        this.working = false;
      }
    }
  }
};
</script>

<style scoped>
h3 {
  margin: auto;
}

.textbox { 
  width: 100%; 
  margin-left: 10px;
  border-radius: 10px; 
  padding: 15px;
}

.buttons{
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  margin: 0 auto;
}
.edit-body{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.post-card{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>