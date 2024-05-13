// Imports necessary libraries and dependencies.
import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/page";
import { CFormInput } from '@coreui/react';
import { COUNTRIES } from '../lib/countries';
import { SelectMenuOption } from "../lib/types";
import CountrySelector from '../lib/selector';

// Define props for the FinalStep component.
type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  goTo: (index: number) => void;
};

// Component for the final step of the form.
const FinalStep = ({  
  name,
  email,
  phone,
  country,
  visit_date,
  updateForm, 
  goTo
}: StepProps) => {
  
  const [isOpen, setIsOpen] = useState(false);

  // Automatically reload the window after 5 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload(); // Reload the window after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout); // Clear the timeout when component unmounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    // Form wrapper with title and description.
    <FormWrapper
      title={`Thank you, ${name}`}
      description="You&apos;re In!" 
    >

    <div className="relative" style={{top:"10px",color: "#FFF",fontFamily: "Inter",fontSize: "14px",fontStyle: "normal",fontWeight: "400",lineHeight: "150%",letterSpacing: "1.4px"}}>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col gap-2 col-span-12">
          <p>Your store visit is booked and you are ready to ride the shopping wave. Here is your detail:</p>
        </div>
      </div>

      {/* Form inputs */}
      <div className="flex flex-col gap-5 md:flex-row md:gap-5" style={{position: "relative",right: "12px"}}>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput className="customInputLabel" value={name} type="text" id="floatingInput" floatingClassName="mb-3" floatingLabel="Name" placeholder="Name" />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CountrySelector
            id={'countries'}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={val => updateForm({ country: val })}
            selectedValue={COUNTRIES.find(option => option.value === country) as SelectMenuOption} 
            classExt="select-country-element-black"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-5" style={{position: "relative",right: "12px"}}>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput className="customInputLabel" style={{background: "transparent !important",border: "0px !important"}} value={email} type="text" id="floatingInput" floatingClassName="mb-3" floatingLabel="Email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
        <CFormInput className="customInputLabel" style={{background: "transparent !important",border: "0px !important"}} value={visit_date} type="number" id="floatingInput" floatingClassName="mb-3" floatingLabel="Visit Date" placeholder="Visit Date" />
        </div>
      </div>

      {/* Confirmation message */}
      <div className="flex flex-col h-full md:flex-row">
        <div className="flex flex-col gap-2 col-span-12">
          <p>We look forward to seeing you at the #Swellmatch store! Your booking details already sent to your email and whatsapp</p>
        </div>
      </div>

      {/* Timer for automatic refresh */}
      <div className="flex flex-col h-full md:flex-row">
        <div className="flex flex-col gap-2 col-span-12">
          <p style={{color: "rgba(255, 255, 255, 0.60)",fontFamily: "Inter",fontSize: "12px",fontStyle: "normal",fontWeight: "400"}}>This form will refresh automatically in 10 seconds</p>
        </div>
      </div>
    
    </div>
    </FormWrapper>
  );
};

export default FinalStep;