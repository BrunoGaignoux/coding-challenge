<template>
  <button
    class="base-btn"
    :aria-label="label"
    :disabled="disabled"
    @click.prevent="onClick"
  >
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="postcss" scoped>
.base-btn {
  @apply w-full h-12 rounded font-semibold shadow text-sm px-7 py-3 text-white bg-green-600 hover:bg-green-500;

  &:disabled {
    @apply bg-gray-400 hover:bg-gray-400 cursor-not-allowed;
  }
}
</style>
