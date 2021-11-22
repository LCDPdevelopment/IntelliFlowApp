import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`)
        const postData = { name: name,description:description };
        axios.post('http://localhost:8080/AppCreation', postData)
        .then(response =>{
          console.log("Done");
        });
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create An App
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Enter App Details</h4>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="email">Name:</label>
                            <input class="form-control"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            <label for="pwd">Description:</label>
                            <input class="form-control"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function ApplicationCreator() {
    const [modalShow, setModalShow] = React.useState(false);
    var [myArray, myArraySet] = useState([]);


    useEffect(() => {
        if (myArray.length === 0) {
            try {
                axios
                    .get(
                        "http://localhost:8080/AppCreation"
                    )
                    .then((r) => {
                        console.log("r.data", r);
                        myArraySet(r.data);
                    })
                    .catch((e) => {
                        console.log("error", e);
                    });
            } catch (error) {
                console.log();
            }
        }
    }, [myArray]);



    return (
        <>

            <div className="App" class="bg-secondary text-white">
                <div class="jumbotron bg-dark text-white">
                    <h1 class="center display-1">IntelliFlow.io Studio</h1>
                    <p class="lead">
                        <Button class="btn btn-primary btn-lg" variant="primary" onClick={() => setModalShow(true)}>
                            Create A New App
                        </Button>  </p>
                </div>
                <hr></hr>
                {myArray.map(cards => (

                    <div class="card" style={{display:'inline-block',margin:'15px', width: '300px', color: 'black', 'border-radius': '18px' }}>
                        <div class="card-body">
                            <h5 class="card-title" style={{ 'text-align': 'center', 'font-size': '40px' }} >{cards.name}</h5>
                            {/* <h6 class="card-subtitle mb-2 text-muted">-------------</h6> */}
                            <p class="card-text" style={{ 'font-size': '22px' }}>{cards.description}</p>

                            <a href={'/?id=' + cards.name} class="card-link">Open Editor</a>
                        </div>
                    </div>
                ))}
                <br></br>
                <br></br>
                <br></br>


            </div>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}


export default ApplicationCreator;
