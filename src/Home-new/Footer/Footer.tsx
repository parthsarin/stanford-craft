import gseLogo from "../../img/gse-logo.png";
import haiLogo from "../../img/hai-logo.png";
import salLogo from "../../img/sal-logo.png";
import sdeLogo from "../../img/sde-logo.png";

const Footer = () => (
  <footer className="w-full bg-black-20 px-40 py-30">
    <div
      style={{gap: '5ch'}}
      className={`
      mt-5 md:mt-0 flex flex-wrap flex-row w-full
      items-center justify-center
      `}
      
    >
      <img
        src={sdeLogo}
        alt="Stanford Digital Education Logo"
        loading="lazy"
        className="h-70 mb-15"
      />
      <img
        src={gseLogo}
        alt="Stanford GSE Logo"
        loading="lazy"
        className="h-22 mb-15"
      />
      <img
        src={haiLogo}
        alt="Stanford HAI Logo"
        loading="lazy"
        className="h-60 mb-15"
      />
      <img
        src={salLogo}
        alt="Stanford Accelerator for Learning Logo"
        loading="lazy"
        className="h-120 mb-15"
      />
    </div>
  </footer>
);

export default Footer;
