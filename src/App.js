import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import NewsComponent from "./NewsComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function App() {


    const [searchText, setSearchText] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");

    let initialStartDate = new Date();
    initialStartDate.setDate(initialStartDate.getDate() - 365);
    const [selectedStartDate, setSelectedStartDate] = useState(initialStartDate);
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());



    const classes = useStyles();
    const [news, setNews] = useState([]);


    useEffect(() => {
        loadNews();
    }, [searchText,searchAuthor,selectedStartDate, selectedEndDate]);

    const loadNews = async () => {
        let URL = "";

        let startSeconds = selectedStartDate.getTime() / 1000;
        let endSeconds = selectedEndDate.getTime() / 1000;

        if(!searchAuthor){
            URL = "https://hn.algolia.com/api/v1/search_by_date?query=" + searchText  + "&numericFilters=created_at_i>" + startSeconds + ",created_at_i<" + endSeconds;;
        }
        else if(!searchText){
            URL = "https://hn.algolia.com/api/v1/search_by_date?tags=author_" + searchAuthor + "&numericFilters=created_at_i>" + startSeconds + ",created_at_i<" + endSeconds;
        }
        else{
            URL = "https://hn.algolia.com/api/v1/search_by_date?tags=author_" + searchAuthor + "&query=" + searchText  + "&numericFilters=created_at_i>" + startSeconds + ",created_at_i<" + endSeconds;;
        }

        // https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i%3E1561346397,created_at_i%3C1592968797

        const response = await fetch(URL);
        const data = await response.json();
        setNews(data.hits);
    }

    const onChange = (e) => {
        setSearchText(e.target.value);
    };

    const onChangeAuthor =  (e) => {
       setSearchAuthor(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setSelectedStartDate(e);
    };

    const handleEndDateChange = (e) => {
        setSelectedEndDate(e);
    };

  return (
    <div className="App">
      <header className="App-header">
          <div id="formContainer">
              <div id="fieldContainer">
                  <div>Search By Term</div>
                  <TextField value={searchText} onChange={onChange} />
              </div>
              <div id="fieldContainer">
                  <div>Search By Author</div>
                  <TextField value={searchAuthor} onChange={onChangeAuthor} />
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div id="dateContainer">
                  <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-start"
                      label="Start Date"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                  />
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-end"
                          label="End Date"
                          value={selectedEndDate}
                          onChange={handleEndDateChange}
                          KeyboardButtonProps={{
                              'aria-label': 'change date',
                          }}
                      />
              </div>
              </MuiPickersUtilsProvider>
          </div>

          {news.map((post, index) => (
              <NewsComponent key={index} index={index} post={post} />
          ))}
      </header>
    </div>
  );
}

export default App;
