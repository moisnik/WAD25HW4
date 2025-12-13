import { createStore } from "vuex";

const store = createStore({
  state: {
    posts: []
  },
  getters: {
    allPosts(state) {
      return state.posts;
    },
    postById: state => id => state.posts.find(p => p.Id === id)
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    likePost(state, id) {
      const post = state.posts.find(p => p.Id === id);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
    resetLikes(state) {
      state.posts.forEach(p => {
        p.likes = 0;
      });
    }
  },
  // for formatting posts
  actions: {
    async fetchPosts({ commit }) {
      const res = await fetch("/res/json/posts.json");
      const data = await res.json();

      const processed = data.map(p => {
        const dateObj = new Date(p.Date);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
        return { ...p, formattedDate, likes: 0 };
      });

      commit("setPosts", processed);
    }
  }
});

export default store;