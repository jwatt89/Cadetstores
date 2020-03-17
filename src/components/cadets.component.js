import React, { Component, useState }  from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Cadet = props => (
  <tr>
    <td>{props.cadet.Name}</td>
    <td>{props.cadet.Gender}</td>    
    <td><a href={"cadets/"+props.cadet._id+"/loanrecord"} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Issue/Return Uniform</a><button  className="btn btn-primary">View Scores</button><button  className="btn btn-primary">View Demands</button>{props.DeleteCadet(props.cadet._id,props.cadet.Name)}</td>


  </tr>
)

 
class AddCdtForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {CdtName: '',Gender: ''};

    this.handleChange = this.handleChange.bind(this);
    this.ActionAddCadet = this.ActionAddCadet.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  ActionAddCadet(event) {

      const newCdt = {
      Name: this.state.CdtName,
      Gender: this.state.gender,
    };
console.log(newCdt)
    axios.post('http://localhost:2000/cadets/add',newCdt)
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
       console.log(error);
    })
    event.preventDefault();
  }
  
  render() {
    return (
      <form id="addcadet" onSubmit={this.ActionAddCadet}>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" name="CdtName" placeholder="Cadet Name"required value={this.state.CdtName} onChange={this.handleChange} />
          </div>
        <div className="col">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="RadioM" name="gender" value="M" onChange={this.handleChange}  required/>
            <label className="form-check-label" for="radioM">Male</label>
          </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="radioF" name="gender" value="F" onChange={this.handleChange} required/>
          <label className="form-check-label" for="radioF">Female</label>
        </div>
      </div>
    </div>
       </form>
    );
  }
}



function AddCadets() {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="btn btn-success btn-lg" variant="danger" onClick={handleShow}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add Cadets
      </button>
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cadets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<AddCdtForm />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="addcadet">
            Confirm
          </Button>
        </Modal.Footer>
       
      </Modal>
    
    </>
  );
};


export default class Cadets extends Component {



  constructor(props) {
    super(props);

    this.DeleteCadet = this.DeleteCadet.bind(this);
    //this.decrementStock = this.decrementStock.bind(this);


    this.state = {cadets: []};
  }

  componentDidMount() {
    axios.get('http://localhost:2000/cadets/')
     .then(response => {
       this.setState({ cadets: response.data,  displayeditems: response.data });
     })
     .catch((error) => {
        console.log(error);
     }) 
  }

  CadetList() {
    return this.state.cadets.map(currentcadet => {
      return <Cadet cadet={currentcadet} DeleteCadet={this.DeleteCadet} key={currentcadet._id}/>;
    })
  }

  ActionDeleteCadet(id) {

     axios.delete('http://localhost:2000/cadets/'+id)
    .then(response => {
      this.filterCadets(id);
    })
    .catch((error) => {
       console.log(error);
    }) 
  
  }
  
  filterCadets(id) {
    this.setState({
      cadets: this.state.cadets.filter(cdt => cdt._id !== id)
    })
  }


 DeleteCadet(id,name) {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
      <>
        <button type="button" className="btn btn-alert btn-lg" variant="danger" onClick={handleShow}>
  <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
</button>
          
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body><div className="alert alert-danger" role="alert">
Are you sure you want to delete cadet {name}?</div></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={()=>this.ActionDeleteCadet(id)} >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  render() {

    return (
<div>
  <h3>Cadets</h3> 
  <AddCadets />

  <table className="table">
    <thead className="thead-light">
      <tr>
      <th>Name</th>
        <th>Gender</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    { this.CadetList() }
    </tbody>
  </table>


</div>
    )
  }
}