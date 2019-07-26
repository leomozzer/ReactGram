import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Feed from '../posts/Feed'
import New from '../new/New'

// import { Container } from './styles';

export default function AppRoutes() {
  return (
    <div>
        <Switch>
            <Route path="/" exact component={Feed}/>
            <Route path="/new" exact component={New}/>
        </Switch>
    </div>
  );
}
