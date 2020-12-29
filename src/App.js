/*jshint esversion: 6 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";

import "./App.scss";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         {/* //Para que cuando renderice un componente, no renderice algun otro, lo envolvemos en un switch */}
//         <Switch>
//           {routes.map((route, index) => (
//             //llamamos un componente con sus props, ...route es para agregar al array la route que llevamos:
//             <RouterWithSubRoutes key={index} {...route} />
//           ))}
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// }
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// Creamos una función que haga la distribución
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
