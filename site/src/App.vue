<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async exit() {
      await this.$store.dispatch('auth/logout')
      await this.$router.push({ name: 'login' })
    }
  }
}
</script>
<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <div class="font-medium text-left p-2">
          Bolltech TODO list
        </div>
        <div v-if="user" class="menu">
          {{ user.name }}
          <span class="menu__dropdown"></span>
          <div class="menu__content">
            <div @click="exit">
              <p>Sair</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div :class="`container ${$route.name}`">
      <router-view />
    </div>
  </div>
</template>

<style lang="postcss">
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

body {
  @apply flex bg-blue-100 text-base;

  font-family: Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

#app {
  @apply relative font-normal w-full flex justify-center;

  margin: 0 auto;
}

.container {
  @apply absolute p-4 w-full flex justify-center align-middle flex-col max-w-7xl top-20;

  &.login {
    top: 20rem;
  }
}

header {
  @apply z-50 max-h-full w-full p-5 flex place-items-center bg-white fixed top-0 shadow-lg;

  line-height: 1.5;

  & .wrapper {
    @apply flex items-center justify-between flex-wrap w-full h-full;

    & .menu {
      @apply cursor-pointer font-medium text-right p-2 flex justify-between gap-3;

      &__content {
        @apply hidden absolute bg-blue-100 text-xs w-20 mt-1.5 shadow-lg;

        z-index: 0;
        transform: translate(-3rem);
        padding: 5px 2px;

        div {
          @apply w-full p-3 flex justify-between;

          &:hover {
            @apply text-gray-500 font-black;
          }
        }
      }

      &__dropdown::after {
        @apply relative inline-block align-middle text-right w-2 h-2 right-1 top-0;

        content: '';
        border: solid #3f3f46;
        border-width: 0 2px 2px 0;
        padding: 3px;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }

      &:hover .menu__content {
        @apply grid top-6;
        left: 75%;
      }

      &:hover .menu__dropdown::after {
        top: -2px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
  }
}
</style>
