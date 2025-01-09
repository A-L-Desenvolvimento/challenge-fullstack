import Logo from "../../img/logo.png";

const ShopLogo = ({ size = 100 }) => {
  return (
    <div
      className="bg-gray-900 rounded-full"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src={Logo}
        alt="GhostShop logo"
        style={{ width: `${size}px`, height: `${size}px`, borderRadius: "50%" }}
      />
    </div>
  );
};

export default ShopLogo;
