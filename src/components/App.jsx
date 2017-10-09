import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchForm from './SearchForm';
import CitiesTable from './CitiesTable';

const WEATER_API_ENDPOINT = '/api/v1/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titile: '',
      cities: [],
    };
  }

  setErrorMessage(message) {
    this.setState({
      title: message,
    });
  }

  handlePlaceSubmit(place) {
    axios
      .get(`${WEATER_API_ENDPOINT}${place}`)
      .then((results) => {
        switch (results.status) {
          case 200: {
            this.setState({
              cities: results.data,
            });
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
          }
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404: {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
          }
        }
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>天気予報</h1>
          <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
          <br />
          <br />
          <CitiesTable cities={this.state.cities} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
