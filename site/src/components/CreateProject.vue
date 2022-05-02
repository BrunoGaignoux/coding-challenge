<template>
  <div class="create">
    <div class="title">
      Create new project
    </div>
    <Input
        v-model="name"
        type="email"
        name="email"
        placeholder="Project name"
        required
    />
    <div class="actions">
      <Button label="Create project" :disabled="!available" @click="create" />
    </div>
  </div>
</template>

<script>
import Input from './Input.vue';
import Button from './Button.vue';

export default {
  name: 'CreateProject',
  components: {
    Input,
    Button
  },
  computed: {
    available() {
      return this.name !== ''
    }
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    create() {
      this.$store.dispatch('addProject', { name: this.name, tasks: [] })
      this.name = ''
    }
  }
}
</script>

<style scoped lang="postcss">
.create {
  @apply rounded-xl shadow-lg border-t-2 p-4 md:mb-24 max-w-md mx-auto bg-white;

  & .title {
    @apply text-lg text-gray-500 mb-4 text-center font-medium;
  }
}
</style>