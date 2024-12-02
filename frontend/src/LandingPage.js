   // frontend/src/LandingPage.js
   import React, { useState } from 'react';
   import { useNavigate } from 'react-router-dom';

   const LandingPage = () => {
     const [zipCode, setZipCode] = useState('');
     const navigate = useNavigate();

     const handleSubmit = (e) => {
       e.preventDefault();
       // Navigate to the map page with the zip code as a parameter
       navigate(`/map/${zipCode}`);
     };

     return (
       <div className="container mt-5">
         <h1 className="text-center">Welcome to KindKart</h1>
         <p className="text-center">
           Enter your zip code to find nearby food pantries.
         </p>
         <form onSubmit={handleSubmit} className="text-center">
           <input
             type="text"
             value={zipCode}
             onChange={(e) => setZipCode(e.target.value)}
             placeholder="Enter Zip Code"
             className="form-control mb-3"
             style={{ maxWidth: '300px', margin: '0 auto' }}
           />
           <button type="submit" className="btn btn-primary">
             Search
           </button>
         </form>
       </div>
     );
   };

   export default LandingPage;




//Purpose:
//We added a form to the landing page where users can enter their zip code.
//The form uses useState to manage the zip code input and useNavigate from react-router-dom to navigate to the map page upon form submission.
//Outcome: This setup allows users to input their zip code and, upon submission, redirects them to a new page that will display the map.