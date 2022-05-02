import ProjectService from '../service/project'
import TaskService from '../service/task'

export default {
    state: () => ({
        items: []
    }),
    mutations: {
      setProjects(state, projects) {
          state.items = projects
      },
      setProject(state, project) {
          state.items.push(project)
      },
      changeProject(state, payload) {
          state.items[payload.index] = payload.item
      },
      removeProject(state, id) {
          state.items.splice(id)
      },
      setProjectTask(state, payload) {
          state.items[payload.index].tasks.push(payload.task)
      },
      changeProjectTask(state, payload) {
          state.items[payload.index].tasks[payload.taskIndex] = payload.task
      },
      removeProjectTask(state, payload) {
          state.items[payload.index].tasks.splice(payload.taskIndex)
      },
    },
    getters: {
      tasksByProject: (state, id) => {
          return state.items.find((project) => project._id === id)?.tasks ?? []
      }
    },
    actions: {
        async addProject({commit}, item) {
            try {
                await ProjectService.create(item)
                commit('setProject', item)
            } catch (e) {
                console.error(e)
            }
        },
        async getProjects({commit}) {
            try {
                const data = await ProjectService.get()
                commit('setProjects', data)
            } catch (e) {
                console.error(e)
            }
        },
        async editProject({commit}, {index, item}) {
            try {
                const project = await ProjectService.update(item._id)
                commit('changeProject', {index, item: project})
            } catch (e) {
                console.error(e)
            }
        },
        async removeProject({commit}, {index, id}) {
            try {
                await ProjectService.remove(id)
                commit('removeProject', index)
            } catch (e) {
                console.error(e)
            }
        },
        async addProjectTask({commit}, {index, task}) {
            try {
                const item = await TaskService.create(task)
                commit('setProjectTask', {index, task: item})
            } catch (e) {
                console.error(e)
            }
        },
        async removeProjectTask({commit}, {index, id}) {
            try {
                await TaskService.remove(id)
                commit('removeProjectTask', index)
            } catch (e) {
                console.error(e)
            }
        },
        async editProjectTask({commit}, {index, item}) {
            try {
                await TaskService.update(item._id)
                commit('changeProjectTask', {index, item})
            } catch (e) {
                console.error(e)
            }
        },
    }
};