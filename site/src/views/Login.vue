<template>
  <div class="wrapper">
    <div class="title">
      {{ hasLogin ? 'Login' : 'Register' }}
    </div>
    <div v-if="hasLogin" class="subtitle">
      Still no registration? <a href="#" @click="hasLogin = false">register here!</a>
    </div>
    <div v-else class="subtitle">
      <a href="#" @click="hasLogin = true">back to login</a>
    </div>
    <LoginFrom v-if="hasLogin" />
    <RegisterForm v-else @registered="onRegistered" />
  </div>
</template>
<script>
export default {
  name: 'LoginView',
  components: {
    LoginFrom: () => import('@/components/Login.vue'),
    RegisterForm: () => import('@/components/Register.vue')
  },
  data() {
    return {
      hasLogin: true
    }
  },
  methods: {
    onRegistered() {
      this.hasLogin = true
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped lang="postcss">
.wrapper {
  @apply rounded-xl shadow-lg border-t-2 p-4 md:my-6 mt-2 md:mt-4 md:mb-24 max-w-lg w-full mx-auto bg-white;
}
.title {
  @apply text-2xl font-bold text-green-500 text-center;
}
.subtitle {
  @apply mt-2 text-center text-gray-500 text-base;
}
</style>
