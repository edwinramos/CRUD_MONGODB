import React, { Component } from 'react';
import { Modal, Col, Form } from "react-bootstrap";
import ReactDOM from 'react-dom';

class EditModal extends Component {

    state = { loading: true };
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
    }

    onSave(onClose) {
        var obj = {};
        Object.keys(this.refs)
            .filter(key => key === 'frm_edit')
            .forEach(key => {
                obj = {
                    //Id: Number(ReactDOM.findDOMNode(this.refs[key]).elements.ID.value),
                    PersonId: Number(ReactDOM.findDOMNode(this.refs[key]).elements.PersonId.value),
                    Name: ReactDOM.findDOMNode(this.refs[key]).elements.Name.value,
                    LastName: ReactDOM.findDOMNode(this.refs[key]).elements.LastName.value
                };
            });
        console.log(obj);
        var url = 'crud/postPerson';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        };
        fetch(url, requestOptions)
            .then(
                (result) => {
                    onClose();
                },
                (error) => {
                    console.log(error);
                });
    }

    render() {
        const { onClose, objEdit, isOpen } = this.props // destructure

        return (
            <Modal
                size="lg"
                show={isOpen}
                onHide={() => onClose()}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={'frm_edit'}>
                        <Form.Group controlId="PersonId">
                            <Form.Control type="hidden" defaultValue={objEdit.personId} />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control defaultValue={objEdit.name}>

                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control defaultValue={objEdit.lastName}>

                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => this.onSave(onClose)} className="btn btn-success">Save</button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default EditModal;