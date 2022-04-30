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

<style lang="css" scoped>
.base-btn {
  font-size: 1rem;
  line-height: 1.5rem;
  width: 100%;
  height: 48px;
  cursor: pointer;
  --tw-bg-opacity: 1;
  background-color: rgba(34, 197, 94, var(--tw-bg-opacity));
  border-radius: 0.25rem;
  font-weight: 600;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0);
  --tw-shadow-colored: 0 1px 3px 0 rgb(229 231 235 / var(--tw-border-opacity)), 0 1px 2px -1px rgb(229 231 235 / var(--tw-border-opacity));
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  padding: 0.75rem 1.75rem;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  --tw-border-opacity: 1;
  border-color: rgba(34, 197, 94, var(--tw-border-opacity));
}
.base-btn:hover {
  background-color: rgba(34, 197, 94, var(--tw-bg-opacity));
}
.base-btn:disabled {
  cursor: not-allowed;
  --tw-bg-opacity: 1;
  background-color: rgba(63, 63, 70, var(--tw-bg-opacity));
  border-color: rgba(63, 63, 70, var(--tw-bg-opacity));
}
</style>
