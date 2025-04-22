import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/assets/images/logo.png"
                alt="UpDawg Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h2 className="text-2xl font-bold text-white">UpDawg</h2>
            </div>
            <p className="text-gray-400">A Decentralized Proof-of-Reserve token backed by TRX.</p>
            <p className="text-gray-400">
              <Link
                href="https://tronscan.org/#/token20/TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <i className="fas fa-scroll mr-2"></i>UpDawg contract
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-400">
            <div className="space-y-2">
              <p>
                <Link href="/blackpaper" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-scroll mr-2"></i> Blackpaper
                </Link>
              </p>
              <p>
                <Link href="/roadmap" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-road mr-2"></i> Roadmap
                </Link>
              </p>
              <p>
                <Link href="/getstarted" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-question mr-2"></i> Get Started
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <Link href="/dapp" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-connectdevelop mr-2"></i> dApp
                </Link>
              </p>
              <p>
                <Link href="/chat" className="hover:text-blue-400 transition-colors">
                  <i className="fas fa-comments mr-2"></i> Bark
                </Link>
              </p>
              <p>
                <Link
                  href="https://t.me/uDawgToken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <i className="fas fa-robot mr-2"></i> uDawgBot
                </Link>
              </p>
              <p>
                <Link
                  href="https://t.me/uDawgToken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <i className="fas fa-users mr-2"></i> UpDawg Community Contributors
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 py-8">
          <Link
            href="https://x.com/udawgorg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
          >
            <i className="fab fa-x-twitter"></i>
          </Link>
          <Link
            href="https://github.com/AiM-Technologyz/UpDawg-Smart-Contract"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
          >
            <i className="fab fa-github"></i>
          </Link>
          <Link
            href="https://t.me/udawgorg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
          >
            <i className="fab fa-telegram"></i>
          </Link>
          <button
            onClick={() => {}}
            className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
          >
            <i className="fas fa-moon"></i>
          </button>
        </div>

        <div className="text-center py-6 border-t border-gray-800/50">
          <p className="text-gray-400">
            Developed with <span className="text-2xl">🐾</span> by{" "}
            <Link
              href="https://x.com/udawgorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
            >
              UpDawg Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 