import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleEditPost, handleUploadFile, resetEditPostStatus } from "../features/postDataSlice";
import PostForm from "../components/PostForm";
import { Formik, Form } from "formik";
import { PostValidationSchema, PostInitialValues } from "../functions/PostHelper";
import SubmitButton from "../components/SubmitButton";
import { handleGetPost } from "../features/postDataSlice";
import { useEffect } from "react";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post_id = useParams().id;
  
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store
  const post = useSelector((state) => state.postData.getPostsDetail[post_id]);
  const editPostStatus = useSelector((state) => state.postData.editPostStatus);
  const editPostErrorMessage = useSelector((state) => state.postData.editPostErrorMessage);

  const handleUpdate = async (values) => {
    const { title, desc, category_id, file } = values;
    const post = { title, desc, user_id: user.id, category_id: parseInt(category_id)};

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // Image upload
      try {
        await dispatch(handleUploadFile(data));
      } catch (err) {
        console.log(err);
      }
    }

    // Post update
    try {
      const resultAction =  await dispatch(handleEditPost({ post_id, post }));
      if (handleEditPost.fulfilled.match(resultAction)){
        // console.log("Produk berhasil disimpan:", resultAction.payload);
          setTimeout(() => {
            navigate("/"); // Kembali ke halaman utama jika sukses
            dispatch(resetEditPostStatus());
          }, 2000);
      }
      // Jika ada error (rejected), tampilkan error dari resultAction
      else if (handleEditPost.rejected.match(resultAction)){
        // console.log("Error saat menyimpan produk:", resultAction.error.message);
        setTimeout(() => {
          dispatch(resetEditPostStatus());
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(!post){
      dispatch(handleGetPost(post_id));
    }
  },[post_id, post])

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>
        {post ? (
          <Formik
            initialValues={PostInitialValues({
              title: post?.title || "",
              desc: post?.desc || "",
              file: post?.photo || null,
              category_id: post?.category_id || "",
            })}
            validationSchema={PostValidationSchema}
            onSubmit={handleUpdate}
          >
            {(formProps) => (
              <Form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                <PostForm formProps={formProps} />
                <SubmitButton status={editPostStatus} errorMessage={editPostErrorMessage} />
              </Form>
            )}
          </Formik>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
