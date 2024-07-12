export const login = async (
  { username, password }: { username: string, password: string }
) => {
  return await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier: username,
      password,
    })
  }).then(r => {
    return r.json();
  }).then(data => {
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data
    }
  });
}