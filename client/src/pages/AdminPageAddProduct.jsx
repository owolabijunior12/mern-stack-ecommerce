import React, { useEffect, useRef, useState } from "react";
import Header from "../conponent/Header"
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../configuration/firebase.configuration";
import { useStateValue } from "../Context/StateProvider";
import {  
  baseURL,
  getAllProduct,
  SaveProduct,
} from "../api";
import {  toast } from 'react-toastify';
import { actionType } from "../Context/reducer";
import axios from "axios";
// import { filterByLanguage, filters } from "../utils/supportfunctions";


export const ImageLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
  );
};

export const ImageUploader = ({
  setImageURL,
  setAlert,
  alertMsg,
  isLoading,
  isImage,
  setProgress,
}) => {
  const uploadImage = (e) => {
    isLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error("File is not uploaded")  
        console.log(error);     
        isLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageURL(downloadUrl);
          setProgress(0);
          isLoading(false);
        toast.success("File Uploaded Successfilly")         
        });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-textColor  text-xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg text-textColor">
            click to upload {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        onChange={uploadImage}
        className="w-0 h-0"
      />
    </label>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-textColor bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-textColor animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
}
 const AdminPageAddProduct = () => {
  const [isProduct, setIsProduct] = useState(false);
  const [progress, setProgress] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productWeight, setProductWeight] = useState();
  const [productSize, setProductSize] = useState("");
  const [productQuantity,setProductQuantity] = useState("");
  const [productStatus,setProductStatus] = useState("");
  const [productModelNumber,setProductModelNumber] = useState("");
  const [productSerialNumber,setProductSerialNumber] = useState("")
  const [{ product }, dispatch] = useStateValue();

  const deleteImageObject = (imageURL) => {
    setIsProduct(true);
    setProductImage(null);
    const deleteRef = ref(storage, imageURL);
    deleteObject(deleteRef).then(() => {
      toast.success("File removed successfully");    
      setIsProduct(false);
    });
  };

  const saveProduct = () => {
    if (
      !productImage ||
      !productName ||
      !brand ||
      !description ||
      !productModelNumber ||
      !productColor ||
      !productPrice ||
      !productType ||
      !productQuantity ||
      !productSerialNumber ||
      !productWeight ||
      !productStatus ||
      !productSize
    ) {
      toast.warning("Required fields are missing");
    } else {
      setIsProduct(true);
      const data = {
        name: productName,
        imageURL: productImage,
        product_price: productPrice,
        description: description,
        brand: brand,
        product_type: productType,
        product_size: productSize,
        product_color: productColor,
        product_weight: productWeight,
        product_quantity: productQuantity,
        product_status: productStatus,
        product_model_number: productModelNumber,
        product_serial_number: productSerialNumber,
      };
      axios
        .post(`${baseURL}api/product/save`, data)
        .then((res) => {
          getAllProduct().then((product) => {
            dispatch({
              type: actionType.SET_ALL_PRODUCT,
              product: product.data,
            });
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error saving product");
        })
        .finally(() => {
          setIsProduct(false);
          toast.success("Product Saved");
          setProductImage(null);
          setProductName("");
          setProductPrice("");
          setDescription("");
          setBrand("");
          setProductType("");
          setProductColor("");
          setProductWeight("");
          setProductSize("");
          setProductQuantity("");
          setProductStatus("");
          setProductModelNumber("");
          setProductSerialNumber("");
        });
    }
  };

  return (
    <div className="flex items-center justify-evenly w-full flex-wrap">
      <Header/>
      <h1 className="text-4xl font-bold mt-32"> Product Details</h1>
      <div className="bg-primary my-5 mx-9 backdrop-blur-md bg-auto  w-full h-510 rounded-md border-2 border-dotted border-textColor cursor-pointer">
        {isProduct && <ImageLoader progress={progress} />}
        {!isProduct && (
          <>
            {!productImage ? (
              <ImageUploader
                setImageURL={setProductImage}              
                isLoading={setIsProduct}
                setProgress={setProgress}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={productImage}
                  alt="uploaded_image"
                  className="w-full h-full bg-cover bg-center object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                  onClick={() => {
                    deleteImageObject(productImage);
                  }}
                >
                  <MdDelete className="text-textColor" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col w-full mx-9 items-center justify-center gap-4 ">    
        <input
          type="text"
          placeholder="Product Name"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         <input
          type="text"
          placeholder="Product Brand"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
         <input
          type="text"
          placeholder="Product Type"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />        
        <input
          type="text"
          placeholder="Product Size"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Color"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productColor}
          onChange={(e) => setProductColor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Weight"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
        />
         <input
          type="number"
          placeholder="Product Quality"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
         <input
          type="text"
          placeholder="Product Status"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productStatus}
          onChange={(e) => setProductStatus(e.target.value)}
        />
         <input
          type="text"
          placeholder="Product Model Number"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productModelNumber}
          onChange={(e) => setProductModelNumber(e.target.value)}
        />
         <input
          type="text"
          placeholder="Product Serial Number"
          className="w-full  p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-textColor bg-transparent"
          value={productSerialNumber}
          onChange={(e) => setProductSerialNumber(e.target.value)}
        />
        <div className="w-full  flex items-center justify-center lg:justify-end">
          {isProduct ? (
            <DisabledButton />
          ) : (          
              <motion.button 
              whileTap={{ scale: 0.8 }}        
              transition={{ duration: 0.3}}
             type='button' 
             onClick={saveProduct}
             className="p-3 rounded-md border-textColor text-textColor bg-primary border hover:shadow-lg"
              >
               Add To Product
             </motion.button> 
          )}
        </div>
      </div>
     
    </div>
  );
};
export default AdminPageAddProduct;






