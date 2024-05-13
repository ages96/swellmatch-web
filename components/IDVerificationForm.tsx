// Import necessary components and libraries.
import { FormItems } from "@/app/page";
import FormWrapper from "./FormWrapper";
import UploadFiles from '../lib/uploadFiles';

// Define props for the IDVerificationForm component.
type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  files:File[];
  errors: Partial<FormItems>;
  successMessage:string;
  errorMessage:string;
};

// Component for the ID verification form step.
const IDVerificationForm = ({ files, updateForm, errors,base64files,successMessage, errorMessage }: stepProps) => {
 

  return (
    // Form wrapper with title and description.
    <FormWrapper
      title="Book Your Visit"
      description="3/3 ID Verification"
    >
    <div className="relative" style={{top:"40px"}}>
      <div className="flex flex-col gap-3">
        {/* Component for uploading files */}
        <UploadFiles updateForm={updateForm} files={files} base64files={base64files} errorMessage={errorMessage}/>
      </div>
    </div>

    {/* Error message for uploads */}
    {errors.base64files && (
      <p style={{bottom:"130px"}} className="text-red-500 text-sm relative validation-file-upload">File upload required</p>
    )}
    
    </FormWrapper>
  );
};

export default IDVerificationForm;