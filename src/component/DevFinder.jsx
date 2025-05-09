import { useEffect, useState } from 'react';
import { MapPin, Link, Building, Twitter, Search } from 'lucide-react';

export default function DevFinder() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    login: 'octocat',
    name: 'The Octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/octocat',
    twitter_username: null,
    company: '@github',
    location: 'San Francisco',
    bio: 'This is a sample bio.',
    public_repos: 8,
    followers: 8936,
    following: 9,
    created_at: '2011-01-25T18:44:36Z'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${searchQuery}`);
      
      if (!response.ok) {
        throw new Error(
          response.status === 404 
            ? 'User not found' 
            : 'Error fetching user data'
        );
      }
      
      const data = await response.json();
      setUserInfo(data);
      console.log('User data fetched:', data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(()=>{
    const storedTheme =localStorage.getItem('theme')
    if(storedTheme !==null){
      setDarkMode(JSON.parse(storedTheme))
    }
  },[])

  const toggleTheme = () => {
   setDarkMode((prevMode)=>{
    const newMode=!prevMode;
    localStorage.setItem('theme',JSON.stringify(newMode))
    return newMode
   })
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6 flex justify-center items-center`}>
      <div className="w-full max-w-3xl">

        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            devfinder
          </h1>
          <button 
            onClick={toggleTheme}
            className={`flex items-center uppercase text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-500'}`}
          >
            {darkMode ? 'Light' : 'Dark'}
            {darkMode ? 

              <span className="ml-2">☀️</span> : 
              <span className="ml-2">🌙</span>
            }
          </button>
        </header>

      
        <div className={`flex items-center p-2 rounded-xl shadow-md mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-blue-500 mx-4">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-grow p-2 border-none outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className={`${
              loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium py-3 px-6 rounded-lg`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

     
        {error && (
          <div className={`mb-6 p-4 rounded-lg text-center ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}

 
        <div className={`rounded-xl shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row">
      
            <div className="mr-8 mb-6 md:mb-0">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img 
                  src={userInfo.avatar_url || "/api/placeholder/112/112"}
                  alt={`${userInfo.login}'s avatar`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

         
            <div className="flex-grow">
          
              <div className="flex flex-col md:flex-row md:justify-between mb-6">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userInfo.name || userInfo.login}
                  </h2>
                  <a 
                    href={userInfo.html_url}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{userInfo.login}
                  </a>
                </div>
                <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 md:mt-0`}>
                  Joined {formatDate(userInfo.created_at)}
                </div>
              </div>

        
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {userInfo.bio || 'This profile has no bio'}
              </p>

             
              <div className={`grid grid-cols-3 rounded-lg mb-6 p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div>
                  <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Repos</h3>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userInfo.public_repos}
                  </p>
                </div>
                <div>
                  <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Followers</h3>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userInfo.followers}
                  </p>
                </div>
                <div>
                  <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Following</h3>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userInfo.following}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center ${
                  !userInfo.location && darkMode ? 'text-gray-500' : !userInfo.location ? 'text-gray-400' : darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  <MapPin size={18} className="mr-2" />
                  <span>{userInfo.location || 'Not Available'}</span>
                </div>
                <div className={`flex items-center ${
                  !userInfo.twitter_username && darkMode ? 'text-gray-500' : !userInfo.twitter_username ? 'text-gray-400' : darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  <Twitter size={18} className="mr-2" />
                  <span>{userInfo.twitter_username || 'Not Available'}</span>
                </div>
                <div className={`flex items-center ${
                  !userInfo.blog && darkMode ? 'text-gray-500' : !userInfo.blog ? 'text-gray-400' : darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  <Link size={18} className="mr-2" />
                  {userInfo.html_url ? (
                    <a 
                      href={userInfo.html_url} 
                      className="truncate hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userInfo.html_url}
                    </a>
                  ) : (
                    <span>Not Available</span>
                  )}
                </div>
                <div className={`flex items-center ${
                  !userInfo.company && darkMode ? 'text-gray-500' : !userInfo.company ? 'text-gray-400' : darkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  <Building size={18} className="mr-2" />
                  <span>{userInfo.company || 'Not Available'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
        {error && (
          <div className={`mt-4 p-4 rounded-lg text-center ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}