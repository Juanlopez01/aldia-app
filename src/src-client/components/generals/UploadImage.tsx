import { useToggle } from "@/src-client/hooks/use-toggle";
import Spinner from '@components/svgs/spinner';
import { ChangeEvent } from "react"
import Swal from "sweetalert2"

const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDYNARY_URL ?? ''

interface UploadOptions{
    onSuccess:(imageUrl: string) => void
}
interface cloudinaryResponse {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    access_mode: string;
    original_filename: string;
  }
  

export function UploadImage({onSuccess}:UploadOptions){
const {toggle,toggleHandler}=useToggle()

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e
      if (target.files && target.files.length) {
        const file = target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'upload_preset_al_dia')
        toggleHandler()
        try {
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData,
            })
            const {secure_url} = await response.json() as cloudinaryResponse
            onSuccess(secure_url)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'Hubo un error al subir la imagen, intentalo denuevo',
                title: 'Oops...'
            })
        } finally{
            toggleHandler()
        }
      }
    }
return (
  <>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dark-blue border-dashed rounded-lg cursor-pointer bg-gray-50 transition hover:bg-light-blue/40"
      >
        {toggle ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">
                Clickea para subir un archivo
              </span>{' '}
              o arrastralo
            </p>
            <p className="text-xs text-gray-500 ">PNG, JPG o GIF</p>
          </div>
        ) : (
          <Spinner className="w-full h-full fill-darkest-blue animate-spin"/>
        )}

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleInputChange}
        />
      </label>
    </div>
  </>
)
}
