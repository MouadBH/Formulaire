/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            avis: '',
            title: '',
            numCommande: 0,
            isPublic: false,
            loading: false,
            selectedDate: new Date()
        };
        const useStyles = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
            },
        }));

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault(); 
        console.log(this.state);
        $("#formulaire").css("filter", "blur(1.8px)");
        this.setState({ loading: !this.state.loading })
        const data = {
            rate: this.state.rate,
            avis: this.state.avis,
            title: this.state.title,
            numCommande: this.state.numCommande,
            isPublic: this.state.isPublic,
            selectedDate: this.state.selectedDate
        }
        
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.loading
                    && 
                    <div className="vBlock">
                        <CircularProgress size={68} style={{color: '#2ba748',position: 'absolute',top: '41%',left: '38%',zIndex: 1,}} /> 
                    </div>
                }
                <form onSubmit={this.onSubmit} id="formulaire" autoComplete="off">
                    <h3>Donnez une note générale</h3>
                    <Rating
                        name="rate"
                        style={{ margin: '8px 0' }}
                        value={this.state.rate}
                        onChange={(event, newValue) => {
                            this.setState({ rate: newValue });
                        }}
                    />

                    <TextField
                        label="Donnez votre avis"
                        name="avis"
                        onChange={this.onChange}
                        placeholder="MultiLine with rows: 2 and rowsMax: 4"
                        multiline={true}
                        rows={6}
                        fullWidth
                        rowsMax={8}
                        variant="outlined"
                        style={{ margin: '8px 0' }}
                    />
                    <TextField
                        id="outlined-textarea"
                        name="title"
                        onChange={this.onChange}
                        label="Titre de votre avis"
                        placeholder="Placeholder"
                        fullWidth
                        multiline
                        variant="outlined"
                        style={{ margin: '8px 0' }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            name="selectedDate"
                            label="Date de votre expérience (en option)"
                            format="dd/MM/yyyy"
                            value={this.state.selectedDate}
                            helperText="Avec une durée (vacances, travaux)"
                            fullWidth
                            variant="outlined"
                            onChange={(DateChange) => {
                                this.setState({ selectedDate: DateChange });
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{ margin: '8px 0' }}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        id="outlined-textarea"
                        name="numCommande"
                        onChange={this.onChange}
                        label="Votre numéro de commande"
                        placeholder="en option"
                        fullWidth
                        multiline
                        variant="outlined"
                        style={{ margin: '8px 0' }}
                    />
                    <div className="row float-right" style={{ margin: '8px 0' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ backgroundColor: '#28a745' }}
                            className={this.useStyles}>
                            Publiez votre message
                        </Button>
                        <FormControlLabel
                            value="start"
                            name="isPublic"
                            control={<Switch checked={this.state.isPublic} color="primary" />}
                            onChange={() => {
                                this.setState({ isPublic: !this.state.isPublic });
                            }}
                            label="Public"
                            labelPlacement="start"
                        />
                    </div>
                </form>
            </div>

        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}