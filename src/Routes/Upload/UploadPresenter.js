import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Slider from 'react-animated-slider';
import "./upload.css";

const slides = [
    { title: 'First item', description: 'Lorem ipsum' },
    { title: 'Second item', description: 'Lorem ipsum' }
];

const Wrapper = styled.div`
    min-height:400px;
    display:flex;
    flex-direction:column;
`;
const UploadForm = styled.form`
    margin:0 auto;
    min-width: 300px;
    @media (min-width: 576px){
    min-width: 500px;
  }
  @media (min-width: 768px){
    min-width: 500px;
  }
`;
const InputWrapper = styled.div`
    margin-bottom:10px;
`;

const ButtonWrapper = styled.div`
    margin-top:30px;
`;
const UploadImage = styled.div`
        background-image: url(${props => props.url});
        background-size: cover;
        resize: both;
`;


const UploadPresenter = ({
    captionInput,
    locationInput,
    onImageChange,
    images,
    onSubmit
}) => {
    if(images){
        console.log("asdf")
        console.log(images.length);
    }

    return (
        <Wrapper>
            <Helmet>
                <title>업로드 | SakongStagram</title>
            </Helmet>
            <UploadForm onSubmit={onSubmit}>
                <UploadImage>
                    {images.length>0
                    ?(<Slider>
                        {images.map((image, index) => <UploadImage url={image} key={index}>
                        </UploadImage>)}
                    </Slider> ):<></>
                }

                </UploadImage>
                <InputWrapper>
                    <Input width="100%" required={false} placeholder={"문구입력"} {...captionInput}></Input>
                </InputWrapper>
                <InputWrapper>
                    <Input width="100%" required={false} placeholder={"장소"} {...locationInput}></Input>
                </InputWrapper>

                <input accept="image/*" onChange={onImageChange} placeholder={"업로드 파일"} type="file" multiple ></input>
                <ButtonWrapper>
                    <Button text={"게시물 등록"} />
                </ButtonWrapper>
            </UploadForm>


        </Wrapper>
    )
}

export default UploadPresenter;
