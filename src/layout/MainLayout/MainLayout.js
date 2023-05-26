import React, { useEffect, useRef, useState } from 'react'
import './MainLayout.scss'

import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreateIcon from '@mui/icons-material/Create';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppleIcon from '@mui/icons-material/Apple';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Timer from '../../components/Timer/Timer';
import MasterCard from '../../components/MasterCard/MasterCard';

import mastercardIcon from '../../assets/images/mc_icon.svg'
import twitterVerifiedBadge from '../../assets/images/twitter-verified-badge.svg'

function MainLayout() {
  // States
  const [edit, setEdit] = useState(true)
  const [cvv, setCvv] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [password, setPassword] = useState("")
  const [cardNumber, setCardNumber] = useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [numberOfCardNumberDigits, setNumberOfCardNumberDigits] = useState(0)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [reset, setReset] = useState(false)

  // Refs
  const cvvRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)
  const passwordRef = useRef(null)

  // Styles
  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Functions
  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    setCardNumber(formatCreditCardNumber(value));
  };

  const handleCVVOnChange = (e) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const limitedValue = numericValue.slice(0, 3);
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

  const formatCreditCardNumber = (value) => {
    const trimmedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];

    for (let i = 0, len = trimmedValue.length; i < len; i += 4) {
      parts.push(trimmedValue.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join('   -   ');
    } else {
      return value;
    }
  };

  const countNumbersInString = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(parseInt(str[i]))) {
        count++;
      }
    }
    return count;
  }

  const toggleEdit = () => {
    if (!edit) {
      setEdit(prevVal => !prevVal)
    }
  }

  const moveFocus = (inputName) => {
    switch (inputName) {
      case 'cvv':
        cvvRef.current.focus();
        break;
      case 'password':
        passwordRef.current.focus();
        break;
      default:
        break
    }
  }
  const resetForm = () => {
    setCvv("")
    setExpiryMonth("")
    setExpiryYear("")
    setPassword("")
    setCardNumber("")
    setReset((prevState) => !prevState)
  }
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    resetForm()
  }

  // Use Effect
  useEffect(() => {
    const cardNumberCount = countNumbersInString(cardNumber)
    if (cardNumberCount === 16) {
      setEdit(false)
      cvvRef.current.focus()
    } else {
      setEdit(true)
    }
    setNumberOfCardNumberDigits(cardNumberCount)
  }, [cardNumber])

  useEffect(() => {
    if(cvv.length === 3) monthRef.current.focus()
  }, [cvv])

  useEffect(() => {
    if (expiryMonth.length === 2) {
      yearRef.current.focus()
    }
  }, [expiryMonth])

  useEffect(() => {
    if (expiryYear.length === 2) {
      passwordRef.current.focus()
    }
  }, [expiryYear])

  useEffect(() => {
    setIsFormFilled((
      numberOfCardNumberDigits >= 16 &&
      cvv.length >= 3 &&
      expiryMonth.length >= 2 &&
      expiryYear.length >= 2 &&
      password.length > 0
    ))
  }, [numberOfCardNumberDigits, cvv, expiryMonth, expiryYear, password])

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
                <Timer reset={reset} />
              </div>
            </div>
            <div className="main-form-section">
              <div className="card-number-section">
                <div className="label-section">
                  <div className="label-text-section">
                    <p className="label-title">Card Number</p>
                    <p className="label-sub-title">Enter the 16-digit card number on the card</p>
                  </div>
                  {!edit && <div className="edit-button" onClick={toggleEdit}>
                    <CreateIcon sx={{ color: '#015eff' }} />
                    <p className='edit-text'>Edit</p>
                  </div>}
                </div>
                <div className={!edit ? "card-number-inputs disabled" : "card-number-inputs"} tabIndex="0">
                  <div className="inner-card-number-inputs">
                    <img src={mastercardIcon} alt="MasterCard Icon" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="37"
                      placeholder="2412   -   7512   -   3412   -   3456"
                      className='number-input'
                      style={{ width: '100%' }}
                      readOnly={!edit ? true : false}
                    />
                  </div>
                  {!edit && <img src={twitterVerifiedBadge} alt="" />}
                </div>
                <div className="cvv-number-section">
                  <div className="label-text-section">
                    <p className="label-title">CVV Number</p>
                    <p className="label-sub-title">Enter the 3 or 4 digit number on the card</p>
                  </div>
                  <div className="cvv-input-section" tabIndex="0">
                    <input type="text" ref={cvvRef} value={cvv} onChange={handleCVVOnChange} className='cvv-input' placeholder='272' />
                    <DialpadIcon sx={{ color: '#96a1b8' }} onClick={() => moveFocus('cvv')} className='keypad-icon' />
                  </div>
                </div>
                <div className="expiry-date-section">
                  <div className="label-text-section">
                    <p className="label-title">Expiry Date</p>
                    <p className="label-sub-title">Enter the expiration date of the card</p>
                  </div>
                  <div className="expiry-date-inputs">
                    <input type="text" ref={monthRef} value={expiryMonth} onChange={handleExpiryMonthOnChange} className="expiry-input" placeholder='08'/>
                    <p className='date-divider'>/</p>
                    <input type="text" ref={yearRef} value={expiryYear} onChange={handleExpiryYearOnChange} className="expiry-input" placeholder='99'/>
                  </div>
                </div>
                <div className="password-section">
                  <div className="label-text-section">
                    <p className="label-title">Password</p>
                    <p className="label-sub-title">Enter your Dynamic Password</p>
                  </div>
                  <div className="password-inputs" tabIndex="0">
                    <input type="password" ref={passwordRef} value={password} onChange={handlePasswordOnChange} className='password-input' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' />
                    <DialpadIcon sx={{ color: '#96a1b8' }} onClick={() => moveFocus('password')} className='keypad-icon' />
                  </div>
                </div>
                <div className="pay-now-btn">
                  <button onClick={handleOpen} disabled={!isFormFilled}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-order-details">
            <div className="order-card">
              <MasterCard cardNumber={cardNumber} expiryMonth={expiryMonth} expiryYear={expiryYear} cardNumberFullyEntered={edit} />
            </div>
            <div className="order-receipt">
              <div className="inner-order-receipt">
                <div className="order-row">
                  <p className="title">Company</p>
                  <div className='value-row'>
                    <div className="icon">
                      <AppleIcon sx={{ color: '#fff'}} fontSize='small' />
                    </div>
                    <p className="value" style={{ marginLeft: '10px' }}>Apple</p>
                  </div>
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#015eff' }}>
            PAYMENT SUCCESSFUL
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have successfully paid for the MacBook product.
          </Typography>
          <Button variant="outlined" onClick={handleClose} sx={{ color: '#015eff', mt: 3 }} style={{ border: '1px solid #015eff' }}>Close modal</Button>
        </Box>
      </Modal>
    </main>
  )
}

export default MainLayout