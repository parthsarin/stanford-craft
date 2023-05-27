const GlobalFooter = () => (
  <footer>
    <div className="bg-black-20 p-20 flex flex-row justify-center items-center flex-wrap">
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
        <img
          alt="Creative Commons License"
          className="inline mb-10 mr-10"
          style={{
            borderWidth: 0,
          }}
          src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
        />
      </a>
      <p className="mb-10">
        This work is licensed under a{" "}
        <a
          rel="license"
          className="inline"
          href="http://creativecommons.org/licenses/by-nc/4.0/"
        >
          Creative Commons Attribution-NonCommercial 4.0 International License
        </a>
        .
      </p>
    </div>
    <div className="global-footer basefont-21 bg-digital-red rs-py-1 text-white link-white">
      <div
        className="cc flex flex-col lg:flex-row"
        title="Common Stanford resources"
      >
        <div className="text-center mt-5 mb-9">
          <a
            className="logo type-3 hocus:text-white"
            href="https://www.stanford.edu"
          >
            Stanford
            <br />
            University
          </a>
        </div>
        <div className="lg:pl-45 xl:pl-50 text-left sm:text-center lg:text-left flex-grow">
          <nav
            aria-label="global footer menu"
            className="flex flex-row sm:flex-col justify-center sm:items-center lg:items-start mb-10 link-no-underline"
          >
            <ul className="list-unstyled mb-10 sm:mb-4 mr-19 sm:mr-0 p-0 text-15 md:text-17 2xl:text-18 flex flex-col sm:flex-row">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://www.stanford.edu"
                  className="hover:underline focus:underline"
                >
                  Stanford Home
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://visit.stanford.edu/plan/"
                  className="hover:underline focus:underline"
                >
                  Maps &amp; Directions
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://www.stanford.edu/search/"
                  className="hover:underline focus:underline"
                >
                  Search Stanford
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://emergency.stanford.edu"
                  className="hover:underline focus:underline"
                >
                  Emergency Info
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
            </ul>
            <ul className="list-unstyled mb-10 sm:mb-0 ml-19 sm:ml-0 p-0 text-15 sm:text-14 md:text-15 xl:text-16 flex flex-col sm:flex-row sm:link-regular">
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://www.stanford.edu/site/terms/"
                  title="Terms of use for sites"
                  className="hover:underline focus:underline"
                >
                  Terms of Use
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://www.stanford.edu/site/privacy/"
                  title="Privacy and cookie policy"
                  className="hover:underline focus:underline"
                >
                  Privacy
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://uit.stanford.edu/security/copyright-infringement"
                  title="Report alleged copyright infringement"
                  className="hover:underline focus:underline"
                >
                  Copyright
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                  title="Ownership and use of Stanford trademarks and images"
                  className="hover:underline focus:underline"
                >
                  Trademarks
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li className="sm:mr-10 md:mr-20 lg:mr-27">
                <a
                  href="http://exploredegrees.stanford.edu/nonacademicregulations/nondiscrimination/"
                  title="Non-discrimination policy"
                  className="hover:underline focus:underline"
                >
                  Non-Discrimination
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.stanford.edu/site/accessibility"
                  title="Report web accessibility issues"
                  className="hover:underline focus:underline"
                >
                  Accessibility
                  <span className="sr-only">(link is external)</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-13 sm:text-14 text-center lg:text-left">
            <span className="whitespace-no-wrap">© Stanford University.</span>
            <span className="whitespace-no-wrap">
              &nbsp; Stanford, California 94305.
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default GlobalFooter;
