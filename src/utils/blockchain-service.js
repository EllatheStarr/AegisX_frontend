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
  }

  async initialize() {
    try {
      this.initialized = await this.connector.initialize();
      if (this.initialized) {
        this.connectionStatus = this.connector.getStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing blockchain service:', error);
      return false;
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
      
      const result = await this.connector.updateRiskAssessment(
        transactionId, 
        newRiskScore, 
        newFlaggedStatus
      );
      
      if (result.success) {
        // Update local record if we have it
        const txIndex = this.transactionHistory.findIndex(tx => tx.transactionId === transactionId);
        if (txIndex >= 0) {
          this.transactionHistory[txIndex].riskScore = newRiskScore;
          this.transactionHistory[txIndex].flagged = newFlaggedStatus;
        }
        
        return {
          transactionId,
          riskScore: newRiskScore,
          flagged: newFlaggedStatus,
          blockchainTxHash: result.transactionHash,
          blockNumber: result.blockNumber,
          timestamp: Date.now()
        };
      }
      
      throw new Error(result.error || 'Failed to update transaction risk assessment');
    } catch (error) {
      console.error('Error updating transaction risk:', error);
      throw error;
    }
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  // Create mock transactions for demo purposes
  generateMockTransactions(count = 5) {
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
