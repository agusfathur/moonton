const FlashMessage = ({ className, message = '' }) => {
  return (
    <div className={`flex bg-green-100 rounded p-4 mb-4 text-green-700 ${className}`} >
      {message}
    </div >
  )
};

export default FlashMessage;