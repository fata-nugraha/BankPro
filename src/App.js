import React from 'react';
import Login from './components/Login';
import Home from './pages/Home';
import InfoRekening from './components/InfoRekening'
import Transfer from './components/Transfer';
import TransferHistory from './components/TransferHistory';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    isAuth: false,
    rekening: null,
    money: null
  }

  setRekening = rek => {
    this.setState({ rekening: rek });
  }

  changeAuth = auth => {
    this.setState({ isAuth: auth });
  }

  setMoney = _money => {
    this.setState({ money: _money });
  }

  
  render() {
    return (
      <div className="App bg-primary">
        <Router>
          <Switch>
            <Route path='/login' render={() => <Login
              isAuth={this.state.isAuth}
              setRekening={this.setRekening}
              changeAuth={this.changeAuth}
              setMoney={this.setMoney}
            />} />
            <Route path='/' render={() => <Home
              isAuth={this.state.isAuth}
              setRekening={this.setRekening}
              money={this.state.money}
              changeAuth={this.changeAuth}
              noRekening={this.state.rekening}
              setMoney={this.setMoney}
            />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
