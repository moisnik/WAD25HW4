<template>
  <header class="topbar">
    <div class="topbar-inner">
      <nav class="nav">
        <!-- links to Sign up and home page-->
        <router-link to="/posts" class="nav-link">Home</router-link>
        <router-link to="/signup" class="nav-link">Sign up</router-link>
      </nav>

      <div class="profile">
          <img
            src="/res/images/icon.png"
            width="50"
            height="50"
            alt="Icon image"
            class="profile-photo"
          />
      </div>
    </div>
  </header>
</template>