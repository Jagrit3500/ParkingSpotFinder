import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { convertUSDtoINR } from "../../utils/currency";
import Loader from "../../components/common/Loader";
import { FaMapMarkerAlt, FaClock, FaCar, FaParking, FaMoneyBillWave, FaCheck, FaStar, FaArrowLeft } from "react-icons/fa";
import "./Details.css";

// ... keep existing code ...

// Update where prices are shown:
            <div className="price-info">
              <span className="price-value">{convertUSDtoINR(spot.price)}</span>
              <span className="price-unit">/hour</span>
            </div>

// ... keep existing code ...

// Update price calculation area:
                <div className="price-calculation">
                  <div className="price-row">
                    <span className="price-label">{convertUSDtoINR(spot.price)} x {duration} hours</span>
                    <span className="price-amount">{convertUSDtoINR(totalPrice)}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">Service fee</span>
                    <span className="price-amount">{convertUSDtoINR(1.99)}</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span className="price-label">Total</span>
                    <span className="price-amount">{convertUSDtoINR((parseFloat(totalPrice) + 1.99).toFixed(2))}</span>
                  </div>
                </div> 