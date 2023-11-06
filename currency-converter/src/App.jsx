import {useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo';
import InputBox from './components/InputBox.jsx';

function App() {
  const [amount,setAmount]=useState();
  const [convertedAmount,setCAmount]=useState(0);
  const [from,setFrom]=useState('usd');
  const [to,setTo]=useState('inr');
  const currencyInfo=useCurrencyInfo(from);
  const options=Object.keys(currencyInfo);
  function swap(){
    setFrom(to);
    setTo(from);
  }
  function handleClick(){
    console.log(amount)
    setCAmount(amount*currencyInfo[to]);
    console.log(amount*currencyInfo[to]);
  }
  return (
    <>
    <div>
      <h1 className='text-2xl'>Currency Converter</h1>
      <br />
      <InputBox amount={amount} onAmountChange={(val)=>setAmount(val)} currencyOption={options} selectCurrent={from} onCurrencyChange={(val)=>{(setFrom(val))}} label="From"/>
      <button className='rounded-full w-14 h-14 text-2xl  bg-blue-900' onClick={()=>swap()}>🠕🠗</button>
      <InputBox currencyOption={options} selectCurrent={to} onCurrencyChange={(val)=>{(setTo(val))}} amount={convertedAmount} label="To"/>
      <button className='mt-3 p-3  rounded bg-blue-900' onClick={()=>handleClick()}>Convert</button>
    </div>
    </>
  )
}

export default App
