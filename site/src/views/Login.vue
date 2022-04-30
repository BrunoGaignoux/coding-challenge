<script setup>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
const hasLogin = true
</script>

<template>
  <div class="wrapper">
    <div class="title">
      {{ hasLogin ? 'Login' : 'Cadastro' }}
    </div>
    <div v-if="hasLogin" class="subtitle">
      Ainda sem cadastro? <a href="#" @click="hasLogin = false">registre-se aqui!</a>
    </div>
    <Login v-if="hasLogin" />
    <Register v-else />
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  max-width: 30.813rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5rem;
  padding: 2rem;
  border-top-width: 2px;
  border-radius: 0.75rem;
  box-shadow: 0 3px 6px #0000001A;
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  @media (min-width: 475px) {
    border-radius: 8px;
    border-style: none;
    margin-bottom: 6rem;
    margin-top: 1rem;
  }
}
.title {
  text-align: center;
  color: #16A34A;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
}
.subtitle {
  margin-top: 1rem;
  text-align: center;
  color: #3c3c3c;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>
