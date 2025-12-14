<template>
  <div class="center-wrapper">
    <div class="post-card">
      <h3>Add post</h3>

      <br></br>
      <div class="card">

        <!-- edititav sisu -->
        <div class="edit-body">
          <p>Body</p>
          <textarea v-model="body" rows="1" class="textbox"></textarea>
        </div>
        <div class="buttons">
          <button class="button" @click="addPost" :disabled="working">Add</button>
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
  methods: {
    async addPost() {
      this.working = true;
      try {
        await axios.post(`http://localhost:3000/api/posts`, {
          body: this.body});
        this.$router.push({ name: "posts" });
      } catch (err) {
        this.error = "Could not add post.";
      } finally {
        this.working = false;
      }
    },
  }
}
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
  width: 100%;
  display: flex;
  justify-content: center;   
  padding-top: 20px;
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
.button {
 background-color: rgb(216, 216, 216);
}

</style>