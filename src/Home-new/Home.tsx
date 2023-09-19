import "./Home.css";

import {
  faAtom,
  faChalkboardTeacher,
  faPalette,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import imgHome from "../img/jason-goodman-Oalh2MojUuk-unsplash.jpg";
import imgHero from "../img/CRAFT-hero.jpg";

import SiteHeader from "../Generic/Menu";

import Footer from "./Footer/Footer";
import { signUpForUpdates } from "../Dashboard/Contact/ContactUtils";
import { ScrollRestoration } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      <SiteHeader></SiteHeader>

      <section className="hero">
        <img src={imgHero} className="hero-img" alt="hero background" />
        <div className="cc hero-wrap">
          <div className="hero-text">
            <h1>
              Empowering students with
              <br />
              AI Literacy.
            </h1>
            <p>
              Free resources to help you teach high school students in all
              subject areas to understand and question Artificial Intelligence
            </p>
            <div className="hero-links">
              <button
                onClick={() => navigate("/dash/resources")}
                className="btn-digital-red"
              >
                Explore resources
              </button>
              <button
                onClick={() => navigate("/dash/about")}
                className="btn-digital-blue"
              >
                Meet the team
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        id="newsletter"
        className={`w-full bg-foggy-light px-12 sm:px-32 md:px-60 lg:px-126 py-40 mb-40 text-center`}
      >
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            // @ts-ignore
            signUpForUpdates(document.getElementById("email").value);
            logEvent(getAnalytics(), "sign_up_for_updates");
          }}
        >
          <p className="type-0 mb-10 w-full">
            Want to receive updates about the project? Enter your email below!
          </p>
          <div className="flex flex-column">
            <input
              type="email"
              name="email"
              id="email"
              className={`
            border rounded px-10 py-5 mr-10
            type-0
            `}
              placeholder="Email address"
            />
            <button className={`btn-lagunita rounded`}>Sign me up!</button>
          </div>
        </form>
      </div>

      <article className="cc home-section-article">
        <div className="home-section-text">
          <h2>
            Classroom-Ready Resources About AI For Teaching (CRAFT) is a
            co-design initiative from the Stanford Graduate School of Education.
          </h2>
          <p>
            CRAFT is a collaboration with the Graduate School of Education and
            Institute for Human-Centered AI. CRAFT is a collection of
            co-designed free AI Literacy resources about AI for high school
            teachers, to help students explore, understand, question, and
            critique AI. CRAFT intentionally pursues a{" "}
            <strong>multidisciplinary</strong> approach so educators with a
            variety of discipline backgrounds can teach about AI.
          </p>
          <p>
            This website hosts a continuously growing collection of free and
            adaptable instructional resources to facilitate instruction within
            the nooks and crannies of your teaching. You can integrate a small
            activity or tool, or follow a multi-day series of lessons. The work
            of CRAFT is grounded in the following core principles:
          </p>
          {/* <div className="home-section-links"><button className="btn-digital-blue-outline" onClick={() => navigate("/dash/resources")}>View the resources</button></div> */}
        </div>
        <div className="home-section-image">
          <img
            src={imgHome}
            alt="teacher and students in a classroom"
            title="Photo by Jason Goodman on Unsplash"
          />
        </div>
      </article>

      <div className="cc home-section-values">
        <h3>
          <span>Core principles</span>
        </h3>
        <div className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faPalette} className="mr-10" />
          </div>
          <div className="card-text">
            <p>
              <strong>Co-Design</strong>
            </p>
            <p>
              We work with teachers representing multiple disciplines, states,
              and countries to design these resources. Insights from group
              discussions and classroom implementations shape the content,
              structure, and style of the resources available to you.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faAtom} className="mr-10" />
          </div>
          <div className="card-text">
            <p>
              <strong>Multidisciplinary</strong>
            </p>
            <p>
              We take a humanistic approach to teaching about AI, so our
              resources contextualize AI in multiple disciplines like art, math,
              english, and history so that teachers in any discipline can use
              them.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faClock} className="mr-10" />
          </div>
          <div className="card-text">
            <p>
              <strong>Current</strong>
            </p>
            <p>
              We draw on Stanford’s national expertise in learning sciences and
              artificial intelligence to guide the development of content for
              materials. This means the resources stay current and timely, so
              you can continue to expand student understanding of artificial
              intelligence.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-10" />
          </div>
          <div className="card-text">
            <p>
              <strong>Flexible</strong>
            </p>
            <p>
              Resources help facilitate instruction that’s intended to fit into
              the “nooks and crannies” of your teaching time. The resources
              co-created range from 15 minute activities to full lessons and are
              created in a way to give you agency to adapt the resources to fit
              your teaching context and student needs and interests.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollRestoration />
    </main>
  );
};

export default Home;
