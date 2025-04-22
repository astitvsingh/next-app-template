// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React from "react";
import { HeroSection } from "@/app";
import { Footer } from "@/app";
import {
  FaDownload,
  FaWallet,
  FaXTwitter,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function View(): React.JSX.Element {
  return (
    <div>
      <HeroSection
        backgroundImages={["/assets/images/hero-image.png"]}
        heading="What's UpDawg?"
        description="A Decentralized Proof-of-Reserve Token."
      />

      {/* What's UpDawg Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-12 md:mb-0">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text">
                What&apos;s UpDawg?
              </h1>
              <h2 className="text-2xl text-gray-400 mb-6">
                A Decentralized Proof-of-Reserve TRC-20 token
              </h2>
              <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                UpDawg is a decentralized finance (DeFi) protocol that offers a
                unique investment opportunity for users. UDAWG token is backed
                by TRX, one of the leading cryptocurrencies in the market, and
                operates on the TRON blockchain, a public blockchain platform
                that provides scalability and security for dApps and smart
                contracts.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3"
            >
              <Image
                src="/assets/images/prodog.png"
                alt="Pro Dog"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Get Started Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-16 bg-clip-text">
            Get started
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Download TronLink */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 text-center border border-gray-800 hover:border-blue-500 transition-colors duration-300"
            >
              <FaDownload className="text-6xl text-green-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Download TronLink</h3>
              <p className="mb-6 text-gray-300">
                Install{" "}
                <Link
                  href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Chrome extension
                </Link>{" "}
                or download the{" "}
                <Link
                  href="https://www.tronlink.org/"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  mobile app
                </Link>
                .
              </p>
              <Link
                href="https://www.tronlink.org/"
                target="_blank"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                <FaDownload className="mr-2" />
                Download
              </Link>
            </motion.div>

            {/* Create Wallet */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 text-center border border-gray-800 hover:border-amber-700 transition-colors duration-300"
            >
              <FaWallet className="text-6xl text-amber-700 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Create secure wallet
              </h3>
              <p className="mb-6 text-gray-300">
                Read the instructions carefully to create a TRON wallet.
              </p>
              <Link
                href="https://tronlinkorg.zendesk.com/hc/en-us/articles/5012004270361-How-to-Create-an-Account-in-TronLink-Extension-"
                target="_blank"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                Create wallet
              </Link>
            </motion.div>

            {/* Get TRX */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 text-center border border-gray-800 hover:border-yellow-500 transition-colors duration-300"
            >
              <Image
                src="/assets/images/trx.png"
                alt="TRX Logo"
                width={64}
                height={64}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">Get TRX</h3>
              <p className="mb-6 text-gray-300">
                Get TRX from SunSwap or from exchanges like Binance.
              </p>
              <Link
                href="https://sunswap.com/#/home"
                target="_blank"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                Get TRX
              </Link>
            </motion.div>

            {/* Paw some UpDawg */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 text-center border border-gray-800 hover:border-blue-500 transition-colors duration-300"
            >
              <Image
                src="/assets/images/logo.png"
                alt="UpDawg Logo"
                width={64}
                height={64}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">Paw some UpDawg</h3>
              <p className="mb-6 text-gray-300">
                Connect TRON wallet to interact with UpDawg dAPP.
              </p>
              <Link
                href="https://udawg.org/myAccount"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                Get UpDawg
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decentralized Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3 mb-12 md:mb-0"
            >
              <Image
                src="/assets/images/redawg.png"
                alt="Red Dawg"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </motion.div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text">
                Don&apos;t Trust, Verify.
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                The decentralized nature of UpDawg provides users with greater
                transparency, security and borderless transactability than
                traditional centralized finance solutions. Since the protocol
                operates on TRON blockchain network, all transactions are
                recorded on a public ledger accessible to anyone, anytime and
                from anywhere around the world. This eliminates the risk of
                central points of control or single points of failure, reducing
                the possibility of hacks or other security breaches.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reserve Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-12 md:mb-0">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text">
                Secure financial safety net
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                UpDAWG ensures transparency by allowing users to view internal
                reserves, ensuring that token values are backed by expected
                collateral. Reserves can be easily verified via the website or
                TRON blockchain explorer. All reserves are stored on the
                blockchain for complete transparency. This provides users with a
                secure and trustworthy platform to manage their UDAWG tokens.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3"
            >
              <Image
                src="/assets/images/trxLogo1.png"
                alt="TRX"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Launchpad Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3 mb-12 md:mb-0"
            >
              <Image
                src="/assets/images/supdog1.png"
                alt="Sup Dog"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text">
                No ICO Launch, pre-sale or pre-mined tokens.
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                UpDawg launched without any ICO, pre-sale or any pre-mined
                tokens. The launchpad started on October 1, 2022, and ran for a
                limited time until October 31, 2022 to establish the initial
                price of UDAWG token against 1 TRX on TRON mainnet. UDAWG is now
                available for trading against TRX on uDawg dapp, or SunSwap.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* uDawgBot Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3 mb-12 md:mb-0"
            >
              <Image
                src="/assets/images/dogbot.png"
                alt="Dog Bot"
                width={450}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text">uDawgBot</h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                uDawg_bot is an interactive Telegram Bot designed to gamify
                community interactions and reward users for both on-chain and
                off-chain activities. Users can engage in games, track their
                profiles, interact with TRON smart contracts directly, and earn
                RP/XP for on-chain UDAWG transactions.
              </p>
              <Link
                href="https://t.me/udawgorg"
                className="group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl inline-flex items-center transition-all duration-300 transform hover:scale-105"
              >
                Learn more
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Community Contributors Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-12 md:mb-0">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text">
                UpDawg Community Contributors
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Opportunity for all you paw-some TRON enthusiasts who go above
                and beyond in supporting and contributing to the UpDawg
                ecosystem. Whether you&apos;re barking out helpful advice,
                organizing engaging events, sharing insightful content, or
                lending a helping paw to fellow community members, your
                contributions won&apos;t go unnoticed!
              </p>
              <Link
                href="https://forum.trondao.org/t/updawg-community-contributor-fund/24346"
                className="group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl inline-flex items-center transition-all duration-300 transform hover:scale-105"
              >
                Learn more
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="md:w-1/3"
            >
              <Image
                src="/assets/images/dawgshake.png"
                alt="Dawg Shake"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-16 bg-clip-text">UpDawg Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Founder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-colors duration-300"
            >
              <Image
                src="/assets/images/dawgAsti2.png"
                alt="Astitv Singh"
                width={200}
                height={200}
                className="mx-auto mb-6 rounded-full"
              />
              <p className="text-xl font-semibold mb-2">Astitv Singh</p>
              <h2 className="text-lg text-gray-400 mb-6">Founder</h2>
              <div className="flex justify-center space-x-6">
                <Link
                  href="https://x.com/astitvs"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaXTwitter className="text-2xl" />
                </Link>
                <Link
                  href="https://forum.trondao.org/u/astitv"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Image
                    src="/assets/images/tronForum.png"
                    alt="Tron Forum"
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/astitv-singh/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </Link>
              </div>
            </motion.div>

            {/* Co-Founder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-colors duration-300"
            >
              <Image
                src="/assets/images/dawgYash2.png"
                alt="Yash Kaushik"
                width={200}
                height={200}
                className="mx-auto mb-6 rounded-full"
              />
              <p className="text-xl font-semibold mb-2">Yash Kaushik</p>
              <h2 className="text-lg text-gray-400 mb-6">Co-Founder</h2>
              <div className="flex justify-center space-x-6">
                <Link
                  href="https://x.com/yashqn"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaXTwitter className="text-2xl" />
                </Link>
                <Link
                  href="https://forum.trondao.org/u/aimace"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Image
                    src="/assets/images/tronForum.png"
                    alt="Tron Forum"
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/kaushikyash17/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* DEX/Explorer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-black via-[#0c0c0c] to-black"
      >
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="mb-12">
            <Link
              href="/dex"
              className="group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl inline-flex items-center text-xl transition-all duration-300 transform hover:scale-105"
            >
              🐾 Paw some UpDawg
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="https://explorer.just.money/token/TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k?t=markets"
                target="_blank"
              >
                <Image
                  src="/assets/images/jmexplorer.png"
                  alt="JMswap"
                  width={150}
                  height={150}
                  className="rounded-lg mx-auto hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="https://sunswap.com/#/v2" target="_blank">
                <Image
                  src="/assets/images/sun.png"
                  alt="SunSwap"
                  width={150}
                  height={150}
                  className="rounded-lg mx-auto hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="https://www.dextools.io/app/en/tron/pair-explorer/TQZYs5DqYw6KR5LauJHyyv5PqRni6QwBFw?t=1724584714514"
                target="_blank"
              >
                <Image
                  src="/assets/images/dex.png"
                  alt="DEXTools"
                  width={150}
                  height={150}
                  className="rounded-lg mx-auto hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="https://avedex.cc/token/TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k-tron?from=Default"
                target="_blank"
              >
                <Image
                  src="/assets/images/ave.png"
                  alt="AveDex"
                  width={150}
                  height={150}
                  className="rounded-lg mx-auto hover:opacity-80 transition-opacity"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export { View };
