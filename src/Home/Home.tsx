import IconBullet from "../Generic/IconBullet";
import {
  faAtom,
  faChalkboardTeacher,
  faPalette,
  faBook,
  faInfoCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { getBackground } from "../Generic/Background";
import Footer from "./Footer/Footer";
import { signUpForUpdates } from "../Dashboard/Contact/ContactUtils";
import { ScrollRestoration } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home w-full">
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${getBackground()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}
      >
        <div className="rounded w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/60 border border-black p-20 sm:p-30 backdrop-blur-sm text-center m-3">
          <h1 className="type-1 font-bold font-serif mb-0">
            Classroom-Ready Resources About AI For Teaching (CRAFT)
          </h1>
          <p className="type-0 mb-10">
            A co-design project from the Stanford Graduate School of Education
          </p>
          <div className="w-full border-t border-gray-500 mb-10 mt-10"></div>
          <div className="w-full mb-0 mt-20 grid grid-cols-2" style={{gap: '1rem'}} >
            <button
              className="button rounded col-span-2"
              onClick={() => navigate("/dash/resources")}
            >
              <FontAwesomeIcon icon={faBook} className="mr-10" />
              <span>View the resources</span>
            </button>
            <button
              className="rounded btn-sky"
              onClick={() => navigate("/dash/about")}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-10" />
              <span>Meet the CRAFT Team</span>
            </button>
            <button
              className="btn-palo-verde"
              onClick={() => navigate("/dash/contact")}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-10" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      </div>
      <div className={`w-full px-12 sm:px-32 md:px-60 lg:px-216 py-40`}>
        <p>
          CRAFT is an initiative in collaboration with the Graduate School of Education and Institute for Human-Centered AI.  CRAFT co-creates curricular resources about AI with practicing high school teachers, to help you teach students to explore, understand, question, and critique AI. CRAFT intentionally pursues a multidisciplinary approach so all high school and college teachers with a variety of discipline backgrounds can teach about AI.
        </p>
        <p className="mb-24 grow w-full">
          This website hosts a collection of instructional resources co-designed to facilitate learning in a way that fits your teaching cadence and curriculum. You can integrate a small activity or tool, or follow a series of lessons.
        </p>
        <hr className="mt-20 mb-40" />
        <div className="grid gap-5 grid-cols-3" style={{gap: "2rem"}}>
          <IconBullet
            icon={faPalette}
            title="Co-Design"
          >
            <p>
              We work with teachers representing multiple disciplines, states, and countries to design these resources.  Insights from group discussions and classroom implementations shape the content, structure, and style of the resources available to you.
            </p>
          </IconBullet>
          <IconBullet
            icon={faAtom}
            title="Multidisciplinary"
          >
            <p>
              We take a humanistic approach to teaching about AI, so our resources contextualize AI in multiple disciplines like art, math, english, and history so that teachers in any discipline can use them.
            </p>
          </IconBullet>
          <IconBullet
            icon={faChalkboardTeacher}
            title="Flexible"
          >
            <p>
              Resources help facilitate instruction that’s intended to fit into the “nooks and crannies” of your teaching time. The resources co-created range from 15 minute activities to full lessons and are created in a way to give you agency to adapt the resources to fit your teaching context and student needs and interests.
            </p>
          </IconBullet>
        </div>
      </div>
      <div
        className={`w-full bg-foggy-light px-12 sm:px-32 md:px-60 lg:px-126 py-40 text-center`}
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
            <button className={`btn-palo-alto rounded`}>Sign me up!</button>
            </div>
        </form>
      </div>

      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Home;
