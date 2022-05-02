<template>
  <div class="login">
    <Input
        v-model="email"
        type="email"
        name="email"
        placeholder="Your email"
        required
    />
    <div class="password">
      <Input
          v-model="password"
          :type="`${showPassword ? 'text' : 'password'}`"
          name="password"
          placeholder="Your password"
          required
      />
      <span
          v-if="showPassword"
          class="icon"
          @click="showPassword = !showPassword"
      >
        <img src="@/assets/visibility_off.svg" alt="visibility_off" />
      </span>
      <span
          v-else
          class="icon"
          @click="showPassword = !showPassword"
      >
        <img src="@/assets/visibility.svg" alt="visibility" />
      </span>
    </div>
    <div class="actions">
      <Button label="Login" :disabled="!available" @click="login" />
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';
import Button from './Button.vue';

export default {
  name: 'LoginFrom',
  components: {
    Input,
    Button
  },
  computed: {
    available() {
      return this.email !== '' && this.password !== ''
    }
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.email = ''
        this.password = ''
        await this.$router.push({ name: 'home' })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.login {
  @apply flex flex-col justify-center py-4;
}
.password {
  @apply relative items-center;
}
.icon {
  @apply cursor-pointer absolute right-0 mx-2 top-3;
}
.actions {
  @apply flex justify-center align-middle mt-2;
}
</style>