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
        const response = await fetch("http://localhost:4005/forums", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch forums");
        }
        const json = await response.json();
        dispatch({ type: "SET_FORUMS", payload: json });
      } catch (error) {
        console.log(error)
        console.error("Error fetching forums:", error.message);
      }
    };

    if (user) {
      fetchForums();
    }
  }, [dispatch, user]);

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
  
};

export default AllForums;
