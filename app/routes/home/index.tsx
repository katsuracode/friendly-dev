import type { Route } from "./+types";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
};

const Home = () => {
  return <section>HomePage</section>;
};

export default Home;
