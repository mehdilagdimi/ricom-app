import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Button = ({ label, onClick, archived, type, data }) => {
  const [navigating, setNavigating] = useState(true);
  const [serieId, setSerieId] = useState(null);
  let [change, setChange] = useState(0);
  // const [focus, setFocus] = useState(() => ({
  //   active: false,
  //   addFocus:
  //     " bg-appPink text-white shadow-lg outline-none ring-0",
  // }));
  const navigate = useNavigate();
  const serie = useSelector((state) => state.serie);

  // useEffect(() => {
  //   console.log("data: " + data);
  //   console.log("serealID1: " + serieId);
  //   if(data){
  //     setSerieId(data);
  //   }
  //   return () => {     
  //       setSerieId(null);
  //   }
  // }, [data, onClick]);

  // useEffect(() => {
  //   console.log("serieid: " + serieId);
  //   return () => {
  //     if(serieId){
  //       // navigate(`/study/${serieId}`);
  //       setSerieId(null);
  //       // setNavigating(false);
  //     }
  //   }
  // }, [serieId]);
  

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onCLICK = (event, sId) => {

    onClick(event);
    if (label == "REPORT") {
      let classNames = ["bg-black", "text-appPink"];
      let classNames2 = ["bg-appPink", "text-white"];
      classNames.forEach((clssName) =>
        event.currentTarget.classList.toggle(clssName)
      );
      classNames2.forEach((clssName) =>
        event.currentTarget.classList.toggle(clssName)
      );
    } else if (label === "Upload Study") {
      // console.log(sId);
      // console.log(sId);
      // if(data){

      //   navigate(`/study/${data}`);
      //   setSerieId(null)
      // }
    }
  };

  return (
    <button
      type={type ? type : "submit"}
      onClick={(e) => {
        onCLICK(e, data);
      }}
      // disabled={false}
      disabled={archived ? true : false}
      className={`${
        !archived
          ? "bg-black text-appPink hover:bg-appPink hover:text-white hover:shadow-lgactive:bg-appPink active:text-white active:shadow-lg"
          : "bg-gray-200 text-gray-500"
      } 
   px-6 py-2.5 text-md leading-tight uppercase rounded-md shadow-md transition duration-150 ease-in-out `}
    >
      {label}
    </button>
  );

  // return (
  //   {serieId ?
  //     <></> :}

  // );
};

export default Button;
