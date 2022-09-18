import { faAtom, faPalette, faRobot } from "@fortawesome/free-solid-svg-icons";

import coworkZoom from '../img/education/cowork-zoom.svg';
import gsePano from '../img/campus/stanford-gse.jpeg';

import Footer from "./Footer";
import IconBullet from "../Generic/IconBullet";

const Home = () => (
  <div className="home w-full">
    <div 
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${gsePano})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: 400
      }}
    >
      <div className="rounded rounded-md w-11/12 sm:w-5/6 md:w-2/3 bg-white/50 border border-black p-5 sm:p-10 backdrop-blur-sm text-center">
        <h1 className="text-xl font-bold font-serif">Literacy in Artificial Intelligence</h1>
        <p className="text-lg mb-2">A project from the Stanford Graduate School of Education</p>
        <div className="w-full border-t border-black mb-2"></div>
        <p className="text-lg">
          We're building a curriculum to teach AI literacy to students in grades
          6-12 and piloting that curriculum through a course in collaboration with
          the <a href="https://edequitylab.org/" className="text-blue-600 hover:underline">National Educational Equity Lab</a> offered 
          in Fall 2023.
        </p>
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
          <IconBullet icon={faAtom} title="Fully customizable modules">
            <p className="text-lg">
              Our curriculum is presented as a series of modules that teachers
              can pick and choose from, to meet the needs of their classroom.
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
              The lessons use AI to teach about AI and emphasize a spirit of
              play and exploration.
            </p>
          </IconBullet>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;