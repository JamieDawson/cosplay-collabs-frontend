import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface Ad {
  id: number;
  user_id: string;
  title: string;
  description: string;
  instagram_post_url: string;
  keywords: string[];
}

const UpdatePostForm = () => {
  const { isAuthenticated, user } = useAuth0();

  const location = useLocation();
  const { ad } = location.state as { ad: Ad };

  return (
    <>
      {!isAuthenticated ? (
        <div>You don't have permission to update this. Please log in</div>
      ) : (
        <div>
          <h2>Update Post</h2>
          <div>ID: {ad.id}</div>
          <div>Title: {ad.title}</div>
        </div>
      )}
    </>
  );
};

export default UpdatePostForm;

/*
Steps needed:
Create form.  
Create state for form.  
Apply ad to state when it comes in.
Give users ability to update state for every input.  
Submit button runs backend function for updating.
*/
