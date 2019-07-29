import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import MainHeaderNav from './mainheadernav'
import MainMenu from './mainmenu'
import { Switch } from 'react-router';
import * as ReactRouterDOM from 'react-router-dom';


@hot
export default class App extends React.Component {
  render() {
    return (
      <div>
        <MainHeaderNav/>
        <div className="mainmenu">
          <MainMenu></MainMenu>
        </div>
        <ReactRouterDOM.HashRouter>
          <React.Suspense fallback={null}>
            <ReactRouterDOM.Switch>
              <ReactRouterDOM.Route path="/app/compound" component={React.lazy(() => import('../compound'))}/>
              <ReactRouterDOM.Route path="/app/split" component={React.lazy(() => import('../split'))}/>
            </ReactRouterDOM.Switch>
          </React.Suspense>
        </ReactRouterDOM.HashRouter>
      </div>
    )
  }
}
