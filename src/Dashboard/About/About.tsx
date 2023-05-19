import codesignGroup from "../../img/codesign-group.png";
import salLogo from "../../img/sal-logo.png";
import sdeLogo from "../../img/sde-logo.png";
import mccoyLogo from "../../img/mccoy-logo.jpg";
import haiLogo from "../../img/hai-logo.png";
import Citation from "./Citation";
import Funder from "./Funder";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 w-full md:w-2/3">
      <h1 className="text-4xl font-bold mb-10">About CRAFT</h1>

      <p>
        CRAFT resources are the product of iterative co-design between Stanford
        University students and personnel with practicing high school teachers
        from across the United States from multiple subject areas. The resource
        collection will continue to grow. To find out more information or if you
        are interested in getting involved, please{" "}
        <button
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={() => navigate("/dash/contact")}
        >
          get in touch
        </button>
        .
      </p>

      <h2 className="text-xl mt-4 font-bold mb-2">
        2022-2023 Teacher Co-Design Fellows
      </h2>
      <ul className="ml-4">
        <li>Rodger Brown, Granite Technical Institute, Utah</li>
        <li>Alison Ence, Green Canyon High School, Utah</li>
        <li>Shane Andrus, Green Canyon High School, Utah</li>
        <li>David Dobervich, Fremont High School, California</li>
        <li>
          Lindsay Humphrey, Birmingham Community Charter High School, California
        </li>
        <li>Honore Haughton, KIPP DC College Preparatory, Washington D.C.</li>
        <li>Danielle Martin, East Palo Alto Academy, California</li>
        <li>Jesse Bustos, Sequoia High School, California</li>
        <li>Soo Shin, East Palo Alto Academy, California</li>
      </ul>

      <div className="flex flex-col w-full items-center mt-4 mb-4">
        <img
          className="w-2/3 rounded rounded-md"
          src={codesignGroup}
          alt="Cohort of AI Co-Design Fellows"
        />
        <p className="mt-1 italic">
          A group of the AI Co-Design Fellows at the end of one of our meetings
        </p>
      </div>

      <p>
        Interested in becoming a future co-design fellow?{" "}
        <button
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={() => navigate("/dash/contact")}
        >
          Contact us!
        </button>
      </p>

      <h2 className="text-xl mt-4 font-bold mb-2">
        Web and Interactive Tool Development Team
      </h2>
      <ul className="ml-4">
        <li>
          Parth Sarin, MS Student in Computer Science and Stanford Digital
          Education Fellow
        </li>
        <li>Isabel Sieh, BS Student in Computer Science</li>
        <li>Deepak Dennison, MS Student in Learning, Design, and Technology</li>
        <li>Raycelle Garcia, MS Student in Learning Design, and Technology</li>
        <li>Anika Fuloria, BS Student in Computer Science</li>
      </ul>
      <p className="mt-2">
        You can find the source code for this site and all included tools at{" "}
        <a
          className="text-blue-500 hover:text-blue-700 hover:underline"
          href="https://github.com/parthsarin/stanford-craft"
          rel="noreferrer"
          target="_blank"
        >
          https://github.com/parthsarin/stanford-craft
        </a>
        .
      </p>

      <h2 className="text-xl mt-4 font-bold mb-2">
        Stanford Curricular Resource Design Team
      </h2>
      <ul className="ml-4">
        <li>Anika Fuloria, BS Student in Computer Science</li>
        <li>Benji Xie, Postdoctoral Fellow in Embedded EthiCS</li>
        <li>
          Christine Bywater, Assistant Director of the Center to Support
          Excellence in Teaching
        </li>
        <li>Isabel Sieh, BS Student in Computer Science</li>
        <li>Jacob Wolf, Project Manager at Stanford Digital Education</li>
        <li>
          Parth Sarin, MS Student in Computer Science and Stanford Digital
          Education Fellow
        </li>
        <li>
          Victor R. Lee, Associate Professor of Education and CRAFT Faculty
          Director
        </li>
        <li>Victoria Delaney, PhD Student in Mathematics Education</li>
      </ul>

      <p className="mt-2">
        The resources and layout of this site have been through several rounds
        of iteration, including feedback from the Stanford CRAFT team and the
        cohort of Artificial Intelligence Co-Design Fellows (also known as
        teacher partners). The cohort of fellows includes: Shane Andrus, Rodger
        Brown, Jesse Bustos, David Dobervich, Alison Ence, Honore Haughton,
        Lindsay Humphrey, Danielle Martin, and Soo Shin.
      </p>

      <p className="mt-2">
        The broader CRAFT team (including researchers, software developers, and
        curriculum developers) includes Anika Fuloria, Benji Xie, Christine
        Bywater, Isabel Sieh, Jacob Wolf, Parth Sarin, Victor Lee, and Victoria
        Delaney.
      </p>

      <h2 className="text-xl mt-4 font-bold mb-5">
        Financial Support and Sponsorship
      </h2>
      <p className="mb-4">
        Generous support for CRAFT comes from the following organizations. The
        contents of CRAFT resources are the product of the design and
        development teams and not necessarily representative of any sponsoring
        organization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Funder
          url="https://digitaleducation.stanford.edu/"
          name="Stanford Digital Education"
        >
          <img
            src={sdeLogo}
            className="max-h-48 "
            alt="Stanford Digital Education"
          />
        </Funder>
        <Funder
          name="The McCoy Family Center for Ethics in Society"
          url="https://ethicsinsociety.stanford.edu/"
        >
          <img
            src={mccoyLogo}
            className="max-h-48 rounded-md"
            alt="The McCoy Family Center for Ethics in Society"
          />
        </Funder>
        <Funder
          name="The Institute for Human-Centered Artificial Intelligence"
          url="https://hai.stanford.edu/"
        >
          <img
            src={haiLogo}
            className="max-h-48 "
            alt="The Institute for Human-Centered Artificial Intelligence"
          />
        </Funder>
        <Funder
          name="Stanford Accelerator for Learning"
          url="https://acceleratelearning.stanford.edu/"
        >
          <img
            src={salLogo}
            className="max-h-48 "
            alt="Stanford Accelerator for Learning"
          />
        </Funder>
      </div>
      <h2 className="text-xl mt-4 font-bold mb-5">Affiliated Work</h2>
      <ul className="list-inside">
        <Citation>
          Lee, V. R., Sarin, P., Xie, B. & Wolf, J. CRAFT-work: An Integrative
          Co-Design Approach for Designing High School AI Literacy Resources.
          Paper presented at the CHI 2023 AI Literacy Workshop, Hamburg,
          Germany.
        </Citation>
        <Citation>
          Lee, V. R., Sarin, P., Sieh, I., & Fuloria, A. (2023/to appear).
          Addressing the Data Set Dilemma with Personally Relevant Data
          Generation and Distributed Labeling in the Classroom. In Proceedings
          of the International Conference on Computer-Supported Collaborative
          Learning - CSCL 2023. Montreal, Canada: ISLS.
        </Citation>
        <Citation url={"https://doi.org/10.1145/3501709.3544279"}>
          Lee, V. R., Delaney, V., & Sarin, P. (2022). Eliciting High School
          Students' Conceptions and Intuitions about Algorithmic Bias. In J.
          Vahrenhold, K. Fisler, M. Hauswirth, & D. Franklin (Eds.), Proceedings
          of the 2022 ACM Conference on International Computing Education
          Research V.2 (pp. 35-36). ACM.
        </Citation>
        <Citation>
          Delaney, V., Sarin, P., & Lee, V. R. (2023/to appear). Students’
          Constructed Explanations for how Artificial Intelligence Generates
          Recommendations in YouTube. To appear in Proceedings of the 17th
          International Conference of the Learning Sciences - ICLS 2023.
          Montreal, Canada: ISLS.
        </Citation>
      </ul>
    </div>
  );
};

export default About;
