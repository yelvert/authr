import UsersApi from "@api/UsersApi"
import useAsync from "@app/shared/utils/useAsync"
import { FunctionComponent } from "react"

export const UsersIndex : FunctionComponent = () => {
  const { loading, error, value: users} = useAsync(() => UsersApi.index(), [])
  console.log(loading, error, users)
}
