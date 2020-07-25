import React, { Component } from 'react'
import InfoRekening from './../../components/InfoRekening'
import Transfer from './../../components/Transfer';
import TransferHistory from './../../components/TransferHistory';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Home extends Component {
    state = {
        nama: '',
        no_rekening: null,
        balance: null,
        list_transaksi: []
    }

    getUserData = (id) => {
        var config = {
            headers: { 'Content-Type': 'text/xml' }
        };

        let form =
            `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
            <SOAP-ENV:Header/>
            <S:Body xmlns:ns2="http://bank.webedeh.com/">
                <ns2:getDataNasabah>
                    <rekening>${id}</rekening>
                </ns2:getDataNasabah>
            </S:Body>
        </S:Envelope>`

        axios.post(
            `http://engima.tannaga.com:8080/bank/bankws`, form, config)
            .then((response) => {
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(response.data);    // Assume xmlText contains the example XML
                // console.log(xml);
                // console.log(xml.getElementsByTagName('return')[0].children);
                // console.log(xml.getElementsByTagName('return')[0].children[0].getElementsByTagName('no_rekening')[0].value);
                // console.log(xml.getElementsByTagName('return')[0].children[1].getElementsByTagName('nama')[0].value);
                // console.log(xml.getElementsByTagName('return')[0].children[2].getElementsByTagName('saldo')[0].value);
                // console.log(xml.getElementsByTagName('return')[0].children[3].children);

                let trf_list = xml.getElementsByTagName('return')[0].children.slice(3)
                // console.log(trf_list)
                // norek = xml.getElementsByTagName('return')[0].children[0].getElementsByTagName('no_rekening')[0].value
                // var auth = xml.getElementsByTagName('return')[0].value;
                this.setState({ no_rekening: xml.getElementsByTagName('return')[0].children[0].getElementsByTagName('no_rekening')[0].value })
                this.setState({ nama: xml.getElementsByTagName('return')[0].children[1].getElementsByTagName('nama')[0].value })
                this.setState({ balance: xml.getElementsByTagName('return')[0].children[2].getElementsByTagName('saldo')[0].value })
                this.setState({ list_transaksi: trf_list })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount = () => {
        console.log("test")
        this.getUserData(this.props.noRekening);
    }

    render() {
        if (this.props.isAuth) {
            return (
                <div>
                    <InfoRekening
                        noRekening={this.props.noRekening}
                        nama={this.state.nama}
                        money={this.state.balance}
                        changeAuth={this.props.changeAuth}
                        setRekening={this.props.setRekening}
                        setMoney={this.props.setMoney}
                    />
                    <Transfer
                        noRekening={this.props.noRekening}
                        money={this.state.balance}
                    />
                    <TransferHistory
                        trf_list={this.state.list_transaksi}
                    />
                </div>
            )
        } else {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
    }
}

export default Home
