import React, { useEffect, useState } from "react";
import { requestPermission, onMessageListener } from "../Firebase/firebase";

const Notification = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setMessage(payload.notification);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center transition-all duration-200">

        <h1 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800 tracking-wide">
          🔔 Firebase Notifications
        </h1>

        <button
          onClick={requestPermission}
          className="px-4 sm:px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
        >
          Enable Notifications
        </button>

        {message && (
          <div className="mt-6 border-t border-gray-200 pt-4 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              New Notification:
            </h2>

            <p className="text-gray-900 font-medium break-words">
              {message.title}
            </p>

            <p className="text-gray-500 text-sm mt-1 break-words">
              {message.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
