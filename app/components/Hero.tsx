import { Link } from "react-router";

type HeroProps = {
  name?: string;
  text?: string;
};

const Hero: React.FC<HeroProps> = ({
  name = "Friendly Developer!",
  text = `I build custom websites that are fast, responsive, and tailored to your needs. Let's create
        something amazing together!`,
}: HeroProps) => {
  return (
    <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4">Hey, I'm a {name} 🌚</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/projects"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          View My Projects
        </Link>
        <Link
          to="/contact"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
