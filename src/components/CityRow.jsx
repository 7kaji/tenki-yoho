import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const CityRow = ({ city }) => (
  <TableRow>
    <TableRowColumn>{city.location.city}</TableRowColumn>
    <TableRowColumn>{city.forecasts[0].telop}</TableRowColumn>
    <TableRowColumn><img src={city.forecasts[0].image.url} alt={city.title} /></TableRowColumn>
  </TableRow>
);

CityRow.propTypes = {
  city: PropTypes.shape({
    location: PropTypes.object,
    forecasts: PropTypes.array,
    title: PropTypes.string,
  }).isRequired,
};

export default CityRow;
