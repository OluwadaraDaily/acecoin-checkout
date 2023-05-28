// Styling imports
import './MainLayout.scss'

// React Core imports
import React, { useEffect, useRef, useState } from 'react'

// MUI imports
import {
  Close as CloseIcon,
  CreditCard as CreditCardIcon,
  Create as CreateIcon,
  Dialpad as DialpadIcon,
  ReceiptLong as ReceiptLongIcon,
  Apple as AppleIcon,
} from '@mui/icons-material';
import { Box, Typography, Modal, Button } from '@mui/material'

// Custom Component imports
import Timer from '../../components/Timer/Timer';
import MasterCard from '../../components/MasterCard/MasterCard';
import AppInput from '../../components/Input/Input'

// Asset images imports
import mastercardIcon from '../../assets/images/mc_icon.svg'
import twitterVerifiedBadge from '../../assets/images/twitter-verified-badge.svg'

function MainLayout() {
  // States
  const initialFormState = {
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    password: ""
  }
  const [formState, setFormState] = useState(initialFormState)
  const [edit, setEdit] = useState(true)
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
  const handleInputChange = (event, inputName) => {
    const inputValue = event.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const ThreeCharLimitedValue = numericValue.slice(0, 3);
    const TwoCharLimitedValue = numericValue.slice(0, 2);
    switch (inputName) {
      case 'card-number':
        setFormState((prevState) => ({ ...prevState, cardNumber: formatCreditCardNumber(inputValue) }));
        break;
      
      case 'cvv':
        setFormState((prevState) => ({ ...prevState, cvv: ThreeCharLimitedValue }))
        break;
      
      case 'expiry-month':
        setFormState((prevState) => ({ ...prevState, expiryMonth: TwoCharLimitedValue }))
        break;
      
      case 'expiry-year':
        setFormState((prevState) => ({ ...prevState, expiryYear: TwoCharLimitedValue }))
        break;
      
      case 'password':
        setFormState((prevState) => ({ ...prevState, password: inputValue }))
        break;
      
      default:
        break;
    }
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
    setFormState(() => ({ ...initialFormState }))
    setReset((prevState) => !prevState)
  }
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    resetForm()
  }

  // Use Effect
  useEffect(() => {
    const { cardNumber, cvv, expiryMonth, expiryYear, password } = formState;
    
    const cardNumberCount = countNumbersInString(cardNumber);
    const isCardNumberValid = cardNumberCount === 16;
    setEdit(!isCardNumberValid);
    if (isCardNumberValid) {
      cvvRef.current.focus();
    }
    setNumberOfCardNumberDigits(cardNumberCount);
    
    if (cvv.length === 3) {
      monthRef.current.focus();
    }
    
    if (expiryMonth.length === 2) {
      yearRef.current.focus();
    }
    
    if (expiryYear.length === 2) {
      passwordRef.current.focus();
    }
    
    const isFormFilled =
      numberOfCardNumberDigits >= 16 &&
      cvv.length >= 3 &&
      expiryMonth.length >= 2 &&
      expiryYear.length >= 2 &&
      password.length > 0;
    setIsFormFilled(isFormFilled);
  }, [formState, numberOfCardNumberDigits]);

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
                    <AppInput
                      type="text"
                      value={formState.cardNumber}
                      handleInputChange={(event) => handleInputChange(event, 'card-number')}
                      maxLength="37"
                      placeholder="2412   -   7512   -   3412   -   3456"
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
                    <AppInput
                      type="text"
                      ref={cvvRef}
                      value={formState.cvv}
                      handleInputChange={(event) => handleInputChange(event, 'cvv')}
                      maxLength="3"
                      placeholder="272"
                      style={{ textAlign: 'center'}}
                    />
                    <DialpadIcon sx={{ color: '#96a1b8' }} onClick={() => moveFocus('cvv')} className='keypad-icon' />
                  </div>
                </div>
                <div className="expiry-date-section">
                  <div className="label-text-section">
                    <p className="label-title">Expiry Date</p>
                    <p className="label-sub-title">Enter the expiration date of the card</p>
                  </div>
                  <div className="expiry-date-inputs">
                    <AppInput
                      type="text"
                      ref={monthRef}
                      value={formState.expiryMonth}
                      handleInputChange={(event) => handleInputChange(event, 'expiry-month')}
                      maxLength="2"
                      placeholder="08"
                      style={{ border: '1px solid #cdcdcd', textAlign: 'center', padding: '15px 0', borderRadius: '8px' }}
                    />
                    <p className='date-divider'>/</p>
                    <AppInput
                      type="text"
                      ref={yearRef}
                      value={formState.expiryYear}
                      handleInputChange={(event) => handleInputChange(event, 'expiry-year')}
                      maxLength="2"
                      placeholder="99"
                      style={{ border: '1px solid #cdcdcd', textAlign: 'center', padding: '15px 0', borderRadius: '8px' }}
                    />
                  </div>
                </div>
                <div className="password-section">
                  <div className="label-text-section">
                    <p className="label-title">Password</p>
                    <p className="label-sub-title">Enter your Dynamic Password</p>
                  </div>
                  <div className="password-inputs" tabIndex="0">
                    <AppInput
                      type="password"
                      ref={passwordRef}
                      value={formState.password}
                      handleInputChange={(event) => handleInputChange(event, 'password')}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      style={{ paddingLeft: '20px' }}
                    />
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
              <MasterCard cardNumber={formState.cardNumber} expiryMonth={formState.expiryMonth} expiryYear={formState.expiryYear} cardNumberFullyEntered={edit} />
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