import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900">
      <img
        src="/images/profile.jpg"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
      />
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-white mb-4">About Me</h2>
        <p className="text-gray-300">
          I'm a passionate developer with a love for creating intuitive and dynamic user
          experiences. With a background in both front-end and back-end development, I enjoy
          bringing ideas to life through code.
        </p>
        <Link
          to="/about"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
