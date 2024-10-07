
const SubmitButton = ({status, errorMessage}) => {
  const isSubmitting = status === 'loading';  // Mengganti isSubmitting dengan status dari Redux
  const isSuccess = status === 'succeeded'; // Mengambil status sukses
  const isError = errorMessage; // Mengambil pesan error

  return (
    <div className="field">
      {isSubmitting && <p>Loading ....</p>}
      {isError && <p className="has-text-danger">{isError}</p>}
      {isSuccess && <p className="has-text-success">item saved successfully!</p>}

      <button
        type="submit"
        className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
};

export default SubmitButton;
