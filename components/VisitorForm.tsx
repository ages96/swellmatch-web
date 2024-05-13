// Import necessary libraries and dependencies.
import { useState } from "react";
import FormWrapper from "./FormWrapper";
import { FormItems } from "../app/page";
import { COUNTRIES } from '../lib/countries';
import CountrySelector from '../lib/selector';
import { SelectMenuOption } from "../lib/types";
import { CFormInput } from '@coreui/react';

// Define props for the VisitorForm component.
type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

// Component for the visitor details step of the form.
const VisitorForm = ({
  name,
  email,
  phone,
  country,
  errors,
  updateForm,
}: StepProps) => {

  // State variable to manage the visibility of country selector.
  const [isOpen, setIsOpen] = useState(false);

  // Function to clear input field.
  const handleClear = (el:string,e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateForm({ [el]: "" })
  };

  return (
    // Form wrapper with title and description.
    <FormWrapper
      title="Book Your Visit"
      description="1/3: Visitor Details"
    >
     {/* Container for visitor form */}
     <div className="relative" style={{top:"40px"}}>
      {/* Visitor details section */}
      <div className="flex flex-col gap-5 md:flex-row md:gap-5 pb-4">
        {/* Input fields for visitor details */}
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6 relative">
          {/* Input field for visitor name */}
          <CFormInput value={name} onChange={(e) => updateForm({ name: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Name" placeholder="Name" />
          
          {/* Button to clear visitor name input */}
          {name && !errors.name && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("name", e)}
            >
              {/* Icon for clearing input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }
          
          {/* Error message for visitor name */}
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          {/* Country selector */}
          <CountrySelector
            id={'countries'}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={val => updateForm({ country: val })}
            selectedValue={COUNTRIES.find(option => option.value === country) as SelectMenuOption} 
            classExt="select-country-element"
          />

          {/* Button to clear country input */}
          {country && !errors.country && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("country", e)}
            >
              {/* Icon for clearing input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {/* Button to clear country input */}
          {!country && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("country", e)}
            >
              {/* Icon for clearing input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {/* Error message for country */}
          {errors.country && (
            <p className="text-red-500 text-sm" style={{position: "absolute",top: "34%"}}>{errors.country}</p>
          )}
        </div>
      </div>
      {/* Visitor contact details section */}
      <div className="flex flex-col gap-5 md:flex-row md:gap-5">
        {/* Input field for visitor email */}
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput value={email} onChange={(e) => updateForm({ email: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Email" placeholder="Email" />
          
          {/* Button to clear email input */}
          {email && !errors.email && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("email", e)}
            >
              {/* Icon for clearing input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {/* Error message for email */}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        {/* Input field for visitor phone */}
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput value={phone} onChange={(e) => updateForm({ phone: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-0" floatingLabel="Whatssapp number" placeholder="Whatssapp number" />
          
          {/* Button to clear phone input */}
          {phone && !errors.phone && (
            <button
              className="clear-input-button"
              onClick={(e) => handleClear("phone", e)}
            >
              {/* Icon for clearing input */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {/* Error message for phone */}
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
    </FormWrapper>
  );
};

// Export the VisitorForm component.
export default VisitorForm;