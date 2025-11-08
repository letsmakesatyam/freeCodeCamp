import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react'; // Importing relevant icons

const RateLimitedUi = () => {
  return (
    // Center the content both horizontally and vertically, filling the viewport height
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      
      {/* DaisyUI Card component for a clean, contained look */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8 text-center">
        
        {/* Header Icon (Alert) */}
        <div className="mb-4">
          <AlertTriangle className="h-16 w-16 mx-auto text-warning" />
        </div>

        {/* Title */}
        <h2 className="card-title justify-center text-3xl font-bold text-warning mb-2">
          Rate Limit Exceeded
        </h2>

        {/* Informative Body */}
        <p className="text-base-content mb-6">
          You have made too many requests recently.
          Please wait a few moments and try again.
        </p>

        {/* Suggested Action/Wait Time */}
        <div className="alert alert-info shadow-lg">
          <Clock className="h-5 w-5" />
          <div>
            <h3 className="font-bold text-lg">Take a short break</h3>
            <div className="text-sm">The limit will reset soon.</div>
          </div>
        </div>

        {/* Footer/Go Back Link (Optional but helpful) */}
        <div className="card-actions justify-center mt-6">
          <a href="/" className="btn btn-ghost">
            Go back to Home
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default RateLimitedUi;