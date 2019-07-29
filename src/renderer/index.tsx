import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import store from './store'
import * as ReactRouterDOM from 'react-router-dom';
import './assets/icon/iconfont.css'
import './index.css'
document.head.appendChild(document.createElement('style')).innerHTML = `
* {
  box-sizing: border-box;
}
body {
  font-family: Segoe MDL2 Assets, Segoe WPC, Segoe UI, sans-serif;
  margin: 0;
}
app-root {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: #6f6f6f;
}
`;

ReactDOM.render(
  <Provider {...store}>
    <ReactRouterDOM.HashRouter>
      <React.Suspense fallback={null}>
        <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path="/app" component={React.lazy(() => import('./windows/app'))} />
          <ReactRouterDOM.Route path="/settings" component={React.lazy(() => import('./windows/settings'))} />
          <ReactRouterDOM.Redirect to="/app/compound" />
        </ReactRouterDOM.Switch>
      </React.Suspense>
    </ReactRouterDOM.HashRouter>
  </Provider>,
  document.body.appendChild(document.createElement('app-root')),
);
