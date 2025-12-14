<template>
  <main class="signup-page">
    <h1>Log in</h1>

    <form class="signup-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
        />
      </div>

      <div class="form-row">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
        />
      </div>

      <p v-if="errorMessage" class="password-message">
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="working">
        Log in
      </button>

      <button type="button" @click="$router.push({ name: 'signup' })" :disabled="working">
        Create account
      </button>
    </form>
  </main>
</template>

<script>
import "/public/res/css/login.css";

export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      working: false
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      this.working = true;

      try {
        const API = 'http://localhost:3000';

        const res = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        let data = {};
        try { data = await res.json(); } catch (e) {}

        if (!res.ok) {
          this.errorMessage = data && data.error ? data.error : "Login failed";
          this.password = "";
          return;
        }

        localStorage.setItem('token', data.token);
        this.password = "";
        this.$router.push({ name: 'posts' });

      } catch (e) {
        this.errorMessage = "Network error";
      } finally {
        this.working = false;
      }
    }
  }
};
</script>