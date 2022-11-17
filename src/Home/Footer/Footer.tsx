import gseLogo from '../../img/gse-logo.png';
import haiLogo from '../../img/hai-logo.png';

const Footer = () => (
  <footer className="w-full bg-gray-300 px-6 sm:px-16 md:px-32 lg:px-48 py-8">
    <div className="grid grid-cols-2 md:grid-cols-3">
      <div>
        <h3 className="text-md uppercase mb-2 text-gray-500">Affiliates</h3>
        <ul className="text-md text-gray-500">
          <li>
            <a className="hover:underline" href="https://hai.stanford.edu/">
              Stanford Human-Centered Artificial Intelligence
            </a>
          </li>
          <li>
            <a className="hover:underline" href="https://distal.stanford.edu/">
              Stanford DISTAL Lab
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="https://digitaleducation.stanford.edu/"
            >
              Stanford Vice Provost for Digital Education
            </a>
          </li>
          <li>
            <a className="hover:underline" href="https://edequitylab.org/">
              National Education Equity Lab
            </a>
          </li>
        </ul>
      </div>
      <div></div>
      <div className="mt-5 md:mt-0 flex flex-col justify-center">
        <img
          src={gseLogo}
          alt="Stanford GSE Logo"
          loading="lazy"
          className="w-80 md:w-72  mb-4"
        />
        <img
          src={haiLogo}
          alt="Stanford HAI Logo"
          loading="lazy"
          className="w-80 md:w-72 "
        />
      </div>
    </div>
    <div className="w-full text-center text-gray-500 mt-8">
      <p>&copy; 2022 Stanford University, and its affiliates</p>
    </div>
  </footer>
);

export default Footer;