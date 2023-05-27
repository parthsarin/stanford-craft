import { getBackground } from "../Generic/Background";
import "./JobPosting.css";

const JobPosting = () => {
  // const scrollToId = (id: string) => () => {
  //   const el = document.getElementById(id);
  //   if (el) {
  //     el.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  return (
    <>
      <header
        className="w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${getBackground()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}
      >
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
              Curricular Resources about AI for Teaching (CRAFT)
            </h1>
            <p className="type-0 mb-10">
              A project from the Stanford Graduate School of Education
            </p>
            <div className="w-full border-t border-gray-500 mb-10 mt-10"></div>
            <p className="type-0 mb-10">
              We're building resources to teach AI literacies for high school
              and college instructors and assembling them into a full curriculum
              that will be deployed in a course with the{" "}
              <a href="https://edequitylab.org/">
                National Educational Equity Lab
              </a>{" "}
              offered in Fall 2023.
            </p>
          </div>
        </div>{" "}
      </header>
      <main id="jobs" className="p-10 min-h-screen text-md w-full basefont-20">
        <div className="container">
          <h1 className="mt-0">Join our teaching team!</h1>
          <h2 className="italic type-0">
            CS XXE: The AI Toolbox: An Everyday Guide | Spring-Fall 2023
          </h2>
          <p>
            In partnership with the{" "}
            <a href="https://edequitylab.org/">National Education Equity Lab</a>
            , Stanford University is developing a course exploring Artificial
            Intelligence (AI) and its impact on the world. This course will be
            offered for{" "}
            <a href="https://digitaleducation.stanford.edu/news/journey-college-more-low-income-high-schoolers-are-taking-digital-path-through-stanford">
              dual enrollment credit to students in Title 1 high schools
            </a>{" "}
            (schools in which low-income families make up at least 40% of
            enrollment). The course will approach AI with a multidisciplinary
            perspective, covering:
          </p>
          <ul>
            <li>Fundamental processes and tools used in AI algorithms</li>
            <li>
              Ethics, responsibility, and social justice in using, deploying,
              and interacting with AI
            </li>
            <li>
              AI use in specific contexts like art, hiring and employment, and
              media recommendations
            </li>
            <li>Pathways for professional AI work</li>
          </ul>
          <p>
            Additional details about the course can be found in the{" "}
            <a href="https://docs.google.com/document/d/1p_Racn9prXz3MyZ2qwAWcwdIUWCiccr76i6o8iSPUCk/edit#">
              course syllabus
            </a>
            .
          </p>
          <h2>Equal opportunity</h2>
          <p>
            Consistent with its obligations under the law, the University will
            provide reasonable accommodation to any employee with a disability
            who requires accommodation to perform the essential functions of his
            or her job. Stanford is an equal employment opportunity and
            affirmative action employer. All qualified applicants will receive
            consideration for employment without regard to race, color,
            religion, sex, sexual orientation, gender identity, national origin,
            disability, protected veteran status, or any other characteristic
            protected by law.
          </p>
          <h2>Open roles</h2>
          <p>
            We are currently hiring section leaders for the course; the job
            posting is below.
          </p>
        </div>
        <div className="divider"></div>
        <div className="container">
          <h2 id="section-leader">Section Leader</h2>
          <h3>Hours and Dates</h3>
          <p>Up to 10-12* hours/week; August 15, 2023 - January 15, 2024</p>
          <h3>Role details</h3>
          <p>
            We are currently recruiting six Section Leaders who will deliver the
            AI course material to high school students in weekly section
            meetings, support students through the course, and prepare students
            for college-level courses. Enrollment for the Equity Lab course will
            be about 150 high school students from across the country. There
            will be about 10-15 students assigned to each SL (Section Leader),
            with the possibility of multiple SLs being paired to support larger
            courses. Professional learning and lesson plan guidance will be
            provided all along the way.&nbsp;
          </p>
          <p>
            <em>Responsibilities:</em>
          </p>
          <ul>
            <li>
              Each week you&rsquo;ll be responsible for co-leading (with a high
              school teacher) a one hour-long required discussion section.
              (There may be additional live office hours, depending on the needs
              of students.)
              <ul>
                <li>
                  Sections will have a student teacher ratio as close to 10-15:1
                  as possible
                </li>
                <li>
                  Sections will be held during the school day in various time
                  zones across the U.S., from Hawaii time to Eastern time.
                  We&rsquo;ll do our best to schedule Section Leaders based on
                  your availability.
                </li>
              </ul>
            </li>
            <li>
              Expected time commitment is approximately 10 hours per week
              <ul>
                <li>Weekly 30-minute staff meetings</li>
                <li>Teaching a 1-hour weekly section</li>
                <li>Preparing for section</li>
                <li>Hosting 1-hour office hours</li>
                <li>Meeting with your high school teacher partner</li>
                <li>Grading student work</li>
                <li>Escalating administrative problems to SL Coordinators</li>
              </ul>
            </li>
            <li>
              Things NOT expected of SLs
              <ul>
                <li>
                  Resolving administrative issues with schools and students
                </li>
                <li>Scheduling sections, exams, or other logistics</li>
              </ul>
            </li>
            <li>
              Online Professional Learning
              <ul>
                <li>
                  Pre-Course Professional Learning: Attending PLE that will
                  prepare you for navigating your interactions with the students
                  and high school teachers as well as course material and
                  structure preparation.
                </li>
                <li>
                  During-Course Coaching: Weekly staff meetings with Section
                  Leader Coordinators to discuss section materials and teaching
                  strategies.
                </li>
              </ul>
            </li>
          </ul>
          <p>
            <em>Skills and experiences:</em>
          </p>
          <ul>
            <li>Proficiency with course content is required</li>
            <li>
              Previous teaching CS at Stanford and/or to high school students is
              highly recommended
            </li>
            <li>
              Course Assistant or Section Leader in CS at Stanford is preferred
            </li>
            <li>
              Experience with title 1 high school students would be beneficial
            </li>
          </ul>
          <h3>Expected time commitment</h3>
          <ul>
            <li>
              <strong>August - Sept:</strong> <em>1-10 hours/week</em>,
              including professional learning experience (5-6 hours), meetings
              with high school teachers, familiarizing yourself with course
              materials, assisting with some pre-course materials with the
              students.&nbsp;
            </li>
            <li>
              <strong>Sept - Dec:</strong> <em>10-12 hours/week</em>, attending
              staff meetings, teaching and preparing for section, hosting office
              hours, etc. as described above.&nbsp;
            </li>
            <li>
              <strong>Dec &ndash;&nbsp;Jan:</strong> <em>1-10 hours/week</em>,
              including grading and wrap up of course.&nbsp;&nbsp;
            </li>
          </ul>
          <h3>Compensation</h3>
          <p>
            Section Leaders will be paid $25/hour and will need to be eligible
            to work in the US. This position does not come with tuition support.
            The work location will be remote, but we do have some limited office
            spaces for drop down work on campus if needed. SLs will need to
            complete a background check, get an I9 form verified in-person in
            their current location, and complete mandated reporter training (~30
            mins).
          </p>
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                window.location.href = "https://forms.gle/ihaV9NGFGip9dFGj8";
              }}
              className="bg-palo-alto hover:bg-palo-alto-dark type-2 text-white py-10 px-20 rounded w-full mt-12"
            >
              Apply here for the section leader role!
            </button>
            <span className="text-palo-alto italic mt-5">
              Applications will be accepted on a rolling basis through the end
              of May
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default JobPosting;
