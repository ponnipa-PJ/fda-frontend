export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('fda'));
  if (user) {
    // for Node.js Express back-end
    return { 'x-access-token': user.password };
  } else {
    return {};
  }
}