import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_RECENT_INFORMATIONS_QUERY = gql`
  {
    information(options: { limit: 15 }) {
      infoID
      State
      condition
      weather
    }
  }
`

export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_RECENT_INFORMATIONS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Information Provided by Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.information.map((row) => (
            <TableRow key={row.infoID}>
              <TableCell>{row.State}</TableCell>
              <TableCell>{row.condition}</TableCell>
              <TableCell>{row.weather}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
