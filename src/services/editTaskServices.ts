
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'


export function updateTask(id: any, title: string, description: string, due_date: string, status: string) {
    const editTask = gql`
            mutation updateTask($id:ID!, $title: String, $description: String, 
                                $due_date: String, $status: String) {
                updateTask(
                    id: $id
                    title: $title
                    description: $description
                    due_date: $due_date
                    status: $status){
                        id
                        title
                        description
                        due_date
                        status
                }}`
    const { mutate: updateTask, onDone, loading, error } = useMutation(
        editTask, () => ({
            variables: {
                id: id,
                title: title,
                description: description,
                due_date: due_date,
                status: status
            },
        }))

    updateTask()
    console.log(loading)
    onDone(() => {
        if (error) {
            return 'error'
        } return updateTask
    })
}