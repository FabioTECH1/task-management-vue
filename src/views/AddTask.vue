<template>
    <div class="container mt-2">
        <div class="mb-4">
            <NavBar />
        </div>
        <h4 class="mb-4 text-center">Add New Task</h4>
        <form id="addTaskForm" @submit.prevent="addTaskNow">
            <div class="mb-3">
                <label for="taskTitle" class="form-label">Title</label>
                <input v-model="title" type="text" class="form-control shadow-none" id="taskTitle" required>
            </div>
            <div class="mb-3">
                <label for="taskDescription" class="form-label">Description</label>
                <textarea v-model="description" class="form-control shadow-none" id="taskDescription" rows="3"
                    required></textarea>
            </div>
            <div class="mb-3">
                <label for="dueDate" class="form-label">Due Date</label>
                <input v-model="due_date" type="date" class="form-control shadow-none" id="dueDate" required>
            </div>
            <div class="text-center">
                <button type='submit' class="btn btn-primary">Add Task</button>
                <br> <br>

                <b @click="gotoPage('tasks')"><a href="">Go back</a></b>
            </div>
        </form>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import NavBar from '../views/NavBar.vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import useApolloMutation from '@/services/useApolloMutation';


export default {
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const title = ref('')
        const description = ref('')
        const due_date = ref('')

        const gotoPage = (pageName: string) => {
            router.push(pageName)
        }

        const id = JSON.parse(localStorage.getItem('user') || '{}')?.user_id;
        const addTaskNow = async () => {
            const addTask = gql`
            mutation CreateTask(
                $title: String!, $description: String!, 
                $due_date: String!, $user_id: ID!) {
                createTask(
                    title: $title,
                    description: $description,
                    due_date: $due_date,
                    user_id: $user_id){
                        id
                        title
                    }
                }`
            try {
                const result = await useApolloMutation(addTask, {
                    title: title.value,
                    description: description.value,
                    due_date: due_date.value,
                    user_id: id
                })
                console.log(result);
                gotoPage('tasks')
                alert('Task added successfuly')
            } catch (error) {
                alert('Something went wrong, try again')
            }
        }
        return {
            title, description, due_date,
            gotoPage, addTaskNow,
        }
    }
};
</script>
  