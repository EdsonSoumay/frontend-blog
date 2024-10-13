
const SubmitButton = ({status, statusMessage, }) => {
  const isSubmitting = status === 'loading';  // Mengganti isSubmitting dengan status dari Redux
  const isSuccess = status === 'succeeded'; // Mengambil status sukses

  return (
    <div className="field">
      {isSubmitting && <p>Loading ....</p>}
      {statusMessage && (<p className={isSuccess ? 'text-green-500' : 'text-red-500'}>{statusMessage}</p>)}
      <button
        type="submit"
        className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? 'Submiting...' : 'Submit'}
      </button>
    </div>
  );
};

export default SubmitButton;
