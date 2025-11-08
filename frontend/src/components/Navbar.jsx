import React from 'react';
import { Link } from 'react-router'; // Assuming you use react-router-dom for linking
import { Plus } from 'lucide-react'; // Import the Plus icon

const Navbar = () => {
  return (
    // The "navbar" class from DaisyUI provides base styling for a navbar, 
    // and "bg-base-100" sets the background color according to the theme.
    <div className="navbar bg-base-100 shadow-md">
      {/* Left section: Logo/Title */}
      <div className="navbar-start">
        {/* The Link component makes the logo clickable to go to the home page (or wherever you define) */}
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          {/* Use a placeholder for your ThinkBoard Logo */}
          <span className="font-bold text-primary">ThinkBoard</span>
        </Link>
      </div>

      {/* Center section: Can be used for search/menu if needed. Keeping it empty here. */}
      <div className="navbar-center hidden lg:flex">
        {/* Additional navigation elements can go here */}
      </div>

      {/* Right section: "New" Button */}
      <div className="navbar-end">
        {/* Button to navigate to /create page */}
        {/* btn-primary uses the primary color of the 'forest' theme */}
        <Link to="/create" className="btn btn-primary gap-2">
          {/* Plus icon from lucide-react */}
          <Plus className="h-5 w-5" />
          {/* Text label */}
          <span>New</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;