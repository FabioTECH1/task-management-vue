import { useQuery } from "@vue/apollo-composable"

export default async function useApolloQuery(reqQuery: any, variables?: any) {
  return new Promise((resolve, reject) => {
    const {onResult, onError} = useQuery(reqQuery, variables)
    onResult((data) => {
      if(!data.loading) {
        resolve(data)
      }
    })
    onError((error) => {
      reject(error.message)
    })
  })
}