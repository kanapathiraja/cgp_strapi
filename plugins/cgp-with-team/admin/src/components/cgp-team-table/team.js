import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { InputSelect, InputText , Button} from "strapi-helper-plugin";
import { Link } from 'react-router-dom';
import axios from 'axios'
import SearchFilter from "./serach-filter";
import { Container, Block } from "../../containers/HomePage/components";
import LoadingIndicatorPage from "./LoadingIndicator";
import pluginId from "../../pluginId";
import { Table } from "@buffetjs/core";

class TeamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cgpData: [], 
      cgpParentData: [],
      _searchValue: '',
      _condition: '',
      _search: '',
      loadingFilter: false
    };
  }
 


  componentDidMount() {
    const { state } = this.props.location;
    console.log('------------state-----------', state)
      axios.get(`/cgp-teams/teams/${state.id}`).then((response) => {
        console.log(response);
        this.setState({ loading: false, cgpParentData: response.data, cgpData: response.data, companyName: state.establishment_name });
    }, (error) => {
        console.log(error);
    });
  }

  backButton(e) {
    this.props.history.goBack();
  }

  addButtonScreen(e) {
    this.props.history.push('/plugins/content-manager/collectionType/application::cgp-teams.cgp-teams/create');
  }




  applyFilter(e) { 
    let data = [];
    if(this.state._condition == 'equal'){
      data = this.state.cgpParentData.filter(cgpTeam => cgpTeam[this.state._search] == this.state._searchValue)
    }
    if(this.state._condition == 'not equal'){
      data = this.state.cgpParentData.filter(cgpTeam => cgpTeam[this.state._search] != this.state._searchValue)
    }
    if(this.state._condition == 'contains'){
      data = this.state.cgpParentData.filter(cgpTeam =>  cgpTeam[this.state._search].includes(this.state._searchValue))
    }
    this.setState({ cgpData: data});
  }

  clearFilter(e){
    this.setState({ cgpData: this.state.cgpParentData});
  }

  onChangeFilter(e){
    this.setState({_search: e });
  }

  onChangeCondition(e){
    this.setState({ _condition: e });
  }

  onChangeInput(e) {
    this.setState({ _searchValue: e });
  }

  CustomRow = ({ row }) => {
    const { firstname, lastname , cgp_id , country, active,  role , designation, email } = row;
    let source;
    switch (row.source) {
      case "upload":
        source = row.options.filename;
        break;
      case "url":
        source = row.options.url;
        break;xx
      default:
        source = "unknown";
    }
    return (
      <tr style={{ paddingTop: 18 }}>
        <td>{firstname} {lastname}</td> 
        <td>{email}</td>
        <td>{role}</td> 
        <td>{designation}</td>
        <td>{active}</td>
         <td>{country}</td>
         <td>
         <div className={"row"}>
            <Link
              to={{pathname:`/plugins/content-manager/collectionType/application::cgp-teams.cgp-teams/${row.id}`}}
              style={{
                marginRight: 5,
                marginLeft: 5
              }}
            >
              <i className={"fa fa-pencil-alt"} role={"button"} />
            </Link>
            <Link
              to={{pathname:`/plugins/content-manager/collectionType/application::cgp-teams.cgp-teams/create`}}
              style={{
                marginRight: 5,
                marginLeft: 5
              }}
            >
              <i className={"fa fa-plus"} role={"button"} />
            </Link>
          </div>
         </td>
      </tr>
    );
  };
  render() {
    const props = {
      title: "Import History",
      subtitle: "Manage the Initiated Imports"
    };
    const headers = [
      { name: "Name", value: "firstname" },
      { name: "Email", value: "email" },
      { name: "Role", value: "role" },
      { name: "Designation", value: "designation" },
      { name: "Active", value: "active" },
      { name: "Country", value: "country" },
      { name: "Actions", value: "action"}
    ];
    return (
      <Container>
        { this.state.loading ? <LoadingIndicatorPage /> : <div>
          <SearchFilter screen={''}  
          company={this.state.companyName}
          count={this.state.cgpParentData.length}
          addButton={this.addButtonScreen.bind(this)}
          sendAttack={this.backButton.bind(this)}
          ></SearchFilter>
        { this.state.cgpParentData && this.state.cgpParentData.length >  0  ? <Block>
          <div className={"row"}>
            <div className={"col-md-3"}>
            <InputSelect
            name="_limit"
            onChange={({ target: { value } }) => {
              this.onChangeFilter(value)}}
            selectOptions={['firstname', 'lastname', 'email']}
            value={this.state._search}
          />
            </div>
            <div className={"col-md-2"}>
            <InputSelect
            name="_condition"
            onChange={({ target: { value } }) => {

              this.onChangeCondition(value)}}
            selectOptions={['equal', 'not equal', 'contains']}
            value={this.state._condition}
          />
            </div>
            <div className={"col-md-3"}>
            <InputText 
               name="_search"
               onChange={({ target: { value } }) => {
                 this.onChangeInput(value)}}
                 value={this.state._searchValue}
              />
            </div>
            <div className={"col-md-4"} style={{ position: 'relative', top: '10px' }}>
            <Button  loader={this.state.loadingFilter} primary="true" onClick={ (e)=> this.applyFilter(e)}>Apply</Button>
            <Button  secondary="true"  onClick={ (e)=> this.clearFilter(e)} >Clear</Button>
            </div>
        </div>
          </Block> : null}
          <Table
          {...props}
          headers={headers}
          rows={this.state.cgpData}
          customRow={this.CustomRow}
        />
          </div>}
     </Container>
    );
  }
}
TeamTable.propTypes = {
  configs: PropTypes.array.isRequired,
  deleteImport: PropTypes.func,
  undoImport: PropTypes.func
};
export default TeamTable;