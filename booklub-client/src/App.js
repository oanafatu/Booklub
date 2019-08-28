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
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={UserProfile}/>
          <Route exact path='/bookclubs/:id/setcurrentbook' component={SetCurrentBook} />
          <Route exact path='/mylibrary'  component={MyLibrary} />
          <Route exact path='/mybookclubs' component={MyBookclubs} />
          <Route exact path='/booksearch'  component={BookSearch} />
          <Route exact path='/createclub'  component={CreateClub} />
          <Route exact path='/bookclub/:id' component={Bookclub} />
          <Route exact path='/bookclub/:id/addmembers' component={AddMembers} />
          <Route exact path='/myratings' component={MyRatings} />
        </div>
      </HashRouter>
    </HistoryContext.Provider>
  );
}

export default App;
