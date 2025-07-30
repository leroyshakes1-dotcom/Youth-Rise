import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Target, Award, Eye, DollarSign, User, Bell, Search, Heart, Share2, ChevronRight, Play, Upload, MapPin, Zap, BarChart3, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import './index.css';
// Type definitions
interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  target: number;
  raised: number;
  mockPledges: number;
  entrepreneur: string;
  location: string;
  daysLeft: number;
  image: string;
  tags: string[];
}

interface Investor {
  id: number;
  name: string;
  totalInvested: number;
  activeInvestments: number;
  roi: number;
}

interface CurrentUser {
  type: 'entrepreneur' | 'supporter' | 'investor';
  name: string;
}

// Mock data for demonstration
const mockIdeas: Idea[] = [
  {
    id: 1,
    title: "EcoFarm Solutions",
    description: "Sustainable farming technology for small-scale farmers in Namibia",
    category: "Agriculture",
    target: 50000,
    raised: 35000,
    mockPledges: 120,
    entrepreneur: "Sarah Mutonga",
    location: "Windhoek",
    daysLeft: 15,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxMEI5ODEiLz48cGF0aCBkPSJNMTUwIDUwQzE3NS0yNSAyMjUgMjUgMjUwIDc1QzI3NSAxMjUgMjI1IDE3NSAxNTAgMTUwQzc1IDE3NSAyNSAxMjUgNTAgNzVDNzUgMjUgMTI1IC0yNSAxNTAgNTBaIiBmaWxsPSIjMDU5NjY5Ii8+PHRleHQgeD0iMTUwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwiPkVjb0Zhcm08L3RleHQ+PC9zdmc+",
    tags: ["sustainable", "technology", "farming"]
  },
  {
    id: 2,
    title: "Namibian Craft Hub",
    description: "Online marketplace connecting local artisans with global customers",
    category: "E-commerce",
    target: 75000,
    raised: 22000,
    mockPledges: 85,
    entrepreneur: "Johannes Kaunda",
    location: "Swakopmund",
    daysLeft: 28,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM4QjVDRjYiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjNkQyOEQ5Ii8+PHRleHQgeD0iMTUwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiPkNyYWZ0PC90ZXh0Pjwvc3ZnPg==",
    tags: ["crafts", "marketplace", "artisans"]
  },
  {
    id: 3,
    title: "Solar Power Initiative",
    description: "Affordable solar energy solutions for rural communities",
    category: "Energy",
    target: 100000,
    raised: 78000,
    mockPledges: 200,
    entrepreneur: "Maria Santos",
    location: "Rundu",
    daysLeft: 7,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGNTlFMEIiLz48cGF0aCBkPSJNMTUwIDQwTDE4MCA4MEwxMjAgODBMMTUwIDQwWiIgZmlsbD0iI0Q3NjcwRCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5Tb2xhcjwvdGV4dD48L3N2Zz4=",
    tags: ["solar", "renewable", "rural"]
  }
];

const mockInvestors: Investor[] = [
  { id: 1, name: "David Robertson", totalInvested: 150000, activeInvestments: 5, roi: 12.5 },
  { id: 2, name: "Lisa Chen", totalInvested: 200000, activeInvestments: 8, roi: 15.2 },
  { id: 3, name: "Ahmed Hassan", totalInvested: 75000, activeInvestments: 3, roi: 8.7 }
];

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ type: 'entrepreneur', name: 'Demo User' });
  const [activeTab, setActiveTab] = useState<string>('discover');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100">
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-16">
        {activeTab === 'discover' && <DiscoverPage selectedIdea={selectedIdea} setSelectedIdea={setSelectedIdea} />}
        {activeTab === 'dashboard' && <DashboardPage currentUser={currentUser} />}
        {activeTab === 'investors' && <InvestorPage />}
        {activeTab === 'create' && <CreateIdeaPage />}
      </main>
    </div>
  );
}

// Navigation Component
interface NavigationProps {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Navigation({ currentUser, setCurrentUser, activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              YouthRise
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2">
            <NavLink icon={Eye} label="Discover" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
            <NavLink icon={BarChart3} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavLink icon={TrendingUp} label="Investors" active={activeTab === 'investors'} onClick={() => setActiveTab('investors')} />
            <NavLink icon={Target} label="Create Idea" active={activeTab === 'create'} onClick={() => setActiveTab('create')} />
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <UserTypeToggle currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation Link Component
interface NavLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavLink({ icon: Icon, label, active, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
        active 
          ? 'text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

// User Type Toggle
interface UserTypeToggleProps {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
}

function UserTypeToggle({ currentUser, setCurrentUser }: UserTypeToggleProps) {
  const userTypes: CurrentUser['type'][] = ['entrepreneur', 'supporter', 'investor'];
  
  return (
    <select 
      value={currentUser.type}
      onChange={(e) => setCurrentUser({...currentUser, type: e.target.value as CurrentUser['type']})}
      className="text-sm bg-purple-50 text-purple-700 border border-purple-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {userTypes.map(type => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

// Discover Page
interface DiscoverPageProps {
  selectedIdea: Idea | null;
  setSelectedIdea: (idea: Idea | null) => void;
}

function DiscoverPage({ selectedIdea, setSelectedIdea }: DiscoverPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (selectedIdea) {
    return <IdeaDetailPage idea={selectedIdea} onBack={() => setSelectedIdea(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Discover <span className="text-purple-600">Innovation</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Support the next generation of Namibian entrepreneurs
        </p>
        <div className="flex justify-center">
          <StatsOverview />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search innovative ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Categories</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Technology">Technology</option>
          <option value="Energy">Energy</option>
          <option value="E-commerce">E-commerce</option>
        </select>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockIdeas.map(idea => (
          <IdeaCard key={idea.id} idea={idea} onClick={() => setSelectedIdea(idea)} />
        ))}
      </div>
    </div>
  );
}

// Stats Overview Component
function StatsOverview() {
  const stats = [
    { label: 'Active Ideas', value: '150+', icon: Target },
    { label: 'Total Pledged', value: 'N$2.5M', icon: DollarSign },
    { label: 'Entrepreneurs', value: '89', icon: Users },
    { label: 'Success Rate', value: '67%', icon: Award }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Icon className="w-6 h-6 text-purple-600" />
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  );
}

// Idea Card Component
interface IdeaCardProps {
  idea: Idea;
  onClick: () => void;
}

function IdeaCard({ idea, onClick }: IdeaCardProps) {
  const progressPercentage = (idea.raised / idea.target) * 100;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
    >
      <div className="relative">
        <img 
          src={idea.image} 
          alt={idea.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {idea.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
        <p className="text-gray-600 mb-4">{idea.description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>N${idea.raised.toLocaleString()} raised</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{idea.mockPledges} supporters</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{idea.daysLeft} days left</span>
          </div>
        </div>

        {/* Entrepreneur Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{idea.entrepreneur}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {idea.location}
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            View Details
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {idea.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Idea Detail Page
interface IdeaDetailPageProps {
  idea: Idea;
  onBack: () => void;
}

function IdeaDetailPage({ idea, onBack }: IdeaDetailPageProps) {
  const [pledgeAmount, setPledgeAmount] = useState<number>(100);
  const [showPledgeModal, setShowPledgeModal] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>Back to Discover</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <img 
            src={idea.image} 
            alt={idea.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{idea.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{idea.description}</p>

          {/* Detailed Description */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 mb-4">
              This innovative project aims to revolutionize the way we approach sustainable development in Namibia. 
              Through cutting-edge technology and community-driven solutions, we're creating lasting impact for future generations.
            </p>
            <p className="text-gray-700 mb-6">
              Our comprehensive approach includes market research, prototype development, community engagement, 
              and strategic partnerships with local organizations to ensure maximum impact and sustainability.
            </p>
          </div>

          {/* Video Player Placeholder */}
          <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center mb-6">
            <button className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
              <Play className="w-12 h-12" />
              <span className="text-lg">Watch Pitch Video</span>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Funding Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              N${idea.raised.toLocaleString()}
            </div>
            <div className="text-gray-600 mb-4">
              raised of N${idea.target.toLocaleString()} goal
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                style={{ width: `${Math.min((idea.raised / idea.target) * 100, 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{idea.mockPledges}</div>
                <div className="text-sm text-gray-600">supporters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{idea.daysLeft}</div>
                <div className="text-sm text-gray-600">days left</div>
              </div>
            </div>

            <button 
              onClick={() => setShowPledgeModal(true)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors mb-3"
            >
              Support This Idea
            </button>
            
            <div className="flex space-x-2">
              <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* Entrepreneur Profile */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Entrepreneur</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{idea.entrepreneur}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {idea.location}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Experienced entrepreneur with a passion for sustainable development and community impact.
            </p>
            <button className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              View Profile
            </button>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-purple-600 pl-3">
                <div className="text-sm font-medium text-gray-900">Prototype Testing Complete</div>
                <div className="text-xs text-gray-500">2 days ago</div>
              </div>
              <div className="border-l-2 border-gray-300 pl-3">
                <div className="text-sm font-medium text-gray-900">Partnership Signed</div>
                <div className="text-xs text-gray-500">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pledge Modal */}
      {showPledgeModal && (
        <PledgeModal 
          idea={idea} 
          onClose={() => setShowPledgeModal(false)}
          pledgeAmount={pledgeAmount}
          setPledgeAmount={setPledgeAmount}
        />
      )}
    </div>
  );
}

// Pledge Modal Component
interface PledgeModalProps {
  idea: Idea;
  onClose: () => void;
  pledgeAmount: number;
  setPledgeAmount: (amount: number) => void;
}

function PledgeModal({ idea, onClose, pledgeAmount, setPledgeAmount }: PledgeModalProps) {
  const [pledgeType, setPledgeType] = useState<'mock' | 'real'>('mock');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Support {idea.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setPledgeType('mock')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                pledgeType === 'mock' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mock Pledge
            </button>
            <button
              onClick={() => setPledgeType('real')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                pledgeType === 'real' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Real Investment
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            {pledgeType === 'mock' 
              ? 'Show support without financial commitment - help validate this idea!'
              : 'Make a real investment in this entrepreneur\'s future.'
            }
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (NAD)
          </label>
          <input
            type="number"
            value={pledgeAmount}
            onChange={(e) => setPledgeAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            min="10"
            step="10"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert(`${pledgeType === 'mock' ? 'Mock pledge' : 'Investment'} of N${pledgeAmount} submitted!`);
              onClose();
            }}
            className={`flex-1 py-3 rounded-lg text-white font-medium transition-colors ${
              pledgeType === 'mock' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {pledgeType === 'mock' ? 'Pledge Support' : 'Invest Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Page
interface DashboardPageProps {
  currentUser: CurrentUser;
}

function DashboardPage({ currentUser }: DashboardPageProps) {
  if (currentUser.type === 'investor') {
    return <InvestorDashboard />;
  } else if (currentUser.type === 'entrepreneur') {
    return <EntrepreneurDashboard />;
  } else {
    return <SupporterDashboard />;
  }
}

// Investor Dashboard
function InvestorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Dashboard</h1>
        <p className="text-gray-600">Track your investments and discover new opportunities</p>
      </div>

      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">N$125,000</div>
          <div className="text-sm text-gray-600">Total Invested</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">Active Investments</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">12.5%</div>
          <div className="text-sm text-gray-600">Average ROI</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600">Successful Exits</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Investments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Investments</h2>
          <div className="space-y-4">
            {mockIdeas.slice(0, 3).map(idea => (
              <div key={idea.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img src={idea.image} alt={idea.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{idea.title}</div>
                  <div className="text-sm text-gray-500">Invested: N$25,000</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">+15.2%</div>
                  <div className="text-xs text-gray-500">ROI</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Opportunities</h2>
          <div className="space-y-4">
            {mockIdeas.map(idea => (
              <div key={idea.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <img src={idea.image} alt={idea.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{idea.title}</div>
                  <div className="text-sm text-gray-500">{idea.category}</div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                  Invest
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Entrepreneur Dashboard
function EntrepreneurDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrepreneur Dashboard</h1>
        <p className="text-gray-600">Manage your ideas and track your progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-sm text-gray-600">Active Ideas</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">N$57,000</div>
          <div className="text-sm text-gray-600">Total Raised</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">205</div>
          <div className="text-sm text-gray-600">Total Supporters</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">68%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>

      {/* My Ideas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Ideas</h2>
        <div className="space-y-4">
          {mockIdeas.slice(0, 2).map(idea => (
            <div key={idea.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{idea.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Raised</div>
                  <div className="font-medium">N${idea.raised.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Goal</div>
                  <div className="font-medium">N${idea.target.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Supporters</div>
                  <div className="font-medium">{idea.mockPledges}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(idea.raised / idea.target) * 100}%` }}
                />
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Supporter Dashboard
function SupporterDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supporter Dashboard</h1>
        <p className="text-gray-600">Track the ideas you're supporting</p>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600">Ideas Supported</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">N$2,500</div>
          <div className="text-sm text-gray-600">Total Pledged</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600">Successful Projects</div>
        </div>
      </div>

      {/* Supported Ideas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supported Ideas</h2>
        <div className="space-y-4">
          {mockIdeas.map(idea => (
            <div key={idea.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img src={idea.image} alt={idea.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{idea.title}</div>
                <div className="text-sm text-gray-500">Pledged: N$250</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-purple-600">
                  {Math.round((idea.raised / idea.target) * 100)}% funded
                </div>
                <div className="text-xs text-gray-500">{idea.daysLeft} days left</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Investor Page
function InvestorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Investors</h1>
        <p className="text-gray-600">Connect with experienced investors supporting Namibian entrepreneurs</p>
      </div>

      {/* Investor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">25+</div>
          <div className="text-sm text-gray-600">Active Investors</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">N$5.2M</div>
          <div className="text-sm text-gray-600">Total Invested</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">14.3%</div>
          <div className="text-sm text-gray-600">Average ROI</div>
        </div>
      </div>

      {/* Investor Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInvestors.map(investor => (
          <div key={investor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{investor.name}</h3>
                <div className="text-sm text-gray-500">Investor</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Invested</span>
                <span className="font-medium">N${investor.totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Investments</span>
                <span className="font-medium">{investor.activeInvestments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="font-medium text-green-600">+{investor.roi}%</span>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Create Idea Page
function CreateIdeaPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    target: '',
    location: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Idea submitted successfully!');
    setFormData({
      title: '',
      description: '',
      category: '',
      target: '',
      location: '',
      tags: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Idea</h1>
        <p className="text-gray-600">Share your innovative idea with the community and attract supporters</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Idea Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter a compelling title for your idea"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your idea, its impact, and why it matters"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Technology">Technology</option>
                <option value="Energy">Energy</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Goal (NAD)
              </label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="50000"
                min="1000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Windhoek, Namibia"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="sustainable, technology, innovation (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop images</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Publish Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export the main component as default
export default App;