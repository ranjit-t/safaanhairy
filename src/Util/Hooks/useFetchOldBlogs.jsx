import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/config.js";

const useFetchOldBlogs = () => {
  const [oldBlogsFireStore, setOldBlogsFireStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "oldBlogs"));
        const blogList = [];
        querySnapshot.forEach((doc) => {
          // Get data for each document and add it to the blogList
          blogList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // console.log(blogList);
        setOldBlogsFireStore(blogList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { oldBlogsFireStore, loading, error };
};

export default useFetchOldBlogs;
