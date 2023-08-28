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
                <button class="btn btn-danger mb-2" data-id="1" @click="deleteTask">Delete Task</button>
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
                            <input v-model=title type="text" class="form-control shadow-none" id="taskTitle" required>
                        </div>
                        <div class="mb-3">
                            <label for="taskDescription" class="form-label"></label>
                            <textarea v-model=description class="form-control shadow-none" id="taskDescription"
                                rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="dueDate" class="form-label">Due Date</label>
                            <input v-model=due_date type="date" class="form-control shadow-none" id="dueDate" required>
                        </div>
                        <div class="mb-3">
                            <label for="taskStatus" class="form-label">Status</label>
                            <select v-model=status id="taskStatus" class="form-select shadow-none" required>
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
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { updateTask } from '../../src/services/editTaskServices'
import NavBar from '../views/NavBar.vue'
import useApolloQuery from '@/services/useApolloQuery';
import type { TaskType } from '@/types';
import useApolloMutation from '@/services/useApolloMutation';


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

        const defaultData = {
            id: 0,
            title: "",
            due_date: "",
            status: "",
        }

        const gotoPage = (pageName: string) => {
            router.push({ name: pageName })
        }
        const route = useRoute();
        const task = ref<TaskType>(defaultData)
        // const mytask = ref()
        const title = ref("")
        const description = ref("")
        const due_date = ref("")
        const status = ref("")

        const taskId = ref(route.params.id);

        const getTask = async () => {
            try {
                const taskQuery = gql`
                            query getTask($id:ID!) {
                            getTask(id:$id){
                                id
                                title
                                description
                                status 
                                due_date
                                }
                            }`
                const result: any = await useApolloQuery(taskQuery, {id: taskId.value})
                const data = result.data.getTask
                task.value = data
                title.value = data.title
                description.value = data.description
                due_date.value = data.due_date
                status.value = data.status
            } catch (error) {
                console.log(error);
            }

        }

        const deleteTask = async () => {
            const confirmDelete = confirm("Are you sure you want to delete this task?")

            if(confirmDelete) {
                const id = taskId.value as unknown as number
                const deleteQuery = gql`
                    mutation deleteTask($id:ID!) {
                        deleteTask (id: $id) {
                            id
                        }
                    }
                `
                try {
                    const result = await useApolloMutation(deleteQuery, {id})
                    alert(result); 
                    gotoPage("tasks") 
                } catch (error) {
                    alert(error)
                }
            }
        } 


        const updateTaskNow = async () => {
            const id = taskId.value as unknown as number
            const data = {
                id, 
                title: title.value, 
                description: description.value, 
                due_date: due_date.value, 
                status: status.value
            }
            try {
                const response: any = await updateTask(data)
                task.value = data
                alert('task updated')
                document.getElementById('close')?.click();
            } catch (error) {
                alert(error)
            }
        }

        onBeforeMount(() => {
            getTask()
        })

        return {
            updateTaskNow,
            gotoPage, task, title, description, due_date, status, deleteTask
        }
    }
};
</script>
  