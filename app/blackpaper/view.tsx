// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
// import { Navbar, mainNavLinks } from "@/app";
import { Footer } from "@/app/ui/components/sections/footer";
import Image from "next/image";
import Link from "next/link";

function View(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mt-12 mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Image
            src="/assets/images/logo1.png"
            alt="UpDawg Logo"
            width={200}
            height={200}
            className="mx-auto mb-8 rounded-lg shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text">
            UpDawg Blackpaper
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A Decentralized Proof-of-Reserve token backed by TRX, designed for
            transparency and community-driven growth.
          </p>
        </div>

        {/* Quote Section */}
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 mb-16 text-center">
          <p className="text-xl italic text-gray-300">
            &quot;We shouldn&apos;t delay forever until every possible feature
            is done. There&apos;s always going to be one more thing to do.&quot;
            ~ Satoshi Nakamoto
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Abstract */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">Abstract</h2>
            <p className="text-gray-300 leading-relaxed">
              UpDawg is a decentralized, TRC20 Proof-of-Reserve (TRC20-PoR)
              token on the TRON blockchain, designed to provide transparency,
              stability, and community-driven growth. The token operates on a
              flexi-supply model, where the minting and burning of UDAWG tokens
              are governed by user transactions on dawgDEX (UpDawg&apos;s
              built-in decentralized exchange). This blackpaper outlines the key
              features, mechanisms, and purpose of UpDawg, aiming to create a
              secure and engaging ecosystem for users by rewarding
              participation, promoting long-term holding, and ensuring full
              transparency via the Proof-of-Reserve mechanism.
            </p>
          </section>

          {/* Introduction */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">
              Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              UpDawg was launched on October 1, 2022, on the TRON blockchain. It
              operates using a TRC20 token standard and leverages TRON&apos;s
              speed and low transaction fees to deliver a user-friendly,
              community-driven DeFi experience. UpDawg features an innovative
              Proof-of-Reserve mechanism that guarantees that every UDAWG token
              is backed by TRX in reserve, ensuring stability and trust. UpDawg
              also includes a built-in DEX, dawgDEX, to facilitate decentralized
              trading of UDAWG against TRX.
            </p>
          </section>

          {/* Token Overview */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">
              Token Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">UpDawg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white">$UDAWG</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Standard:</span>
                  <span className="text-white">TRC-20</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Blockchain:</span>
                  <span className="text-white">TRON Network</span>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 mb-2">Contract Address:</p>
                <Link
                  href="https://tronscan.org/#/contract/TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k/code"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k
                </Link>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105">
                <Image
                  src="/assets/images/trx.png"
                  alt="TRX"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-4">
                  Proof-of-Reserve
                </h3>
                <p className="text-gray-300">
                  Every UDAWG token is backed by TRX in reserve, ensuring
                  stability and trust.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105">
                <Image
                  src="/assets/images/logo.png"
                  alt="dawgDEX"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-4">dawgDEX</h3>
                <p className="text-gray-300">
                  Built-in decentralized exchange for seamless trading of UDAWG
                  tokens.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105">
                <Image
                  src="/assets/images/dogburncoins.png"
                  alt="Minting and Burning"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-4">
                  Flexi-Supply
                </h3>
                <p className="text-gray-300">
                  Dynamic supply adjustment through minting and burning
                  mechanisms.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105">
                <Image
                  src="/assets/images/pool1.png"
                  alt="HODLPool"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-4">HODLPool</h3>
                <p className="text-gray-300">
                  Rewards for long-term holders through the HODLPool system.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">
              Technical Details
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Proof-of-Reserve Mechanism
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The Proof-of-Reserve mechanism ensures that every UDAWG token
                  is backed by an equivalent amount of TRX in reserve. This
                  relationship between the UDAWG supply and the TRX reserve
                  determines the price of UDAWG at any given time.
                </p>
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-white font-mono">
                    Price of UDAWG = Total TRX in Reserve ÷ Total UDAWG Supply
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Fee Structure
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800/50">
                        <th className="p-4 text-left text-gray-300">
                          TRX Reserve Target
                        </th>
                        <th className="p-4 text-left text-gray-300">
                          Buy Fee (%)
                        </th>
                        <th className="p-4 text-left text-gray-300">
                          Sell Fee (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["0 <= Reserve < 1", "1", "10"],
                        ["1 <= Reserve < 10", "0.9", "9"],
                        ["10 <= Reserve < 100", "0.8", "8"],
                        ["100 <= Reserve < 1k", "0.7", "7"],
                        ["1k <= Reserve < 10k", "0.6", "6"],
                        ["10k <= Reserve < 100k", "0.5", "5"],
                        ["100k <= Reserve < 1M", "0.4", "4"],
                        ["1M <= Reserve < 10M", "0.3", "3"],
                        ["10M <= Reserve < 100M", "0.2", "2"],
                        ["100M <= Reserve < 1B", "0.1", "1"],
                        ["Reserve >= 1B", "0.09", "0.9"],
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="p-4 text-gray-300">{row[0]}</td>
                          <td className="p-4 text-gray-300">{row[1]}</td>
                          <td className="p-4 text-gray-300">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Exchange TAX Distribution */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">
              Exchange TAX Distribution
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              UpDawg employs a three-part tax system that funds project
              development, incentivizes holders, and supports price stability
              through burns.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Team sub-TAX (60%)
                </h3>
                <p className="text-gray-300">
                  Used to support the project&apos;s ongoing growth and
                  development on the Tron blockchain.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  HODL Pool sub-TAX (20%)
                </h3>
                <p className="text-gray-300">
                  Distributed to eligible UDAWG holders who make a transaction
                  or have called the Claim Reward function on the UpDawg smart
                  contract.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  BURN sub-TAX (20%)
                </h3>
                <p className="text-gray-300">
                  These tokens collected through this sub-TAX are burned. This
                  burning mechanism helps increase the value of UpDawg over
                  time.
                </p>
              </div>
            </div>
          </section>

          {/* Tokenomics */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">Tokenomics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Supply</h3>
                <p className="text-gray-300">
                  UDAWG operates on a flexi-supply model, where tokens are
                  minted when bought with TRX and burned when sold, ensuring
                  that supply is dynamically controlled.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fees</h3>
                <p className="text-gray-300">
                  Transaction fees are applied on both buy and sell
                  transactions, with higher fees for selling to incentivize
                  holding.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fee Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-2">
                      60% to Team
                    </h4>
                    <p className="text-gray-300">
                      Used for project development and maintenance.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-2">
                      20% to BURN
                    </h4>
                    <p className="text-gray-300">
                      Reduces the total supply of UDAWG.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-2">
                      20% to HODLPool
                    </h4>
                    <p className="text-gray-300">
                      Distributed to long-term holders as rewards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HODLPool */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">HODLPool</h2>
            <p className="text-gray-300 leading-relaxed">
              HODLPool is a feature in UpDawg that allows UDAWG token holders to
              earn a share of the exchange transaction tax collected by the
              UpDawg protocol. To claim their share of HODLPool, UDAWG holders
              do not have to stake their tokens, but instead, they have to call
              the Claim Reward function on the UpDawg smart contract. The
              formula for the Claim Reward function is &quot;Reward&quot; +
              &quot;Bonus&quot;, where &quot;Reward&quot; is determined by the
              formula - [(Current Time - Time of Last Claim) ÷ 24 hours] ×
              (HODLer&apos;s balance of UDAWG before the Claim Reward is called
              ÷ Total Supply of UDAWG before the Claim Reward is called) ×
              (Current HODLPool)], and The &quot;Bonus&quot; is 0.01% of
              &quot;Reward&quot;, which are newly minted tokens issued to the
              caller of the Claim Reward function.
            </p>
          </section>

          {/* Timepot */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">Timepot</h2>
            <p className="text-gray-300 leading-relaxed">
              UpDawg&apos;s smart contract has a unique feature called Timepot,
              which calculates HODLers claim rewards whenever their balance is
              updated, including transactions such as Buy, Sell, Burn, and
              Transfer. This innovative feature ensures that HODLers are always
              incentivized and rewarded for holding their tokens.
            </p>
          </section>

          {/* Transparency */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">
              Transparency
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The UpDawg smart contract is fully auditable on the TRON
              blockchain, providing transparency to all users. The
              Proof-of-Reserve mechanism ensures that UDAWG tokens are always
              backed by TRX, mitigating the risk of manipulation or devaluation.
            </p>
          </section>

          {/* Conclusion */}
          <section className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              UpDawg is not a standard TRC20 token. It is a decentralized,
              transparent, and community-driven TRC20 token with a flexible
              supply backed by TRX reserves. The token&apos;s Proof of Reserve,
              dynamic fee structure, burning mechanism, and HODLPool rewards
              system create a sustainable and rewarding ecosystem for TRON
              users.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="https://tronscan.org/#/token20/TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k"
                target="_blank"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-4 rounded-lg transition-colors text-center"
              >
                View on Tronscan
              </Link>
              <Link
                href="https://udawg.org/dapp"
                target="_blank"
                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-6 py-4 rounded-lg transition-colors text-center"
              >
                Visit dApp
              </Link>
              <Link
                href="https://t.me/udawgorg"
                target="_blank"
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-4 rounded-lg transition-colors text-center"
              >
                Join Community
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { View };
