<!--SIIN VAJA MUUTA!!!!-->
<template>
  <main class="signup-page">
    <h1>Log in</h1>

    <form class="signup-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <label for="fullName">Full name</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          required
        />
      </div>

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

      <div class="form-row">
        <label for="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
        />
      </div>

      <p v-if="validationMessage" class="password-message">
        {{ validationMessage }}
      </p>

      <button type="submit">
        Create account
      </button>
    </form>
  </main>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      triedSubmit: false
    };
  },
  computed: {
    passwordProblems() {
      const value = this.password || "";
      const problems = [];

      if (!this.hasValidLength(value)) {
        problems.push("be 8–14 characters long");
      }

      if (!this.startsWithUppercase(value)) {
        problems.push("start with an uppercase letter");
      }

      if (!this.hasUppercase(value)) {
        problems.push("contain at least one uppercase letter");
      }

      if (!this.hasTwoLowercase(value)) {
        problems.push("contain at least two lowercase letters");
      }

      if (!this.hasDigit(value)) {
        problems.push("contain at least one digit");
      }

      if (!this.hasUnderscore(value)) {
        problems.push('include the character "_"');
      }

      return problems;
    },
    passwordValid() {
      return this.passwordProblems.length === 0;
    },
    passwordsMatch() {
      return (
        this.confirmPassword === "" ||
        this.confirmPassword === this.password
      );
    },
    formOk() {
      const hasName = this.fullName.trim().length > 0;
      const hasEmail = this.email.trim().length > 0;

      return (
        hasName &&
        hasEmail &&
        this.passwordValid &&
        this.passwordsMatch
      );
    },
    validationMessage() {
      if (!this.triedSubmit) {
        return "";
      }

      if (!this.passwordValid) {
        return "Password is not valid – it must " +
          this.passwordProblems.join(", ") +
          ".";
      }

      if (!this.passwordsMatch) {
        return "Password is not valid – password and confirmation do not match.";
      }

      return "";
    }
  },
  methods: {
    hasValidLength(password) {
      const length = password.length;

      return length >= 8 && length < 15;
    },
    startsWithUppercase(password) {
      if (!password) {
        return false;
      }

      const firstCharacter = password[0];

      return firstCharacter >= "A" && firstCharacter <= "Z";
    },
    hasUppercase(password) {
      for (const character of password) {
        const isUppercase =
          character >= "A" &&
          character <= "Z";

        if (isUppercase) {
          return true;
        }
      }

      return false;
    },
    hasTwoLowercase(password) {
      let lowercaseCount = 0;

      for (const character of password) {
        const isLowercase =
          character >= "a" &&
          character <= "z";

        if (isLowercase) {
          lowercaseCount += 1;
        }

        if (lowercaseCount >= 2) {
          return true;
        }
      }

      return false;
    },
    hasDigit(password) {
      for (const character of password) {
        const isDigit =
          character >= "0" &&
          character <= "9";

        if (isDigit) {
          return true;
        }
      }

      return false;
    },
    hasUnderscore(password) {
      const containsUnderscore = password.includes("_");

      return containsUnderscore;
    },
    handleSubmit() {
      this.triedSubmit = true;

      if (!this.formOk) {
        return;
      }

      alert("Signup successful (demo only).");

      this.fullName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.triedSubmit = false;
    }
  }
};
</script>

<style>
.signup-page {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  margin-bottom: 0.25rem;
}

.form-row input {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.password-message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #c0392b;
}

button[type="submit"] {
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  cursor: pointer;
}
</style>