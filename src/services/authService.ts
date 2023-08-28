import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import useApolloMutation from './useApolloMutation';

export async function register(name: string, email: string, password: string) {
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

    try {
        await useApolloMutation(getToken, {
            name,
            email,
            password,
        });
        await login(email, password)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function login(email: string, password: string) {
    const getToken = gql`
            mutation UserLogin(
                $password:String!
                $email:String!){
                login(
                    email:$email, 
                    password:$password
                ){
                    token,
                    name,
                    user_id
                }}`

    try {
        const result: any = await useApolloMutation(getToken, {
            email,
            password,
        });
        const data: any = result.data.login;
        localStorage.setItem("user", JSON.stringify(data))
    } catch (error: any) {
        throw new Error(error)        
    }
}


export async function logout() {

    // const userLogout = gql`  
    //     mutation userLogout{
    //         logout
    //     }`
    try {
        // const res = await useApolloMutation(userLogout);
        localStorage.clear();
    } catch (error: any) {
        throw new Error(error)
    }
}





export function isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    if (token) {
        return true
    }
    return false;
}
