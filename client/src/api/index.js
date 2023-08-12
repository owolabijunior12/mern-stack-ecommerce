import axios from "axios";

export const baseURL =  "https://iboytech-e-commence-app-ttbq.onrender.com/" ||  "http://localhost:1609/" ;
console.log(`${baseURL}api/product/getAll`);


export const Signin = async (email,password) => {
  try {
    const res = await axios.get(`${baseURL}api/user/signin`,{
      email,
      password
    })
    return res.data;

  } catch (error) {
    return null;
  }

};
export const Signup = async (name, username, email, password) => {
  try {
    const res = await axios.post(`${baseURL}api/user/save`, {
      name,
      username,
      email,
      password
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const logOut = async () => {
  try {
    const res = await axios.get(`${baseURL}api/user/logout`);
    return res.data;

  } catch (error) {
    return null;
  }
};
export const SaveProduct = async ( 
  name,
  imageURL,
  product_price,
  description,
  brand,
  product_type,
  product_size,
  product_color,
  product_weight,
  Product_quantity,
  product_status,
  product_model_number,
  product_serial_number
  ) => {
    try {
      const res = await axios.post(`${baseURL}api/product/save`,{
        name,
        imageURL,
        product_price,
        description,
        brand,
        product_type,
        product_size,
        product_color,
        product_weight,
        Product_quantity,
        product_status,
        product_model_number,
        product_serial_number
      });
      return res.data;
  
    } catch (error) {
      return null;
    }
  };
  export const getOneProduct= async (id) => {
    try {
      const res = axios.get(`${baseURL}api/product/getOne/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };
  export const getAllProduct = async () => {
      try {
        const res = await axios.get(`${baseURL}api/product/getAll`);
        // console.log(res?.data)
        return res.data;
    
      } catch (error) {
        return null;
      }
    };
  export const validateUser = async (token) => {
    try {
      const res = await axios.get(`${baseURL}api/user/login`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      return null;
    }
  };
export const updateProduct = async () => {
    try {
      const res = await axios.put(`${baseURL}api/product/getOne/:id`);
      return res.data;
  
    } catch (error) {
      return null;
    }
  };
  
export const getAllUser = async () => {
    try {
      const res = await axios.get(`${baseURL}api/user/getUser`);
      return res.data;
  
    } catch (error) {
      return null;
    }
  };
export const deleteProduct = async () => {
    try {
      const res = await axios.get(`${baseURL}api/product/delete/:id`);
      return res.data;
  
    } catch (error) {
      return null;
    }
  };
  export const getAllCart = async ()=>{
    try {
      const res = await axios.get(`${baseURL}api/addToCart/getAll`);
      return res.data;
    } catch (error) {
      return null
    }
  }
  export const saveNewCart = async (name,product_price,imageURL,product_size,product_qty) =>{
    try {
      const res = await axios.post(`${baseURL}api/addToCart/save`, {
        name,
        product_price,
        imageURL,
        product_size,
        product_qty
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }

export const deleteCart = async (_id) => {
  try {
    const res = await axios.delete(`${baseURL}api/addToCart/delete/${_id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

  export const updateAddToCart = async () => {
    try {
      const res = await axios.put(`${baseURL}api/addToCart/update/:id`);
      return res.data;
  
    } catch (error) {
      return null;
    }
  };




