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
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 500,
      }}
    >
      <div className="rounded w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/50 border border-black p-5 sm:p-10 backdrop-blur-sm text-center m-5">
        <h1 className="text-xl font-bold font-serif">
          Curricular Resources about AI for Teaching (CRAFT)
        </h1>
        <p className="text-lg mb-3">
          A project from the Stanford Graduate School of Education
        </p>
        <div className="w-full border-t border-gray-500 mb-3"></div>
        <p className="text-lg mb-3">
          We're building resources to teach AI literacies for high school and
          college instructors and assembling them into a full curriculum that
          will be deployed in a course with the{" "}
          <a
            href="https://edequitylab.org/"
            className="text-blue-600 hover:underline"
          >
            National Educational Equity Lab
          </a>{" "}
          offered in Fall 2023.
        </p>
        <div className="w-full mb-0">
          <ContinueButton />
        </div>
      </div>
    </div>
    <div className={`w-full px-6 sm:px-16 md:px-32 lg:px-64 py-8`}>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-6 w-full">
          CRAFT is an initiative in collaboration with the Graduate School of
          Education, Institute for Human-Centered AI, and Stanford Digital
          Education. We aim to provide support for teachers in high school and
          early college who want to teach their students about artificial
          intelligence, or AI. This website hosts a collection of resources to
          facilitate such instruction with the following core principles:
        </p>
        <IconBullet
          icon={faPalette}
          title="AI instruction is multidisciplinary"
        >
          <p className="text-lg">
            These tools contextualize AI in multiple disciplines like art, math,
            english, and history, so that teachers across the school can use
            them. Currently, the resources focus on English,
            Art, Politics and Civics, and Mathematics.
          </p>
        </IconBullet>
        <IconBullet
          icon={faAtom}
          title="Teaching AI shouldn’t require a new class."
        >
          <p className="text-lg">
            These resources help facilitate instruction that’s intended to fit
            into the “nooks and crannies” of your time. They range from
            15-minute activities to full lessons and units. Grab what you need!
          </p>
        </IconBullet>
        <IconBullet
          icon={faChalkboardTeacher}
          title="Teachers know pedagogy, routines, and assessment strategies best."
        >
          <p className="text-lg">
            Between November 2022 and May 2023, we'll be working with ten
            teachers, representing nine disciplines, five states, and two
            countries to design these resources. Their insights from group
            discussions and classroom implementations shaped the content,
            structure, and style of the resources—we are so very grateful for
            their work.
          </p>
        </IconBullet>
        <div className="w-full border-t border-gray-500 mb-6"></div>
        <h2 className="text-4xl font-serif mb-3">EUs and EQs</h2>
        <p className="text-lg mb-3 w-full">
          These resources center the following enduring understandings (EUs) and
          essential questions (EQs):
        </p>
        <ol className="list-decimal ml-6 text-lg">
          <li className="mb-3">
            AI is involved in many different parts of our modern lives. Being
            “knowledgeable” about AI is not limited to being able to use math
            and write code to build AI.
          </li>
          <li className="mb-3">
            Modern AI relies heavily on data created by humans. Relying on
            human-produced data allows AI to do a number of surprising things,
            but because AI is only as good as the data that it uses, and data is
            a simplification of the world, it also has limitations.
          </li>
          <li className="mb-3">
            AI can amplify and accelerate the work of existing systems. This can
            be both positive and negative. Even though modern AI has impressive
            capabilities, humans still bear the ultimate responsibility for
            ensuring that AI is designed and used in ways that are beneficial to
            all people.
          </li>
        </ol>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
