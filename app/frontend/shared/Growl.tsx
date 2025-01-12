import { cloneDeep, isFunction, uniqueId } from "lodash"
import { ComponentType, createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react"
import { Alert } from "react-bootstrap"
import { Variant } from "react-bootstrap/types"

export interface IGrowlItem {
  id : string
  type : Variant
  content ?: string
  contentComponent ?: ComponentType
  heading ?: string
  autoClose : boolean
  dismissable : boolean
  timer ?: ReturnType<typeof setTimeout>
}

const DEFAULT_TIMEOUT = 5000

export interface IGrowlContext {
  items : Record<string, IGrowlItem>
  add : (opts : {
    type : IGrowlItem['type']
    content ?: string
    contentComponent ?: ComponentType
    heading ?: string
    autoClose ?: number | false
    dismissable ?: boolean
  }) => IGrowlItem
  remove : (id : string) => void
}

/* @ts-expect-error null */
export const GrowlContext = createContext<IGrowlContext>(null)
export const GrowlProvider = GrowlContext.Provider
export const GrowlConsumer = GrowlContext.Consumer

export const GrowlContainer : FunctionComponent<PropsWithChildren<Record<never, never>>> = ({ children }) => {
  const [items, setItems] = useState<IGrowlContext['items']>({})
  const remove = useCallback((id : IGrowlItem['id']) => {
    setItems(s => {
      const newS = cloneDeep(s)
      delete newS[id]
      return newS
    })
  }, [setItems])
  const add = useCallback<IGrowlContext['add']>(({type, content, contentComponent, heading, dismissable = true, autoClose = DEFAULT_TIMEOUT}) => {
    const id = uniqueId('growl_')
    const newItem : IGrowlItem = {
      id,
      type,
      content,
      contentComponent,
      heading,
      dismissable,
      autoClose: autoClose !== false
    }
    if (heading) newItem.heading = heading
    if (newItem.autoClose) newItem.timer = setTimeout(() => remove(id), autoClose as number)
    setItems(s => ({...s, [id]: newItem}))
  return newItem
  }, [remove])

  return <GrowlProvider value={{ items, add, remove }}>
    { children }
  </GrowlProvider>
}

export const GrowlOutlet : FunctionComponent = () => {
  const { items, remove } = useGrowl()
  return <div>
    {
      Object.values(items).map(item =>
        <Alert key={item.id} variant={item.type} dismissible={item.dismissable} onClose={() => remove(item.id)}>
          { item.heading && <Alert.Heading>{item.heading}</Alert.Heading>}
          { item.contentComponent ? <item.contentComponent /> : item.content }
        </Alert>
      )
    }
  </div>
}

export const withGrowl = <P extends object>(WrappedComponent : ComponentType<P>): FunctionComponent<P> =>
  ({...props}) : ReturnType<FunctionComponent<P>> => (
    <GrowlContainer>
      <WrappedComponent {...props} />
    </GrowlContainer>
  )

export const useGrowl : () => IGrowlContext = () => useContext(GrowlContext)

export default useGrowl
