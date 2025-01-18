export type AttributeError = string[]

export interface ApplicationListResponse {
  id: number
  name: string
  hostnames: string[]
  active: boolean
  source: 'custom' | 'docker'
}

export interface ApplicationDetailResponse {
  id: number
  name: string
  hostnames: string[]
  active: boolean
  source: 'custom' | 'docker'
  groups_custom_ids: number[]
  groups_generated_ids: number[]
  users_custom_ids: number[]
  users_generated_ids: number[]
}

export interface ApplicationErrors {
  name?: AttributeError
  hostnames?: AttributeError
  source?: AttributeError
  active?: AttributeError
  groups_custom_ids?: AttributeError
  users_custom_ids?: AttributeError
}

export interface GroupResponse {
  id: number
  name: string
}

export interface GroupErrors {
  name?: AttributeError
}

export interface UserResponse {
  id: number
  name: string
  username: string
  group_ids: number[]
}

export interface UserErrors {
  name?: AttributeError
  username?: AttributeError
  password?: AttributeError
  password_confirmation?: AttributeError
  group_ids?: AttributeError
}

export type ApplicationsListResponse = ApplicationListResponse[]

export interface ApplicationsCreatePayload {
  application: {
    name: string
    hostnames: string[]
    active: boolean
    groups_custom_ids?: number[]
    users_custom_ids?: number[]
  }
}

export type ApplicationsCreateData = ApplicationDetailResponse

export type ApplicationsCreateError = ApplicationErrors

export type ApplicationsDetailData = ApplicationDetailResponse

export interface ApplicationsUpdatePayload {
  application: {
    name?: string
    hostnames?: string[]
    active?: boolean
    groups_custom_ids?: number[]
    users_custom_ids?: number[]
  }
}

export type ApplicationsUpdateData = ApplicationDetailResponse

export type ApplicationsUpdateError = ApplicationErrors

export type ApplicationsDeleteData = any

export interface CurrentUserWhoamiResponse {
  id: number
  name: string
  username: string
}

export type GroupsListResponse = GroupResponse[]

export interface GroupsCreatePayload {
  group: {
    name: string
  }
}

export type GroupsCreateData = GroupResponse

export type GroupsCreateError = GroupErrors

export type GroupsDetailData = GroupResponse

export interface GroupsUpdatePayload {
  group: {
    name?: string
  }
}

export type GroupsUpdateData = GroupResponse

export type GroupsUpdateError = GroupErrors

export type GroupsDeleteData = any

export type GroupsAddUserData = any

export type GroupsRemoveUserData = any

export interface LoginPayload {
  username: string
  password: string
}

export type LoginData = any

export type LogoutData = any

export type UsersListResponse = UserResponse[]

export interface UsersCreatePayload {
  user: {
    name: string
    username: string
    password: string
    password_confirmation: string
    group_ids?: number[]
  }
}

export type UsersCreateData = UserResponse

export type UsersCreateError = UserErrors

export type UsersDetailData = UserResponse

export interface UsersUpdatePayload {
  user: {
    name?: string
    username?: string
    password?: string
    password_confirmation?: string
    group_ids?: number[]
  }
}

export type UsersUpdateData = UserResponse

export type UsersUpdateError = UserErrors

export type UsersDeleteData = any

export type UsersAddGroupData = any

export type UsersRemoveGroupData = any

export namespace Admin {
  /**
   * No description
   * @name ApplicationsList
   * @summary list
   * @request GET:/admin/applications
   * @response `200` `ApplicationsListResponse` successful
   * @response `401` `void` unauthorized
   */
  export namespace ApplicationsList {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = ApplicationsListResponse
  }

  /**
   * No description
   * @name ApplicationsCreate
   * @summary create
   * @request POST:/admin/applications
   * @response `200` `ApplicationsCreateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `ApplicationErrors` unprocessible entitiy
   */
  export namespace ApplicationsCreate {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = ApplicationsCreatePayload
    export type RequestHeaders = {}
    export type ResponseBody = ApplicationsCreateData
  }

  /**
   * No description
   * @name ApplicationsDetail
   * @summary show
   * @request GET:/admin/applications/{id}
   * @response `200` `ApplicationsDetailData` successful
   * @response `401` `void` unauthorized
   */
  export namespace ApplicationsDetail {
    export type RequestParams = {
      id: number | string
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = ApplicationsDetailData
  }

  /**
   * No description
   * @name ApplicationsUpdate
   * @summary update
   * @request PUT:/admin/applications/{id}
   * @response `200` `ApplicationsUpdateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `ApplicationErrors` unprocessible entitiy
   */
  export namespace ApplicationsUpdate {
    export type RequestParams = {
      id: number | string
    }
    export type RequestQuery = {}
    export type RequestBody = ApplicationsUpdatePayload
    export type RequestHeaders = {}
    export type ResponseBody = ApplicationsUpdateData
  }

  /**
   * No description
   * @name ApplicationsDelete
   * @summary destroy
   * @request DELETE:/admin/applications/{id}
   * @response `204` `ApplicationsDeleteData` successful
   * @response `401` `void` unauthorized
   */
  export namespace ApplicationsDelete {
    export type RequestParams = {
      id: number | string
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = ApplicationsDeleteData
  }

  /**
   * No description
   * @name GroupsList
   * @summary list
   * @request GET:/admin/groups
   * @response `200` `GroupsListResponse` successful
   * @response `401` `void` unauthorized
   */
  export namespace GroupsList {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GroupsListResponse
  }

  /**
   * No description
   * @name GroupsCreate
   * @summary create
   * @request POST:/admin/groups
   * @response `200` `GroupsCreateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `GroupErrors` unprocessible entitiy
   */
  export namespace GroupsCreate {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = GroupsCreatePayload
    export type RequestHeaders = {}
    export type ResponseBody = GroupsCreateData
  }

  /**
   * No description
   * @name GroupsDetail
   * @summary show
   * @request GET:/admin/groups/{id}
   * @response `200` `GroupsDetailData` successful
   * @response `401` `void` unauthorized
   */
  export namespace GroupsDetail {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GroupsDetailData
  }

  /**
   * No description
   * @name GroupsUpdate
   * @summary update
   * @request PUT:/admin/groups/{id}
   * @response `200` `GroupsUpdateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `GroupErrors` unprocessible entitiy
   */
  export namespace GroupsUpdate {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = GroupsUpdatePayload
    export type RequestHeaders = {}
    export type ResponseBody = GroupsUpdateData
  }

  /**
   * No description
   * @name GroupsDelete
   * @summary destroy
   * @request DELETE:/admin/groups/{id}
   * @response `204` `GroupsDeleteData` successful
   * @response `401` `void` unauthorized
   */
  export namespace GroupsDelete {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GroupsDeleteData
  }

  /**
   * No description
   * @name GroupsAddUser
   * @summary add_user
   * @request PUT:/admin/groups/{id}/users/{user_id}
   * @response `200` `GroupsAddUserData` successful
   */
  export namespace GroupsAddUser {
    export type RequestParams = {
      id: number
      userId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GroupsAddUserData
  }

  /**
   * No description
   * @name GroupsRemoveUser
   * @summary remove_user
   * @request DELETE:/admin/groups/{id}/users/{user_id}
   * @response `200` `GroupsRemoveUserData` successful
   */
  export namespace GroupsRemoveUser {
    export type RequestParams = {
      id: number
      userId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GroupsRemoveUserData
  }

  /**
   * No description
   * @name UsersList
   * @summary list
   * @request GET:/admin/users
   * @response `200` `UsersListResponse` successful
   * @response `401` `void` unauthorized
   */
  export namespace UsersList {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = UsersListResponse
  }

  /**
   * No description
   * @name UsersCreate
   * @summary create
   * @request POST:/admin/users
   * @response `200` `UsersCreateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `UserErrors` unprocessible entitiy
   */
  export namespace UsersCreate {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UsersCreatePayload
    export type RequestHeaders = {}
    export type ResponseBody = UsersCreateData
  }

  /**
   * No description
   * @name UsersDetail
   * @summary show
   * @request GET:/admin/users/{id}
   * @response `200` `UsersDetailData` successful
   * @response `401` `void` unauthorized
   */
  export namespace UsersDetail {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = UsersDetailData
  }

  /**
   * No description
   * @name UsersUpdate
   * @summary update
   * @request PUT:/admin/users/{id}
   * @response `200` `UsersUpdateData` successful
   * @response `401` `void` unauthorized
   * @response `422` `UserErrors` unprocessible entitiy
   */
  export namespace UsersUpdate {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = UsersUpdatePayload
    export type RequestHeaders = {}
    export type ResponseBody = UsersUpdateData
  }

  /**
   * No description
   * @name UsersDelete
   * @summary destroy
   * @request DELETE:/admin/users/{id}
   * @response `204` `UsersDeleteData` successful
   * @response `401` `void` unauthorized
   */
  export namespace UsersDelete {
    export type RequestParams = {
      id: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = UsersDeleteData
  }

  /**
   * No description
   * @name UsersAddGroup
   * @summary add_group
   * @request PUT:/admin/users/{id}/groups/{group_id}
   * @response `200` `UsersAddGroupData` successful
   */
  export namespace UsersAddGroup {
    export type RequestParams = {
      id: number
      groupId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = UsersAddGroupData
  }

  /**
   * No description
   * @name UsersRemoveGroup
   * @summary remove_group
   * @request DELETE:/admin/users/{id}/groups/{group_id}
   * @response `200` `UsersRemoveGroupData` successful
   */
  export namespace UsersRemoveGroup {
    export type RequestParams = {
      id: number
      groupId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = UsersRemoveGroupData
  }
}

export namespace CurrentUser {
  /**
   * No description
   * @name Whoami
   * @summary whoami
   * @request GET:/current_user
   * @response `200` `CurrentUserWhoamiResponse` successful
   * @response `401` `void` unauthorized
   */
  export namespace Whoami {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = CurrentUserWhoamiResponse
  }
}

export namespace Session {
  /**
   * No description
   * @name Login
   * @summary login
   * @request POST:/session
   * @response `200` `LoginData` successful
   * @response `401` `void` unauthorized
   */
  export namespace Login {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = LoginPayload
    export type RequestHeaders = {}
    export type ResponseBody = LoginData
  }

  /**
   * No description
   * @name Logout
   * @summary delete session
   * @request GET:/session/logout
   * @response `200` `LogoutData` successful
   */
  export namespace Logout {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = LogoutData
  }
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input),
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title API V1
 * @version v1
 */
export class AuthrApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * No description
     *
     * @name ApplicationsList
     * @summary list
     * @request GET:/admin/applications
     * @response `200` `ApplicationsListResponse` successful
     * @response `401` `void` unauthorized
     */
    applicationsList: (params: RequestParams = {}) =>
      this.request<ApplicationsListResponse, void>({
        path: `/admin/applications`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ApplicationsCreate
     * @summary create
     * @request POST:/admin/applications
     * @response `200` `ApplicationsCreateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `ApplicationErrors` unprocessible entitiy
     */
    applicationsCreate: (data: ApplicationsCreatePayload, params: RequestParams = {}) =>
      this.request<ApplicationsCreateData, ApplicationsCreateError>({
        path: `/admin/applications`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ApplicationsDetail
     * @summary show
     * @request GET:/admin/applications/{id}
     * @response `200` `ApplicationsDetailData` successful
     * @response `401` `void` unauthorized
     */
    applicationsDetail: (id: number | string, params: RequestParams = {}) =>
      this.request<ApplicationsDetailData, void>({
        path: `/admin/applications/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ApplicationsUpdate
     * @summary update
     * @request PUT:/admin/applications/{id}
     * @response `200` `ApplicationsUpdateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `ApplicationErrors` unprocessible entitiy
     */
    applicationsUpdate: (id: number | string, data: ApplicationsUpdatePayload, params: RequestParams = {}) =>
      this.request<ApplicationsUpdateData, ApplicationsUpdateError>({
        path: `/admin/applications/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ApplicationsDelete
     * @summary destroy
     * @request DELETE:/admin/applications/{id}
     * @response `204` `ApplicationsDeleteData` successful
     * @response `401` `void` unauthorized
     */
    applicationsDelete: (id: number | string, params: RequestParams = {}) =>
      this.request<ApplicationsDeleteData, void>({
        path: `/admin/applications/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsList
     * @summary list
     * @request GET:/admin/groups
     * @response `200` `GroupsListResponse` successful
     * @response `401` `void` unauthorized
     */
    groupsList: (params: RequestParams = {}) =>
      this.request<GroupsListResponse, void>({
        path: `/admin/groups`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsCreate
     * @summary create
     * @request POST:/admin/groups
     * @response `200` `GroupsCreateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `GroupErrors` unprocessible entitiy
     */
    groupsCreate: (data: GroupsCreatePayload, params: RequestParams = {}) =>
      this.request<GroupsCreateData, GroupsCreateError>({
        path: `/admin/groups`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsDetail
     * @summary show
     * @request GET:/admin/groups/{id}
     * @response `200` `GroupsDetailData` successful
     * @response `401` `void` unauthorized
     */
    groupsDetail: (id: number, params: RequestParams = {}) =>
      this.request<GroupsDetailData, void>({
        path: `/admin/groups/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsUpdate
     * @summary update
     * @request PUT:/admin/groups/{id}
     * @response `200` `GroupsUpdateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `GroupErrors` unprocessible entitiy
     */
    groupsUpdate: (id: number, data: GroupsUpdatePayload, params: RequestParams = {}) =>
      this.request<GroupsUpdateData, GroupsUpdateError>({
        path: `/admin/groups/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsDelete
     * @summary destroy
     * @request DELETE:/admin/groups/{id}
     * @response `204` `GroupsDeleteData` successful
     * @response `401` `void` unauthorized
     */
    groupsDelete: (id: number, params: RequestParams = {}) =>
      this.request<GroupsDeleteData, void>({
        path: `/admin/groups/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsAddUser
     * @summary add_user
     * @request PUT:/admin/groups/{id}/users/{user_id}
     * @response `200` `GroupsAddUserData` successful
     */
    groupsAddUser: (id: number, userId: number, params: RequestParams = {}) =>
      this.request<GroupsAddUserData, any>({
        path: `/admin/groups/${id}/users/${userId}`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupsRemoveUser
     * @summary remove_user
     * @request DELETE:/admin/groups/{id}/users/{user_id}
     * @response `200` `GroupsRemoveUserData` successful
     */
    groupsRemoveUser: (id: number, userId: number, params: RequestParams = {}) =>
      this.request<GroupsRemoveUserData, any>({
        path: `/admin/groups/${id}/users/${userId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersList
     * @summary list
     * @request GET:/admin/users
     * @response `200` `UsersListResponse` successful
     * @response `401` `void` unauthorized
     */
    usersList: (params: RequestParams = {}) =>
      this.request<UsersListResponse, void>({
        path: `/admin/users`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersCreate
     * @summary create
     * @request POST:/admin/users
     * @response `200` `UsersCreateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `UserErrors` unprocessible entitiy
     */
    usersCreate: (data: UsersCreatePayload, params: RequestParams = {}) =>
      this.request<UsersCreateData, UsersCreateError>({
        path: `/admin/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersDetail
     * @summary show
     * @request GET:/admin/users/{id}
     * @response `200` `UsersDetailData` successful
     * @response `401` `void` unauthorized
     */
    usersDetail: (id: number, params: RequestParams = {}) =>
      this.request<UsersDetailData, void>({
        path: `/admin/users/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersUpdate
     * @summary update
     * @request PUT:/admin/users/{id}
     * @response `200` `UsersUpdateData` successful
     * @response `401` `void` unauthorized
     * @response `422` `UserErrors` unprocessible entitiy
     */
    usersUpdate: (id: number, data: UsersUpdatePayload, params: RequestParams = {}) =>
      this.request<UsersUpdateData, UsersUpdateError>({
        path: `/admin/users/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersDelete
     * @summary destroy
     * @request DELETE:/admin/users/{id}
     * @response `204` `UsersDeleteData` successful
     * @response `401` `void` unauthorized
     */
    usersDelete: (id: number, params: RequestParams = {}) =>
      this.request<UsersDeleteData, void>({
        path: `/admin/users/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersAddGroup
     * @summary add_group
     * @request PUT:/admin/users/{id}/groups/{group_id}
     * @response `200` `UsersAddGroupData` successful
     */
    usersAddGroup: (id: number, groupId: number, params: RequestParams = {}) =>
      this.request<UsersAddGroupData, any>({
        path: `/admin/users/${id}/groups/${groupId}`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersRemoveGroup
     * @summary remove_group
     * @request DELETE:/admin/users/{id}/groups/{group_id}
     * @response `200` `UsersRemoveGroupData` successful
     */
    usersRemoveGroup: (id: number, groupId: number, params: RequestParams = {}) =>
      this.request<UsersRemoveGroupData, any>({
        path: `/admin/users/${id}/groups/${groupId}`,
        method: 'DELETE',
        ...params,
      }),
  }
  currentUser = {
    /**
     * No description
     *
     * @name Whoami
     * @summary whoami
     * @request GET:/current_user
     * @response `200` `CurrentUserWhoamiResponse` successful
     * @response `401` `void` unauthorized
     */
    whoami: (params: RequestParams = {}) =>
      this.request<CurrentUserWhoamiResponse, void>({
        path: `/current_user`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  session = {
    /**
     * No description
     *
     * @name Login
     * @summary login
     * @request POST:/session
     * @response `200` `LoginData` successful
     * @response `401` `void` unauthorized
     */
    login: (data: LoginPayload, params: RequestParams = {}) =>
      this.request<LoginData, void>({
        path: `/session`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name Logout
     * @summary delete session
     * @request GET:/session/logout
     * @response `200` `LogoutData` successful
     */
    logout: (params: RequestParams = {}) =>
      this.request<LogoutData, any>({
        path: `/session/logout`,
        method: 'GET',
        ...params,
      }),
  }
}
