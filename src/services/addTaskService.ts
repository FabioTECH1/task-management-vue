
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'


export function addTask(title: string, description: string, due_date: string,) {
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
    const { mutate: createTask, onDone, error } = useMutation(
        addTask, () => ({
            variables: {
                title: title,
                description: description,
                due_date: due_date,
                user_id: 1
            },
        }))

    createTask()
}