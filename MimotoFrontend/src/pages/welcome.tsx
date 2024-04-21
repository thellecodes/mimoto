import Image from 'next/image'
import Link from 'next/link';
import '../app/globals.css';

export default function Welcome() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start pt-16 pb-16 pl-36 pr-36">
      <div className="z-10 flex w-full max-w-7xl items-center">
        <Image
          src="/Mimoto_bg.png"
          alt="Mimoto logo"
          className="dark:invert"
          height={40}
          width={40}
          priority
        />
        <p className="pl-4 text-2xl">
          Mimoto
        </p>
      </div>
 
      {/* Hero section - Aligned with the logo and red box to the right */}
      <div className="flex w-full max-w-8xl items-start mt-20">
        <div className="flex-1 flex-col">
          <h1 className="text-7xl mb-12">
            Stellar Simplified.
          </h1>
          <p className="text-xl mb-16">
            Mimoto is a digital payment platform that secures and simplifies Stellar-based money transfers via communication platforms. <br/> <br /> Connect your Twitter, Discord, or username to your Mimoto account, and receive any Stellar-based asset with ease.
          </p>
          <Link href="/" legacyBehavior>
            <a
              className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer" // You can also remove this if not needed
            >
              Open Mimoto
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">
                →
              </span>
            </a>
          </Link>
        </div>
        {/* Red box */}
        <div className="flex-initial w-1/3 h-96 bg-red-500 rounded-lg ml-4"></div>
      </div>
      <div className="z-10 flex w-full max-w-7xl items-center mt-20">
        <p className="pr-2 text-1xl font-semithin text-gray-600">
          Built with
        </p>
        <Image
          src="/soroban_bg.png"
          alt="Sorbaban logo"
          className="dark:invert"
          height={100}
          width={100}
          priority
        />
        <Image
          src="/stellar_bg.png"
          alt="Stellar logo"
          className="dark:invert"
          height={100}
          width={100}
          priority
        />
      </div>
    </main>
  )
}