import React from "react";
import { motion } from "framer-motion";

const ThreatsTable = ({ threats }) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Financial Threat Intelligence</h3>
        <motion.button 
          className="text-sm text-blue-400 hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Threats
        </motion.button>
      </div>
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Threat Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {threats.map((threat) => (
              <tr key={threat.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{threat.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    threat.severity === 'Critical' ? 'bg-red-900 text-red-300' :
                    threat.severity === 'High' ? 'bg-orange-900 text-orange-300' :
                    threat.severity === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-blue-900 text-blue-300'
                  }`}>
                    {threat.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    threat.status === 'Blocked' ? 'bg-green-900 text-green-300' :
                    threat.status === 'Investigating' ? 'bg-blue-900 text-blue-300' :
                    threat.status === 'Quarantined' ? 'bg-purple-900 text-purple-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {threat.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-400 hover:text-blue-300">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ThreatsTable;
