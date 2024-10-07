import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { createCategory, getCategories } from "../request";
import { useSelector } from "react-redux"; // Import Redux hooks
 
const Categories = () => {
  const { search } = useLocation();
  const [categories, setCategories] = useState([]); // State for categories
  const [categoryDescription, setCategoryDescription] = useState(""); // Input for new category
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      console.log(err);
    }
  };

  // Post a new category
  const postCategory = async () => {
    try {
      const res = await createCategory({ category_description: categoryDescription })
      setCategoryDescription(""); // Clear input after successful post
      fetchCategories()
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch posts and categories when component mounts or user/search changes
  useEffect(() => {
    fetchCategories();
  }, [search, user]);


  console.log("categories:",categories)

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {/* Display list of categories */}
        <div className="mt-10">
          <h3 className="font-bold text-lg">Categories</h3>
          <ul className="list-disc ml-5">
            {categories?.map((category) => (
              <li key={category.id}>{category?.category_description}</li>
            ))}
          </ul>
        </div>

        {/* Add new category form */}
        <div className="mt-6">
          <h3 className="font-bold text-lg">Add New Category</h3>
          <input
            type="text"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Category description"
            className="border p-2 w-full mb-3"
          />
          <button
            onClick={postCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
