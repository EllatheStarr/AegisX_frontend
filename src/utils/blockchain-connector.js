import { ethers } from 'ethers';

/**
 * BlockchainConnector - A utility class to connect frontend to Aegis blockchain contracts
 */
class BlockchainConnector {
  constructor() {
    this.provider = null;
    this.contract = null;
    this.signer = null;
    this.contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || null;
    this.networkUrl = import.meta.env.VITE_NETWORK_URL || 'https://ethereum-sepolia-rpc.publicnode.com';
    this.isConnected = false;
  }

  /**
   * Initialize the blockchain connector with optional custom configuration
   * @param {Object} config - Configuration options
   * @param {string} config.contractName - Name of the contract (defaults to "AegisX")
   * @param {string} config.networkUrl - Custom RPC URL (optional)
   * @param {string} config.contractAddress - Custom contract address (optional)
   * @param {string} config.abi - Contract ABI (optional)
   * @returns {Promise<boolean>} - Returns true if initialization was successful
   */
  async initialize(config = {}) {
    try {
      // Set contract name - default to AegisX
      const contractName = config.contractName || 'AegisX';
      
      // Use provided or default network URL
      this.networkUrl = config.networkUrl || this.networkUrl;
      
      // Create a provider
      this.provider = new ethers.providers.JsonRpcProvider(this.networkUrl);
      
      // Check if provider is working
      await this.provider.getBlockNumber();
      
      // Set contract address if provided
      if (config.contractAddress) {
        this.contractAddress = config.contractAddress;
      }
      
      // If we have a contract address and ABI, create the contract interface
      if (this.contractAddress && config.abi) {
        this.contract = new ethers.Contract(
          this.contractAddress,
          config.abi,
          this.provider
        );
      }
      
      return true;
    } catch (error) {
      console.error('Blockchain connector initialization failed:', error);
      return false;
    }
  }

  /**
   * Get status of blockchain connection
   * @returns {Object} - Connection status object
   */
  getStatus() {
    return {
      connected: this.isConnected,
      contractAddress: this.contractAddress,
      networkUrl: this.networkUrl,
      hasWallet: !!this.signer
    };
  }

  /**
   * Connect wallet to blockchain
   * @param {Object} options - Wallet connection options
   * @param {Object} options.externalProvider - External provider like Web3 or window.ethereum
   * @returns {Promise<boolean>} - Returns true if connection was successful
   */
  async connectWallet(options = {}) {
    try {
      // Check if we have external provider (like MetaMask)
      if (options.externalProvider) {
        // Create a Web3Provider using the external provider
        this.provider = new ethers.providers.Web3Provider(options.externalProvider);
        
        // Request account access
        await this.provider.send("eth_requestAccounts", []);
        
        // Get the signer
        this.signer = this.provider.getSigner();
        
        // Check if signer has address
        await this.signer.getAddress();
        
        // If we have a contract address and ABI, create the contract interface with signer
        if (this.contractAddress && this.contract) {
          this.contract = this.contract.connect(this.signer);
        }
        
        this.isConnected = true;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      this.isConnected = false;
      return false;
    }
  }

  /**
   * Get contract interface
   * @returns {ethers.Contract|null} - The contract interface or null if not initialized
   */
  getContract() {
    return this.contract;
  }

  /**
   * Get connection status
   * @returns {Object} - Connection status object
   */
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      contractAddress: this.contractAddress,
      network: this.networkUrl
    };
  }
  
  /**
   * Log a transaction to the blockchain
   * @param {string} transactionId - The transaction ID
   * @param {number} riskScore - Risk score of the transaction
   * @param {boolean} flagged - Whether the transaction is flagged as suspicious
   * @returns {Promise<Object>} - Transaction result
   */
  async logTransaction(transactionId, riskScore, flagged) {
    try {
      if (!this.contract || !this.signer) {
        throw new Error("Contract or signer not initialized");
      }
      
      // This is a mock implementation - replace with actual contract call
      // const tx = await this.contract.logTransaction(transactionId, riskScore, flagged);
      // await tx.wait();
      
      // For demo purposes, return a mock result
      return {
        success: true,
        transactionHash: `0x${Math.random().toString(16).substring(2)}`,
        blockNumber: Math.floor(Math.random() * 10000000)
      };
    } catch (error) {
      console.error("Error logging transaction:", error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Verify a transaction on the blockchain
   * @param {string} transactionId - The transaction ID to verify
   * @returns {Promise<Object>} - Verification result
   */
  async verifyTransaction(transactionId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      
      // This is a mock implementation - replace with actual contract call
      // const result = await this.contract.verifyTransaction(transactionId);
      
      // For demo purposes, return a mock result
      return {
        verified: true,
        timestamp: Date.now(),
        blockNumber: Math.floor(Math.random() * 10000000)
      };
    } catch (error) {
      console.error("Error verifying transaction:", error);
      return { verified: false, error: error.message };
    }
  }
}

export default BlockchainConnector;
