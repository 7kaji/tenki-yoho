import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const CityRow = ({ city }) => {
  const todayForecasts = city.forecasts[0];
  const max = (todayForecasts.temperature.max == null) ? '--' : todayForecasts.temperature.max.celsius;
  const min = (todayForecasts.temperature.min == null) ? '--' : todayForecasts.temperature.min.celsius;
  return (
    <TableRow>
      <TableRowColumn>{city.location.city}</TableRowColumn>
      <TableRowColumn>{todayForecasts.telop}</TableRowColumn>
      <TableRowColumn><img src={todayForecasts.image.url} alt={city.title} /></TableRowColumn>
      <TableRowColumn>最高 : {max}度</TableRowColumn>
      <TableRowColumn>最低 : {min}度</TableRowColumn>
    </TableRow>
  );
};

CityRow.propTypes = {
  city: PropTypes.shape({
    location: PropTypes.object,
    forecasts: PropTypes.array,
    title: PropTypes.string,
  }).isRequired,
};

export default CityRow;
