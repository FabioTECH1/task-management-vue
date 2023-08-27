<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Taskify</a>
            <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="" @click.prevent="gotoPage('tasks')">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ name }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                            <li><a class="dropdown-item" href='' @click.prevent="logout">LogOut</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable'
import { ref, computed } from 'vue'
import gql from 'graphql-tag'


const router = useRouter();
const USER_NAME = 'name'
const TOKEN_KEY = 'token'
const name = ref(window.localStorage.getItem(USER_NAME) || '')

window.onstorage = () => {
    name.value = window.localStorage.getItem(USER_NAME) || ''
};

const gotoPage = (pageName: string) => {
    router.push(pageName)
}

function logout() {

    const userLogout = gql`  
    mutation userLogout{
        logout
    }`

    const { mutate: logout, onDone } = useMutation(userLogout);
    logout()
    onDone((res) => {
        if (res.data.register) {
            localStorage.removeItem(TOKEN_KEY);
            gotoPage('login')
        }
    })
}

</script>