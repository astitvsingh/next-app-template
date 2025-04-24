// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
// import { Navbar, mainNavLinks } from "@/app";
import { Footer } from "@/app/ui/components/sections/footer";
import {
  FaBrain,
  FaGears,
  FaRocket,
  FaArrowsRotate,
  FaChartLine,
  FaComments,
  FaCodeFork,
  FaUsers,
  FaGamepad,
} from "react-icons/fa6";

function View(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0c0c0c] to-black">
      <section className="py-20">
        <div className="container mx-auto px-6 text-center mt-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Roadmap
          </h1>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Our journey from inception to innovation, marking each milestone in
            the evolution of UpDawg.
          </p>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Line connecting the timeline items */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            {/* Roadmap Phases */}
            {[
              {
                icon: <FaBrain className="text-4xl text-[#ecd2d8] mb-2" />,
                title: "Pre Development",
                description:
                  "Develop the smart contract, & prepare the Blackpaper, roadmap and basic website.",
                color: "text-[#da5375]",
                completed: true,
              },
              {
                icon: <FaGears className="text-4xl text-gray-400 mb-2" />,
                title: "Private TestNet",
                description:
                  "Deploy smart contract on TestNet for private testing, website live.",
                color: "text-gray-400",
                completed: true,
              },
              {
                icon: <FaRocket className="text-4xl text-red-500 mb-2" />,
                title: "Launchpad",
                description:
                  "Smart contract deployed on main net, Airdrop goes live for Launchpad.",
                color: "text-red-500",
                completed: true,
              },
              {
                icon: (
                  <FaArrowsRotate className="text-4xl text-blue-500 mb-2" />
                ),
                title: "DEX Live",
                description:
                  "UpDawg DEX goes live, enabling exchange of UDAWG.",
                color: "text-blue-500",
                completed: true,
              },
              {
                icon: <FaChartLine className="text-4xl text-green-500 mb-2" />,
                title: "Increase Reserve & Burn",
                description:
                  "Increase smart contract TRX Reserve & Burn UDAWG tokens from uDawgDAO reserve.",
                color: "text-green-500",
                completed: true,
              },
              {
                icon: <FaComments className="text-4xl text-amber-700 mb-2" />,
                title: "Development & Deployment of Bark",
                description:
                  "UpDawg's new feature enabling anonymous public chat on the TRON network.",
                color: "text-amber-700",
                completed: true,
              },
              {
                icon: <FaCodeFork className="text-4xl text-pink-500 mb-2" />,
                title: "HackaTRONs4",
                description:
                  "UpDawg Team participated and won the community prize in the DeFi track of TRON Hackathon Season 4.",
                color: "text-pink-500",
                completed: true,
              },
              {
                icon: (
                  <FaArrowsRotate className="text-4xl text-yellow-500 mb-2" />
                ),
                title: "UpDawg on SunSwap",
                description:
                  "Establishment of uDawgDAO's UDAWG/TRX liquidity pool on SunSwap.",
                color: "text-yellow-500",
                completed: true,
              },
              {
                icon: <FaBrain className="text-4xl text-[#ecd2d8] mb-2" />,
                title: "Development and deployment of uDawgBot",
                description:
                  "A TRON blockchain companion delivering updates, notifications, and read methods directly to Telegram chats.",
                color: "text-[#da5375]",
                completed: true,
              },
              {
                icon: <FaUsers className="text-4xl text-green-500 mb-2" />,
                title: "Community Contributors Fund",
                description:
                  "Rewarding top TRON enthusiasts every 30 days for their exceptional contributions to the ecosystem, fueled by 5% of the dawgDEX exchange tax.",
                color: "text-green-500",
                completed: true,
              },
              {
                icon: (
                  <FaArrowsRotate className="text-4xl text-amber-500 mb-2" />
                ),
                title: "UpDawg on JustMoney Swap",
                description:
                  "Lisiting of uDawgDAO's UDAWG/TRX liquidity pool on JustMoney Swap.",
                color: "text-amber-500",
                completed: true,
              },
              {
                icon: <FaCodeFork className="text-4xl text-red-500 mb-2" />,
                title: "HackaTRONs6",
                description:
                  "UpDawg Team participated and won the community prize in the Web3 track of TRON Hackathon Season 6 with uDawgBot.",
                color: "text-red-500",
                completed: true,
              },
              {
                icon: <FaGamepad className="text-4xl text-orange-600 mb-2" />,
                title: "uDawgBot Games",
                description:
                  "Adding engaging bot games to enhance user interaction.",
                color: "text-orange-600",
                completed: true,
              },
              {
                icon: <FaCodeFork className="text-4xl text-red-500 mb-2" />,
                title: "HackaTRONs7",
                description:
                  "UpDawg Team participated and won the community prize in the Builders track of TRON Hackathon Season 7 with uDawg_bot.",
                color: "text-red-500",
                completed: true,
              },
            ].map((phase, index) => (
              <div
                key={index}
                className={`mb-16 ${
                  index % 2 === 0 ? "flex justify-start" : "flex justify-end"
                }`}
              >
                <div className="relative flex items-center">
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 shadow-xl rounded-lg p-6 w-72 text-left transform transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
                    <div className="flex flex-col items-center m-4">
                      {phase.icon}
                      <h2 className={`text-xl font-bold mt-2 ${phase.color}`}>
                        {phase.title}
                      </h2>
                    </div>
                    <p className="text-gray-300">{phase.description}</p>
                    {phase.completed && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Circle indicator */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-6 w-6 border-4 border-black shadow-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export { View };
