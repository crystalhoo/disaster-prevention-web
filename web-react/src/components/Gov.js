import { gql, useQuery } from '@apollo/client'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_PREVIOUSDATA = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [PreviousDataSort]
    $filter: PreviousDataWhere
  ) {
    previousData(
      options: { limit: $first, skip: $offset, sort: $orderBy }
      where: $filter
    ) {
      Date
      State
      Type
      Latitude
      Longitude
    }
  }
`

function Gov(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('ASC')
  const [orderBy, setOrderBy] = React.useState('Date')
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(10)
  const [filterState, setFilterState] = React.useState({ usernameFilter: '' })

  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { Date_CONTAINS: filterState.usernameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_PREVIOUSDATA, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: { [orderBy]: order },
      filter: getFilter(),
    },
  })

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'DESC'

    if (orderBy === property && order === 'DESC') {
      newOrder = 'ASC'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleFilterChange = (filterName) => (event) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }

  return (
    <Paper className={classes.root}>
      <Title>Past Data List</Title>
      <TextField
        id="search"
        label="Search Past Data by Date"
        className={classes.textField}
        value={filterState.usernameFilter}
        onChange={handleFilterChange('usernameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="Date"
                sortDirection={orderBy === 'Date' ? order.toLowerCase() : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'Date'}
                    direction={order.toLowerCase()}
                    onClick={() => handleSortRequest('Date')}
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell key="state">State</TableCell>
              <TableCell key="type">Type of Disaster</TableCell>
              <TableCell key="latitude">Latitude</TableCell>
              <TableCell key="longitude">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.previousData.map((n) => {
              return (
                <TableRow key={n.Date}>
                  <TableCell component="th" scope="row">
                    {n.Date}
                  </TableCell>
                  <TableCell>{n.State}</TableCell>
                  <TableCell>{n.Type}</TableCell>
                  <TableCell>{n.Latitude}</TableCell>
                  <TableCell>{n.Longitude}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(Gov)
