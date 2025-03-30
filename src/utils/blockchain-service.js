import BlockchainConnector from './blockchain-connector';

class BlockchainService {
  constructor() {
    this.connector = new BlockchainConnector();
    this.initialized = false;
    this.connectionStatus = {
      connected: false,
      contractAddress: '',
      networkUrl: '',
      hasWallet: false
    };
    this.transactionHistory = [];
    this.initializationPromise = null;
    
    // Try to restore connection state from localStorage if available
    this.restoreConnectionState();
  }

  // Restore connection state from localStorage if available
  restoreConnectionState() {
    try {
      const savedState = localStorage.getItem('blockchainConnectionState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.initialized = parsedState.initialized || false;
        this.connectionStatus = parsedState.connectionStatus || this.connectionStatus;
      }
    } catch (error) {
      console.error('Error restoring blockchain connection state:', error);
    }
  }

  // Save connection state to localStorage
  saveConnectionState() {
    try {
      const stateToSave = {
        initialized: this.initialized,
        connectionStatus: this.connectionStatus
      };
      localStorage.setItem('blockchainConnectionState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving blockchain connection state:', error);
    }
  }

  async initialize() {
    try {
      // Use cached initialization promise if one exists
      if (this.initializationPromise) {
        return await this.initializationPromise;
      }
      
      // Prevent re-initialization
      if (this.initialized) return true;
      
      // Create a new initialization promise
      this.initializationPromise = this._doInitialization();
      return await this.initializationPromise;
    } catch (error) {
      console.error('Error initializing blockchain service:', error);
      return false;
    }
  }

  // Internal initialization method
  async _doInitialization() {
    try {
      this.initialized = await this.connector.initialize();
      if (this.initialized) {
        this.connectionStatus = this.connector.getStatus();
        this.saveConnectionState();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in blockchain initialization:', error);
      return false;
    } finally {
      // Clear initialization promise regardless of outcome
      this.initializationPromise = null;
    }
  }

  async connectWallet(walletProvider) {
    try {
      if (!this.initialized) await this.initialize();
      const connected = await this.connector.connectWallet({
        externalProvider: walletProvider
      });
      if (connected) {
        this.connectionStatus = this.connector.getStatus();
        this.saveConnectionState();
      }
      return connected;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  async logTransaction(transaction) {
    try {
      if (!this.connectionStatus.hasWallet) {
        throw new Error('Wallet not connected. Please connect wallet first.');
      }
      const { transactionId, riskScore, flagged } = transaction;
      const result = await this.connector.logTransaction(transactionId, riskScore, flagged);
      if (result.success) {
        const newTx = {
          ...transaction,
          blockchainTxHash: result.transactionHash,
          blockNumber: result.blockNumber,
          timestamp: Date.now(),
          verified: true
        };
        this.transactionHistory.push(newTx);
        return newTx;
      }
      throw new Error(result.error || 'Failed to log transaction to blockchain');
    } catch (error) {
      console.error('Error logging transaction:', error);
      throw error;
    }
  }
  
  async verifyTransaction(transactionId) {
    try {
      const result = await this.connector.verifyTransaction(transactionId);
      return result;
    } catch (error) {
      console.error('Error verifying transaction:', error);
      throw error;
    }
  }
  
  async updateTransactionRisk(transactionId, newRiskScore, newFlaggedStatus) {
    try {
      if (!this.connectionStatus.hasWallet) {
        throw new Error('Wallet not connected. Please connect wallet first.');
      }
      
      // Implementation depends on your contract's specific methods
      // For now, we'll simulate a successful update
      const txIndex = this.transactionHistory.findIndex(tx => tx.transactionId === transactionId);
      
      if (txIndex >= 0) {
        this.transactionHistory[txIndex].riskScore = newRiskScore;
        this.transactionHistory[txIndex].flagged = newFlaggedStatus;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating transaction risk:', error);
      throw error;
    }
  }
  
  getTransactions() {
    return this.transactionHistory;
  }
  
  generateMockTransactions(count = 10) {
    const types = [
      'Payment',
      'Fund Transfer',
      'Withdrawal',
      'Deposit',
      'Currency Exchange'
    ];
    const sources = [
      'Mobile App',
      'Web Portal',
      'API Integration',
      'ATM',
      'Bank Branch'
    ];
    const transactions = [];
    for (let i = 0; i < count; i++) {
      const riskScore = Math.floor(Math.random() * 100);
      const flagged = riskScore > 75;
      transactions.push({
        transactionId: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: types[Math.floor(Math.random() * types.length)],
        amount: Math.floor(Math.random() * 10000) / 100,
        currency: 'USD',
        source: sources[Math.floor(Math.random() * sources.length)],
        riskScore,
        flagged,
        timestamp: Date.now() - Math.floor(Math.random() * 3600000),
        verified: false
      });
    }
    this.transactionHistory = transactions;
    return transactions;
  }
}

// Create singleton instance
const blockchainService = new BlockchainService();
export default blockchainService;
