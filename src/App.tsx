import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './screens/Register';

function App() {
  return (
	  <Router>
		  <Switch>
			  <Route path={'/'} component={Register} />
		  </Switch>
	  </Router>
  );
}

export default App;
