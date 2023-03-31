import Citation from "./Citation";

const Credits = () => {
  return (
    <div className="p-4 w-full md:w-2/3">
      <h1 className="text-2xl">Credits</h1>
      <p className="text-lg italic">
        Information for using these materials in research and practice
      </p>

      <h2 className="text-xl mt-4">Website credits</h2>
      <p className="mt-2">
        This website was created by researchers and student at Stanford
        University working in the{" "}
        <a
          className="text-blue-500 hover:text-blue-700 hover:underline"
          href="https://distal.stanford.edu/"
          rel="noreferrer"
          target="_blank"
        >
          DISTAL Lab
        </a>
        . Main contributors include the CRAFT developer team: Parth Sarin,
        Isabel Sieh, and Anika Fuloria. You can find the source code for this
        site and all included tools at{" "}
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

      <h2 className="text-xl mt-4">How to cite</h2>
      <h2 className="text-xl mt-4">Affiliated work</h2>
      <ul className="list-inside">
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
      </ul>
    </div>
  );
}

export default Credits;