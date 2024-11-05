import './App.css'
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { RedirectToSignIn, useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useToast } from './hooks/use-toast';

function App({ children }) {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const { user } = useUser();

  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/create`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const res = await response.json();
        if (res.data) {
          toast({
            title: `${res?.data?.firstName + " " + res?.data?.lastName}`,
            description: "Welcome to FlareTalk"
          })
        }
        console.log("User data:", res); // Log the fetched user data
      } catch (error) {
        console.error("Fetch user failed:", error.message);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchUser();
    }

  }, [getToken, isLoaded, isSignedIn, user, toast]);

  if (!isSignedIn && isLoaded) {
    return <RedirectToSignIn />
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default App
