import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import moment from 'moment'
import Loader from './loader'
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { addAvis } from "./actions";
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
            selectedDate: new Date(),
            avisErr: false,
            titleErr: false,
            rateErr: false,
            err: []
        };
        const useStyles = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
            },
        }));

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    hundelReset(){
        this.setState({
            rate: 0,
            avis: '',
            title: '',
            numCommande: 0,
            isPublic: false,
            loading: true,
            selectedDate: new Date(),
            avisErr: false,
            titleErr: false,
            rateErr: false,
            err: []
        })
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
        
        addAvis(data).then((res) => {
            console.log(res);
            if (res.data.success) {
                this.hundelReset();
            }else{
                this.setState({ err: JSON.parse(res.data) })
                if (this.state.err['avis']) {
                    this.setState({ avisErr: !this.state.avisErr })
                } if (this.state.err['rate']) {
                    this.setState({ rateErr: !this.state.rateErr })
                } if (this.state.err['title']) {
                    this.setState({ titleErr: !this.state.titleErr })
                }
            }
                this.setState({ loading: !this.state.loading })
                $("#formulaire").css("filter", "blur(0px)");
            console.log(this.state);
            
        })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.loading
                    && 
                    <Loader />
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
                    { this.state.rateErr ? <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error" style={{marginTop: '15px', float: 'right'}}>Rate is required.</p> : ''}
                    <TextField
                        label="Donnez votre avis"
                        helperText={this.state.err['avis']}
                        error={this.state.avisErr}
                        name="avis"
                        onChange={this.onChange}
                        placeholder="Donnez votre avis"
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
                        helperText={this.state.err['title']}
                        error={this.state.titleErr}
                        onChange={this.onChange}
                        label="Titre de votre avis"
                        placeholder="Titre de votre avis"
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
                                this.setState({ selectedDate: moment(DateChange).format("YYYY-MM-DD HH:mm:ss") });
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