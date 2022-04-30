export default () => {
  const token = localStorage.getItem('token') || null
  const user = null

  return { token, user }
}
