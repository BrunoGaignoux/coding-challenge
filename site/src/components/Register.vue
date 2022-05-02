<template>
  <div class="register">
    <BaseInput
        v-model="name"
        name="name"
        placeholder="Seu nome"
        required
    />
    <BaseInput
        v-model="email"
        type="email"
        name="email"
        placeholder="Seu email"
        required
    />
    <div class="password">
      <BaseInput
          v-model="password"
          :type="`${showPassword ? 'text' : 'password'}`"
          name="password"
          placeholder="Sua senha"
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
      <BaseButton label="Create" :disabled="!available" @click="createNewUser" />
    </div>
  </div>
</template>

<script>
import BaseInput from './Input.vue';
import BaseButton from './Button.vue';

export default {
  name: 'RegisterForm',
  components: {
    BaseInput,
    BaseButton
  },
  computed: {
    available() {
      return this.name !== '' && this.email !== '' && this.password !== ''
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    async createNewUser() {
      try {
        await this.$store.dispatch('registerUser', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.name = ''
        this.email = ''
        this.password = ''
        this.$emit('registered')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.register {
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