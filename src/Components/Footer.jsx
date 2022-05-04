const Footer = () => {
  return (
    <div className="bg-footerGray fixed bottom-0 text-white w-full flex justify-between">
      <div className="container mx-auto flex  flex-wrap items-center justify-between w-5/6 p-2">
        <div>Copyright &copy; Mehdi LAGDIMI, 2022</div>
        <div className="flex justify-evenly items-center">
          <p className="m-2">Help</p>
          <p className="m-2">Documentation</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
