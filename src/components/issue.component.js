import React, { Component, useState }  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//TODO: 
//Reduce stock qty (prevent minus stock)
//Validate: - Date in present/past
//          - Uniform item picked
//          - In stock (override permitted)


export function IssueUniform(category) {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   return (
      <>
   <button type="button" className="btn btn-success"  data-type="plus" data-field=""onClick={handleShow} >
        <span className="glyphicon glyphicon-plus"></span>Issue</button>          
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Issue Uniform</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <IssueUniformForm updateLoanRecord={category.updateLoanRecord} handleClose={handleClose} category={category.category} CdtName={category.CdtName} CdtID={category.CdtID} />
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="issueuniform">
              Confirm
            </Button>
          </Modal.Footer>
         
        </Modal>
      
      </>
    );
  };
 // <a href="#" className="list-group-item list-group-item-action">


 const UniformItem = props => (
  <button type="button" className={"list-group-item", "list-group-item-action" , props.uniformitem.StockQty ? "0" : "alert-warning"} onClick={() => props.SelectUniformItem(props.uniformitem._id,props.uniformitem.NSN)}>

  <div className="row ">

    <div className="col-sm-3">{props.uniformitem.NSN}</div>
    <div className="col-sm-2">{props.uniformitem.Size1}</div>
    <div className="col-sm-2">{props.uniformitem.Size2}</div>
    <div className="col-sm-2">{props.uniformitem.Size3}</div>
    <div className="col-sm-2">{props.uniformitem.StockQty}</div>
  </div>
  </button>
)



  class IssueUniformForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {categories: [],
        UniformItems: [],
        category: props.category,
      CdtID: props.CdtID,
      CdtName: props.CdtName,
      UniformID: '',
      UniformNSN: '',
      DateIssued: new Date()};
  
      this.handleChange = this.handleChange.bind(this);
      this.SelectUniformItem = this.SelectUniformItem.bind(this)
      this.ActionIssueUniform = this.ActionIssueUniform.bind(this);
      this.closeform = this.props.handleClose.bind(this);
      this.updateLoanRecord = this.props.updateLoanRecord.bind(this);
 
    }
  
    
    SelectUniformItem(uniid, uniNSN){
      this.setState({UniformID: uniid,
                    UniformNSN: uniNSN});
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
      if(event.target.name === "category")
      {
        axios.get('http://localhost:2000/uniform/categories/'+event.target.value)
        .then(response => {
          this.setState({ UniformItems: response.data});
        })
      };
    }
    handleDateChange = date => {
      this.setState({
        DateIssued: date
      });
    };
  
    componentDidMount() {
       axios.get('http://localhost:2000/uniform/categories')
       .then(response => {
         this.setState({ categories: response.data });
       })
       .catch((error) => {
          console.log(error);
       })
       if(this.state.category !== "")
       {
         axios.get('http://localhost:2000/uniform/categories/'+ this.state.category)
         .then(response => {
           this.setState({ UniformItems: response.data});
         })
       };
      }




    ActionIssueUniform(event) {

        const newIssue = {
        CadetID: this.state.CdtID,
        UniformItemID: this.state.UniformID,
        DateIssued: this.state.DateIssued,
      };
      axios.post('http://localhost:2000/uniform/issue',newIssue)
      .then(response => {
        axios.get('http://localhost:2000/uniform/'+this.state.UniformNSN)
        .then(response => { 
        if(response.data[0].StockQty !== 0){
          axios.post('http://localhost:2000/uniform/'+this.state.UniformNSN+'/decrementstock')
          .then(response => {

          })
        }
        })
        this.closeform();
        this.updateLoanRecord();
     })
      .catch((error) => {
         console.log(error);
      }) 
      event.preventDefault();
   
    }
    
    UniformItemsList() {
      return this.state.UniformItems.map(currentuniformitem => {
        return <UniformItem uniformitem={currentuniformitem} SelectUniformItem={this.SelectUniformItem} key={currentuniformitem.NSN}/>;
      })
    }

    render() {
      return (
        <form id="issueuniform" onSubmit={this.ActionIssueUniform}>
                <div className="row">
          <div className="col"><label>Cadet: </label>
          <input className="form-control" type="text" value={this.state.CdtName} readOnly />
          </div>
          </div>
        <div className="row">
          <div className="col"><label>Category: </label>
          <select name="category" className="form-control" value={this.state.category} onChange={this.handleChange}>
          {
                  this.state.categories.map(function(category) {
                    return <option 
                      key={category}
                      value={category}>{category}
                      </option>;
                  })
                }
      </select>
            
            </div>
            </div>
            <div className="row">
            <div className="col">
            <label>Date: </label>
            <div>
              <DatePicker 
               dateFormat="dd/MM/yyyy"
                selected={this.state.DateIssued}
                onChange={this.handleDateChange}
              />
          </div>
          </div>
      </div>
      <div className="row">
      <div className="col">

      <div className="list-group">
      <div className="list-group-item list-group-item-dark">
      <div className="row">
      <div className="col-sm-3">NSN</div>
      <div className="col-sm-2">Size 1</div>
      <div className="col-sm-2">Size 2</div>
      <div className="col-sm-2">Size 3</div>
      <div className="col-sm-2">Stock Qty</div>
      </div>
      </div> 
      { this.UniformItemsList() }
      </div>
</div>
</div>
         </form>
      );
    }
  }
  