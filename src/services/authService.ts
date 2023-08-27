import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const TOKEN_KEY = 'token';

export function register(name: string, email: string, password: string) {
    const getToken = gql`
            mutation registerUser(
                $name: String!, 
                $email: String!,
                $password: String!) {
                registerUser(
                    name: $name,
                    email: $email,
                    password: $password
                    ) {
                        id
                    }
                }`

    const { mutate: registerUser, error, onDone, } = useMutation(getToken,
        () => ({
            variables: {
                name: name,
                email: email,
                password: password,
            },
        }));
    registerUser()
    if (error) {
        console.log(error.value)
        return 'error'
    }
    console.log(login)

    console.log('here')
    return onDone((res) => {
        if (res.data.register) {
            const loginUser = login(res.data.register.email, res.data.register.password)
        }
    })
}

export function login(email: string, password: string) {
    const getToken = gql`
            mutation UserLogin(
                $password:String!
                $email:String!){
                login(
                    email:$email, 
                    password:$password
                ){
                    token
                }}`

    const { mutate: login, error, onDone } = useMutation(getToken,
        () => ({
            variables: {
                email: email,
                password: password,
            },
        }));
    login()

    onDone((res) => {
        const token: string = res.data.login.token;
        localStorage.setItem(TOKEN_KEY, token);
    })
}


export function logout() {

    const userLogout = gql`  
        mutation userLogout{
            logout
        }`
    const { mutate: logout, error, onDone } = useMutation(userLogout);
    logout()
    localStorage.removeItem(TOKEN_KEY);
}





export function isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        return true
    }
    return false;
}
