import coworkZoom from '../img/education/cowork-zoom.svg';

import Footer from "./Footer";
import IconBullet from "../Generic/IconBullet";
import { faAtom, faPalette, faRobot } from "@fortawesome/free-solid-svg-icons";

import { getBackground } from "../Generic/Background";
import ContinueButton from './ContinueButton';

const Home = () => (
  <div className="home w-full">
    <div 
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${getBackground()})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: 500
      }}
    >
      <div className="rounded w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/50 border border-black p-5 sm:p-10 backdrop-blur-sm text-center m-5">
        <h1 className="text-xl font-bold font-serif">Classroom-Ready AI Resources for Teachers (CRAFT)</h1>
        <p className="text-lg mb-3">A project from the Stanford Graduate School of Education</p>
        <div className="w-full border-t border-gray-500 mb-3"></div>
        <p className="text-lg mb-3">
          We're building resources to teach AI literacy to students in grades
          6-12 and assembling them into a full curriculum that will be deployed
          in a course with the <a href="https://edequitylab.org/" className="text-blue-600 hover:underline">National Educational Equity Lab</a> offered 
          in Fall 2023.
        </p>
        <div className="w-full mb-0">
          <ContinueButton />
        </div>
      </div>
    </div>
    <div className="w-full px-6 sm:px-16 lg:px-48 py-8">
      <div className="flex flex-row items-center ">
        <div className="hidden md:block">
          <img
            id="cowork-zoom"
            src={coworkZoom}
            alt="two people working together while on zoom"
            loading="lazy"
            style={{width: 800}}
          />
        </div>
        <div className="flex flex-col">
          <IconBullet icon={faAtom} title="Customizable modules">
            <p className="text-lg">
              These resources are presented as a series of modules that teachers
              can pick and choose from, to meet the needs of their classroom.
              Use one activity, an entire unit, or anything in between.
            </p>
          </IconBullet>
          <IconBullet icon={faPalette} title="Interdisciplinary lesson plans">
            <p className="text-lg">
              The tools that we're building teach about AI in the context of
              other disciplines like art and math, so that teachers across the
              school can use them.
            </p>
          </IconBullet>
          <IconBullet icon={faRobot} title="Play with AI">
            <p className="text-lg">
              The resources emphasize a spirit of play, exploration, and joy 
              to be honest and optimistic about the future of AI.
            </p>
          </IconBullet>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;