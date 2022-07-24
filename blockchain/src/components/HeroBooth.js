import Creator from "../abis/Creator.json";
import axios from 'axios';
import React, { Component } from "react";
import { fetchTransactions } from './covalent';
import NavbarComp from "./NavbarComp";
import Header from './HeroHeader'
import '../styles/booth.css'
import Forum from "./Forum"
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
let kit;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      creator : null,
      images: [],
      loading: true,
      selectedImg: null,
      openModal: false,
      txs: null
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.tipImageOwner = this.tipImageOwner.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  async componentWillMount() {
    this.connectCeloWallet();
    this.loadBlockchainData();
    this.fetchTxs();
  }

  

  // async fetchTransactions () {
  //   const res = await axios.get(
  //     `https://api.covalenthq.com/v1/80001/address/0xbE8Ace29e3022CD6841821315F82a6C2484fE585/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0x7265Af707A9022e048Dc6E86e4Ed36c4537e5836&page-size=4&key=ckey_7d38d237e4e3411ba7e6d388843`
  //   );
      
  //   return res.data.data.items;
  // }

  async fetchTxs () {
    const txs = await fetchTransactions();
    console.log(txs);
  };



  async connectCeloWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        kit = ContractKit.newKitFromWeb3(web3);
        const accounts = await kit.web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
      } catch (error) {
        console.log(`${error}.`);
      }
    } else {
      console.log("Please install the CeloExtensionWallet.");
      window.alert(
        "Celo Extension Wallet not installed! Please install Celo Extension Wallet"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    kit = ContractKit.newKitFromWeb3(web3);
    const networkId = await kit.web3.eth.net.getId();
    const networkData = Creator.networks[networkId];
    if (networkData) {
      const creator = new kit.web3.eth.Contract(
        Creator.abi,
        networkData.address
      );
      this.setState({ creator });
      const imagesCount = await creator.methods.imageCount().call();
      this.setState({ imagesCount });
      for (var i = 1; i <= imagesCount; i++) {
        const image = await creator.methods.images(i).call();
        this.setState({
          images: [...this.state.images, image],
        });
      }
    } else {
      window.alert("Contract is not deployed to detected network!!!");
    }
  }

  sortView = () => {
    this.setState({
      images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
    });
    this.setState({ loading: false });
  };

  unsortView = () => {
    this.setState({
      images: this.state.images.reverse(),
    });
    this.setState({ loading: false });
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadImage = (description) => {
    if (this.state.acount !== "") {
      console.log("Submitting file to ipfs...");

      ipfs.add(this.state.buffer, (error, result) => {
        console.log("Ipfs result", result);
        if (error) {
          console.error(error);
          return;
        }
        this.setState({ loading: true });
        this.state.creator.methods
          .uploadImage(result[0].hash, description)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
        if (this.state.loading === false) {
          window.location.reload();
        }
      });
    } else {
      window.alert("Please connect your Celo Wallet to upload!");
    }
  };

  tipImageOwner = (id, tipAmount) => {
    if (this.state.account !== "") {
      this.setState({ loading: true });
      this.state.creator.methods
        .tipImageOwner(id)
        .send({ from: this.state.account, value: tipAmount })
        .on("transactionHash", (hash) => {
          this.setState({ loading: false });
        });
    } else {
      window.alert("Please connect your Celo Wallet to pay!");
    }
  };

  setselectedImg = (url) => {
    this.setState({ selectedImg: url });
  };

  render() {
    return (
      <><NavbarComp
        captureFile={this.captureFile}
        uploadImage={this.uploadImage}
        images={this.state.images}
        tipImageOwner={this.tipImageOwner}
        setselectedImg={this.setselectedImg}
        selectedImg={this.state.selectedImg}
        openModal={this.state.openModal}
        unsortView={this.unsortView}
        sortView={this.sortView}
        account={this.state.account}
        connect={this.connectCeloWallet} />
        </>
    );
  }
}

export default App;

