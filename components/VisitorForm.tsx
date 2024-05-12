import { useState } from "react";
import FormWrapper from "./FormWrapper";
import { FormItems } from "../app/page";
import { COUNTRIES } from '../lib/countries';
import CountrySelector from '../lib/selector';
import { SelectMenuOption } from "../lib/types";
import { CFormInput } from '@coreui/react';

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const VisitorForm = ({
  name,
  email,
  phone,
  country,
  errors,
  updateForm,
}: StepProps) => {

 const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it

  const handleClear = (el:string,e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateForm({ [el]: "" })
  };

  return (
    <FormWrapper
      title="Book Your Visit"
      description="1/3: Visitor Details"
    >
     <div className="relative" style={{top:"40px"}}>
      <div className="flex flex-col gap-5 md:flex-row md:gap-5 pb-4">
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6 relative">
          <CFormInput value={name} onChange={(e) => updateForm({ name: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Name" placeholder="Name" />
          
          {name && !errors.name && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("name", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }
          
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CountrySelector
            id={'countries'}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={val => updateForm({ country: val })}
            selectedValue={COUNTRIES.find(option => option.value === country) as SelectMenuOption} 
            classExt="select-country-element"
          />

          {country && !errors.country && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("country", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {!country && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("country", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {errors.country && (
            <p className="text-red-500 text-sm" style={{position: "absolute",top: "34%"}}>{errors.country}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-5">
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput value={email} onChange={(e) => updateForm({ email: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Email" placeholder="Email" />
          
          {email && !errors.email && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("email", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
        <CFormInput value={phone} onChange={(e) => updateForm({ phone: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Whatssapp number" placeholder="Whatssapp number" />
          
          {phone && !errors.phone && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("phone", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
    </FormWrapper>
  );
};

export default VisitorForm;