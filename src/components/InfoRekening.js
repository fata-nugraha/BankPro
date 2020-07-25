import React, { Component } from 'react'

class InfoRekening extends Component {
    onClick = (e) => {
        e.preventDefault();
        this.props.changeAuth(false);
        this.props.setRekening(null);
        this.props.setMoney(null);
    }

    render() {
        console.log(this.props)
        return (
            <div className="mb-5">
                <h3>Bank Pro</h3>
                <div>
                    <h5>Nama Pemilik : {this.props.nama}</h5>
                    <h5>No. Rekening : {this.props.noRekening}</h5>
                    <h5>Balance : {this.props.money}</h5>
                </div>
                <span>
                    <button
                        className="btn btn-danger"
                        onClick={this.onClick}
                    >
                        Logout
                        </button>
                </span>
            </div>
        )
    }
}

export default InfoRekening
