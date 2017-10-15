import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';

import SearchForm from './SearchForm';
import CitiesTable from './CitiesTable';

const WEATHER_API_ENDPOINT = (process.env.NODE_ENV === 'production') ? '/api/v1/' : 'http://localhost:5000/api/v1/';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titile: '',
      cities: [],
      place: this.getPlaceParam() || 'tokyo',
    };
  }

  componentDidMount() {
    const place = this.getPlaceParam();
    if (place) {
      this.startSearch();
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      title: message,
    });
  }

  handlePlaceChange(place) {
    this.setState({ place });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  startSearch() {
    axios
      .get(`${WEATHER_API_ENDPOINT}${this.state.place}`)
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
        <SearchForm
          place={this.state.place}
          onPlaceChange={place => this.handlePlaceChange(place)}
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        <br />
        <br />
        <CitiesTable cities={this.state.cities} />
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;
