import React, { useState } from 'react'
import './MainLayout.scss'

import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreateIcon from '@mui/icons-material/Create';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import Timer from '../../components/Timer/Timer';
import MasterCard from '../../components/MasterCard/MasterCard';

import mastercardIcon from '../../assets/images/mc_icon.svg'
import twitterVerifiedBadge from '../../assets/images/twitter-verified-badge.svg'

function MainLayout() {
  const [edit, setEdit] = useState(false)
  const [firstFourDigits, setFirstFourDigits] = useState("")
  const [secondFourDigits, setSecondFourDigits] = useState("")
  const [thirdFourDigits, setThirdFourDigits] = useState("")
  const [fourthFourDigits, setFourthFourDigits] = useState("")
  const [cvv, setCvv] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [password, setPassword] = useState("")

  const handleCardNumberChange = (e, stage) => {
    const inputValue = e.target.value
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    // Limit input to four digits
    const limitedValue = numericValue.slice(0, 4);
    switch (stage) {
      case 'one':
        setFirstFourDigits(limitedValue);
        break;
      case 'two':
        setSecondFourDigits(limitedValue);
        break;
      case 'three':
        setThirdFourDigits(limitedValue);
        break;
      case 'four':
        setFourthFourDigits(limitedValue);
        break;
    }
  }

  const handleCVVOnChange = (e) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const limitedValue = numericValue.slice(0, 4);
    setCvv(limitedValue)
  }

  const handleExpiryMonthOnChange = (e) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const limitedValue = numericValue.slice(0, 2);
    setExpiryMonth(limitedValue)
  }

  const handleExpiryYearOnChange = (e) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const limitedValue = numericValue.slice(0, 2);
    setExpiryYear(limitedValue)
  }

  const handlePasswordOnChange = (e) => {
    const inputValue = e.target.value
    setPassword(inputValue)
  }

  return (
    <main>
      <div className="main-popup">
        <div className="top-menu">
          <div className="close-btn">
            <CloseIcon/>
          </div>
        </div>
        <div className="main-section">
          <div className="card-form">
            <div className="title-section">
              <div className="full-logo">
                <div className="logo-img">
                  <CreditCardIcon sx={{ color: '#fff', fontSize: '20px' }} />
                </div>
                <p className="logo-text">AceCoin<span>Pay</span></p>
              </div>
              <div className="timer">
                <Timer/>
              </div>
            </div>
            <div className="main-form-section">
              <div className="card-number-section">
                <div className="label-section">
                  <div className="label-text-section">
                    <p className="label-title">Card Number</p>
                    <p className="label-sub-title">Enter the 16-digit card number on the card</p>
                  </div>
                  <div className="edit-button">
                    <CreateIcon sx={{ color: '#015eff' }} />
                    <p className='edit-text'>Edit</p>
                  </div>
                </div>
                <div className="card-number-inputs">
                  <div className="inner-card-number-inputs">
                    <img src={mastercardIcon} alt="MasterCard Icon" />
                    <input type="text" value={firstFourDigits} onChange={e => handleCardNumberChange(e, 'one')} className='number-input' placeholder='2412' />
                    <p className="card-number-input-dash">-</p>
                    <input type="text" value={secondFourDigits} onChange={e => handleCardNumberChange(e, 'two')} className='number-input' placeholder='7512' />
                    <p className="card-number-input-dash">-</p>
                    <input type="text" value={thirdFourDigits} onChange={e => handleCardNumberChange(e, 'three')} className='number-input' placeholder='3412' />
                    <p className="card-number-input-dash">-</p>
                    <input type="text" value={fourthFourDigits} onChange={e => handleCardNumberChange(e, 'four')} className='number-input' placeholder='3456' />
                  </div>
                  <img src={twitterVerifiedBadge} alt="" />
                </div>
                <div className="cvv-number-section">
                  <div className="label-text-section">
                    <p className="label-title">CVV Number</p>
                    <p className="label-sub-title">Enter the 3 or 4 digit number on the card</p>
                  </div>
                  <div className="cvv-input-section">
                    <input type="text" value={cvv} onChange={handleCVVOnChange} className='cvv-input' placeholder='272' />
                    <DialpadIcon sx={{ color: '#96a1b8' }} />
                  </div>
                </div>
                <div className="expiry-date-section">
                  <div className="label-text-section">
                    <p className="label-title">Expiry Date</p>
                    <p className="label-sub-title">Enter the expiration date of the card</p>
                  </div>
                  <div className="expiry-date-inputs">
                    <input type="text" value={expiryMonth} onChange={handleExpiryMonthOnChange} className="expiry-input" placeholder='08'/>
                    <p className='date-divider'>/</p>
                    <input type="text" value={expiryYear} onChange={handleExpiryYearOnChange} className="expiry-input" placeholder='99'/>
                  </div>
                </div>
                <div className="password-section">
                  <div className="label-text-section">
                    <p className="label-title">Password</p>
                    <p className="label-sub-title">Enter your Dynamic Password</p>
                  </div>
                  <div className="password-inputs">
                    <input type="password" value={password} onChange={handlePasswordOnChange} className='password-input' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' />
                    <DialpadIcon sx={{ color: '#96a1b8' }} />
                  </div>
                </div>
                <div className="pay-now-btn">
                  <button>Pay Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-order-details">
            <div className="order-card">
              <MasterCard/>
            </div>
            <div className="order-receipt">
              <div className="inner-order-receipt">
                <div className="order-row">
                  <p className="title">Company</p>
                  <p className="value">Apple</p>
                </div>
                <div className="order-row">
                  <p className="title">Order Number</p>
                  <p className="value">1266201</p>
                </div>
                <div className="order-row">
                  <p className="title">Product</p>
                  <p className="value">MacBook Air</p>
                </div>
                <div className="order-row">
                  <p className="title">VAT (20%)</p>
                  <p className="value">$100.00</p>
                </div>
              </div>
              <div className="divider-section">
                <div className="semi-circle flip-right"></div>
                <div className="divider"></div>
                <div className="semi-circle invert"></div>
              </div>
              <div className="inner-order-receipt" style={{ padding: '0' }}>
                <div className="payment-section">
                  <div className="amount-payable">
                    <p className="title">You have to Pay</p>
                    <p className="amount">
                      <span className='dollars'>549</span>
                      <span className="cents">.99</span>
                      <span className="currency">USD</span>
                    </p>
                  </div>
                  <ReceiptLongIcon sx={{ color: '#1f2b53' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayout