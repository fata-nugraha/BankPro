import React from 'react'
import './../css/style.css';


const TransferHistory = (props) => {
    // console.log("testtt")
    // console.log(props.trf_list);
    let items = props.trf_list.map((item, index) =>
        <tr key={index}>
            <td>{item.children[1].value}</td>
            <td>{item.children[3].value}</td>
            <td>{item.children[2].value}</td>
            <td>{item.children[4].value}</td>
        </tr>
    )
    return (
        <div>
            <h4 id="heading">Transfer History</h4>
            <table className="table">
                <tr>
                    <th>Rekening Tujuan</th>
                    <th>Jenis Transaksi</th>
                    <th>Jumlah</th>
                    <th>Waktu Transaksi</th>
                </tr>
                {items}
            </table>
        </div>
    )
}

export default TransferHistory
