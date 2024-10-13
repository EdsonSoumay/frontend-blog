import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreatePost, handleUploadFile, resetCreatePostStatus, resetCreatePostImageStatus } from '../features/postDataSlice';
import { Formik } from 'formik';
import PostForm from '../components/PostForm';
import { PostValidationSchema, PostInitialValues } from '../functions/PostHelper';
import SubmitButton from '../components/SubmitButton';
import { Form } from 'formik';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store
  const createPostStatus = useSelector((state) => state.postData.createPostStatus);
  const createPostStatusMessage = useSelector((state) => state.postData.createPostStatusMessage);

  // Handle post creation
  const handleCreate = async (values) => {
    const { title, desc, file, category_id } = values;
    const post = { title, desc, user_id: user.id, category_id: parseInt(category_id)};

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('img', filename);
      data.append('file', file);
      post.photo = filename;

      try {
       const resultAction = await dispatch(handleUploadFile(data));
        if (handleUploadFile.fulfilled.match(resultAction)){
            setTimeout(() => {
              navigate("/"); // Kembali ke halaman utama jika sukses
              dispatch(resetCreatePostImageStatus());
            }, 2000);
        }
        // Jika ada error (rejected), tampilkan error dari resultAction
        else if (handleUploadFile.rejected.match(resultAction)){
          setTimeout(() => {
            dispatch(resetCreatePostImageStatus());
          }, 2000);
        }
      } catch (err) {
        setTimeout(() => {
          dispatch(resetCreatePostImageStatus());
        }, 2000);
      }
    }

    try {
     const resultAction = await dispatch(handleCreatePost(post));
      if (handleCreatePost.fulfilled.match(resultAction)){
        // console.log("Produk berhasil disimpan:", resultAction.payload);
          setTimeout(() => {
            navigate("/"); // Kembali ke halaman utama jika sukses
            dispatch(resetCreatePostStatus());
          }, 2000);
      }
      // Jika ada error (rejected), tampilkan error dari resultAction
      else if (handleCreatePost.rejected.match(resultAction)){
        // console.log("Error saat menyimpan produk:", resultAction.error.message);
        setTimeout(() => {
          dispatch(resetCreatePostStatus());
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
        <Formik initialValues={PostInitialValues({title:'title1', desc:'des sekian', file:'', category_id:5})} validationSchema={PostValidationSchema} onSubmit={handleCreate}>
          {(formProps) => (
           <Form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <PostForm formProps={formProps}/>
            <SubmitButton status={createPostStatus} statusMessage={createPostStatusMessage} />
           </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
