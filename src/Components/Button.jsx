const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="bg-black px-6 py-2.5 text-appPink text-md leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg focus:bg-appPink focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-appPink active:text-white active:shadow-lg">
      {label}
    </button>
  );
};

export default Button;
