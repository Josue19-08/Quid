import React from 'react';
import { FileText, Users, Wallet, Plus } from 'lucide-react';

interface StatsOverviewProps {
  activeQuests: number;
  totalResponses: number;
  totalRewards: number;
  onCreateQuest?: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  activeQuests,
  totalResponses,
  totalRewards,
  onCreateQuest,
}) => {
  const stats = [
    {
      icon: FileText,
      label: 'Active Quests',
      value: activeQuests,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: Users,
      label: 'Total Response',
      value: totalResponses,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: Wallet,
      label: 'Total response',
      value: `${totalRewards.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row items-stretch gap-4 xl:gap-6 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 flex-1">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#1e2139] rounded-2xl p-6 border border-gray-800/30 hover:border-purple-500/30 transition-all duration-200"
            >
              <div className="flex flex-col space-y-4">
                <div className={`${stat.bgColor} p-3 rounded-xl w-fit`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-1">
                    {typeof stat.value === 'number' ? stat.value : stat.value.split(' ')[0]}
                  </p>
                  {typeof stat.value === 'string' && stat.value.includes('USD') && (
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  )}
                  {typeof stat.value === 'number' && (
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Create New Survey Button */}
      <button
        onClick={onCreateQuest}
        className="xl:w-auto bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-2xl px-6 py-4 font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 flex items-center justify-center space-x-2 group border border-purple-500/20"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        <span className="text-sm">Create a New Survey</span>
      </button>
    </div>
  );
};