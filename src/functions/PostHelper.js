import * as Yup from 'yup';

const PostValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters'),
    desc: Yup.string()
      .required('Description is required')
      .min(4, 'Description must be at least 4 characters'),
    file: Yup.mixed().nullable(),
    category_id: Yup.string().required('Please select a category'),
  });

const PostInitialValues = ({title, desc, file, category_id})=>{
  return {title, desc, file, category_id}
}

export {PostValidationSchema, PostInitialValues};
