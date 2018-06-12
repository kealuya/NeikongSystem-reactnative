import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

import Util from './Util';
export default class DatePickerTool extends Component {
    constructor(props){
        super(props)
        this.state = {date:Util.getCurrentDate()}
    }

    render(){
        return (
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                androidMode = 'spinner'
                format="YYYY-MM-DD"
                minDate="2017-05-01"
                maxDate="2050-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={this.onChange}
            />
        )
    }

    onChange = date=>{
        this.setState({
            date:date
        });
    };
    getDateStr=()=>{
        return this.state.date;
    }
}