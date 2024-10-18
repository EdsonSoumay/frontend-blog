import axios from "axios"
import { URL } from "../url";

// auth and user
export const register = async (data) =>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.post(URL+"/api/auth/register",data)
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}

export const login = async(data) =>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result =await axios.post(URL+"/api/auth/login",data,{withCredentials:true})
          resolve(result.data); 
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
}

export const logout = async()=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result  = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}

export const refetch = async()=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
}

export const getProfileUser = async(user_id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.get(URL+"/api/users/"+ user_id, {withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}

export const updateProfileUser = async({user_id, data})=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result =  await axios.put(URL+"/api/users/"+user_id, data, {withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}

export const deleteProfileUser = async(user_id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.delete(URL+"/api/users/"+user_id,{withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}
//=======================================================================================================

//post 
export const getPostsByUser = async(user_id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result =await axios.get(URL+"/api/posts/user/"+user_id, {withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2);
  });
}

export const getPosts = async (search) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL + "/api/posts/", {
            withCredentials: true,
            params: {
              search: search || "",  // Tambahkan query search sebagai parameter
            },
          });
          resolve(result.data || []); 
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
  }
  

export const getPost = async (post_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.get(`${URL}/api/posts/${post_id}`, { withCredentials: true });
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
};


export const uploadFile = async(data)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.post(URL+"/api/upload",data, { withCredentials: true })
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
}

export const createPost = async(post)=>{
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
            resolve(result.data);
          } catch (error) {
            const errorResponse = error?.response?.data?.message || error.message;
            reject(errorResponse);
          }
        }, 2000);
      });
}

export const editPost = async({post_id, post})=>{
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await axios.put(URL+"/api/posts/"+post_id,post,{withCredentials:true})
            resolve(result.data);
          } catch (error) {
            const errorResponse = error?.response?.data?.message || error.message;
            reject(errorResponse);
          }
        }, 2000);
      });
}

export const deletePost = async(post_id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.delete(URL+"/api/posts/"+post_id,{withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}
//=======================================================================================================


//comment
export const getComments = async(post_id)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL+"/api/comments/post/"+post_id, {withCredentials:true})
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000); // Simulasi keterlambatan 5.5 detik
    });
}

export const createComment = async (data)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result =  await axios.post(URL+"/api/comments/create", data, {withCredentials:true})
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}

export const deleteComment = async (commentId)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result =  await axios.delete(URL+"/api/comments/"+commentId,{withCredentials:true})
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000); // Simulasi keterlambatan 10 detik
    });
}
//=======================================================================================================


//category
export const getCategories = async()=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL + "/api/category", { withCredentials: true });
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
}

export const createCategory = async(data)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.post(URL + "/api/category/create",data,{ withCredentials: true });
          resolve(result.data);
        } catch (error) {
          const errorResponse = error?.response?.data?.message || error.message;
          reject(errorResponse);
        }
      }, 2000);
    });
}

export const deleteCategory = async(id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.delete(URL +`/api/category/${id}`,{ withCredentials: true });
        resolve(result.data);
      } catch (error) {
        const errorResponse = error?.response?.data?.message || error.message;
        reject(errorResponse);
      }
    }, 2000);
  });
}