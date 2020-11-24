import {Switch, Link, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Forum from './components/Forum/Forum';
import AddShow from './components/AddShow/AddShow';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/forum' component={Forum}/>
        <Route path='/addshow' component={AddShow}/>
        <Route render={() => {
            <div>
                <h2>
                    404 Error, Page Not Found
                    <Link to='/'>Return to login page</Link>
                </h2>
            </div>
        }} />
    </Switch>
)