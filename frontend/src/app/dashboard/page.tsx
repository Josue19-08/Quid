'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, X, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { StatsOverview } from '@/features/creator/StatsOverview';
import { CreatorQuestCard } from '@/features/creator/CreatorQuestCard';
import { ResponsePreview } from '@/features/creator/ResponsePreview';
import { DashboardSkeleton } from '@/features/creator/SkeletonLoaders';
import { NoQuestsEmptyState, NoResponsesEmptyState } from '@/features/creator/EmptyState';
import { mockQuests, mockResponses, Quest, Response } from '@/features/creator/mockData';

interface DashboardState {
  loading: boolean;
  error: string | null;
  quests: Quest[];
  responses: Response[];
  stats: {
    activeQuests: number;
    totalResponses: number;
    totalRewards: number;
  };
}

export default function CreatorDashboard() {
  const [state, setState] = useState<DashboardState>({
    loading: true,
    error: null,
    quests: [],
    responses: [],
    stats: {
      activeQuests: 0,
      totalResponses: 0,
      totalRewards: 0,
    },
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setState({
          loading: false,
          error: null,
          quests: mockQuests,
          responses: mockResponses,
          stats: {
            activeQuests: 12,
            totalResponses: 48,
            totalRewards: 2150.02,
          },
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data. Please try again.',
        }));
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateQuest = () => {
    console.log('Create new quest');
  };

  const handleRetry = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1e] text-white">
        <DashboardHeader 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <DesktopSidebar />
            <main className="flex-1 min-w-0 w-full">
              <DashboardSkeleton />
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-[#0f0f1e] text-white">
        <DashboardHeader 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <DesktopSidebar />
            <main className="flex-1 min-w-0 w-full">
              <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
                <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">Error Loading Dashboard</h2>
                <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">{state.error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1e] text-white">
      <DashboardHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-16 left-0 bottom-0 w-52 bg-[#1a1a2e] z-50 transform transition-transform duration-300 lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <MobileSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <DesktopSidebar />

          <main className="flex-1 min-w-0 w-full">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>

            <StatsOverview
              activeQuests={state.stats.activeQuests}
              totalResponses={state.stats.totalResponses}
              totalRewards={state.stats.totalRewards}
              onCreateQuest={handleCreateQuest}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Active Quests Section */}
              <div className="lg:col-span-2 order-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Active Quests</h2>
                  {state.quests.length > 0 && (
                    <button className="flex items-center space-x-1 text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors group">
                      <span>View all</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

                {state.quests.length === 0 ? (
                  <NoQuestsEmptyState onCreateQuest={handleCreateQuest} />
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {state.quests.map((quest) => (
                      <CreatorQuestCard
                        key={quest.id}
                        title={quest.title}
                        category={quest.category}
                        budget={quest.budget}
                        dueDate={quest.dueDate}
                        submissionCount={quest.submissionCount}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Responses Section */}
              <div className="lg:col-span-1 order-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Response</h2>
                  {state.responses.length > 0 && (
                    <button className="flex items-center space-x-1 text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors group">
                      <span>View all</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>

                {state.responses.length === 0 ? (
                  <NoResponsesEmptyState />
                ) : (
                  <div className="bg-[#1a1a2e]/30 rounded-lg p-3 sm:p-4 border border-gray-800/50">
                    <div className="space-y-2">
                      {state.responses.map((response) => (
                        <ResponsePreview
                          key={response.id}
                          id={response.id}
                          respondentName={response.respondentName}
                          respondentAvatar={response.respondentAvatar}
                          questTitle={response.questTitle}
                          timeSinceSubmission={response.timeSinceSubmission}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="border-b border-gray-800/50 bg-[#1a1a2e]/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Image 
                src="/quid.svg"
                alt="Quid Logo" 
                width={32} 
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
                priority
              />
            </div>
            
            <nav className="hidden md:flex space-x-1">
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Creators
              </button>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-purple-500/10 rounded-lg">
                Dashboard
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-800/50 rounded-lg flex items-center space-x-1.5 sm:space-x-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">$0</span>
            </div>
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1.5 hover:bg-gray-800/50 rounded-lg transition-colors">
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Ruze.stellar</span>
              <span className="text-xs sm:text-sm font-medium sm:hidden">Menu</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Desktop sidebar component
function DesktopSidebar() {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="bg-[#1a1a2e] rounded-lg p-4 min-h-[calc(100vh-8rem)]">
        <nav className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-left bg-purple-500/10 text-purple-400 rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Quests</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Wallet</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

// Mobile sidebar component
function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <nav className="space-y-1 flex-1">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left bg-purple-500/10 text-purple-400 rounded-lg font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Quests</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Wallet</span>
        </button>
      </nav>
    </div>
  );
}