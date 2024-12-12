   // frontend/src/LandingPage.js
   import React, { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import './LandingPage.css';

   const LandingPage = () => {
     const [zipCode, setZipCode] = useState('');
     const navigate = useNavigate();

     const handleSubmit = (e) => {
       e.preventDefault();
       // Validate zip code 
       const zipCodeRegex = /^\d{5}(-\d{4})?$/;
       if (zipCodeRegex.test(zipCode)) {
         navigate(`/map/${zipCode}`);
       } else {
         alert('Please enter a valid 5-digit ZIP code');
       }
     };

     return (
       <div className="landing-container">
         <div className="content-center">
           <div className="hero-section">
             <h1 className="main-title">Connecting Communities</h1>
             <p className="sub-title">Discover Local Food Pantries </p>
             
             <form onSubmit={handleSubmit} className="search-container">
               <div className="search-wrapper">
                 <div className="search-bar">
                   <input
                     type="text"
                     value={zipCode}
                     onChange={(e) => setZipCode(e.target.value)}
                     placeholder="Enter Your Zip Code"
                     maxLength="5"
                     pattern="\d{5}"
                     required
                   />
                 </div>
                 <button type="submit" className="search-button">
                   Find Pantries
                 </button>
               </div>
             </form>
             
             <div className="impact-stats">
               <div className="stat-item">
                 <h3>500+</h3>
                 <p>Pantries Mapped</p>
               </div>
               <div className="stat-item">
                 <h3>50K+</h3>
                 <p>Meals Supported</p>
               </div>
               <div className="stat-item">
                 <h3>100+</h3>
                 <p>Communities Served</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default LandingPage;




//Purpose:
//We added a form to the landing page where users can enter their zip code.
//The form uses useState to manage the zip code input and useNavigate from react-router-dom to navigate to the map page upon form submission.
//Outcome: This setup allows users to input their zip code and, upon submission, redirects them to a new page that will display the map.