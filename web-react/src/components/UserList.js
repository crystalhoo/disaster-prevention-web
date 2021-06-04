import { gql, useMutation } from '@apollo/client'
import { Button, Paper, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
    padding: 20,
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
  textFieldSelect: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
    marginTop: 15,
  },
  button: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 40,
  },
})

const ADD_NEW_INFORMATION = gql`
  mutation createInformation(
    $State: String
    $condition: String
    $weather: String
  ) {
    createInformation(
      input: { State: $State, condition: $condition, weather: $weather }
    ) {
      information {
        State
        condition
        weather
      }
    }
  }
`

const selectStates = [
  {
    value: 'Sabah',
    label: 'Sabah',
  },
  {
    value: 'Sarawak',
    label: 'Sarawak',
  },
  {
    value: 'Selangor',
    label: 'Selangor',
  },
  {
    value: 'Kuala Lumpur',
    label: 'Kuala Lumpur',
  },
  {
    value: 'Johor',
    label: 'Johor',
  },
  {
    value: 'Kelantan',
    label: 'Kelantan',
  },
  {
    value: 'Pahang',
    label: 'Pahang',
  },
  {
    value: 'Negeri Sembilan',
    label: 'Negeri Sembilan',
  },
  {
    value: 'Perak',
    label: 'Perak',
  },
  {
    value: 'Kedah',
    label: 'Kedah',
  },
  {
    value: 'Terengganu',
    label: 'Terengganu',
  },
  {
    value: 'Perlis',
    label: 'Perlis',
  },
  {
    value: 'Penang',
    label: 'Penang',
  },
  {
    value: 'Malacca',
    label: 'Malacca',
  },
]

function UserList(props) {
  const { classes } = props
  const initialValues = {
    username: '',
    weather: '',
    condition: '',
  }
  const [state, setState] = React.useState(initialValues)

  const handleChanged = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const [selectState, setSelectState] = React.useState('Sabah')
  const selectStateChanged = (event) => {
    setSelectState(event.target.value)
  }

  const [createInformation] = useMutation(ADD_NEW_INFORMATION)

  const handleSubmit = () => {
    console.log(state.condition)
    console.log(state.weather)
    console.log(state.username)
    console.log(selectState)
    createInformation({
      variables: {
        State: selectState,
        condition: state.condition,
        weather: state.weather,
        username: state.username,
      },
    })
  }
  return (
    <Paper
      // onSubmit={(e) => {
      //   e.preventDefault()
      //   createInformation({
      //     variables: {
      //       chooseState: selectState,
      //       condition: state.condition,
      //       weather: state.weather,
      //       username: state.username,
      //     },
      //   })
      // }}
      className={classes.root}
    >
      <Title>How&apos;s Your Day?</Title>
      <TextField
        name="username"
        id="username"
        label="Username"
        className={classes.textField}
        value={state.username}
        onChange={handleChanged}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        name="weather"
        id="weather"
        label="Weather"
        className={classes.textField}
        value={state.weather}
        onChange={handleChanged}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        name="condition"
        id="condition"
        label="Condition"
        className={classes.textField}
        value={state.condition}
        onChange={handleChanged}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        id="chooseState"
        select
        label="State"
        className={classes.textFieldSelect}
        value={selectState}
        onChange={selectStateChanged}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
      >
        {selectStates.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={classes.textField}
          >
            {option.label}
          </option>
        ))}
      </TextField>
      <div className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(UserList)
