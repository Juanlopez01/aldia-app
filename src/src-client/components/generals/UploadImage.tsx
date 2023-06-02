import { ChangeEvent } from "react"

const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDYNARY_URL ?? ''

export function UploadImage(){
    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const { target } = e
      if (target.files && target.files.length) {
        const file = target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'upload_preset_al_dia')
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        console.log(data)
      }
    }
return    (
        <>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dark-blue border-dashed rounded-lg cursor-pointer bg-gray-50 transition hover:bg-light-blue/40"
            >
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
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/gif"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </>
      )
}
