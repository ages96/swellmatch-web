import { FormItems } from "@/app/page";
import FormWrapper from "./FormWrapper";
import UploadFiles from '../lib/uploadFiles';

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  files:File[];
  errors: Partial<FormItems>;
  successMessage:string;
  errorMessage:string;
};

const IDVerificationForm = ({ files, updateForm, errors,base64files,successMessage, errorMessage }: stepProps) => {
 

  return (
    <FormWrapper
      title="Book Your Visit"
      description="3/3 ID Verification"
    >
    <div className="relative" style={{top:"40px"}}>
      <div className="flex flex-col gap-3">
        <UploadFiles updateForm={updateForm} files={files} base64files={base64files} errorMessage={errorMessage}/>
      </div>
    </div>
    
    </FormWrapper>
  );
};

export default IDVerificationForm;
