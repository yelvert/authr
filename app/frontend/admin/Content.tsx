import { FunctionComponent, useContext, useMemo } from "react"
import { Breadcrumb, Container, Spinner } from "react-bootstrap"
import { Outlet, UIMatch, useMatches, NavLink, useNavigation } from "react-router"
import { GrowlOutlet } from "@app/shared/Growl"
import { isFunction } from "lodash"

interface IRoute {
  Data: {},
  Handle: {
    breadcrumb ?: string | (() => string)
  }
}

type IMatch = UIMatch<IRoute["Data"], IRoute["Handle"]>

export const Content : FunctionComponent = () => {
  const matches = useMatches() as IMatch[]
  const breadcrumbs = useMemo(() => matches.filter(x => x.handle?.breadcrumb), [matches])
  const navigation = useNavigation()
  return <Container className="my-3 position-relative">
    <div className="position-absolute top-0 w-25" style={{ right: '1rem' }}>
      <GrowlOutlet />
    </div>
    <Breadcrumb>
      {breadcrumbs.map((x, i) =>
        <Breadcrumb.Item key={x.id} linkAs={NavLink} linkProps={{to: x}} active={i == breadcrumbs.length - 1}>
          { isFunction(x.handle.breadcrumb) ? x.handle.breadcrumb() : x.handle.breadcrumb }
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
    {
      navigation.state == 'loading'
      ? <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
        </div>
      : <Outlet />
    }
  </Container>
}

export default Content
