import React from 'react';
import axios from 'axios';
import BusinessList from './BusinessList.jsx';
import BusinessDetail from './BusinessDetail.jsx';
import { Alert, Button } from 'reactstrap';
import '../styles/Business.css';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Business extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    let businessList = null;
    if (this.props.loading === true) {
      businessList = <Loading />;
    } else {
      businessList = <BusinessList
                       handleDetail={this.props.handleDetail}
                       businesses={this.props.businesses}
                     />
    }
    return (
      <div>
        <Switch>
          <Route
            path="/location/:place"
            render = { (props) =>
              this.props.businesses.map((business, index) => {
                if (business.place_id === props.match.params.place) {
                  return (<BusinessDetail
                            key={index}
                            match={props.match}
                            business={business}
                            loginStatus={this.props.loginStatus}
                          />)
                }
              })
            }
          />
          <Route
            path="/location"
            render={ (props) =>
              <div>
                {businessList}
              </div>
            }
          />
        </Switch>
      </div>
    )
  }
}

function Loading() {
  return (
    <div className="loader"></div>
  )
}

export default Business;