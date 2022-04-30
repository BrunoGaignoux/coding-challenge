<script setup>
import BaseNotification from '@/components/Notification.vue'
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <BaseNotification />
      </div>
    </header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="css">
@import '@/assets/base.css';

#app {
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-content: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    background-color: #d7e1ea;
    font-family: Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    line-height: 1.5rem;
  }

  #app {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
  }

  header {
    width: 100%;
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
