import { IcSocial } from "../assets/svgs";

const LoginSocials = () => {
  const Socials = [
    {
      id: "facebook",
      color: "#3B5998",
      icon: IcSocial.IcFacebook
    },
    {
      id: "twitter",
      color: "#00ACEE",
      icon: IcSocial.IcTwitter
    },
    {
      id: "gmail",
      color: "#DB3236",
      icon: IcSocial.IcGmail
    },
    {
      id: "github",
      color: "#211F1F",
      icon: IcSocial.IcGithub
    }
  ];
  return (
    <div className='d-flex justify-content-center'>
      {Socials.map((social) => (
        <div
          key={social.id}
          className='d-flex align-items-center justify-content-center me-2'
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: social.color,
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          {social.icon()}
        </div>
      ))}
    </div>
  );
};

export default LoginSocials;
