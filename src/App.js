// React & Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { update } from './actions/actions';

// Components
import ConnectedDevList from './containers/connected-dev-list';
import DevContentList from './containers/dev-content-list';
import Spinner from './components/spinner';

import { Container, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler } from 'reactstrap';

// Other
import './App.css';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'content-list',
            isOpen: false
        };
    }

    setPage(page) {
        this.setState({
            page
        })
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.dispatch(update());
    }

    render() {
        let current_page = null;

        switch(this.state.page) {
            case 'content-list':
                current_page = <DevContentList/>
                break;
            case 'settings':
                current_page = <ConnectedDevList/>
                break;
            default:
                current_page = null;
        }

        return (
            <div className="app-container">
                <header>
                    <Navbar dark color="dark" fixed="top" expand="md">
                        <NavbarBrand href="#" onClick={(e) => {e.preventDefault(); this.setPage('content-list')}}>GW2 Reddit Dev Tracker</NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle()} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#" onClick={(e) => {e.preventDefault(); this.setPage('settings')}}>Settings</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>
                <main>
                    <Container>                        
                        {this.props.loading ? <Spinner/> : ""}
                        {current_page}
                    </Container>
                </main>
            </div>
        );
    }
}

export default connect(state => {return { loading: state.currently_fetching.length > 0 }})(App);
