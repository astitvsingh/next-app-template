// Copyright 2025 © Astitv Singh <https://github.com/astitvsingh>.
// SPDX-License-Identifier: MIT

"use client";
import React, { useState, useEffect } from "react";
import { Alert, Navbar, mainNavLinks } from "@/app";
import {
  WalletIcon,
  FireIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Footer } from "@/app/ui/components/footer";

// Declare window type for TronLink
declare global {
  interface Window {
    tronLink?: {
      ready: boolean;
      tronWeb: any;
      request: (params: { method: string }) => Promise<void>;
      on: (event: string, callback: () => void) => void;
      off: (event: string) => void;
    };
  }
}

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}

// Cache for contract instance
interface ContractCache {
  instance: any | null;
  updatedAt: Date | null;
  interval: number;
}

let contractCache: ContractCache = {
  instance: null,
  updatedAt: null,
  interval: 30000, // 30 seconds cache
};

// Network configuration
interface NetworkConfig {
  mainnet: string;
  shasta: string;
  cur: "mainnet" | "shasta" | null;
}

const network: NetworkConfig = {
  mainnet: "TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k", // UpDawg mainnet contract
  shasta: "TBLUAJ22D6TagPUXjqi5UmqEYx9RdfkiAX", // UpDawg testnet contract
  cur: null,
};

// Get the TronWeb object from the window object
function getTronWeb() {
  if (window.tronLink && window.tronLink.tronWeb) {
    return window.tronLink.tronWeb;
  } else {
    throw new Error("TronLink is not available");
  }
}

// Get cached or fresh contract instance
async function getContract() {
  const now = new Date();
  if (
    !contractCache.instance ||
    !contractCache.updatedAt ||
    contractCache.interval <= now.getTime() - contractCache.updatedAt.getTime()
  ) {
    try {
      const tronWeb = getTronWeb();
      if (!network.cur) {
        throw new Error("Network not determined");
      }
      const contractAddress = network[network.cur];
      contractCache.instance = await tronWeb.contract().at(contractAddress);
      contractCache.updatedAt = now;
    } catch (error) {
      console.error("Failed to initialize contract:", error);
      throw error;
    }
  }
  return contractCache.instance;
}

// Function to determine network
function getNet() {
  if (typeof window.tronLink !== "undefined" && window.tronLink.tronWeb) {
    try {
      if (
        window.tronLink.tronWeb.fullNode.host.includes(
          "https://api.trongrid.io"
        )
      ) {
        network.cur = "mainnet";
      } else if (
        window.tronLink.tronWeb.fullNode.host.includes(
          "https://api.shasta.trongrid.io"
        )
      ) {
        network.cur = "shasta";
      }
    } catch (error) {
      console.error("Failed to determine network:", error);
      throw error;
    }
  } else {
    throw new Error("TronLink is not available");
  }
}

// Function to get contract for write operations
async function getWriteContract() {
  const tronWeb = getTronWeb();
  getNet(); // Determine network
  if (!network.cur) {
    throw new Error("Network not determined");
  }
  const contractAddress = network[network.cur];
  return await tronWeb.contract().at(contractAddress);
}

function View(): React.JSX.Element {
  const [account, setAccount] = useState<string | null>(null);
  const [trxBalance, setTrxBalance] = useState<number | null>(null);
  const [udawgBalance, setUdawgBalance] = useState<number | null>(null);
  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(
    null
  );
  const [hodlSupply, setHodlSupply] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [trxReserve, setTrxReserve] = useState<number | null>(null);
  const [buyFees, setBuyFees] = useState<number | null>(null);
  const [sellFees, setSellFees] = useState<number | null>(null);
  const [basisPoint, setBasisPoint] = useState<number | null>(null);
  const [equity, setEquity] = useState<number | null>(null);
  const [udawgPrice, setUdawgPrice] = useState<number | null>(null);
  const [sellValue, setSellValue] = useState<number | null>(null);
  const [prevClaim, setPrevClaim] = useState<string | null>(null);
  const [timepotAge, setTimepotAge] = useState<string | null>(null);
  const [unclaimedRewards, setUnclaimedRewards] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [donateAmount, setDonateAmount] = useState("");
  const [buySliderValue, setBuySliderValue] = useState(0);
  const [sellSliderValue, setSellSliderValue] = useState(0);
  const [burnSliderValue, setBurnSliderValue] = useState(0);
  const [donateSliderValue, setDonateSliderValue] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "buy" | "sell" | "burn" | "donate"
  >("buy");
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const UPDAWG_CONTRACT = "TFLBD1LgA9aqeJqiiUnHAd9q3CUpqvop3k"; // UpDawg smart contract address
  const DECIMALS = 6;

  // Helper function to format numbers with commas
  const formatWithCommas = (number: number) => {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: DECIMALS,
      maximumFractionDigits: DECIMALS,
    });
  };

  // Function to show alert
  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setAlert({ isOpen: true, title, message, type });
    setTimeout(() => {
      closeAlert();
    }, 20000);
  };

  // Function to close alert
  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  // Function to calculate equity
  const calculateEquity = (balance: number, totalSupply: number) => {
    if (!balance || !totalSupply || totalSupply === 0) return null;
    return (balance * 100) / totalSupply;
  };

  // Function to calculate UDAWG price
  const calculateUdawgPrice = async (contract: any) => {
    try {
      const result = await contract.exchangeValue(1000000).call();
      if (!result) {
        throw new Error("Failed to get exchange value");
      }
      return result / Math.pow(10, DECIMALS);
    } catch (error) {
      console.error("Failed to get UDAWG price:", error);
      return null;
    }
  };

  // Function to calculate sell value
  const calculateSellValue = async (
    contract: any,
    balance: number,
    totalSupply: number,
    reserve: number,
    sellFees: number,
    basisPoint: number
  ) => {
    try {
      // Calculate fees
      const fees = (sellFees * balance) / Math.pow(10, basisPoint);
      const txnBalance = balance - fees;

      // Calculate final supply and reserve
      const finalSupply = totalSupply - txnBalance;
      const finalReserve = (finalSupply * reserve) / totalSupply;
      const result = reserve - finalReserve;

      return result / 1_000_000; // Convert from sun to TRX
    } catch (error) {
      console.error("Failed to calculate sell value:", error);
      return null;
    }
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Function to calculate timepot age
  const calculateTimepotAge = (prevClaimTimestamp: number) => {
    const now = new Date().getTime();
    let remainingAge = now - prevClaimTimestamp * 1000; // Convert seconds to milliseconds
    let final = "";

    // Calculate days
    if (remainingAge >= 86400000) {
      // 24 hours in milliseconds
      const days = Math.floor(remainingAge / 86400000);
      remainingAge = remainingAge - days * 86400000;
      final = `${days}d:`;
    }

    // Calculate hours
    if (remainingAge >= 3600000) {
      // 1 hour in milliseconds
      const hours = Math.floor(remainingAge / 3600000);
      remainingAge = remainingAge - hours * 3600000;
      final += `${hours}h:`;
    }

    // Calculate minutes
    if (remainingAge >= 60000) {
      // 1 minute in milliseconds
      const minutes = Math.floor(remainingAge / 60000);
      remainingAge = remainingAge - minutes * 60000;
      final += `${minutes}m:`;
    }

    // Calculate seconds
    if (remainingAge >= 1000) {
      // 1 second in milliseconds
      const seconds = Math.floor(remainingAge / 1000);
      final += `${seconds}s`;
    }

    return final;
  };

  // Function to calculate unclaimed rewards
  const calculateUnclaimedRewards = async (
    contract: any,
    address: string,
    balance: number,
    timepotAge: number,
    totalSupply: number,
    hodlSupply: number
  ) => {
    try {
      const BASE_AGE = 86400000; // 24 hours in milliseconds
      const decimals = DECIMALS;

      // Calculate base reward
      const baseReward =
        (timepotAge * balance * hodlSupply) / (BASE_AGE * totalSupply);

      // Calculate inflation (1% of base reward)
      const inflation = (baseReward * 0.01) / 100;

      // Calculate final reward
      let finalReward;
      if (baseReward + inflation > hodlSupply) {
        finalReward = inflation;
      } else {
        finalReward = baseReward + inflation;
      }

      return finalReward;
    } catch (error) {
      console.error("Failed to calculate unclaimed rewards:", error);
      return null;
    }
  };

  // Function to initialize TronWeb and fetch data
  const initTronWeb = async () => {
    const retryInterval = 500; // Retry every 500ms
    const maxRetries = 10; // Maximum retries
    let retries = 0;

    const checkTronLink = async () => {
      try {
        if (window.tronLink && window.tronLink.ready) {
          getNet(); // Determine network
          const tronWebInstance = getTronWeb();
          const contract = await getContract();

          if (!contract) {
            throw new Error("Failed to get contract instance");
          }

          const userAccount = tronWebInstance.defaultAddress.base58;
          setAccount(userAccount);

          // Fetch TRX balance
          const userTrxBalance = await tronWebInstance.trx.getBalance(
            userAccount
          );
          setTrxBalance(userTrxBalance / 1_000_000); // Convert from sun to TRX

          // Fetch previous claim timestamp and calculate timepot age
          const prevClaimResult = await contract
            .prevClaimOf(userAccount)
            .call();
          if (prevClaimResult) {
            setPrevClaim(formatTimestamp(prevClaimResult));
            const timepotAgeValue = calculateTimepotAge(prevClaimResult);
            setTimepotAge(timepotAgeValue);

            // Fetch UpDawg balance
            const rawUdawgBalance = await contract
              .balanceOf(userAccount)
              .call();
            const udawgBalance = rawUdawgBalance / Math.pow(10, DECIMALS);
            setUdawgBalance(udawgBalance);

            // Fetch supplies
            const rawTotalSupply = await contract.totalSupply().call();
            const totalSupply = rawTotalSupply / Math.pow(10, DECIMALS);
            setTotalSupply(totalSupply);

            const rawHodlSupply = await contract.hodlSupply().call();
            const hodlSupply = rawHodlSupply / Math.pow(10, DECIMALS);
            setHodlSupply(hodlSupply);

            // Fetch circulating supply
            const circulatingSupply = await contract.circulatingSupply().call();
            setCirculatingSupply(circulatingSupply / Math.pow(10, DECIMALS));

            // Calculate unclaimed rewards
            const rewards = await calculateUnclaimedRewards(
              contract,
              userAccount,
              udawgBalance,
              new Date().getTime() - prevClaimResult * 1000,
              totalSupply,
              hodlSupply
            );
            setUnclaimedRewards(rewards);

            // Calculate sell value
            const sellValueResult = await calculateSellValue(
              contract,
              rawUdawgBalance,
              rawTotalSupply,
              await contract.reserve().call(),
              await contract.sellFees().call(),
              await contract.basisPoint().call()
            );
            setSellValue(sellValueResult);

            // Calculate equity
            const equityValue = calculateEquity(udawgBalance, totalSupply);
            setEquity(equityValue);
          }

          // Fetch UDAWG price
          const price = await calculateUdawgPrice(contract);
          setUdawgPrice(price);

          // Fetch TRX reserve
          const rawTrxReserve = await contract.reserve().call();
          setTrxReserve(rawTrxReserve / 1_000_000);

          // Fetch basis point and sell fees
          const rawBasisPoint = await contract.basisPoint().call();
          setBasisPoint(rawBasisPoint);

          const rawSellFees = await contract.sellFees().call();
          const sellFeesPercentage =
            (rawSellFees * 100) / Math.pow(10, rawBasisPoint);
          setSellFees(sellFeesPercentage);

          // Fetch fees and convert to percentage
          const rawBuyFees = await contract.buyFees().call();
          const buyFeesPercentage =
            (rawBuyFees * 100) / Math.pow(10, rawBasisPoint);
          setBuyFees(buyFeesPercentage);

          setConnected(true);
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(checkTronLink, retryInterval);
        } else {
          showAlert(
            "Connection Error",
            "Failed to initialize TronLink wallet. Please try refreshing the page.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error initializing TronWeb:", error);
        showAlert(
          "Connection Error",
          "Error connecting to wallet. Please try again.",
          "error"
        );
      }
    };

    checkTronLink();
  };

  useEffect(() => {
    initTronWeb();

    // Add network change listener
    if (window.tronLink) {
      window.addEventListener("message", (event) => {
        if (event.data.message && event.data.message.action === "setNode") {
          showAlert("Network Changed", "Refreshing app...", "info");
          window.location.reload();
        }
      });
    }

    return () => {
      // Cleanup listener
      window.removeEventListener("message", () => {});
    };
  }, []);

  const handleConnect = async () => {
    if (window.tronLink) {
      try {
        await window.tronLink.request({ method: "tron_requestAccounts" });
        await initTronWeb();
        showAlert("Success", "Wallet connected successfully!", "success");
      } catch (err) {
        console.error("Error connecting to TronLink wallet:", err);
        showAlert(
          "Connection Error",
          "Please enable TronLink wallet and try again.",
          "error"
        );
      }
    } else {
      showAlert("Wallet Not Found", "Please install TronLink wallet.", "error");
    }
  };

  // Function to update timepot age and unclaimed rewards
  const updateTimepotAndRewards = async () => {
    try {
      const tronWebInstance = getTronWeb();
      const contract = await getContract();
      if (!contract) return;

      const userAccount = tronWebInstance.defaultAddress.base58;
      const prevClaimResult = await contract.prevClaimOf(userAccount).call();
      if (prevClaimResult) {
        // Update timepot age
        const timepotAgeValue = calculateTimepotAge(prevClaimResult);
        setTimepotAge(timepotAgeValue);

        // Update unclaimed rewards
        const rawUdawgBalance = await contract.balanceOf(userAccount).call();
        const udawgBalance = rawUdawgBalance / Math.pow(10, DECIMALS);

        const rawTotalSupply = await contract.totalSupply().call();
        const totalSupply = rawTotalSupply / Math.pow(10, DECIMALS);

        const rawHodlSupply = await contract.hodlSupply().call();
        const hodlSupply = rawHodlSupply / Math.pow(10, DECIMALS);

        const rewards = await calculateUnclaimedRewards(
          contract,
          userAccount,
          udawgBalance,
          new Date().getTime() - prevClaimResult * 1000,
          totalSupply,
          hodlSupply
        );
        setUnclaimedRewards(rewards);
      }
    } catch (error) {
      console.error("Error updating timepot age and rewards:", error);
    }
  };

  // Auto-update timepot age and rewards every second
  useEffect(() => {
    if (connected) {
      const interval = setInterval(updateTimepotAndRewards, 1000);
      return () => clearInterval(interval);
    }
  }, [connected]);

  // Function to update all data except timepot age and rewards
  const updateData = async () => {
    try {
      const tronWebInstance = getTronWeb();
      const contract = await getContract();
      if (!contract) return;

      const userAccount = tronWebInstance.defaultAddress.base58;

      // Fetch TRX balance
      const userTrxBalance = await tronWebInstance.trx.getBalance(userAccount);
      setTrxBalance(userTrxBalance / Math.pow(10, DECIMALS));

      // Fetch UpDawg balance
      const rawUdawgBalance = await contract.balanceOf(userAccount).call();
      const udawgBalance = rawUdawgBalance / Math.pow(10, DECIMALS);
      setUdawgBalance(udawgBalance);

      // Fetch supplies
      const rawTotalSupply = await contract.totalSupply().call();
      const totalSupply = rawTotalSupply / Math.pow(10, DECIMALS);
      setTotalSupply(totalSupply);

      const rawHodlSupply = await contract.hodlSupply().call();
      const hodlSupply = rawHodlSupply / Math.pow(10, DECIMALS);
      setHodlSupply(hodlSupply);

      // Fetch circulating supply
      const circulatingSupply = await contract.circulatingSupply().call();
      setCirculatingSupply(circulatingSupply / Math.pow(10, DECIMALS));

      // Fetch previous claim timestamp
      const prevClaimResult = await contract.prevClaimOf(userAccount).call();
      if (prevClaimResult) {
        setPrevClaim(formatTimestamp(prevClaimResult));

        // Calculate sell value
        const sellValueResult = await calculateSellValue(
          contract,
          rawUdawgBalance,
          rawTotalSupply,
          await contract.reserve().call(),
          await contract.sellFees().call(),
          await contract.basisPoint().call()
        );
        setSellValue(sellValueResult);

        // Calculate equity
        const equityValue = calculateEquity(udawgBalance, totalSupply);
        setEquity(equityValue);
      }

      // Fetch UDAWG price
      const price = await calculateUdawgPrice(contract);
      setUdawgPrice(price);

      // Fetch TRX reserve
      const rawTrxReserve = await contract.reserve().call();
      setTrxReserve(rawTrxReserve / 1_000_000);

      // Fetch basis point and sell fees
      const rawBasisPoint = await contract.basisPoint().call();
      setBasisPoint(rawBasisPoint);

      const rawSellFees = await contract.sellFees().call();
      const sellFeesPercentage =
        (rawSellFees * 100) / Math.pow(10, rawBasisPoint);
      setSellFees(sellFeesPercentage);

      // Fetch fees and convert to percentage
      const rawBuyFees = await contract.buyFees().call();
      const buyFeesPercentage =
        (rawBuyFees * 100) / Math.pow(10, rawBasisPoint);
      setBuyFees(buyFeesPercentage);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Modify transaction handlers to update TRX balance immediately after transaction
  const handleClaimReward = async () => {
    if (!connected) {
      showAlert("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    if (!window.tronLink) {
      showAlert("Wallet Not Found", "TronLink is not installed.", "error");
      return;
    }

    try {
      setIsClaiming(true);
      showAlert("Transaction Pending", "Claiming reward...", "info");

      const contract = await getWriteContract();
      if (!contract) {
        throw new Error("Failed to get contract instance");
      }

      // Call claimReward function
      const transaction = await contract.claimReward().send();

      showAlert(
        "Success",
        `Reward claimed successfully! Transaction: ${transaction}`,
        "success"
      );

      // Update TRX balance immediately after transaction
      await updateData();

      // Update all data after successful claim
      await updateData();
    } catch (error) {
      console.error("Error claiming reward:", error);
      showAlert(
        "Transaction Failed",
        "Failed to claim reward. Please try again.",
        "error"
      );
    } finally {
      setIsClaiming(false);
    }
  };

  const handleBuy = async () => {
    if (!connected) {
      showAlert("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    if (!window.tronLink) {
      showAlert("Wallet Not Found", "TronLink is not installed.", "error");
      return;
    }

    const amount = parseFloat(buyAmount);
    if (!amount || amount <= 0) {
      showAlert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
        "error"
      );
      return;
    }

    try {
      setIsBuying(true);
      showAlert(
        "Transaction Pending",
        "Please sign the transaction...",
        "info"
      );

      const tronWebInstance = getTronWeb();
      const contract = await getWriteContract();

      // Convert TRX amount to sun (1 TRX = 1,000,000 sun)
      const amountInSun = tronWebInstance
        .toBigNumber(amount * 1_000_000)
        .toString(10);

      // Create transaction and wait for signature
      const signedTx = await contract.buy().send({
        callValue: amountInSun,
        shouldPollResponse: false,
      });

      if (signedTx) {
        showAlert("Transaction Signed", "Buying UDAWG tokens...", "info");
        setBuyAmount("");

        // Update TRX balance immediately after transaction
        await updateData();

        // Start polling for transaction confirmation
        try {
          const receipt = await tronWebInstance.trx.getTransaction(signedTx);
          if (receipt) {
            showAlert(
              "Success",
              "UDAWG tokens purchased successfully!",
              "success"
            );
            // Update all data after successful purchase
            await updateData();
          }
        } catch (confirmError) {
          console.error("Error confirming buy transaction:", confirmError);
          showAlert(
            "Transaction Pending",
            "Transaction sent but confirmation pending. Please check your wallet for status.",
            "info"
          );
        }
      }
    } catch (error: any) {
      console.error("Buy transaction error:", error);
      showAlert(
        "Transaction Failed",
        error.message || "Failed to buy tokens. Please try again.",
        "error"
      );
      setBuyAmount("");
    } finally {
      setIsBuying(false);
    }
  };

  const handleSell = async () => {
    if (!connected) {
      showAlert("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    if (!window.tronLink) {
      showAlert("Wallet Not Found", "TronLink is not installed.", "error");
      return;
    }

    const amount = parseFloat(sellAmount);
    if (!amount || amount <= 0) {
      showAlert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
        "error"
      );
      return;
    }

    try {
      setIsSelling(true);
      showAlert(
        "Transaction Pending",
        "Please sign the transaction...",
        "info"
      );

      const tronWebInstance = getTronWeb();
      const contract = await getWriteContract();

      // Convert amount to token decimals
      const amountInDecimals = tronWebInstance
        .toBigNumber(amount * Math.pow(10, DECIMALS))
        .toString(10);

      // Create transaction and wait for signature
      const signedTx = await contract.sell(amountInDecimals).send({
        shouldPollResponse: false,
      });

      if (signedTx) {
        showAlert("Transaction Signed", "Selling UDAWG tokens...", "info");
        setSellAmount("");

        // Update TRX balance immediately after transaction
        await updateData();

        // Start polling for transaction confirmation
        try {
          const receipt = await tronWebInstance.trx.getTransaction(signedTx);
          if (receipt) {
            showAlert("Success", "UDAWG tokens sold successfully!", "success");
            // Update all data after successful sale
            await updateData();
          }
        } catch (confirmError) {
          console.error("Error confirming sell transaction:", confirmError);
          showAlert(
            "Transaction Pending",
            "Transaction sent but confirmation pending. Please check your wallet for status.",
            "info"
          );
        }
      }
    } catch (error: any) {
      console.error("Sell transaction error:", error);
      showAlert(
        "Transaction Failed",
        error.message || "Failed to sell tokens. Please try again.",
        "error"
      );
      setSellAmount("");
    } finally {
      setIsSelling(false);
    }
  };

  const handleBurn = async () => {
    if (!connected) {
      showAlert("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    if (!window.tronLink) {
      showAlert("Wallet Not Found", "TronLink is not installed.", "error");
      return;
    }

    const amount = parseFloat(burnAmount);
    if (!amount || amount <= 0) {
      showAlert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
        "error"
      );
      return;
    }

    try {
      setIsBurning(true);
      showAlert(
        "Transaction Pending",
        "Please sign the transaction...",
        "info"
      );

      const tronWebInstance = getTronWeb();
      const contract = await getWriteContract();

      // Convert amount to token decimals
      const amountInDecimals = tronWebInstance
        .toBigNumber(amount * Math.pow(10, DECIMALS))
        .toString(10);

      // Create transaction and wait for signature
      const signedTx = await contract.burn(amountInDecimals).send({
        shouldPollResponse: false,
      });

      if (signedTx) {
        showAlert("Transaction Signed", "Burning UDAWG tokens...", "info");
        setBurnAmount("");

        // Start polling for transaction confirmation
        try {
          const receipt = await tronWebInstance.trx.getTransaction(signedTx);
          if (receipt) {
            showAlert(
              "Success",
              "UDAWG tokens burned successfully!",
              "success"
            );
            // Update data after successful burn
            await updateData();
          }
        } catch (confirmError) {
          console.error("Error confirming burn transaction:", confirmError);
          showAlert(
            "Transaction Pending",
            "Transaction sent but confirmation pending. Please check your wallet for status.",
            "info"
          );
        }
      }
    } catch (error: any) {
      console.error("Burn transaction error:", error);
      showAlert(
        "Transaction Failed",
        error.message || "Failed to burn tokens. Please try again.",
        "error"
      );
      setBurnAmount("");
    } finally {
      setIsBurning(false);
    }
  };

  const handleDonate = async () => {
    if (!connected) {
      showAlert("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    if (!window.tronLink) {
      showAlert("Wallet Not Found", "TronLink is not installed.", "error");
      return;
    }

    const amount = parseFloat(donateAmount);
    if (!amount || amount <= 0) {
      showAlert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0.",
        "error"
      );
      return;
    }

    try {
      setIsDonating(true);
      showAlert(
        "Transaction Pending",
        "Please sign the transaction...",
        "info"
      );

      const tronWebInstance = getTronWeb();
      const contract = await getWriteContract();

      // Convert amount to token decimals
      const amountInDecimals = tronWebInstance
        .toBigNumber(amount * Math.pow(10, DECIMALS))
        .toString(10);

      // Create transaction and wait for signature
      const signedTx = await contract.donateReward(amountInDecimals).send({
        shouldPollResponse: false,
      });

      if (signedTx) {
        showAlert("Transaction Signed", "Donating UDAWG tokens...", "info");
        setDonateAmount("");

        // Start polling for transaction confirmation
        try {
          const receipt = await tronWebInstance.trx.getTransaction(signedTx);
          if (receipt) {
            showAlert(
              "Success",
              "UDAWG tokens donated successfully!",
              "success"
            );
            // Update data after successful donation
            await updateData();
          }
        } catch (confirmError) {
          console.error("Error confirming donation transaction:", confirmError);
          showAlert(
            "Transaction Pending",
            "Transaction sent but confirmation pending. Please check your wallet for status.",
            "info"
          );
        }
      }
    } catch (error: any) {
      console.error("Donate transaction error:", error);
      showAlert(
        "Transaction Failed",
        error.message || "Failed to donate tokens. Please try again.",
        "error"
      );
      setDonateAmount("");
    } finally {
      setIsDonating(false);
    }
  };

  // Function to handle slider changes
  const handleSliderChange = (
    value: number,
    type: "buy" | "sell" | "burn" | "donate"
  ) => {
    const maxValue = type === "buy" ? trxBalance : udawgBalance;
    if (!maxValue) return;

    const amount = (value / 100) * maxValue;
    switch (type) {
      case "buy":
        setBuySliderValue(value);
        setBuyAmount(amount.toFixed(DECIMALS));
        break;
      case "sell":
        setSellSliderValue(value);
        setSellAmount(amount.toFixed(DECIMALS));
        break;
      case "burn":
        setBurnSliderValue(value);
        setBurnAmount(amount.toFixed(DECIMALS));
        break;
      case "donate":
        setDonateSliderValue(value);
        setDonateAmount(amount.toFixed(DECIMALS));
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0c0c0c] to-black">
      <Navbar
        logoSrc="/assets/images/logo.png"
        logoAlt="Company Logo"
        links={mainNavLinks}
      />
      <div className="container mx-auto px-4 sm:px-6 py-12 mt-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          UpDawg DApp
        </h1>
        {!connected && (
          <p className="text-xl mb-8 text-center text-gray-300">
            Connect your Tron wallet and interact with the UpDawg ecosystem.
          </p>
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          {connected ? (
            <>
              {/* My Account Card */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-800/50">
                <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                  <WalletIcon className="h-7 w-7 mr-3 text-blue-500" />
                  My Account
                </h2>
                <div className="space-y-8">
                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-lg font-medium text-white flex items-center mb-3">
                      <BanknotesIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Connected Account
                    </h3>
                    <p className="text-gray-300 break-all text-sm font-mono bg-black/20 p-3 rounded-lg">
                      {account}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Balance Section */}
                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <img
                          src="/assets/images/trx.png"
                          alt="TRX"
                          className="h-6 w-6 mr-2"
                        />
                        TRX Balance
                      </h3>
                      <p className="text-gray-300 text-xl break-all">
                        {trxBalance
                          ? formatWithCommas(trxBalance)
                          : "Loading..."}
                        <span className="text-sm ml-2 text-gray-400">TRX</span>
                      </p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <img
                          src="/assets/images/logo.png"
                          alt="UDAWG"
                          className="h-6 w-6 mr-2"
                        />
                        UpDawg Balance
                      </h3>
                      <p className="text-gray-300 text-xl break-all">
                        {udawgBalance
                          ? formatWithCommas(udawgBalance)
                          : "Loading..."}
                        <span className="text-sm ml-2 text-gray-400">
                          UDAWG
                        </span>
                      </p>
                    </div>

                    {/* Equity and Sell Value Section */}
                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <ChartBarIcon className="h-6 w-6 mr-2 text-green-500" />
                        Equity
                      </h3>
                      <p className="text-gray-300 text-xl break-all">
                        {equity ? `≈ ${equity.toFixed(2)}%` : "Loading..."}
                      </p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <ArrowTrendingUpIcon className="h-6 w-6 mr-2 text-purple-500" />
                        Sell Value
                      </h3>
                      <p className="text-gray-300 text-xl break-all flex items-center">
                        {sellValue
                          ? `≈ ${formatWithCommas(sellValue)}`
                          : "Loading..."}
                        <img
                          src="/assets/images/trx.png"
                          alt="TRX"
                          className="h-5 w-5 ml-2"
                        />
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Including{" "}
                        {sellFees ? sellFees.toFixed(2) : "Loading..."}% Sell
                        Tax
                      </p>
                    </div>

                    {/* Claim Information Section */}
                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <ClockIcon className="h-6 w-6 mr-2 text-yellow-500" />
                        Last Claim
                      </h3>
                      <p className="text-gray-300 text-sm break-all">
                        {prevClaim ? prevClaim : "No previous claims"}
                      </p>
                    </div>

                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <ClockIcon className="h-6 w-6 mr-2 text-blue-500" />
                        Timepot Age
                      </h3>
                      <p className="text-gray-300 text-xl break-all">
                        {timepotAge ? timepotAge : "No timepot age"}
                      </p>
                    </div>

                    {/* Unclaimed Rewards Section */}
                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30 md:col-span-2">
                      <h3 className="text-white font-medium flex items-center mb-3">
                        <GiftIcon className="h-6 w-6 mr-2 text-green-500" />
                        Unclaimed Rewards
                      </h3>
                      <p className="text-gray-300 text-xl break-all flex items-center">
                        {unclaimedRewards !== null
                          ? `≈ ${formatWithCommas(unclaimedRewards)}`
                          : "Loading..."}
                        <img
                          src="/assets/images/logo.png"
                          alt="UDAWG"
                          className="h-5 w-5 ml-2"
                        />
                      </p>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleClaimReward}
                      disabled={isClaiming}
                      className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-full hover:from-green-500 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center ${
                        isClaiming ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isClaiming ? (
                        <>
                          <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <GiftIcon className="h-5 w-5 mr-2" />
                          Claim Reward
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* DawgSwap Card */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-800/50">
                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={() => setActiveTab("buy")}
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center text-sm ${
                      activeTab === "buy"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                        : "bg-black/30 text-gray-300 hover:bg-black/50"
                    }`}
                  >
                    <ArrowUpTrayIcon className="h-4 w-4 mr-1.5" />
                    Buy
                  </button>
                  <button
                    onClick={() => setActiveTab("sell")}
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center text-sm ${
                      activeTab === "sell"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                        : "bg-black/30 text-gray-300 hover:bg-black/50"
                    }`}
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
                    Sell
                  </button>
                  <button
                    onClick={() => setActiveTab("burn")}
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center text-sm ${
                      activeTab === "burn"
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                        : "bg-black/30 text-gray-300 hover:bg-black/50"
                    }`}
                  >
                    <FireIcon className="h-4 w-4 mr-1.5" />
                    Burn
                  </button>
                  <button
                    onClick={() => setActiveTab("donate")}
                    className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center text-sm ${
                      activeTab === "donate"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                        : "bg-black/30 text-gray-300 hover:bg-black/50"
                    }`}
                  >
                    <HeartIcon className="h-4 w-4 mr-1.5" />
                    Donate
                  </button>
                </div>

                <div className="space-y-6">
                  {activeTab === "buy" ? (
                    <>
                      <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                        <label
                          htmlFor="buyAmount"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Amount in TRX
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="buyAmount"
                            value={buyAmount}
                            onChange={(e) => {
                              setBuyAmount(e.target.value);
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && trxBalance) {
                                setBuySliderValue((value / trxBalance) * 100);
                              }
                            }}
                            placeholder="Enter amount in TRX"
                            className="block w-full rounded-xl gray border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                            disabled={!connected || isBuying}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={buySliderValue}
                            onChange={(e) =>
                              handleSliderChange(
                                parseInt(e.target.value),
                                "buy"
                              )
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,theme(colors.blue.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:bg-[linear-gradient(to_right,theme(colors.blue.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg"
                            style={
                              {
                                "--slider-fill": `${buySliderValue}%`,
                              } as React.CSSProperties
                            }
                            disabled={!connected || isBuying}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>{buySliderValue}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-400 flex items-center">
                          Available Balance:{" "}
                          {trxBalance
                            ? formatWithCommas(trxBalance)
                            : "Loading..."}
                          <img
                            src="/assets/images/trx.png"
                            alt="TRX"
                            className="h-4 w-4 ml-2"
                          />
                        </p>
                        {buyAmount && udawgPrice && (
                          <p className="mt-2 text-sm text-gray-300">
                            You will receive approximately:{" "}
                            {formatWithCommas(
                              parseFloat(buyAmount) *
                                udawgPrice *
                                (1 - (buyFees || 0) / 100)
                            )}{" "}
                            UDAWG
                            <span className="text-xs text-gray-400 ml-2">
                              (including {buyFees?.toFixed(2) || "0"}% buy tax)
                            </span>
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleBuy}
                        disabled={!connected || isBuying || !buyAmount}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 ${
                          !connected || isBuying || !buyAmount
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isBuying ? "Processing..." : "Buy UDAWG"}
                      </button>
                    </>
                  ) : activeTab === "sell" ? (
                    <>
                      <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                        <label
                          htmlFor="sellAmount"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Amount in UDAWG
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="sellAmount"
                            value={sellAmount}
                            onChange={(e) => {
                              setSellAmount(e.target.value);
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && udawgBalance) {
                                setSellSliderValue(
                                  (value / udawgBalance) * 100
                                );
                              }
                            }}
                            placeholder="Enter amount in UDAWG"
                            className="block w-full rounded-xl gray border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                            disabled={!connected || isSelling}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sellSliderValue}
                            onChange={(e) =>
                              handleSliderChange(
                                parseInt(e.target.value),
                                "sell"
                              )
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,theme(colors.blue.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:bg-[linear-gradient(to_right,theme(colors.blue.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg"
                            style={
                              {
                                "--slider-fill": `${sellSliderValue}%`,
                              } as React.CSSProperties
                            }
                            disabled={!connected || isSelling}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>{sellSliderValue}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-400 flex items-center">
                          Available Balance:{" "}
                          {udawgBalance
                            ? formatWithCommas(udawgBalance)
                            : "Loading..."}
                          <img
                            src="/assets/images/logo.png"
                            alt="UDAWG"
                            className="h-4 w-4 ml-2"
                          />
                        </p>
                        {sellAmount && udawgPrice && (
                          <p className="mt-2 text-sm text-gray-300">
                            You will receive approximately:{" "}
                            {formatWithCommas(
                              (parseFloat(sellAmount) / udawgPrice) *
                                (1 - (sellFees || 0) / 100)
                            )}{" "}
                            TRX
                            <span className="text-xs text-gray-400 ml-2">
                              (including {sellFees?.toFixed(2) || "0"}% sell
                              tax)
                            </span>
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleSell}
                        disabled={!connected || isSelling || !sellAmount}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 ${
                          !connected || isSelling || !sellAmount
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isSelling ? "Processing..." : "Sell UDAWG"}
                      </button>
                    </>
                  ) : activeTab === "burn" ? (
                    <>
                      <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                        <label
                          htmlFor="burnAmount"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Amount in UDAWG
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="burnAmount"
                            value={burnAmount}
                            onChange={(e) => {
                              setBurnAmount(e.target.value);
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && udawgBalance) {
                                setBurnSliderValue(
                                  (value / udawgBalance) * 100
                                );
                              }
                            }}
                            placeholder="Enter amount in UDAWG to burn"
                            className="block w-full rounded-xl gray border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-3"
                            disabled={!connected || isBurning}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={burnSliderValue}
                            onChange={(e) =>
                              handleSliderChange(
                                parseInt(e.target.value),
                                "burn"
                              )
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,theme(colors.red.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:bg-[linear-gradient(to_right,theme(colors.red.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg"
                            style={
                              {
                                "--slider-fill": `${burnSliderValue}%`,
                              } as React.CSSProperties
                            }
                            disabled={!connected || isBurning}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>{burnSliderValue}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-400 flex items-center">
                          Available Balance:{" "}
                          {udawgBalance
                            ? formatWithCommas(udawgBalance)
                            : "Loading..."}
                          <img
                            src="/assets/images/logo.png"
                            alt="UDAWG"
                            className="h-4 w-4 ml-2"
                          />
                        </p>
                      </div>

                      <button
                        onClick={handleBurn}
                        disabled={!connected || isBurning || !burnAmount}
                        className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 ${
                          !connected || isBurning || !burnAmount
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isBurning ? "Processing..." : "Burn UDAWG"}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                        <label
                          htmlFor="donateAmount"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Amount in UDAWG
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="donateAmount"
                            value={donateAmount}
                            onChange={(e) => {
                              setDonateAmount(e.target.value);
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && udawgBalance) {
                                setDonateSliderValue(
                                  (value / udawgBalance) * 100
                                );
                              }
                            }}
                            placeholder="Enter amount in UDAWG to donate"
                            className="block w-full rounded-xl gray border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
                            disabled={!connected || isDonating}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={donateSliderValue}
                            onChange={(e) =>
                              handleSliderChange(
                                parseInt(e.target.value),
                                "donate"
                              )
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,theme(colors.purple.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:bg-[linear-gradient(to_right,theme(colors.purple.500)_var(--slider-fill),theme(colors.gray.700)_var(--slider-fill))] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg"
                            style={
                              {
                                "--slider-fill": `${donateSliderValue}%`,
                              } as React.CSSProperties
                            }
                            disabled={!connected || isDonating}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span>{donateSliderValue}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-400 flex items-center">
                          Available Balance:{" "}
                          {udawgBalance
                            ? formatWithCommas(udawgBalance)
                            : "Loading..."}
                          <img
                            src="/assets/images/logo.png"
                            alt="UDAWG"
                            className="h-4 w-4 ml-2"
                          />
                        </p>
                      </div>

                      <button
                        onClick={handleDonate}
                        disabled={!connected || isDonating || !donateAmount}
                        className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 ${
                          !connected || isDonating || !donateAmount
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isDonating ? "Processing..." : "Donate UDAWG"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Token Stats Card */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-800/50">
                <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                  <ChartBarIcon className="h-7 w-7 mr-3 text-blue-500" />
                  Token Stats
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <img
                        src="/assets/images/trx.png"
                        alt="TRX"
                        className="h-6 w-6 mr-2"
                      />
                      Current Price
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {udawgPrice
                        ? `1 TRX ≈ ${udawgPrice.toFixed(6)} UDAWG`
                        : "Loading..."}
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <img
                        src="/assets/images/logo.png"
                        alt="UDAWG"
                        className="h-6 w-6 mr-2"
                      />
                      Circulating Supply
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {circulatingSupply
                        ? formatWithCommas(circulatingSupply)
                        : "Loading..."}{" "}
                      UDAWG
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <img
                        src="/assets/images/logo.png"
                        alt="UDAWG"
                        className="h-6 w-6 mr-2"
                      />
                      HODL Supply
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {hodlSupply !== null
                        ? formatWithCommas(hodlSupply)
                        : "Loading..."}{" "}
                      UDAWG
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <img
                        src="/assets/images/logo.png"
                        alt="UDAWG"
                        className="h-6 w-6 mr-2"
                      />
                      Total Supply
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {totalSupply
                        ? formatWithCommas(totalSupply)
                        : "Loading..."}{" "}
                      UDAWG
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <img
                        src="/assets/images/trx.png"
                        alt="TRX"
                        className="h-6 w-6 mr-2"
                      />
                      Contract TRX Reserve
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {trxReserve ? formatWithCommas(trxReserve) : "Loading..."}{" "}
                      TRX
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <ArrowTrendingUpIcon className="h-6 w-6 mr-2 text-green-500" />
                      Buy Tax
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {buyFees ? `${buyFees.toFixed(2)}%` : "Loading..."}
                    </p>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-gray-800/30">
                    <h3 className="text-white font-medium flex items-center mb-3">
                      <ArrowTrendingDownIcon className="h-6 w-6 mr-2 text-red-500" />
                      Sell Tax
                    </h3>
                    <p className="text-gray-300 text-xl break-all">
                      {sellFees ? `${sellFees.toFixed(2)}%` : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-800/50 text-center">
              <p className="text-gray-300 mb-6 text-lg">
                Not connected. Please connect your TronLink wallet.
              </p>
              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Alert
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
}

export { View };
