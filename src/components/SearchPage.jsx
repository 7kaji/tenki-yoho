import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import CitiesTable from './CitiesTable';

const WEATHER_API_ENDPOINT = (process.env.NODE_ENV === 'production') ? '/api/v1/' : 'http://localhost:5000/api/v1/';

class SearchPage extends Component {
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
      .get(`${WEATHER_API_ENDPOINT}${place}`)
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
      <div>
        <br />
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <br />
        <br />
        <CitiesTable cities={this.state.cities} />
      </div>
    );
  }
}

export default SearchPage;
