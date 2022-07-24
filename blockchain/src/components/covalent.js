import axios from 'axios';

export async function fetchTransactions () {
    const res = await axios.get(
      `https://api.covalenthq.com/v1/80001/address/0xbE8Ace29e3022CD6841821315F82a6C2484fE585/transfers_v2/?quote-currency=USD&format=JSON&contract-address=0x7265Af707A9022e048Dc6E86e4Ed36c4537e5836&page-size=5&key=ckey_7d38d237e4e3411ba7e6d388843`
    );
      
    return res.data.data.items;
  }