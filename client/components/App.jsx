import React from 'react';
import Web3 from 'web3';
import {
  Col,
  Row,
  Grid
} from 'react-bootstrap';

const contract = require("truffle-contract");
const contractJson = require("../../build/contracts/SimpleStorage.json")

const getWeb3 = () => {
  const { web3 } = window

  if (typeof web3 !== 'undefined') {
    console.log("Web3 found")
    return new Web3(web3.currentProvider)
  } else {
    console.log("Web3 not found")
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  }
}

const myWeb3 = getWeb3()
const SimpleStorage = contract(contractJson)
SimpleStorage.setProvider(myWeb3.currentProvider)

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      contract: {},
      contractAddress: "Fetching contract address...",
      owner: "Fetching owner...",
    }
  }

  componentDidMount() {
    this.getContract().then((instance) => {
      this.setState({ contract: instance })
      this.getOwner()
    })
  }

  getContract() {
    const self = this
    return SimpleStorage.deployed().then((instance) => {
      self.setState({ contractAddress: instance.address })
      return instance
    })
  }

  getOwner() {
    const instance = this.state.contract
    const self = this

    myWeb3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      instance.owner().then((owner) => {
        self.setState({ owner })
      }).catch(function (err) {
        console.log("Error:", err)
      })
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <header className="text-center">
              <h1>Simple Storage</h1>
              <p>Contract: {this.state.contractAddress}</p>
              <p>Contract owner: {this.state.owner}</p>
            </header>
          </Col>
        </Row>
      </Grid>
    )
  }
}
