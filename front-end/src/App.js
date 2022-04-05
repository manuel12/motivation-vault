import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './components/Auth';
import Header from './components/Header';
import Navbar from './components/Navbar';

import HomePage from './components/Homepage';
import AddPage from './components/Addpage';
import BookPage from './components/Bookpage';
import PodcastPage from './components/Podcastpage';
import PodcastEpisodePage from './components/PodcastEpisodepage';
import MotivationalSpeechPage from './components/MotivationalSpeechpage';
import DetailPage from './components/Detailpage';
import AboutPage from './components/Aboutpage';
import NotFound from './components/NotFound';
import useToken from './components/useToken';
import classes from './css/App.module.css';

function App() {    
  const {token, setToken, deleteToken} = useToken()

  if(!token) {
    return <Auth setToken={setToken}/>
  }

  return (
      <div className={classes["App"]} data-test="app">
        <Header/>
        <Navbar deleteToken={deleteToken}/>
        <div className={classes["content"]}>
          <Router>
            <Switch>
              <Route exact path="/"  component={HomePage} />
              <Route exact path="/add/"  component={AddPage} />
              <Route exact path="/books/" component={BookPage} />
              <Route exact path="/books/:id/" component={DetailPage}/>
              <Route exact path="/podcasts/" component={PodcastPage} />
              <Route exact path="/podcasts/:id/" component={DetailPage}/>
              <Route exact path="/podcasts-episodes/" component={PodcastEpisodePage} />
              <Route exact path="/motivational-speeches/" component={MotivationalSpeechPage} />
              <Route exact path="/motivational-speeches/:id/" component={DetailPage}/>
              <Route exact path="/about/" component={AboutPage} />
              <Route exact path="/:id/" component={DetailPage}/>
              <Route path="*" component={NotFound} />  
            </Switch>
          </Router>
        </div>
      </div>
    );
}

export default App;
