import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RoomPage from './pages/room/RoomPage';
import RoomAddPage from './pages/room/RoomAdd';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RoomPage} />
        <Route path="/habitaciones/agregar" component={RoomAddPage} />
      </Switch>
    </Router>
  );
};

export default App;