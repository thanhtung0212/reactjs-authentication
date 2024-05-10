import { FC } from "react";

interface SideLeftAuthenProps {
  backgroundImg?: string;
}
const SideLeftAuthen: FC<SideLeftAuthenProps> = ({ backgroundImg }) => {
  return (
    <div
      className='col-12 col-lg-7 d-flex align-items-center justify-content-center p-4'
      style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}
    >
      <div className=''>
        <img src={backgroundImg} alt='side left' />
      </div>
    </div>
  );
};

export default SideLeftAuthen;
