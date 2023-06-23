export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('users'));
  if (user) {
    // for Node.js Express back-end
    return { 'x-access-token': user.password };
  } else {
    return {};
  }
}