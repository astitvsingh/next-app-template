// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
import { Navbar, mainNavLinks } from "@/app";
import { Footer } from "@/app/ui/components/footer";
import { FaDownload, FaWallet, FaArrowRightArrowLeft, FaHandHolding } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

function View(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0c0c0c] to-black">
      <Navbar
        logoSrc="/assets/images/logo.png"
        logoAlt="Company Logo"
        links={mainNavLinks}
      />
      
      <section className="py-20">
        <div className="container mx-auto px-6 mt-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              How to Get Started
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Follow these simple steps to join the UpDawg ecosystem and start your journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500/20 rounded-full p-4 mb-4">
                  <FaDownload className="text-4xl text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">1. Download TronLink</h3>
                <p className="text-gray-300 mb-6">
                  Install the TronLink wallet extension for your browser or download the mobile app.
                </p>
                <div className="flex flex-col space-y-2 w-full">
                  <Link
                    href="https://www.tronlink.org/"
                    target="_blank"
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    Download
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-500/20 rounded-full p-4 mb-4">
                  <FaWallet className="text-4xl text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">2. Create Your Wallet</h3>
                <p className="text-gray-300 mb-6">
                  Set up your TRON wallet securely and keep your private keys safe.
                </p>
                <Link
                  href="https://tronlinkorg.zendesk.com/hc/en-us/articles/5012004270361-How-to-Create-an-Account-in-TronLink-Extension-"
                  target="_blank"
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors w-full"
                >
                  Setup Guide
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-red-500/50">
              <div className="flex flex-col items-center text-center">
                <Image
                    src="/assets/images/trx.png"
                    alt="TRX Logo"
                    width={64}
                    height={64}
                    className="mx-auto mb-2"
                  />
                
                <h3 className="text-xl font-bold text-white mb-4">3. Get TRX</h3>
                <p className="text-gray-300 mb-6">
                  Purchase TRX from exchanges or swap other tokens for TRX.
                </p>
                <div className="flex flex-col space-y-2 w-full">
                  <Link
                    href="https://sunswap.com/#/home"
                    target="_blank"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    SunSwap
                  </Link>
                  <Link
                    href="https://www.binance.com/en"
                    target="_blank"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    Binance
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-orange-500/50">
              <div className="flex flex-col items-center text-center">
                <Image
                    src="/assets/images/logo.png"
                    alt="TRX Logo"
                    width={64}
                    height={64}
                    className="mx-auto mb-2"
                  />
               
                <h3 className="text-xl font-bold text-white mb-4">4. Get UpDawg</h3>
                <p className="text-gray-300 mb-6">
                  Connect your wallet and start trading on our platform.
                </p>
                <div className="flex flex-col space-y-2 w-full">
                  <Link
                    href="https://udawg.org/myAccount"
                    target="_blank"
                    className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    UpDawg dApp
                  </Link>
                  <Link
                    href="https://sunswap.com/#/home"
                    target="_blank"
                    className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    SunSwap v2
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Need More Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/blackpaper"
                className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
              >
                <h3 className="text-xl font-bold text-white mb-2">Read Blackpaper</h3>
                <p className="text-gray-400">Learn about UpDawg's technology and vision</p>
              </Link>
              <Link
                href="/roadmap"
                className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
              >
                <h3 className="text-xl font-bold text-white mb-2">View Roadmap</h3>
                <p className="text-gray-400">See our development plans and milestones</p>
              </Link>
              <Link
                href="https://t.me/udawgorg" target="_blank"
                className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50"
              >
                <h3 className="text-xl font-bold text-white mb-2">Join Community</h3>
                <p className="text-gray-400">Connect with other UpDawg enthusiasts</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export { View };
