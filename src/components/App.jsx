import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import SearchPage from './SearchPage';
import About from './About';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="app">
            <AppBar
              title="天気予報"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={this.handleToggle}
              onTitleTouchTap={this.handleToggle}
              onRightIconButtonTouchTap={this.handleToggle}
            />
            <Drawer open={this.state.open}>
              <Link to="/"><MenuItem>天気検索</MenuItem></Link>
              <Link to="/about"><MenuItem>このサイトについて</MenuItem></Link>
            </Drawer>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
