import { getBackground } from '../Generic/Background';
import './JobPosting.css';

const JobPosting = () => (
  <>
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
        <p className="text-lg">
          We're building resources to teach AI literacies for high school and
          college instructors and assembling them into a full curriculum that
          will be deployed in a course with the National Educational Equity Lab
          offered in Fall 2023.
        </p>
      </div>
    </div>
    <div id="jobs" className="p-4 min-h-screen text-md w-full">
      <div className="container">
        <h1 className="mt-0">Join our team!</h1>
        <h2>CS XXE: The AI Toolbox: An Everyday Guide | Spring-Fall 2023</h2>
        <p>
          In partnership with the{" "}
          <a href="https://edequitylab.org/">National Education Equity Lab</a>,
          Stanford University is developing a course exploring Artificial
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
            Ethics, responsibility, and social justice in using, deploying, and
            interacting with AI
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
          provide reasonable accommodation to any employee with a disability who
          requires accommodation to perform the essential functions of his or
          her job. Stanford is an equal employment opportunity and affirmative
          action employer. All qualified applicants will receive consideration
          for employment without regard to race, color, religion, sex, sexual
          orientation, gender identity, national origin, disability, protected
          veteran status, or any other characteristic protected by law.
        </p>
        <h2>Open roles</h2>
        <p>
          We are currently recruiting for two positions: <b>coordinator</b> and{" "}
          <b>teaching fellow</b>. The listings for both jobs are below.
        </p>
      </div>
      <div className="divider"></div>
      <div className="container">
        <h1>Coordinator</h1>
        <h2>Role details</h2>
        <p>
          We are currently recruiting two coordinators who will recruit and
          coach Teaching Fellows (similar to Teaching Assistants or Section
          Leaders) to support roughly 150 high school students who will take the
          course from up to 6 high schools around the US. Building on the
          teaching model of{" "}
          <a href="https://codeinplace.stanford.edu/">Code in Place</a>, these
          Teaching Fellows will collaborate with a high school teacher to
          facilitate each high school classroom as a &ldquo;section&rdquo; of
          the course, offering collegial support and community similar to that
          of a Stanford course on campus.&nbsp;
        </p>
        <p>
          Coordinators will work with the course lecturer,{" "}
          <a href="https://parthsarin.com/">Parth Sarin</a>, to manage and
          coordinate the delivery of course material to high school students. In
          addition to general responsibilities, each of the coordinators will
          have a specialized role:
        </p>
        <h2>General Responsibilities:</h2>
        <ul>
          <li>Hire and train ~ 6 Teaching Fellows (TFs)</li>
          <li>
            Develop and prepare for the course by meeting&nbsp; weekly (1 hour)
            with Parth Sarin and the Stanford Digital Education (SDE) team
          </li>
          <li>
            Collaborate with the teaching team to ensure the course operates
            smoothly. This could include tasks like developing course systems
            and tools, making logistical decisions about the course timeline and
            policies, lead or support teacher and TF training, taking on
            overflow grading responsibilities, or helping to resolve academic
            integrity issues.
          </li>
        </ul>
        <h2>General Skills and Experiences:</h2>
        <ul>
          <li>Teaching experience with youth and/or in a university setting</li>
          <li>Experience building, implementing, or critiquing AI systems</li>
          <li>
            Experience managing teams of people and collaborating across
            multiple leaders
          </li>
        </ul>
      </div>
      <div className="coord-grid">
        <div className="bg-gray-100 items-center">
          <span className="text-red-700 italic mb-4">
            no longer accepting applications
          </span>
          <div>
            <h2 style={{ marginTop: 0 }}>Teacher Coordinator</h2>
            <h3>
              <em>Responsibilities:</em>
            </h3>
            <ul>
              <li>
                Design and facilitate on-boarding for high school teachers
              </li>
              <li>
                Co-facilitate professional learning sessions with the{" "}
                <a href="https://cset.stanford.edu/">
                  Center to Support Excellence in Teaching
                </a>
              </li>
              <li>
                Help Course Coordinator adapt teacher support resources from
                course materials
              </li>
              <li>
                Support the development of productive TF and teacher
                relationships
              </li>
            </ul>
            <h3>
              <em>Ideal experience:</em>
            </h3>
          </div>
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>Course Coordinator</h2>
          <h3>
            <em>Responsibilities:</em>
          </h3>
          <ul>
            <li>Co-manage overall course content</li>
            <li>
              Lead adaptation of materials for teacher- and TF-specific needs
              with the teaching team
            </li>
            <li>Develop and maintain Canvas course&nbsp;</li>
            <li>Prepare and distribute assignments, manage submissions</li>
            <li>Design and manage feedback and grading processes</li>
            <li>Offer assignment help webinars to students</li>
            <li>
              Work with teaching team to monitor school progress and ensure
              sections are on track
            </li>
          </ul>
          <h3>
            <em>Ideal experience:</em>
          </h3>
          <ul>
            <li>Strong knowledge of AI systems, applications, and impacts</li>
            <li>Use of Canvas, ideally from an instructional role</li>
            <li>(Head) Teaching Assistantship experience</li>
          </ul>
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>Teaching Fellow Coordinator</h2>
          <h3>
            <em>Responsibilities:</em>
          </h3>
          <ul>
            <li>Design and facilitate Teaching Fellow pre-course training</li>
            <li>Lead weekly TF information and support sessions</li>
            <li>
              Help course coordinator adapt weekly lesson plans for TFs from
              course materials
            </li>
            <li>
              Interface with{" "}
              <a href="https://edequitylab.org/">Ed Equity Lab</a> to monitor
              section progress and ensure sections are on track
            </li>
            <li>Provide support and counseling to TFs</li>
          </ul>
          <h3>
            <em>Ideal experience:</em>
          </h3>
          <ul>
            <li>
              Teaching Assistantship (TAing) or Section Leading (SLing)
              experience
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <h2>Expected time commitment</h2>
        <ul>
          <li>
            <strong>April - May:</strong>
            <em> 1-5 hours/week,</em> including meeting as a group, hiring TFs,
            and preparing course materials
          </li>
          <li>
            <strong>June - Aug: </strong>
            <em>1-5 hours/week</em>, finalizing course content and preparing for
            course launch
          </li>
          <li>
            <strong>Sept:</strong> <em>5-10 hours/week</em>, including meeting
            weekly with teaching team to prepare for course, prepare TFs and
            high school teacher training, and set up course systems.
            Additionally, facilitate 5-hour training for TFs and 2-hour
            on-boarding for high school teachers
          </li>
          <li>
            <strong>Sept - Jan:</strong> <em>10-15 hours/week</em>, including
            meeting weekly with the teaching team and additional 1
            hour/bi-weekly meetings with teachers or 30 min/week mentoring
            meeting with TFs (depending on role), 30 min/week all-TF meetings,
            TF coordination, tech troubleshooting and improvements, section
            preparation, grading, etc.&nbsp;
          </li>
        </ul>
        <h2>Compensation</h2>
        <p>
          Coordinators will be paid $30/hour and will need to be eligible to
          work in the US. This position does not come with tuition support. The
          work location will be remote, but we have limited office spaces for
          drop in work on campus if needed. Coordinators will need to complete a
          background check, get an I9 form verified in-person in their current
          location, and complete mandated reporter training (~30 mins).&nbsp;
        </p>
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              window.location.href = "https://forms.gle/XQ7pbYUViSc9nVcc6";
            }}
            className="bg-purple-600 hover:bg-purple-800 text-xl text-white py-2 px-4 rounded w-full mt-6"
          >
            Apply here for the coordinator role!
          </button>
          <span className="text-purple-800 italic mt-2">
            Applications will be accepted on a rolling basis through April 15th,
            2023
          </span>
        </div>
      </div>
      <div className="divider"></div>
      <div className="container">
        <h1>Teaching Fellow</h1>
        <h2>Hours and Dates</h2>
        <p>Up to 10-12* hours/week; August 15, 2023 - January 15, 2024</p>
        <h2>Role details</h2>
        <p>
          We are currently recruiting six Teaching Fellows who will deliver the
          AI course material to high school students in weekly section meetings,
          support students through the course, and prepare students for
          college-level courses. Enrollment for the Equity Lab course will be
          about 150 high school students from across the country. There will be
          about 10-15 students assigned to each TF (Teaching Fellow), with the
          possibility of multiple TFs being paired to support larger courses.
          Professional learning and lesson plan guidance will be provided all
          along the way.&nbsp;
        </p>
        <p>
          <em>Responsibilities:</em>
        </p>
        <ul>
          <li>
            Each week you&rsquo;ll be responsible for co-leading (with a high
            school teacher) a one hour-long required discussion section. (There
            may be additional live office hours, depending on the needs of
            students.)
          </li>
          <ul>
            <li>
              Sections will have a student teacher ratio as close to 10-15:1 as
              possible
            </li>
            <li>
              Sections will be held during the school day in various time zones
              across the U.S., from Hawaii time to Eastern time. We&rsquo;ll do
              our best to schedule Section Leaders based on your availability.
            </li>
          </ul>
          <li>Expected time commitment is approximately 10 hours per week</li>
          <ul>
            <li>Weekly 30-minute staff meetings</li>
            <li>Teaching a 1-hour weekly section</li>
            <li>Preparing for section</li>
            <li>Hosting 1-hour office hours</li>
            <li>Meeting with your high school teacher partner</li>
            <li>Grading student work</li>
            <li>Escalating administrative problems to TF Coordinators</li>
          </ul>
          <li>Things NOT expected of TFs</li>
          <ul>
            <li>Resolving administrative issues with schools and students</li>
            <li>Scheduling sections, exams, or other logistics</li>
          </ul>
          <li>Online Professional Learning</li>
          <ul>
            <li>
              Pre-Course Professional Learning: Attending PLE that will prepare
              you for navigating your interactions with the students and high
              school teachers as well as course material and structure
              preparation.
            </li>
            <li>
              During-Course Coaching: Weekly staff meetings with Section Leader
              Coordinators to discuss section materials and teaching
              strategies.&nbsp;
            </li>
          </ul>
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
        <h2>Expected time commitment</h2>
        <ul>
          <li>
            <strong>August - Sept:</strong> <em>1-10 hours/week</em>, including
            professional learning experience (5-6 hours), meetings with high
            school teachers, familiarizing yourself with course materials,
            assisting with some pre-course materials with the students.&nbsp;
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
        <h2>Compensation</h2>
        <p>
          Teaching Fellows will be paid $25/hour and will need to be eligible to
          work in the US. This position does not come with tuition support. The
          work location will be remote, but we do have some limited office
          spaces for drop down work on campus if needed. TFs will need to
          complete a background check, get an I9 form verified in-person in
          their current location, and complete mandated reporter training (~30
          mins).
        </p>
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              window.location.href = "https://forms.gle/ihaV9NGFGip9dFGj8";
            }}
            className="bg-emerald-700 hover:bg-emerald-900 text-xl text-white py-2 px-4 rounded w-full mt-6"
          >
            Apply here for the teaching fellow role!
          </button>
          <span className="text-emerald-800 italic mt-2">
            Applications will be accepted on a rolling basis through the end of April
          </span>
        </div>
      </div>
    </div>
  </>
);

export default JobPosting;