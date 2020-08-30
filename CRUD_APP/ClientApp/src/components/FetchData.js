import React, { Component } from 'react';
import EditModal from './EditModal';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            forecasts: [], loading: true, editModal: false, objEdit: {}
        };

        this.closeModal = this.closeModal.bind(this);
        //this.renderTable = this.renderTable.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }

    async editPopup(id) {
        const response = await fetch('crud/getPerson/' + id);
        const data = await response.json();
        console.log(data);
        this.setState({ editModal: true, objEdit: data });
    }

    deleteRow(id) {
        var res = window.confirm("Would you like to delete this row?");
        if (res === true) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch('crud/deletePerson/' + id, requestOptions)
                .then(
                    (result) => {
                        this.populateData();
                    },
                    (error) => {
                        console.log(error);
                    });
        }
    }

    static renderTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(row =>
                        <tr key={row.personId}>
                            <td>{row.name}</td>
                            <td>{row.lastName}</td>
                            <td><button onClick={() => this.editPopup(row.personId) } className="btn btn-primary">Edit</button> <button onClick={() => this.deleteRow(row.personId) } className="btn btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        return (
            <div>
                <h1 id="tabelLabel" >Persons</h1>
                <button onClick={() => this.editPopup(0)} className="btn btn-primary">Add</button>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.forecasts.map(row =>
                            <tr key={row.personId}>
                                <td>{row.name}</td>
                                <td>{row.lastName}</td>
                                <td><button onClick={() => this.editPopup(row.personId)} className="btn btn-primary">Edit</button> <button onClick={() => this.deleteRow(row.personId)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <EditModal onClose={() => { this.closeModal() }} objEdit={this.state.objEdit} isOpen={this.state.editModal} />
            </div>
        );
    }

    async populateData() {
        const response = await fetch('crud/getData');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

    async closeModal() {
        this.setState({ editModal: false, loading: true });
        this.populateData();
    }

    
}
