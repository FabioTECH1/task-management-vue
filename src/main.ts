import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import App from './App.vue'
import router from './router'
import { createApp, h } from 'vue'
import { InMemoryCache, createHttpLink, ApolloClient } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'


const TOKEN_KEY = 'token';
const token = localStorage.getItem(TOKEN_KEY);

const httpLink = createHttpLink({
    uri: 'https://vangelionmultiglobal.com/graphql',
    headers: {
        ...(token && { "Authorization": `Bearer ${token}` }),
    },
});
// const token = localStorage.getItem(TOKEN_KEY);
// const httpLink = createHttpLink({
//     uri: 'http://127.0.0.1:8000/graphql',
//     headers: {
//         "Authorization": "Bearer laravel_sanctum_v1MVIx9i4TJrwaIAJiPOLJJfmQMRtTNkxwiDgiNhe3bc5be0",
//     },
// })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = provideApolloClient(apolloClient);


const app = createApp({
    render: () => h(App),
})
app.provide('apolloProvider', apolloProvider)
app.use(router)
app.mount('#app')


