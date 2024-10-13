import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleCreateCategory, handleDeleteCategory } from "../features/categoryDataSlice"; 
import { categorySelectors } from "../features/categoryDataSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelectors.selectAll);
  const createCategoryStatus =  useSelector((state) => state.categoryData.createCategoryStatus);
  const createCategoryStatusMessage =  useSelector((state) => state.categoryData.createCategoryStatusMessage);
  const deleteCategoryStatus = useSelector((state) => state.categoryData.deleteCategoryStatus);
  const deleteCategoryStatusMessage = useSelector((state) => state.categoryData.deleteCategoryStatusMessage);

  const categoryDescriptionRef = useRef(null);

  const postCategory = async (e) => {
    e.preventDefault();
   
    const category_description = categoryDescriptionRef.current.value; 
    if (!category_description) {
      return null;
    }
  
    categoryDescriptionRef.current.value = '';
  
    try {
      await dispatch(handleCreateCategory({ category_description }));
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await dispatch(handleDeleteCategory(categoryId));
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-4 md:px-16 py-8 min-h-[80vh]">
        <div className="mt-8">
          <h3 className="font-bold text-xl mb-2">Categories</h3>
          <ul className="space-y-1">
            {categories?.map((category) => (
              <li key={category.id} className="flex justify-between items-center bg-white shadow rounded p-2">
                <span className="text-gray-700 text-sm">{category?.category_description}</span>
                <button
                  onClick={() => deleteCategory(category.id)}
                  disabled={deleteCategoryStatus === 'loading'}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition duration-200 disabled:opacity-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-xl mb-2">Add New Category</h3>
          <input
            type="text"
            ref={categoryDescriptionRef}
            placeholder="Enter category description"
            className="border p-2 w-full rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={postCategory}
            disabled={createCategoryStatus === 'loading'}
            className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            Add Category
          </button>
          {createCategoryStatusMessage && (
            <p className="text-red-500 text-xs mt-1">{createCategoryStatusMessage}</p>
          )}
          {deleteCategoryStatusMessage && (
            <p className="text-red-500 text-xs mt-1">{deleteCategoryStatusMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
