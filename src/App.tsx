import WinterWonderland from "./assets/winter-wonderland.webp";
import TuxHeadshot from "./assets/tux-headshot.webp";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${WinterWonderland})` }}
        className="h-screen bg-cover bg-center shadow-lg"
      >
        <div className="h-1/6" />
        <div className="flex w-full flex-col items-center bg-white bg-opacity-50 py-5 md:flex-row md:justify-center">
          <img
            src={TuxHeadshot}
            className="h-3/4 w-3/4 rounded-full md:h-[400px] md:w-[400px]"
          />
          <div className="flex w-11/12 flex-col justify-center md:ml-10 md:w-[500px]">
            <h2 className="text-xl font-bold text-gold-500">Hi there!</h2>
            <p>
              I'm Tux, the cheerful Linux penguin! I love exploring my snowy
              winter wonderland. Join me in all my favorite winter activities,
              from building snowmen to cozying up by the campfire. Be sure to
              check out the hobbies page below to learn about all my latest
              hobbies!
            </p>
            <div className="mt-4 flex w-full justify-center">
              <Link to={"/hobbies"}>
                <button className="rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400">
                  Tux's Hobbies
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
