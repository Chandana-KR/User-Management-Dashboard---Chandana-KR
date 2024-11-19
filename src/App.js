import {Component} from 'react'
import Header from './components/Header'
import UserList from './components/UserList'
import "./App.css"


class App extends Component {
  render() {
    return (
      <>
        <Header />
        <UserList />
       </>
    )
  }
}

export default App