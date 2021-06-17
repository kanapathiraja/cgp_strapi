import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "@buffetjs/core";
import moment from "moment";
import { LoadingIndicator, PopUpWarning } from "strapi-helper-plugin";
import { Link } from 'react-router-dom';
import pluginId from "../../pluginId";
import { GlobalPagination, InputSelect } from 'strapi-helper-plugin';

class CgpTeamTable extends Component {
  state = {
    showDeleteModal: false,
    showUndoModal: false,
    importToDelete: null,
    importToUndo: null
  };
  deleteImport = id => {
    this.setState({ showDeleteModal: true, importToDelete: id });
  };
  undoImport = id => {
    // this.setState({ showUndoModal: true, importToUndo: id });
  };

  CustomRow = ({ row }) => {
    const { establishment_name, email, e_siret, status, country, foundedYear } = row;
    // const updatedAt = moment(updated_at);
    let source;
    switch (row.source) {
      case "upload":
        source = row.options.filename;
        break;
      case "url":
        source = row.options.url;
        break;
      default:
        source = "unknown";
    }
    return (
      <tr style={{ paddingTop: 18 }}>
        <td>{establishment_name}</td> 
        <td>{email}</td>
        <td>{e_siret}</td> 
        <td>{status}</td> 
        <td> <div className={"row"}>
            <Link
              to={{pathname:`/plugins/${pluginId}/partners`, state: row}}
              style={{
                marginRight: 18,
                marginLeft: 18
              }}
              // onClick={() => this.undoImport(id)}
            >
              <i className={"fa fa-eye"} role={"button"} />
            </Link>
          </div></td> 
        {/* <td>{country}</td>  */}
        <td>
          <div className={"row"}>
            <Link
              to={{pathname:`/plugins/${pluginId}/team`, state: row}}
              style={{
                marginRight: 18,
                marginLeft: 18
              }}
              // onClick={() => this.undoImport(id)}
            >
              <i className={"fa fa-eye"} role={"button"} />
            </Link>
          </div>
        </td>
      </tr>
    );
  };
  render() {
    const { cgpData } = this.props;
    // alert(JSON.stringify(this.props))
    const props = {
      title: "Import History",
      subtitle: "Manage the Initiated Imports"
    };
    const headers = [
      { name: "Company Name", value: "establishment_name" },
      { name: "Email", value: "email" },
      { name: "Siret", value: "e_siret" },
      { name: "Status", value: "status"},
      { name: "View Partners", value: "actions"},
      // { name: "Country", value: "country"},
      { name: "View Teams", value: "actions" }
    ];
    return (
      <div >
        <Table
          {...props}
          headers={headers}
          rows={cgpData}
          customRow={this.CustomRow}
        />
      </div>
    );
  }
}
CgpTeamTable.propTypes = {
  configs: PropTypes.array.isRequired,
  deleteImport: PropTypes.func,
  undoImport: PropTypes.func
};
export default CgpTeamTable;