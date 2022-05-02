<template>
  <label :for="item._id" class="label">
    <input
        :id="item._id"
        v-model="inputValue"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        class="checkbox"
        @change="updateInput"
    />
    <span v-if="label.length">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      inputValue: this.value,
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('checked', { name: this.name, value: event.target.checked })
    },
  },
}
</script>

<style lang="postcss" scoped>
.label {
  @apply inline-flex items-center my-3;
  & > span {
    @apply text-gray-600 ml-2 text-sm;
  }
}

.checkbox {
  @apply w-6 h-6 border border-blue-100 checked:border-blue-400 shadow-md text-blue-400 rounded focus:ring-blue-400;
}
</style>
