import React from 'react';
import axios from 'axios';
import '../css/style.css';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    state = {
        input: '',
        isAuth: false
    }

    constructor(props) {
        super(props)
    }

    validateUser = (id) => {
        var config = {
            headers: { 'Content-Type': 'text/xml' }
        };

        let form =
            `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
            <SOAP-ENV:Header/>
            <S:Body xmlns:ns2="http://bank.webedeh.com/">
                <ns2:isRekeningValid>
                    <rekening>${id}</rekening>
                </ns2:isRekeningValid>
            </S:Body>
        </S:Envelope>`

        axios.post(
            `http://engima.tannaga.com:8080/bank/bankws`, form, config)
            .then((response) => {
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(response.data);    // Assume xmlText contains the example XML
                // console.log(xml);
                // console.log(xml.getElementsByTagName('return'));
                var auth = xml.getElementsByTagName('return')[0].value;
                this.setState({ isAuth: auth })
            }).then(() => this.handleLogin())
            .catch(function (error) {
                console.log(error);
            });

    }

    handleLogin() {
        if (this.state.isAuth) {
            this.props.setRekening(this.state.input)
            // this.props.setMoney(100000)
            // alert('Berhasil');
            this.props.changeAuth(true)
            this.props.history.push('/');
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.validateUser(this.state.input)
        
        // if (this.state.input == "13517016") {
        //     this.props.setRekening(this.state.input)
        //     this.props.setMoney(100000)
        //     // alert('Berhasil');
        //     this.props.changeAuth(true)
        // }
    }

    onChange = async e => {
        e.preventDefault()
        await this.setState({ input: e.target.value })
        this.props.setRekening(this.state.input)
    }

    render() {
        if (this.props.isAuth == false) {
            return (
                <div>
                    <form onSubmit={this.onSubmit} className="login-form">
                        <h3>Bank Pro</h3>
                        <div className="form-group">
                            <label htmlFor="login-form" id="login-label">
                                No. Rekening
                            </label>
                            <input
                                type="text"
                                name="noRekening"
                                id="login-form"
                                className="form-control"
                                value={this.state.input}
                                placeholder="Masukkan nomor rekening di sini"
                                onChange={this.onChange}>
                            </input>
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-danger">
                        </input>
                    </form>
                </div>
            )
        } else {
            return null
        }
    }
}

export default withRouter(Login);
