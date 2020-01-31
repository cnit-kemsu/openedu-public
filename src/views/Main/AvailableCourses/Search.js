import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { History, Location, useRoute } from '@kemsu/router';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Search as useStyles } from './styles';

function searchCourse({ searchName }) {
  History.push(Location.path, { 'search-name': searchName });
}

function Search() {
  
  useRoute();
  const { 'search-name': searchName } = Location.search;
  const form = useForm(searchCourse, { searchName });

  const classes = useStyles();
  return <div className={classes.root}>

    <TextField className={classes.input}
      variant="outlined"
      comp={form}
      name="searchName"
      label="Поиск курсов"
    />
    <Button className={classes.button} variant="contained" color="primary" onClick={form.submit}><SearchIcon />Найти</Button>

  </div>;
}

export default memo(Search);