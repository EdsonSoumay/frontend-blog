import axios from "axios"
import { URL } from "../url";

// auth and user
export const register = async (data) =>{
    const result = await axios.post(URL+"/api/auth/register",data)
    return result.data;
}

export const login = async(data) =>{
    const result =await axios.post(URL+"/api/auth/login",data,{withCredentials:true})
    return result.data;
}

export const logout = async()=>{
    const result  = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
    return result.data;
}

export const refetch = async()=>{
    const result = await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
    return result.data;
}

export const getProfileUser = async(user_id)=>{
    const result = await axios.get(URL+"/api/users/"+ user_id, {withCredentials:true})
    return result.data;
}

export const updateProfileUser = async(user_id, data)=>{
    const result =  await axios.put(URL+"/api/users/"+user_id, data, {withCredentials:true})
    return result.data;
}

export const deleteProfileUser = async(user_id)=>{
   const result = await axios.delete(URL+"/api/users/"+user_id,{withCredentials:true})
   return result.data;
}
//=======================================================================================================

//post 
export const getPostsByUser = async(user_id)=>{
    const result =await axios.get(URL+"/api/posts/user/"+user_id, {withCredentials:true})
    return result.data;
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
          reject(error); 
        }
      }, 400);
    });
  }
  

export const getPost = async (post_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.get(`${URL}/api/posts/${post_id}`, { withCredentials: true });
        resolve(result.data); // Mengembalikan data produk
      } catch (error) {
        reject(error); // Menangani error jika permintaan gagal
      }
    }, 1500); // Simulasi keterlambatan 1.5 detik
  });
};


export const uploadFile = async(data)=>{
    const result = await axios.post(URL+"/api/upload",data)
    return result.data;
}

export const createPost = async(post)=>{
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
            resolve(result.data); // Mengembalikan data produk
          } catch (error) {
            reject(error); // Menangani error jika permintaan gagal
          }
        }, 1500); // Simulasi keterlambatan 1.5 detik
      });
}

export const editPost = async({post_id, post})=>{
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await axios.put(URL+"/api/posts/"+post_id,post,{withCredentials:true})
            resolve(result.data); // Mengembalikan data produk
          } catch (error) {
            reject(error); // Menangani error jika permintaan gagal
          }
        }, 1500); // Simulasi keterlambatan 1.5 detik
      });
}

export const deletePost = async(post_id)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await axios.delete(URL+"/api/posts/"+post_id,{withCredentials:true})
        resolve(result.data); // Mengembalikan data produk
      } catch (error) {
        reject(error); // Menangani error jika permintaan gagal
      }
    }, 1500); // Simulasi keterlambatan 1.5 detik
  });
}
//=======================================================================================================


//comment
export const getComments = async(post_id)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL+"/api/comments/post/"+post_id, {withCredentials:true})
          resolve(result.data); // Mengembalikan data produk
        } catch (error) {
          reject(error); // Menangani error jika permintaan gagal
        }
      }, 2500); // Simulasi keterlambatan 5.5 detik
    });
}

export const createComment = async (data)=>{
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result =  await axios.post(URL+"/api/comments/create", data, {withCredentials:true})
        resolve(result.data); // Mengembalikan data produk
      } catch (error) {
        reject(error); // Menangani error jika permintaan gagal
      }
    }, 2500); // Simulasi keterlambatan 1.5 detik
  });
}

export const deleteComment = async (commentId)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result =  await axios.delete(URL+"/api/comments/"+commentId,{withCredentials:true})
          resolve(result.data); // Mengembalikan data produk
        } catch (error) {
          reject(error.response.data); // Menangani error jika permintaan gagal
        }
      }, 10000); // Simulasi keterlambatan 10 detik
    });
}
//=======================================================================================================


//category
export const getCategories = async()=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(URL + "/api/category", { withCredentials: true });
          resolve(result.data); // Mengembalikan data produk
        } catch (error) {
          reject(error); // Menangani error jika permintaan gagal
        }
      }, 1500); // Simulasi keterlambatan 1.5 detik
    });
}

export const createCategory = async(data)=>{
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.post(URL + "/api/category/create",data,{ withCredentials: true });
          resolve(result.data); // Mengembalikan data produk
        } catch (error) {
          reject(error); // Menangani error jika permintaan gagal
        }
      }, 1500); // Simulasi keterlambatan 1.5 detik
    });
}