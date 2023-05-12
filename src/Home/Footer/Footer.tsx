import gseLogo from '../../img/gse-logo.png';
import haiLogo from '../../img/hai-logo.png';
import salLogo from '../../img/sal-logo.png';
import sdeLogo from '../../img/sde-logo.png';

const Footer = () => (
  <footer className="w-full bg-gray-300 px-12 py-6">
    <div
      className={`
      mt-5 md:mt-0 flex flex-wrap flex-row w-full
      items-center justify-between
      `}
    >
      <img
        src={sdeLogo}
        alt="Stanford Digital Education Logo"
        loading="lazy"
        className="h-20 mb-4 mr-4"
      />
      <img
        src={gseLogo}
        alt="Stanford GSE Logo"
        loading="lazy"
        className="h-12 mb-4 mr-4"
      />
      <img
        src={haiLogo}
        alt="Stanford HAI Logo"
        loading="lazy"
        className="h-16 mb-4 mr-4"
      />
      <img
        src={salLogo}
        alt="Stanford Accelerator for Learning Logo"
        loading="lazy"
        className="h-40 mb-4 mr-4"
      />
    </div>
  </footer>
);

export default Footer;