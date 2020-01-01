import React, { useState, useEffect } from "react";
import UploadPresenter from "./UploadPresenter";
import useInput from "../../Hooks/useInput";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { UPLOAD } from "./UploadQueries"
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERYS } from "../Feed"
import Loader from "../../Components/Loader";

export default withRouter(({ history }) => {

    const captionInput = useInput("");
    const locationInput = useInput("");
    const [selectedImage, setSelectedImage] = useState();
    const [images, setImages] = useState([]);
    const [uploadMutation] = useMutation(UPLOAD, {
        refetchQueries: () => [{ 
            query: FEED_QUERYS,
            variables: { 
                pageNumber:0,
                items:2
             }
        }]
    });
    const [loading, setIsLoading] = useState(false);


    const onImageChange = async (event) => {
        console.log("image change")
        setSelectedImage([]);
        setImages([]);

        if (event.target.files && event.target.files[0]) {

            const files = event.target.files;
            console.log(files[0]);
            const images = [];
            setSelectedImage(event.target.files);
            console.log(selectedImage);
            for (let image of files) {
                images.push(URL.createObjectURL(image));
            }
            setImages(images);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("upload Click")
        const formData = new FormData();

        if (captionInput.value === "" || locationInput.value === "") {
            toast.error("모두 작성해 주세요");
        }
        console.log(captionInput.value);
        console.log(locationInput.value);
        console.log(selectedImage);
        for (let file of selectedImage) {
            formData.append("file", file)
        }

        try {
            setIsLoading(true);
            const {
                data: location
            } = await axios.post("http://localhost:4000/api/uploads", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                }
            });

            const {
                data: { upload }
            } = await uploadMutation({
                variables: {
                    files: location,
                    caption: captionInput.value,
                    location: locationInput.value
                }
            });
            if (upload.id) {
                history.push(`/`,{frompage:"1"});
            }
        } catch (e) {
            console.log(e);
            // toast.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {loading ? <Loader />
                : (
                    <UploadPresenter
                        captionInput={captionInput}
                        locationInput={locationInput}
                        images={images}
                        onSubmit={onSubmit}
                        selectedImage={selectedImage}
                        onImageChange={onImageChange}
                    ></UploadPresenter>
                )
            }
        </>
    )
})
