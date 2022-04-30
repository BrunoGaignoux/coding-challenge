<template>
  <div class="login">
    <Input
        v-model="email"
        type="email"
        name="email"
        placeholder="Seu email"
        required
    />
    <div class="password">
      <Input
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
      <Button label="Entrar" :disabled="!available" />
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';
import Button from './Button.vue';

export default {
  name: 'Login',
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
  }
}
</script>

<style scoped lang="css">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 2rem 0;
}
.password {
  position: relative;
  align-items: center;
}
.icon {
  cursor: pointer;
  position: absolute;
  right: 0;
  margin: 0 1rem;
  top: 12px;
}
.actions {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 1rem;
}
</style>