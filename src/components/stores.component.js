import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'immutability-helper';


const UniformItem = props => (
  <tr>
    <td>{props.uniformitem.Category}</td>
    <td>{props.uniformitem.NSN}</td>
    <td>{props.uniformitem.Size1}</td>
    <td>{props.uniformitem.Size2}</td>
    <td>{props.uniformitem.Size3}</td>
    <td>{props.uniformitem.StockQty}</td>
    <td>
    <span class="input-group-btn">
                                        <button type="button" class="quantity-left-minus btn btn-danger btn-number"  onClick={() => { props.decrementStock(props.uniformitem.NSN) }}  data-type="minus" data-field="">
                                          <span class="glyphicon glyphicon-minus"></span>
                                        </button>

                                        <button type="button" class="quantity-right-plus btn btn-success btn-number"  onClick={() => { props.incrementStock(props.uniformitem.NSN) }} data-type="plus" data-field="">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </button>
                                    </span>

    </td>
  </tr>
)

const Category = props => (
  <button type="button" class="btn btn-primary" onClick={() => { props.filterItems(props.category) }}>{props.category}</button>
)

export default class Stores extends Component {
  constructor(props) {
    super(props);
    this.filterItems = this.filterItems.bind(this);
    this.incrementStock = this.incrementStock.bind(this);
    this.decrementStock = this.decrementStock.bind(this);
    this.state = {uniformitems: [],
    categories: [],
    displayeditems: []
  };
  }
  
  componentDidMount() {
    axios.get('http://localhost:2000/uniform/')
     .then(response => {
       this.setState({ uniformitems: response.data,  displayeditems: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
     axios.get('http://localhost:2000/uniform/categories')
     .then(response => {
       this.setState({ categories: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }
  

  decrementStock(id) {
    axios.post('http://localhost:2000/uniform/'+id+'/decrementstock')
    .then(res => {
      var dispindex = this.state.displayeditems.findIndex(el => el.NSN === id);
      var uniindex = this.state.uniformitems.findIndex(el => el.NSN === id);
      this.setState({displayeditems: update(this.state.displayeditems, {[dispindex]: {$set: res.data}}),
                    uniformitems: update(this.state.uniformitems, {[uniindex]: {$set: res.data}})
                    });          
    })
  }
  incrementStock(id) {
    axios.post('http://localhost:2000/uniform/'+id+'/incrementstock')
      .then(res => {
        var dispindex = this.state.displayeditems.findIndex(el => el.NSN === id);
        var uniindex = this.state.uniformitems.findIndex(el => el.NSN === id);
        this.setState({displayeditems: update(this.state.displayeditems, {[dispindex]: {$set: res.data}}),
                      uniformitems: update(this.state.uniformitems, {[uniindex]: {$set: res.data}})
                     });          
      })
      
  }

  // index = this.state.displayeditems.findIndex(el => this.state.displayeditems.NSN == id),
  filterItems(category) {
    this.setState({
      displayeditems: this.state.uniformitems.filter(ui => ui.Category === category)
    })
  }
    
  UniformItemsList() {
    return this.state.displayeditems.map(currentuniformitem => {
      return <UniformItem uniformitem={currentuniformitem} incrementStock={this.incrementStock} decrementStock={this.decrementStock} key={currentuniformitem.NSN}/>;
    })
  }
  CategoryList() {
    return this.state.categories.map(currentcategory => {
      return <Category category={currentcategory} filterItems={this.filterItems} key={currentcategory._id}/>;
    })
  }

  render() {
 
    return (
<div>
  <h3>Uniform Stock</h3>
  <div className="btn-group" role="group" aria-label="Category Filter">
{ this.CategoryList() }
</div>
  <table className="table">
    <thead className="thead-light">
      <tr>
      <th>Category</th>
        <th>NSN</th>
        <th>Size 1</th>
        <th>Size 2</th>
        <th>Size 3</th>
        <th>Stock Qty</th>
        <th>Actions</th>
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
