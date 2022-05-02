<script>
export default {
  name: 'HomeView',
  components: {
    ProjectList: () => import('@/components/Project.vue')
  }
}
</script>

<template>
  <ProjectList />
</template>
