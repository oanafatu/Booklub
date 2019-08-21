import React, {useState} from 'react';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
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

export const HistoryContext = React.createContext(null);

function App() {
  const [history, setHistory] = useState({});
  return (
    <HistoryContext.Provider value={{history, setHistory}}>
      <HashRouter>
        <div className="main-container">
          <Route exact path='/login'  component={Login} />
          <PrivateRoute  path='/' component={UserProfile}/>
          <PrivateRoute  path='/bookclubs/:id/setcurrentbook' component={SetCurrentBook} />
          <PrivateRoute  path='/mylibrary'  component={MyLibrary} />
          <PrivateRoute  path='/mybookclubs' component={MyBookclubs} />
          <PrivateRoute  path='/booksearch'  component={BookSearch} />
          <PrivateRoute  path='/createclub'  component={CreateClub} />
          <PrivateRoute  path='/bookclub/:id' component={Bookclub} />
          <PrivateRoute  path='/bookclub/:id/addmembers' component={AddMembers} />
          <PrivateRoute  path='/myratings' component={MyRatings} />
        </div>
      </HashRouter>
    </HistoryContext.Provider>
  );
}

export default App;
