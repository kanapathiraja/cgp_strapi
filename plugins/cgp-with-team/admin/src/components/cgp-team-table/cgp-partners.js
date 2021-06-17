import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "@buffetjs/core";
import moment from "moment";
import { LoadingIndicator, PopUpWarning } from "strapi-helper-plugin";
import { Link } from 'react-router-dom';
import pluginId from "../../pluginId";
import { InputSelect, InputText , Button} from "strapi-helper-plugin";
import SearchFilter from "./serach-filter";
import { Container, Block } from "../../containers/HomePage/components";
import LoadingIndicatorPage from "./LoadingIndicator";
import axios from 'axios'


class CgpPartners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cgpPartner: [], 
      cgpPartnerParentData: [],
      _searchValue: '',
      _condition: '',
      _search: 'partner_name',
      loadingFilter: false
    };
  }
 


  componentDidMount() {
    const { state } = this.props.location;
      axios.get(`/cgp-partners/findPartners/${state.id}`).then((response) => {
        console.log(response);
        this.setState({ loading: false, cgpPartnerParentData: response.data, cgpPartner: response.data, companyName: state.establishment_name });
    }, (error) => {
        console.log(error);
    });
  }

  backButton(e) {
    this.props.history.goBack();
  }

  addButton(e) {
    this.props.history.push('/plugins/content-manager/collectionType/application::partners.partners/create');
  }


  applyFilter(e) { 
    let data = [];
    if(this.state._condition == 'equal'){
      data = this.state.cgpPartnerParentData.filter(cgpTeam => cgpTeam[this.state._search] == this.state._searchValue)
    }
    if(this.state._condition == 'not equal'){
      data = this.state.cgpPartnerParentData.filter(cgpTeam => cgpTeam[this.state._search] != this.state._searchValue)
    }
    if(this.state._condition == 'contains'){
      data = this.state.cgpPartnerParentData.filter(cgpTeam =>  cgpTeam[this.state._search].includes(this.state._searchValue))
    }
    this.setState({ cgpPartner: data});
  }

  clearFilter(e){
    this.setState({ cgpPartner: this.state.cgpPartnerParentData});
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
    const { partner_id,   cgp_id , status } = row;
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
        <td>{partner_id?.partner_name }</td> 
        <td>{status}</td>
         {/* <td>
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
         </td> */}
      </tr>
    );
  };
  render() {
    const props = {
      title: "Import History",
      subtitle: "Manage the Initiated Imports"
    };
    const headers = [
      { name: "Name", value: "partner_id.partner_name" },
      { name: "Status", value: "status" },
    ];
    return (
      <Container>
        { this.state.loading ? <LoadingIndicatorPage /> : <div>
          <SearchFilter screen={''}  
          company={this.state.companyName}
          count={this.state.cgpPartnerParentData.length}
          addButton={this.addButton.bind(this)}
          sendAttack={this.backButton.bind(this)}
          ></SearchFilter>
        { this.state.cgpPartnerParentData && this.state.cgpPartnerParentData.length >  0  ? <Block>
          <div className={"row"}>
            <div className={"col-md-3"}>
            <InputSelect
            name="_limit"
            onChange={({ target: { value } }) => {
              this.onChangeFilter(value)}}
            selectOptions={['partner_name']}
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
          rows={this.state.cgpPartner}
          customRow={this.CustomRow}
        />
          </div>}
     </Container>
    );
  }
}
CgpPartners.propTypes = {
  configs: PropTypes.array.isRequired,
  deleteImport: PropTypes.func,
  undoImport: PropTypes.func
};
export default CgpPartners;