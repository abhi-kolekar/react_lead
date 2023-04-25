

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('leaduser'));
  
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
}

 function authHeader1() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
}
