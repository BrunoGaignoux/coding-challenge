import { api } from './axios'

export default {
  create (data) {
    return api.post('tasks', data)
  },
  edit (id, data) {
    return api.put(`tasks/${id}`, data)
  },
  remove (id) {
    return api.delete(`tasks/${id}`)
  },
}
