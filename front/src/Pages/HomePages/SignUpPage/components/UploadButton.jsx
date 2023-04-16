import { UploadButton, PicPreview } from "../styles";
import { ThreeDots } from "react-loader-spinner";
import { uploadImage } from "../../../Services/Api/uploadImage";
import { AiFillCamera } from "react-icons/ai";

export default function UploadButtonComponent({loading, setLoading, theme, url, setUrl, afterText, beforeText}) {
    return (
        <>
            {loading ? (
                <UploadButton disabled>
                    <ThreeDots
                        height="50"
                        width="50"
                        radius="9"
                        color={theme.fontColor}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </UploadButton>
            ) : !url ? (
                <UploadButton>
                    {afterText}
                    <input
                        onChange={(e) => uploadImage(setLoading, setUrl, e)}
                        type="file"
                        accept="image/*"
                    />
                    <AiFillCamera />
                </UploadButton>
            ) : (
                <UploadButton>
                    {beforeText}
                    <PicPreview src={url} />
                    <input
                        onChange={(e) => uploadImage(setLoading, setUrl, e)}
                        type="file"
                        accept="image/*"
                    />
                </UploadButton>
            )}
        </>
    )
}