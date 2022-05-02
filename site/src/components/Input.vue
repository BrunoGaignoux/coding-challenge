<template>
  <div class="floating-input">
    <the-mask
      v-if="mask"
      :id="name"
      :mask="mask"
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      class="input"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
    />
    <input
      v-else
      :id="name"
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      class="input"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
    />
    <label :for="name" class="label">
      {{placeholder}}
      <span v-if="required || hasRequiredRule" class="text-red-400">*</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'text',
      validator: (value) => {
        return [
          'text',
          'password',
          'email',
          'tel',
          'file',
          'number',
          'url',
          'time',
          'date'
        ].includes(value)
      }
    },
    mask: {
      type: [String, Array],
      required: false,
      default: null
    }
  },
  computed: {
    hasRequiredRule() {
      return typeof this.rules === "string"
        ? this.rules.includes('required')
        : (this.rules.required)
    }
  },
  methods: {
    onInput(event) {
      const value = event.target ? event.target.value : event
      this.$emit('input', value)
    },
    onChange(event) {
      const value = event.target ? event.target.value : event
      this.$emit('change', value)
    },
  }
}
</script>

<style lang="postcss" scoped>
.floating-input {
  @apply mb-4 relative;

  & input::placeholder {
    color: transparent;
  }

  & .input {
    @apply text-sm border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-12;
    &--error {
      @apply border-red-500 focus:border-red-500 focus:ring-0;
    }
    &:disabled {
      @apply bg-gray-300 cursor-not-allowed text-gray-400;
    }
  }

  & input:focus,
  input:not(:placeholder-shown) {
    @apply pt-8;
  }

  & input:focus~label,
  input:not(:placeholder-shown)~label {
    @apply opacity-75 scale-75 -translate-y-3 translate-x-1;
  }

  & .label {
    @apply absolute text-gray-400 text-sm left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out;

    bottom: 6px;
  }
}
</style>
