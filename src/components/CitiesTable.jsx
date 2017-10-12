import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
} from 'material-ui/Table';

import CityRow from './CityRow';

const CitiesTable = ({ cities }) => (
  <Table displaySelectAll={false} adjustForCheckbox={false}>
    <TableBody displayRowCheckbox={false}>
      {cities.map((city, index) => (<CityRow key={index} city={city} />))}
    </TableBody>
  </Table>
);

CitiesTable.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.any),
};

CitiesTable.defaultProps = {
  cities: [],
};

export default CitiesTable;
