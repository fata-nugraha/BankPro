import React from 'react'
import '../css/style.css'
import axios from 'axios'


class Transfer extends React.Component {
    state = {
        rekTujuan: null,
        money: null
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSubmit = () => {
        alert(this.props.noRekening)
        alert(this.state.rekTujuan)
        alert(this.state.money)
        this.sendMoney()
    }

    setRekTujuan = async e => {
        e.preventDefault()
        await this.setState({ rekTujuan: e.target.value })
    }

    setNominal = async e => {
        e.preventDefault()
        await this.setState({ money: e.target.value })
    }

    sendMoney = () => {
        var config = {
            headers: { 'Content-Type': 'text/xml' }
        };

        let form =
            `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
            <SOAP-ENV:Header/>
            <S:Body xmlns:ns2="http://bank.webedeh.com/">
                <ns2:transfer>
                    <rekening>${this.props.noRekening}</rekening>
                    <rekening_tujuan>${this.state.rekTujuan}</rekening_tujuan>
                    <uang>${this.state.money}</uang>
                </ns2:transfer>
            </S:Body>
        </S:Envelope>`

        axios.post(
            `http://engima.tannaga.com:8080/bank/bankws`, form, config)
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="mb-5">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="rekening-tujuan">Rekening tujuan</label>
                        <input
                            type="text"
                            name="rekeningTujuan"
                            id="rekening-tujuan"
                            className="form-control"
                            placeholder="Masukkan rekening tujuan"
                            onChange={this.setRekTujuan}>
                        </input>
                        <label htmlFor="nominal">Nominal</label>
                        <input
                            type="text"
                            name="nominal"
                            id="nominal"
                            className="form-control"
                            placeholder="Masukkan nominal"
                            onChange={this.setNominal}>
                        </input>
                    </div>
                    <input
                        type="submit"
                        name="Transfer"
                        className="btn btn-danger"
                    ></input>
                </form>
            </div>
        )
    }
}
export default Transfer
