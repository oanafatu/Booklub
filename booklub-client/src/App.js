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
  
  console.log('env', process.env.PUBLIC_URL);

  return (
    <HistoryContext.Provider value={{history, setHistory}}>
      <HashRouter>
        <div className="main-container">
          <Route exact path={process.env.PUBLIC_URL + '/login'}  component={Login} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/'} component={UserProfile}/>
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/bookclubs/:id/setcurrentbook'} component={SetCurrentBook} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/mylibrary'}  component={MyLibrary} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/mybookclubs'} component={MyBookclubs} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/booksearch'}  component={BookSearch} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/createclub' } component={CreateClub} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/bookclub/:id' } component={Bookclub} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/bookclub/:id/addmembers'} component={AddMembers} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/myratings'} component={MyRatings} />
        </div>
      </HashRouter>
    </HistoryContext.Provider>
  );
}

export default App;
