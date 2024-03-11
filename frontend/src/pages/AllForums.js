import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useForumsContext } from "../hooks/useForumsContext";

import ForumDetails from "../components/ForumDetails";


const AllForums = () => {
  const { forums, dispatch } = useForumsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch("/api/forums", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch forums");
        }
        const json = await response.json();
        dispatch({ type: "SET_FORUMS", payload: json });
      } catch (error) {
        console.error("Error fetching forums:", error.message);
      }
    };

    if (user) {
      fetchForums();
    }
  }, [dispatch, user]);

  if(user){
    return (
      <div className="allforums">
        
          <div className="forums">
            {forums &&
              forums.map((forum) => (
                <ForumDetails key={forum._id} forum={forum} />
              ))}
          </div>              
      </div>
    );
  }

  if(!user){
    return(
      <div>
        Please log in or sign up.
      </div>
    )
  }
  
};

export default AllForums;
