import './MasterCard.scss'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import masterCardFullLogo from '../../assets/images/mastercard-full-logo.svg'

import React from 'react'

function MasterCard({ cardNumber, expiryMonth, expiryYear, cardNumberFullyEntered }) {
  const lastFourNumbers = cardNumberFullyEntered && cardNumber.length < 37 ? "" : cardNumber.substring(cardNumber.length - 4)
  return (
    <div className='mastercard-container'>
      <div className="inner-mastercard-container">
        <div className="magnetic-strip-section">
          <div className="magnetic-strip">
            <div className="strip-cell border-right"></div>
            <div className="strip-cell border-right"></div>
            <div className="strip-cell border-right"></div>
            <div className="strip-cell"></div>
            <div className="strip-cell span-row border-top"></div>
            <div className="strip-cell"></div>
            <div className="strip-cell border-top border-left border-right border-top-curve"></div>
            <div className="strip-cell border-top border-right"></div>
            <div className="strip-cell border-top"></div>
          </div>
          <WifiOutlinedIcon fontSize="large"/>
        </div>
        <div className="mastercard-details">
          <p className="name">Jonathan Michael</p>
          <p className="card-number">&#9679; &#9679; &#9679; &#9679; {lastFourNumbers}</p>
          <div className="date-and-logo">
            <p className="date">{expiryMonth}/{expiryYear}</p>
            <img src={masterCardFullLogo} alt="MasterCard Logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MasterCard