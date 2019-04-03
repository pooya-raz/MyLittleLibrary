import React, { Component } from 'react';
import { RouteComponentProps} from 'react-router';
import SearchBar from './SearchBar';
import LibraryList from './LibraryList';
import LibraryDropdown from './LibraryDropdown';
import StatusDropdown from './StatusDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'

//this is necessary so typescipt knows props has location
interface MyProps extends RouteComponentProps {
}

class Libraries extends Component<MyProps> {
  state={
    showDeleteConfirmation: false 
  }
  componentDidMount(){
    if (this.props.location.state !== undefined && this.props.location.state.showDeleteConfirmation === true){
      this.setState({ showDeleteConfirmation: true })
      let timer = () => {
        this.setState({ showDeleteConfirmation: false})
      }
      setTimeout(timer, 4000);
    }
  }
  render() {
    return (
      <div>
        <div>
          <Alert variant={"success"} show={this.state.showDeleteConfirmation}>
            Book was successfully deleted
          </Alert>
        </div>
        <SearchBar />
        <Container>
          <Row>
            <Col><LibraryDropdown /></Col>
            <Col><StatusDropdown /></Col>
          </Row>
        </Container>
        <LibraryList />
      </div>
    )
  }
}
export default Libraries