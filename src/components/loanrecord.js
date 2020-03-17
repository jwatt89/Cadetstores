import React, { Component } from 'react';
import axios from 'axios';
import {IssueUniform} from './issue.component'
import {DemandUniform} from './demand.component'

//TODO: Figure out why uniformlist is called twice.
const UniformItem = props => (
    <tr>
      <td></td>
      <td>{props.uniformitem.UniformItem[0].Size1}</td>
      <td>{props.uniformitem.UniformItem[0].Size2}</td>
      <td>{props.uniformitem.UniformItem[0].Size3}</td>
      <td>{props.uniformitem.count}</td>
      <td>
      <span className="input-group-btn">                                       
                                          <button type="button" className="btn btn-warning"  onClick={() => { ReturnUniformItem(props.uniformitem.UniformItem[0]._id,props.uniformitem.CadetID[0],props);}} data-type="plus" data-field="">
                                              <span className="glyphicon glyphicon-minus"></span>Return
                                          </button>
                                      </span>
  
      </td>
      <td>      
  
      </td>
      <td>      
      <span className="input-group-btn">
                                          <button type="button" className="btn btn-danger"  data-type="minus" data-field="">
                                            <span className="glyphicon glyphicon-trash"></span>Write Off
                                          </button>                                       
                                      </span>
      </td>
    </tr>
  )

  function ReturnUniformItem(UniformItemID,CdtID,props){
    const ItemReturn = {
      CadetID: CdtID,
      UniformItemID: UniformItemID,
    };
    axios.put('http://localhost:2000/uniform/return',ItemReturn)
    .then(response => {
      axios.post('http://localhost:2000/uniform/'+props.uniformitem.UniformItem[0].NSN+'/incrementstock')
      .then(response => {
          props.UpdateLoanRecord()
      })
    })
      .catch((error) => {
        console.log(error);
     })
  }


export default class LoanRecord extends Component {
    constructor(props) {
      super(props);
this.UpdateLoanRecord = this.UpdateLoanRecord.bind(this);
      this.state = {
      categories: [],
      loanitems: [],
      Cadet: []
    };
    }
    
    componentDidMount() {
      const { match: { params } } = this.props;
      axios.all([
        axios.get('http://localhost:2000/cadets/'+params.id+'/loanrecord'),
        axios.get('http://localhost:2000/uniform/categories'),
        axios.get('http://localhost:2000/cadets/'+params.id)
      ])
       .then(responseArr => {
         this.setState({
          loanitems: responseArr[0].data,
          categories: responseArr[1].data,
          Cadet: responseArr[2].data        
        });
       })
       .catch((error) => {
          console.log(error);
       })
     
    }
    UpdateLoanRecord(){
         axios.get('http://localhost:2000/cadets/'+this.state.Cadet._id+'/loanrecord')
      .then(response => {
        this.setState({ loanitems: response.data });
      })
    }

    CategoryList(currentcategory){
        var currentloancategoryitems = this.state.loanitems.filter(loanitem => loanitem.UniformItem[0].Category === currentcategory)
        return [<tr><th scope="row">{currentcategory}</th><td colSpan='4'></td>                                      
 <td><IssueUniform category={currentcategory} key={currentcategory} updateLoanRecord={this.UpdateLoanRecord} CdtName={this.state.Cadet.Name} CdtID={this.state.Cadet._id} /></td>
 <td><DemandUniform category={currentcategory} key={currentcategory} updateLoanRecord={this.UpdateLoanRecord} CdtName={this.state.Cadet.Name} CdtID={this.state.Cadet._id} /></td>
        </tr> ,currentloancategoryitems.map(currentloanitem =>{
        return <UniformItem UpdateLoanRecord={this.UpdateLoanRecord} uniformitem={currentloanitem} key={currentloanitem.UniformItem.NSN}/>;
        })
        ]}
    


    UniformItemsList() {
      return this.state.categories.map(currentcategory => {        
        return this.CategoryList(currentcategory)})
    }
 
  
    render() {
  
      return (
  <div>
    <h3>Cdt {this.state.Cadet.Name} Loan Card</h3>
    <table className="table">
      <thead className="thead-light">
        <tr>
        <th>Category</th>
          <th>Size 1</th>
          <th>Size 2</th>
          <th>Size 3</th>
          <th>Qty Currently Issued</th>
          <th>Issue/Return</th>
          <th>Demand</th>
          <th>Write Off</th>
        </tr>
      </thead>
      <tbody>
        { this.UniformItemsList() }
      </tbody>
    </table>
  </div>
      )
    }
  }
  