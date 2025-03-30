import React from "react";
import { motion } from "framer-motion";

const BlockchainTransactions = ({ transactions, openTransactionModal }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Blockchain Security
        </h2>
        <p className="text-gray-400">Monitor and manage blockchain transactions with security risk assessment.</p>
      </motion.div>

      <motion.div
        className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium">Transaction Registry</h3>
          <p className="text-sm text-gray-400">Secure, immutable record of financial transactions</p>
        </div>
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Score</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((tx) => (
              <tr key={tx.transactionId} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {tx.transactionId.substring(0, 10)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {tx.amount} {tx.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          tx.riskScore > 75 ? 'bg-red-500' :
                          tx.riskScore > 50 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${tx.riskScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      tx.riskScore > 75 ? 'text-red-400' :
                      tx.riskScore > 50 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {tx.riskScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    tx.flagged ? 'bg-red-900/40 text-red-400' : 'bg-green-900/40 text-green-400'
                  }`}>
                    {tx.flagged ? 'Flagged' : 'Clear'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => openTransactionModal(tx)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default BlockchainTransactions;
