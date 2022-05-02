import { api } from './axios'

export default {
  get () {
    return api.get('projects')
  },
  create (data) {
    return api.post('projects', data)
  },
  edit (id, data) {
    return api.put(`projects/${id}`, data)
  },
  remove (id) {
    return api.delete(`projects/${id}`)
  },
}
