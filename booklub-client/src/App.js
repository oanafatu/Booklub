import React, {useState} from 'react';
import { BrowserRouter, Route, HashRouter, Redirect } from 'react-router-dom';
import BookSearch from './Views/BookSearch';
import MyLibrary from './Views/MyLibrary';
import CreateClub from './Views/CreateClub';
import Bookclub from './Views/Bookclub';
import AddMembers from './Views/AddMembers';
import UserProfile from './Views/UserProfile';
import MyBookclubs from './Views/MyBookclubs';
import Login from './Views/Login';
import SetCurrentBook from './Views/SetCurrentBook';
import PrivateRoute from './Components/PrivateRoute';
import MyRatings from './Views/MyRatings';
import gauth from './helper/googleAuth';

export const HistoryContext = React.createContext(null);

function App() {
  const [history, setHistory] = useState({});

  //temporary
  const isValid = gauth.getCookie('G_AUTHUSER_H');

  console.log('valid_no func: ', isValid, ' direct: ', gauth.getCookie('userId'))

  return (
    <HistoryContext.Provider value={{history, setHistory}}>
      <HashRouter>
        <div className="main-container">
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={isValid ? UserProfile : () => <Redirect to= '/login' />}/>
          <Route exact path='/bookclubs/:id/setcurrentbook' component={isValid ? SetCurrentBook : () => <Redirect to= '/login' />} />
          <Route exact path='/mylibrary'  component={isValid ? MyLibrary : () => <Redirect to='/login' />} />
          <Route exact path='/mybookclubs' component={isValid ? MyBookclubs : () => <Redirect to='/login' />} />
          <Route exact path='/booksearch'  component={isValid ? BookSearch : () => <Redirect to='/login' />} />
          <Route exact path='/createclub'  component={isValid ? CreateClub : () => <Redirect to='/login' />} />
          <Route exact path='/bookclub/:id' component={isValid ? Bookclub : () => <Redirect to='/login' /> }/>
          <Route exact path='/bookclub/:id/addmembers' component={isValid ? AddMembers : () => <Redirect to='/login' />} />
          <Route exact path='/myratings' component={isValid ? MyRatings : () => <Redirect to='/login' />} />
        </div>
      </HashRouter>
    </HistoryContext.Provider>
  );
}

export default App;

