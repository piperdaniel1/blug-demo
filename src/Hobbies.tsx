import TuxSnowboarding from "./assets/tux-snowboarding.webp";
import TuxCampfire from "./assets/tux-campfire.webp";
import TuxSnowman from "./assets/tux-snowman.webp";
import TuxCurling from "./assets/tux-curling.webp";

function Hobbies() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-full md:w-2/3">
          <h1 className="mt-7 text-center text-4xl font-bold text-blue-500">
            My Hobbies
          </h1>

          {/* Snowboarding Section */}
          <div className="mt-7 flex w-full flex-col items-center justify-between md:flex-row">
            <img src={TuxSnowboarding} className="w-3/4 rounded md:w-[450px]" />
            <div className="mt-3 w-11/12 md:ml-10 md:mt-0 md:w-full">
              <h2 className="text-2xl text-gold-500">Snowboarding</h2>
              <p>
                I can't get enough of snowboarding! There's nothing like the
                rush of flying down the slopes, feeling the cool wind on my face
                and cutting through the snow. It's my top winter hobby and
                always leaves me smiling.
              </p>
            </div>
          </div>

          {/* Relaxing by the Fire Section */}
          <div className="mt-10 flex w-full flex-col items-center justify-between md:flex-row-reverse">
            <img src={TuxCampfire} className="w-3/4 rounded md:w-[450px]" />
            <div className="mt-3 w-11/12 md:mr-10 md:mt-0 md:w-full">
              <h2 className="text-2xl text-gold-500">Relaxing by the Fire</h2>
              <p>
                After a day in the cold, there's no better way to unwind than by
                a campfire. I love sitting close to the flames, drinking hot
                chocolate, and enjoying the peaceful winter night under the
                stars. It's the perfect way to recharge.
              </p>
            </div>
          </div>

          {/* Building Snowmen Section */}
          <div className="mb-10 mt-10 flex w-full flex-col items-center justify-between md:flex-row">
            <img src={TuxSnowman} className="w-3/4 rounded md:w-[450px]" />
            <div className="mt-3 w-11/12 md:ml-10 md:mt-0 md:w-full">
              <h2 className="text-2xl text-gold-500">Building Snowmen</h2>
              <p>
                Building snowmen is always fun for me. I take my time making
                sure every part is just right, and it’s always satisfying to see
                the finished snowman standing tall in the winter landscape. It's
                a simple but joyful way to spend the day.
              </p>
            </div>
          </div>

          {/* Add the new hobby here */}
          <div className="mb-10 mt-10 flex w-full flex-col items-center justify-between md:flex-row-reverse">
            <img src={TuxCurling} className="w-3/4 rounded md:w-[450px]" />
            <div className="mt-3 w-11/12 md:mr-10 md:mt-0 md:w-full">
              <h2 className="text-2xl text-gold-500">Curling with Friends</h2>
              <p>
                Curling with friends has become one of my unexpected winter
                favorites. There's something special about the mix of strategy,
                skill, and fun that makes every game feel like a new adventure.
                Whether I'm carefully pushing the stone down the ice or cheering
                on my teammates, it's always a blast. Plus, the snowy hills and
                frosted trees in the background give the whole experience a
                magical touch. It's definitely a unique way to enjoy the winter!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hobbies;
