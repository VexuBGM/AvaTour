 import '../app/globals.css';

export default function Home() {
  return (
    <div className="h-screen">
      <title>AvaTour</title>

      <div className="h-full">
        <img className="w-planet" src="/images/landing-page-planet.png" draggable="false"/>
        <img className="w-chart absolute bottom-0 right-0" src="/images/landing-page-chart.png" draggable="false"/>
      </div>

      <div className="z-10 top-5 w-full absolute">
        <div className="w-fit relative" style={{ left: 'var(--title-left)'}}>
          <h1 className="text-center text-9xl font-extrabold" style={{ color: 'var(--title-color)'}}>AvaTour</h1>
          <h1 className="text-center text-2xl font-semibold italic" style={{ color: 'var(--stitle-color)'}}> Вашият фокус е туризмът,<br/>нашият – отчетността!</h1>
        </div>
      </div>
      <div className="z-10 h-1/3 w-full top-64 absolute">
        <div className="left-56 bottom-0 h-36 w-fit absolute flex flex-col justify-between">
          <div className="bg-lightyellow hover:bg-slightlydarkeryellow hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer">
            <h1 className="text-center font-semibold text-4xl py-2 select-none" style={{ color: 'var(--stitle-color)'}}>Вход</h1>
          </div>
          <div className="bg-lightyellow hover:bg-slightlydarkeryellow hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer">
            <h1 className="text-center font-semibold text-4xl px-5 py-2 select-none" style={{ color: 'var(--stitle-color)'}}>Регистрация</h1>
          </div>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
}
