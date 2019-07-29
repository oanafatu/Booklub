import React, {useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
      <BrowserRouter>
        <div className="main-container">
          <Route exact path='/login'  component={Login} />
          <PrivateRoute exact path='/' component={UserProfile}/>
          <PrivateRoute exact path='/bookclubs/:id/setcurrentbook' component={SetCurrentBook} />
          <PrivateRoute exact path='/mylibrary'  component={MyLibrary} />
          <PrivateRoute exact path='/mybookclubs' component={MyBookclubs} />
          <PrivateRoute exact path='/booksearch'  component={BookSearch} />
          <PrivateRoute exact path='/createclub'  component={CreateClub} />
          <PrivateRoute exact path='/bookclub/:id' component={Bookclub} />
          <PrivateRoute exact path='/bookclub/:id/addmembers' component={AddMembers} />
          <PrivateRoute exact path='/myratings' component={MyRatings} />
        </div>
      </BrowserRouter>
    </HistoryContext.Provider>
  );
}

export default App;
