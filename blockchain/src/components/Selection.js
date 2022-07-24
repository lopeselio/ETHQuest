import React from "react";
import "../styles/App.css";
import history from "../history";
import Carousel from "./Carousel";
import Chainlink from "../assets/chainlink.png"
import Ethereum from "../assets/ethereum.png"
import IPFS from "../assets/ipfs.png"
import Filecoin from "../assets/filecoin.png"
import Covalent from "../assets/covalent.png"
import Polygon from "../assets/polygon.png"
import NFTStorage from "../assets/NFTStorage.png"




export default function App() {

  return (
    <div className="main screen">
      <Carousel/>
      <div className="carousel-padding header"><span className="polygon">ETHQuest</span></div>
      <p className="pgraph"><img src={Chainlink} className='chainlink1' /><img src={Ethereum} className='chainlink1' /><img src={IPFS} className='chainlink1' /><img src={Filecoin} className='chainlink1' /><img src={Covalent} className='chainlink1' /><img src={Polygon} className='chainlink1' /><img src={Chainlink} className='chainlink1' /><img src={NFTStorage} className='chainlink1' /></p>
      <div className="selection">
        
        <div
          className="select-story"
          onClick={() => {
            history.push("/feed");
            history.go(0);
          }}
        >
          <h4 className="text-header">Vote for Hero</h4>
          <img className="dashboard-card-image" src="https://ipfs.io/ipfs/Qme7QyNBX1Q997Fp1bin8JK9KCpk5hyauae35Aosfp2VxV?filename=Angel.png" 
          alt="Angel"  />
        </div>
        <div
          className="select-story"
          onClick={() => {
            history.push("/Dashboard");
            history.go(0);
          }}
        >
          <h4 className="text-header">View Game Analytics</h4>
          <img className="dashboard-card-image" src="https://ipfs.io/ipfs/QmemTF7ziTVBFFpZzqYvSF3hdK5q6J2bZ85FYUr4mG2CUw?filename=Castle.png" 
          alt="Castel"  />
        </div>
        <div
          className="select-story"
          onClick={() => {
            history.push("/App");
            history.go(0);
          }}
        >
          <h4 className="text-header">Go to your Inventory</h4>
          <img className="dashboard-card-image" src="https://ipfs.io/ipfs/QmccVpftx3x3W7GxTQGkJjXS6VyJCpgDgHagkAoJCsLnXM?filename=home.png" 
          alt="home"  />
        </div>
      </div>
    </div>
  );
}
