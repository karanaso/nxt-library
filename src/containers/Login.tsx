export const Login = () => {

    const login = async () => {
        await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: 'karanaso',
                password: 'karanaso123'
            })
        }).then(r => {
            console.log(r);
            return r.json();
        }).then(data => {
            console.log(data);
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
        })

        await fetch('http://localhost:1337/api/books', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ localStorage.getItem('jwt')
            }
        }).then(r => {
            console.log(r);
            return r.json();
        }).then(data => {
            console.log(data);
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
        })

    }

    login();
    return (
        <div>
            Hello world
        </div>
    )
}