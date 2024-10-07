import { Field, ErrorMessage } from 'formik';
import { useState, useEffect, Fragment } from 'react';
import { getCategories } from '../request';

const PostForm = ({ formProps }) => {
    const [categories, setCategories] = useState([]);

    // Fetch categories for the select field
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
    
  return (
  <Fragment>
    {/* Title Field */}
    <div>
      <Field
        name="title"
        placeholder="Enter post title"
        className="px-4 py-2 outline-none border border-gray-300 rounded-md"
      />
      <ErrorMessage
        name="title"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>

    {/* File and Category Select Fields */}
    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
      <div className="flex-1">
        <input
          name="file"
          type="file"
          onChange={(e) => formProps.setFieldValue('file', e.target.files[0])}
          className="px-4 py-2 w-full outline-none border border-gray-300 rounded-md"
        />
        <ErrorMessage
          name="file"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div className="flex-1">
        <Field
          as="select"
          name="category_id"
          className="px-4 py-2 outline-none w-full border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_description}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="category_id"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>

    {/* Description Field */}
    <div className="flex-grow">
      <Field
        as="textarea"
        name="desc"
        rows={15}
        className="px-4 py-2 outline-none w-full h-[400px] md:h-[500px] border border-gray-300 rounded-md"
        placeholder="Enter post description"
      />
      <ErrorMessage
        name="desc"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  </Fragment>
  );
};

export default PostForm;
