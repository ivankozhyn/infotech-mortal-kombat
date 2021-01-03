import { Route, Switch, Redirect } from 'react-router-dom'

import ChooseHero from '../../pages/ChooseHero/ChooseHero'
import VsScreen from '../../pages/VsScreen/VsScreen'
import { routes } from '../../router/routes'

import s from './App.module.scss'

export default function App() {
  return (
    <>
      <div className={s.smallScreen}>
        Requires a device with a wider screen.
      </div>
      <div className={s.app}>
        <>
          <Switch>
            <Route path={routes.ROOT}>
              <ChooseHero />
            </Route>
            <Route path={routes.VSSCREEN}>
              <VsScreen />
            </Route>
            <Redirect to={routes.ROOT} />
          </Switch>
        </>
      </div>
    </>
  )
}
