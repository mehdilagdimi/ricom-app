
const Button = ({ label, onClick, archived, type}) => {
  // const [focus, setFocus] = useState(() => ({
  //   active: false,
  //   addFocus:
  //     " bg-appPink text-white shadow-lg outline-none ring-0",
  // }));

  const onCLICK = (event) => {
    onClick(event);
    if(label == "REPORT") {
      let classNames = ['bg-black', 'text-appPink']
      let classNames2 = ["bg-appPink", "text-white"]
      classNames.forEach(clssName => event.currentTarget.classList.toggle(clssName))
      classNames2.forEach(clssName => event.currentTarget.classList.toggle(clssName))
  
    } else if(label === "ARCHIVE"){
      
      // return
    }
    
   
    // setFocus(() => ({
    //   active: !focus.active,
    //   addFocus:
    //     " bg-appPink text-white shadow-lg outline-none ring-0",
    // }));
  }

  return (
    <button
      type="submit"
      onClick={onCLICK}
      // disabled={false}
      disabled={archived ? true : false}
      className={`${!archived ? 'bg-black text-appPink hover:bg-appPink hover:text-white hover:shadow-lgactive:bg-appPink active:text-white active:shadow-lg' : 'bg-gray-200 text-gray-500'} 
      px-6 py-2.5 text-md leading-tight uppercase rounded-md shadow-md transition duration-150 ease-in-out `} >
      {label}
    </button>
  );
};

export default Button;
