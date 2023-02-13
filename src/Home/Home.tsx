import coworkZoom from '../img/education/cowork-zoom.svg';

import Footer from "./Footer";
import IconBullet from "../Generic/IconBullet";
import { faAtom, faChalkboardTeacher, faPalette } from "@fortawesome/free-solid-svg-icons";

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
        <h1 className="text-xl font-bold font-serif">Classroom-Ready AI for Teachers (CRAFT)</h1>
        <p className="text-lg mb-3">A project from the Stanford Graduate School of Education</p>
        <div className="w-full border-t border-gray-500 mb-3"></div>
        <p className="text-lg mb-3">
          We're building resources to teach AI literacy for high school and
          college instructors and assembling them into a full curriculum that 
          will be deployed in a course with the <a href="https://edequitylab.org/" className="text-blue-600 hover:underline">National Educational Equity Lab</a> offered in Fall 2023.
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
          <IconBullet icon={faAtom} title="Customizable resources">
            <p className="text-lg">
              These resources are designed so teachers can pick and remix them 
              to meet the needs of their classroom: use a short activity, 
              multiple units unit, or anything in between.
            </p>
          </IconBullet>
          <IconBullet icon={faPalette} title="Multidisciplinary lesson plans">
            <p className="text-lg">
              These tools contextualize AI in multiple disciplines like art, 
              math, english, and history, so that teachers across the
              school can use them. We think all students and teachers should be
              able to access this skill!
            </p>
          </IconBullet>
          <IconBullet icon={faChalkboardTeacher} title="Co-designed with teachers">
            <p className="text-lg">
              Between November 2022 and May 2023, we'll be working with ten
              teachers, representing nine disciplines, five states, and two
              countries to design these resources—the goal is to center equity
              and incorpoate pedagogy from every discipline as much as possible.
            </p>
          </IconBullet>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
