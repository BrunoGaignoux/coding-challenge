<template>
  <div class="floating-input">
    <input
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

<style lang="css" scoped>
.floating-input {
  position: relative;
  margin-bottom: 1rem;
}
.floating-input input::placeholder {
  color: transparent;
}
.floating-input .input {
  height: 3rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgb(229 231 235 / var(--tw-border-opacity));
  --tw-border-opacity: 1;
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.floating-input input:focus,
.floating-input input:not(:placeholder-shown) {
  padding-top: 2rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(107 114 128 / var(--tw-border-opacity));
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 rgb(229 231 235 / var(--tw-border-opacity));
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.floating-input input:focus + label,
.floating-input input:not(:placeholder-shown) + label {
  opacity: 0.75;
  --tw-scale-x: .75;
  --tw-scale-y: .75;
}
.floating-input .label {
  pointer-events: none;
  position: absolute;
  left: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 100%;
  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
}
</style>
