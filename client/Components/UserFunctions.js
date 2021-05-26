import axios from 'axios';

export const register = newUser => {
    return axios.post('/api/users/register', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
    })
    .then(response => {
        console.log('Registered')
    })
}

export const login = user => {
    return axios.post('api/users/login', {
        username: user.username,
        password: user.password,
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}