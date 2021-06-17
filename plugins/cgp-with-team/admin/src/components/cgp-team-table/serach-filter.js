import { Header } from '@buffetjs/custom';
import React, { Component } from "react";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cgpData: []
    };
  }


  backAction() {
    this.props.sendAttack();
  }

  addAction() {
    this.props.addButton();
  }
 

  componentDidMount() {}

  
  render() {
   const { screen, company, count } = this.props;
   const actions = [ {
    label: 'Back',
    onClick: () => this.backAction(),
    color: 'cancel',
    type: 'button',
  }]
  if(count == 0) {
    actions.push({
      label: 'Add',
      onClick: () => this.addAction(),
      color: 'primary',
      type: 'button',
    })
  }
    return (
      <div >
       {screen == 'Home'? <Header  
        title={{ label: 'CGP with team' }}
        content="CGP with team"
        /> : <Header  
        actions={actions}
        title={{ label: company }}
        content={ 'Count : ' + count }
        /> }
      </div>
    );
  }
}
export default SearchFilter;