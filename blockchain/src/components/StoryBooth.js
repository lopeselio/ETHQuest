import React,{useState, useEffect} from 'react'
import '../styles/booth.css'
import Header from './StoryHeader'
import Box from './Box'
import { Link } from "react-router-dom";
import { fetchTransactions } from './covalent';
import './Navbar.css'
import CovalentLogo from '../assets/Covalent.svg'
import DGN from '../assets/dgn.gif'


export default function App() {


  const [txs, setTxs] = useState([]);
  useEffect(() => {
    

    const fetchTxs = async () => {
      const txs = await fetchTransactions();
      console.log(txs);
      setTxs(txs);
    };
    fetchTxs();
  }, []);

  return (
    <div className="main screen">
      <Header title={"Welcome to your Game analytics page"} />
      <div className="body">
        <div class="flex-container">
        <h3 className="mt-24 text-2xl font-bold text-white centerAlign">
        <img src={DGN} className='chainlink' />    View previous <span className="yellow">$DGN</span> token rewards powered by <span className="Covalent">Covalent</span> <span className="api">API</span> <img src={CovalentLogo} className='chainlink' />
        </h3>
        <div className="w-full flex flex-col width1">
          {txs.map((item) => (
            <div className="w-full m-5 rounded-xl overflow-hidden shadow-lg p-6 flex items-center boxes">
              <p className="bg-gray-100 rounded-full p-3 font-semibold"><span className='circular-bg'>Tx</span></p>

              <div className="w-full grid grid-cols-3">
                <div className="flex flex-col mx-5 text-base">
                  <Link href={`https://mumbai.polygonscan.com/tx/${item.tx_hash}`}>
                    <a className="text-blue-600 hover:text-blue-500">
                      {"Transaction Hash: " + item.tx_hash.slice(0, 30)}...
                    </a>
                  </Link>
                  <p className="text-sm date-time">
                    {new Date(item.block_signed_at).toDateString() + " "}
                    {new Date(item.block_signed_at).toLocaleTimeString() + "IST"}
                  </p>
                </div>
                <p className='right-align2'>
                <Link
                  to={`https://mumbai.polygonscan.com/address//${item.from_address}`}
                >
                  <a className="ml-1 text-blue-600 hover:text-blue-500">
                    <span className="text-black">From: </span>
                    {item.from_address.slice(0, 20)}...
                  </a>
                </Link>
                </p>
                <p className='right-align1'>
                <Link to={`https://mumbai.polygonscan.com/address//${item.to_address}`}>
                  <a className="ml-1 text-blue-600 hover:text-blue-500">
                    <span className="text-black">To: </span>
                    {item.to_address.slice(0, 20)}...
                  </a>
                </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
