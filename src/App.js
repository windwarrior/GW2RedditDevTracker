// React & Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { loadDevListAndContent } from './actions/actions';

// Components
import ConnectedDevList from './containers/connected-dev-list';
import DevContentList from './containers/dev-content-list';

import { Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

// Other
import './App.css';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'content-list'
        };
    }

    setPage(page) {
        this.setState({
            page
        })
    }

    componentDidMount() {
        /*
        let timer = window.setInterval(() => this.setState({ counter: this.state.counter + 1 }), 250);
        this.setState({ timer });
    
        // If the page is out of focus, stop all live updating
        window.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            window.clearInterval(this.state.timer);
          } else {
            let timer = window.setInterval(() => this.setState({ counter: this.state.counter + 1 }), 250);
            this.setState({ timer });
          }
        })
        */

        // Load the list of constants
        this.props.dispatch(loadDevListAndContent());
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer);
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
                    <Navbar dark color="dark" fixed="top">
                        <NavbarBrand href="#" onClick={(e) => {e.preventDefault(); this.setPage('content-list')}}>GW2 Reddit Dev Tracker</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <NavLink href="#" onClick={(e) => {e.preventDefault(); this.setPage('settings')}}>Settings</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </header>
                <main>
                    <Container>
                        {current_page}
                    </Container>
                </main>
            </div>
        );
    }
}

export default connect()(App);
