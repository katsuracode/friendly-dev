const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-4">About Me</h1>
          <p className="text-lg text-gray-300">
            I'm a passionate developer with a love for creating intuitive and dynamic user
            experiences. With a background in both front-end and back-end development, I enjoy
            bringing ideas to life through code.
          </p>
        </div>
      </div>
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p>
            My journey into the world of programming began in high school, where I discovered my
            fascination with technology. Over the years, I've honed my skills through various
            projects and collaborations, constantly seeking to learn and grow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Hobbies & Interests</h2>
          <p>
            When I'm not coding, I enjoy hiking, photography, and exploring new technologies. I
            believe in maintaining a healthy work-life balance and find inspiration in the world
            around me.
          </p>
        </section>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-white">🚀 Tech I Use</h2>
      <ul className="flex flex-wrap grap-4 text-sm text-gray-300">
        {[
          "JavaScript",
          "TypeScript",
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "GraphQL",
          "Docker",
          "Kubernetes",
          "AWS",
          "Tailwind CSS",
          "Next.js",
        ].map((tech) => (
          <li
            key={tech}
            className="bg-gray-800 px-3 py-1 rounded-full m-1 hover:bg-blue-600 transition-colors"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
