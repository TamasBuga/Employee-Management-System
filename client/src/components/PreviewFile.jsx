

import { Field, ErrorMessage } from 'formik';
import { imageCompressor } from "../hooks/useImageCompressor";



const PreviewFile = ({ name, width, height, selectedFile, setSelectedFile, url }) => {

    return (

        <Field name={name}>
            {({ form, ...rest }) => {

                return (
                    <>
                        <input
                            name="image"
                            onBlur={form.handleBlur}
                            onChange={({ currentTarget }) => {
                                const file = currentTarget.files[0];
                                imageCompressor(file, setSelectedFile);
                                form.setFieldValue("image", selectedFile.file);
                            }}
                            type="file"
                            style={{ paddingTop: 10 }}
                            accept=".png,.jpg,.jpeg"
                        />
                        {/* {form.errors.image && form.touched.image ? (
                                <ErrorMessage component="p" name="image" className={"text-center text-md text-red-500 py-2 font-bold"} />
                            ) : null} */}
                        {(selectedFile.previewURI !== undefined || selectedFile.file !== undefined) ?
                            <img src={selectedFile.previewURI} alt="Profilkép" width={width} height={height} />
                            :
                            null
                        }
                    </>
                );
            }}
        </Field>

    )

}

export default PreviewFile;