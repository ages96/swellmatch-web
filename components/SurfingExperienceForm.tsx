"use client";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/app/page";
import React from "react";
import CustomSlider from "../lib/slider";
import { CFormInput, CFormSelect } from '@coreui/react';

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const SurfingExperienceForm = ({ 
  visit_date, 
  desired_board,
  errors,
  updateForm
}: stepProps
) => {

  const handleClear = (el:string,e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateForm({ [el]: "" })
  };

  return (
    <FormWrapper
      title="Book Your Visit"
      description="2/3: Surfing Experience"
    >
    <div className="flex flex-col gap-5 md:flex-row pt-5">
      <div className="flex flex-col gap-2 col-span-12">
        <p  style={{color: "#FFF",fontFamily: "Inter",fontSize: "14px",fontStyle: "normal",fontWeight: "400"}}>Your Surfing Experience</p>
      </div>
    </div>
    <div className="relative" style={{top:"40px"}}>
      <div className="flex flex-col md:flex-row  pb-5">
        <CustomSlider onChange={val => updateForm({ surfing_experience: val })}/>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-5">
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
          <CFormInput value={visit_date} onChange={(e) => updateForm({ visit_date: e.target.value })} type="text" id="floatingInput" floatingClassName="mb-3" floatingLabel="Visit Date" placeholder="Visit Date" />
          
          {visit_date && !errors.visit_date && (
            <button
              className="clear-input-button-select"
              onClick={(e) => handleClear("visit_date", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }
          
          {errors.visit_date && (
            <p className="text-red-500 text-sm">{errors.visit_date}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 md:w-1/2 col-span-6">
        <CFormSelect size="lg" className="mb-3" value={desired_board} onChange={(e) => updateForm({ desired_board: e.target.value })}
          aria-label="Your Desired Board"
          options={[
            { label: 'Longboard', value: 'Longboard' },
            { label: 'Funboard', value: 'Funboard' },
            { label: 'Shortboard', value: 'Shortboard'},
            { label: 'Fishboard', value: 'Fishboard'}
          ]}
        />

          {desired_board && !errors.desired_board && (
            <button
              className="clear-input-button-select"
              onClick={(e) => handleClear("desired_board", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {!desired_board && (
            <button
              className="clear-input-button-select"
              onClick={(e) => handleClear("desired_board", e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>)
          }

          {errors.desired_board && (
            <p className="text-red-500 text-sm" style={{position: "absolute",top: "34%"}}>{errors.desired_board}</p>
          )}
        </div>
      </div>
    </div>
    </FormWrapper>
  );
};

export default SurfingExperienceForm;
