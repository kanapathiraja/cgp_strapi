/*
 *
 * HomePage
 *
 */
import React, { memo } from 'react';
import axios from 'axios'
import CgpTeamTable from '../../components/cgp-team-table/cgp-team-table';
import SearchFilter from '../../components/cgp-team-table/serach-filter';
import { GlobalPagination, InputSelect, InputText , Button } from 'strapi-helper-plugin';
import { Container, FooterWrapper, Label, SelectWrapper  } from './components';
import LoadingIndicatorPage from '../../components/cgp-team-table/LoadingIndicator';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cgpData: [],
      activePage: 1,
      count: 0,
      selectedValue: '',
      entityList: [],
      _limit: 10,
      _search: 'establishment_name',
      _condition: 'equal',
      _searchValue: '',
      loadingFilter: false
    };
  }


  onChangeParamsPage(e) {
      this.setState({ _limit: e}, ()=> {
        this.handlePageChange(this.state.activePage);
      });
  }

  onChangeFilter(e) {
    this.setState({ _search: e}, ()=> {
      console.log(this.state._search);
    });
}

onChangeCondition(e) {
  this.setState({ _condition: e}, ()=> {
    console.log(this.state._condition);
  });
}

onChangeInput(e) {
  this.setState({ _searchValue: e}, ()=> {
    console.log(this.state._searchValue);
  });
}


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber, loading: true});
    axios.get(`/cgps?_start=${pageNumber}&_limit=${this.state._limit}`).then((response) => {
          console.log(response);  
          this.setState({ loading: false, cgpData: response.data });
      }, (error) => {
          console.log(error);
      });
  }


  async componentDidMount() {
    axios.get(`/cgps?_start=${this.state.activePage}&_limit=10`).then((response) => {
          console.log(response);
          this.setState({ loading: false, cgpData: response.data });
      }, (error) => {
          console.log(error);
      });
     this.getCountData();
  }
  

  getCountData() {
    axios.get(`/cgps/count`).then((response) => {
      console.log('count ', response);
      this.setState({ loading: false, count:response.data });
  }, (error) => {
      console.log(error);
  });
  }
  
  
applyFilter = () => {
    const state = this.state;
    let condition = 'eq';
    if(this.state._condition == 'equal') {
      condition = 'eq';
    } if(this.state._condition == 'not equal') {
      condition = 'ne';
    }
    if(this.state._condition == 'contains') {
      condition = 'contains'
    }    
      axios.get(`/cgps?${state._search}_${condition}=${state._searchValue}`).then((response) => {
        console.log(response);  
        this.setState({ loading: false, loadingFilter: false, cgpData: response.data, count: response.data.length});
    }, (error) => {
        console.log(error);
    });
  }

  clearFilter() {
    debugger;
    this.getCountData();
    this.setState({ loading: false, activePage: 1, _limit: 10, _search: '', _condition:'', _searchValue:'' }, ()=> {
    this.handlePageChange(1);
    });
  }

  backButton() {
    
  }

  render() {
    return (
      <Container>
        { this.state.loading ? <LoadingIndicatorPage /> : <div>
        <SearchFilter screen={'Home'}></SearchFilter>
        <div className={"row"} style={{ padding: '10px' }}>
            <div className={"col-md-3"}>
            <InputSelect
            name="_limit"
            onChange={({ target: { value } }) => {
              this.onChangeFilter(value)}}
            selectOptions={['establishment_name', 'email', 'e_siret']}
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
        <CgpTeamTable cgpData={this.state.cgpData} />
        <FooterWrapper className="row">
      <div className="col-6">
        <SelectWrapper>
          <InputSelect
            style={{ width: '75px', height: '32px', marginTop: '-1px' }}
            name="_limit"
            onChange={({ target: { value } }) => {

              this.onChangeParamsPage(value)}}
            selectOptions={['10', '20', '50', '100']}
            value={this.state._limit}
          />
          <Label htmlFor="_limit">
            Select
          </Label>
        </SelectWrapper>
      </div>
       <div className="col-6">
        <GlobalPagination
          count={this.state.count}
          onChangeParams={({ target: { value } }) => {
            this.handlePageChange(value);
          }}
          params={{
            currentPage: parseInt(this.state.activePage, 10),
            _limit: parseInt(10, 10),
            _page: parseInt(this.state.activePage, 10),
          }}
        />
      </div>
      </FooterWrapper>
      </div>}
      </Container>
    );
  }
}

export default memo(HomePage);