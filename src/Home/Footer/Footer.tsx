import gseLogo from '../../img/gse-logo.png';
import haiLogo from '../../img/hai-logo.png';

const Footer = () => (
  <footer className="w-full bg-gray-300 px-6 sm:px-32 md:px-64 py-8">
    <div className="grid grid-cols-2 md:grid-cols-3">
      <div>
        <h3 className="text-md uppercase mb-2 text-gray-500">Affiliates</h3>
        <ul className="text-md text-gray-500">
          <li>
            <a className="hover:underline" href="https://ed.stanford.edu/">Stanford Graduate School of Education</a>
          </li>
          <li>
            <a className="hover:underline" href="https://hai.stanford.edu/">Stanford Human-Centered Artificial Intelligence</a>
          </li>
          <li>
            <a className="hover:underline" href="https://distal.stanford.edu/">Stanford DISTAL Lab</a>
          </li>
        </ul>
      </div>
      <div></div>
      <div className="mt-5 md:mt-0">
        <img src={gseLogo} alt="Stanford GSE Logo" loading="lazy" className="w-80 mb-4" />
        <img src={haiLogo} alt="Stanford GSE Logo" loading="lazy" className="w-80" />
      </div>
    </div>
    <div className="w-full text-center text-gray-500 mt-8">
      <p>&copy; 2022 Stanford University, and its affiliates</p>
      </div>
  </footer>
);

export default Footer;