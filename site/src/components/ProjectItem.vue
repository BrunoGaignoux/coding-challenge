<template>
  <div class="item">
    <div class="header">
      <span class="title">
        {{ item.name }}
      </span>
      <div class="actions">
        <img src="@/assets/edit-icon.svg" alt="edit" @click="editItem">
        <img src="@/assets/delete-icon.svg" alt="delete" width="18">
      </div>
    </div>
    <div :class="`${item.tasks.length ? '' : 'empty'} body`">
      <div v-if="todoItems.length">
        <TaskList :items="todoItems" title="TODO:" />
      </div>
      <div v-if="doneItems.length">
        <TaskList :items="doneItems" title="DONE:" />
      </div>
      <div v-else-if="!todoItems.length && !doneItems.length">
        No tasks yet
      </div>
    </div>
    <div class="footer">
      <BaseInput
          v-model="name"
          type="email"
          name="email"
          placeholder="Task name"
          required
      />
      <div class="actions">
        <BaseInput
            v-model="from"
            mask="##/##/####"
            name="from"
            placeholder="Task start date"
            required
        />
        <BaseInput
            v-model="to"
            mask="##/##/####"
            name="to"
            placeholder="Task end date"
            required
        />
        <BaseButton label="Add" :disabled="!available" @click="add"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from './Input.vue';
import BaseButton from './Button.vue';
import TaskList from './Tasks.vue';

export default {
  components: {
    BaseInput,
    BaseButton,
    TaskList
  },
  props: {
    index: {
      type: [Number, String]
    },
    item: {
      type: Object
    }
  },
  computed: {
    available() {
      return this.name !== ''
    },
    todoItems() {
      return this.item.tasks.filter(i => !i.done)
    },
    doneItems() {
      return this.item.tasks.filter(i => i.done)
    }
  },
  data() {
    return {
      name: '',
      from: '',
      to: '',
      tooltipShow: false
    }
  },
  methods: {
    add() {
      this.$store.dispatch('addProjectTask', {
        index: this.index,
        task: {
          name: this.name,
          from: this.from,
          to: this.to,
          done: false
        }
      })

      this.name = ''
      this.from = ''
      this.to = ''
      this.to = ''
    },
    editItem() {
      //todo
    },
    removeProject(){
      //todo
    },
  }
}
</script>

<style scoped lang="postcss">
.item {
  @apply w-full h-full rounded-xl shadow-lg border-t-2 p-4 mx-auto bg-white;

  max-height: 500px;

  & .header {
    @apply flex justify-between gap-2 items-center border-b-2 pb-2 mb-1;

    & .title {
      @apply text-left text-lg text-gray-500;
    }

    & .actions {
      @apply grid grid-cols-2 gap-2 justify-center items-start;
    }
  }
  & .body {
    @apply w-full grid justify-center gap-2 p-2 overflow-auto text-gray-500;

    height: 300px;
    scrollbar-width: thin;
    scrollbar-color: #bbf7d0 white;

    &.empty {
      @apply items-center;
    }

    &::-webkit-scrollbar {
      @apply w-2;
    }

    &::-webkit-scrollbar-track {
      @apply bg-transparent;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-blue-100 rounded-sm;
    }

    &::-webkit-scrollbar-thumb:hover {
      @apply bg-blue-300;
    }
  }
  & .footer {
    @apply flex justify-between gap-2 items-center flex-col align-middle pt-2 mt-1 border-t-2;

    & .actions {
      @apply flex justify-between gap-3;

      & button {
        @media (min-width: 768px) {
          width: 80px;
        }
      }
    }

    >>> .floating-input {
      @apply mb-0 w-full;
    }
  }
}
</style>
