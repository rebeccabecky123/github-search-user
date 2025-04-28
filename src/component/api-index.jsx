

// import React, { useState, useEffect } from "react";

// function Posts() {
//   const [posts, setPosts] = useState([]);         
//   const [loading, setLoading] = useState(true);   
//   const [error, setError] = useState(null);      

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok"); 
//         }
//         return response.json(); 
//       })
//       .then(data => {
//         setPosts(data);    
//         setLoading(false); 
//       })
//       .catch(error => {
//         setError(error.message); 
//         setLoading(false);       
//       });
//   }, []);

 
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Posts</h2>
//       {loading && <p>Loading...</p>}                      
//       {error && <p className="text-red-500">{error}</p>}   
//       {!loading && !error && (
//         <ul className="space-y-2">
//           {posts.map(post => (
//             <li key={post.id} className="p-2 border rounded-md">
//               {post.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Posts;