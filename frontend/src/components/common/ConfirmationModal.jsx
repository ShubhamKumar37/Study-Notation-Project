import React, { useEffect, useRef } from 'react';

const ConfirmationModal = ({ modalData }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        modalData?.btn2Handler();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-richblack-800 p-6 rounded-md shadow-lg text-center max-w-sm w-full">
        <p className="text-xl font-semibold mb-4 text-richblack-5">{modalData.text1}</p>
        <p className="text-richblack-300 mb-6">{modalData.text2}</p>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={modalData?.btn1Handler}
            className="w-full text-center  text-sm px-6 py-3 rounded-md font-bold bg-yellow-50 text-black button-shadow-yellow transition-all duration-200 hover:scale-95">
            {modalData?.btn1Text}
          </button>

          <button 
            onClick={modalData?.btn2Handler}
            className="text-center text-richblack-5 w-full text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 button-shadow-black  transition-all duration-200 hover:scale-95">
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
