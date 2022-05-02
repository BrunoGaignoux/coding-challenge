<template>
  <div>
    <span class="title">
      {{ title }}
    </span>
    <div v-for="(item, index) of items" :key="index" class="task" @click="openModal(index, item)">
      <BaseCheckbox
          :value="item.done"
          :disabled="item.done"
          :item="{ name: item.name, value: item.done }"
          :name="item._id"
          :label="item.name"
          @checked="done(index, item)"
      />
      <div v-if="item.from && item.to" class="refDateTooltip">
        <div class="content">
          <p>
            Task start: {{ $moment(item.from).format('MM/DD/YYYY') }}
          </p>
          <p>
            Task end: {{ $moment(item.to).format('MM/DD/YYYY') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  components: {
    BaseCheckbox: () => import('./Checkbox.vue'),
  },
  props: {
    items: {
      type: Array
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    openModal(index, item) {
      if (item.done) {
        return
      }

      this.modal = true
    },
    done(index, item) {
      this.$store.dispatch('editProjectTask', {
        index,
        task: item
      })
    },
  }
}
</script>

<style scoped lang="postcss">
.title {
  @apply text-gray-500 font-medium text-lg text-left;
}
.task {
  @apply relative;

  & .refDateTooltip {
    @apply absolute -top-14 right-0 hidden bg-blue-100 z-50 font-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-md;

    & .content {
      @apply bg-blue-100 text-gray-500 opacity-75 p-3 rounded-lg;
    }
  }

  &:hover .refDateTooltip {
    @apply block;
  }
}
</style>