const Footer = () => {
  return (
    <div className="bg-footerGray relative bottom-0 text-white h-20 sm:h-12 w-full flex justify-between items-center">
      <div className="container mx-auto flex  flex-wrap items-center justify-between w-5/6 p-2">
        <div>Copyright &copy; Mehdi LAGDIMI, 2022</div>
        <div className="flex justify-evenly items-center">
          <p className="m-0">Help</p>
          <p className="m-0">Documentation</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
