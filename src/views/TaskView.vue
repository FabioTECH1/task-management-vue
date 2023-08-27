<template>
    <div class="container mt-2">
        <div class="mb-4">
            <NavBar />
        </div>
        <h4 class="mb-4 text-center">Task Details</h4>
        <div id="taskDetails">
            <h2>{{ task.title }}</h2>
            <p class="mb-2"><strong>Description:</strong> {{ task.description }}</p>
            <p class="mb-2"><strong>Due Date:</strong> {{ task.due_date }} </p>
            <p class="mb-4"><strong>Status:</strong> {{ task.status }}</p>
            <a href="#" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editTaskModal">Edit Task</a>
            <br>
            <div class="text-center">
                <button class="btn btn-danger mb-2" data-id="1">Delete Task</button>
            </div>

        </div>
        <div class="text-center">
            <a class="" @click.prevent="gotoPage('tasks')">Back to Task List</a>
        </div>
    </div>
    <!-- Edit Task Modal -->
    <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editTaskModalLabel">Edit Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addTaskForm">
                        <div class="mb-3">
                            <label for="taskTitle" class="form-label">Title</label>
                            <input v-model=task.title type="text" class="form-control shadow-none" id="taskTitle" required>
                        </div>
                        <div class="mb-3">
                            <label for="taskDescription" class="form-label"></label>
                            <textarea v-model=task.description class="form-control shadow-none" id="taskDescription"
                                rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="dueDate" class="form-label">Due Date</label>
                            <input v-model=task.due_date type="date" class="form-control shadow-none" id="dueDate" required>
                        </div>
                        <div class="mb-3">
                            <label for="taskStatus" class="form-label">Status</label>
                            <select v-model=task.status id="taskStatus" class="form-select shadow-none" required>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </form>

                </div>
                <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary shadow-none" data-bs-dismiss="modal"
                        id="close">Close</button>
                    <button type="button" @click=updateTaskNow class="btn btn-primary shadow-none">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { updateTask } from '../../src/services/editTaskServices'
import NavBar from '../views/NavBar.vue'


export default {
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const defaulttask = {
            title: '',
            description: "",
            due_date: '',
            status: ''
        };

        const gotoPage = (pageName: string) => {
            router.push({ name: pageName })
        }
        const route = useRoute();
        const mytask = ref()
        const taskId = ref(route.params.id);

        const getTask = gql`
                    query getTask($id:ID!) {
                    getTask(id:$id){
                        id
                        title
                        description
                        status 
                        due_date
                        }
                    }`
        const { loading, onResult, result, error } = useQuery(
            getTask, {
            id: taskId.value
        });


        const task = computed(() => result.value?.getTask || defaulttask)

        const updateTaskNow = () => {
            // console.log(id, task.value.title, task.value.description, task.value.due_date);
            const response: any = updateTask(taskId.value, task.value.title, task.value.description, task.value.due_date, task.value.status)
            if (response == 'error') {
                alert('Something went wrong, try again')
            }
            alert('task updated')
            document.getElementById('close')?.click();
        }

        return {
            updateTaskNow,
            gotoPage, task,
        }
    }
};
</script>
  