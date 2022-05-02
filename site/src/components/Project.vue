<script>
export default {
  name: 'ProjectList',
  components: {
    ProjectItem: () => import('./ProjectItem.vue'),
    CreateProject: () => import('./CreateProject.vue')
  },
  computed: {
    projects() {
      return this.$store.state.project.items
    }
  },
  async mounted() {
    await this.$store.dispatch('getProjects')
  }
}
</script>

<template>
  <div class="container">
    <div v-if="projects.length > 0" class="items">
      <div v-for="(project, index) of projects" :key="index">
        <ProjectItem :index="index" :item="project" />
      </div>
    </div>
    <div v-else class="empty-list">
      No projects yet
    </div>
    <div class="create-project">
      <CreateProject />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.container {
  @apply relative m-auto flex justify-between flex-col md:flex-row gap-4;

  & .items {
    @apply w-full md:w-2/3 grid md:grid-cols-2 gap-2 justify-center;
  }

  & .empty-list {
    @apply w-full md:w-1/2 text-center text-gray-500;
  }

  & .create-project {
    @apply w-full md:w-1/3;
  }
}
</style>
