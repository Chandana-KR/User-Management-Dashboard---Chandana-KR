import {Component} from 'react'
import Header from './components/Header'
import Home from './components/Home'
import "./App.css"


class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Home />
       </>
    )
  }
}

export default App