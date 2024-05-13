"use client";

// Import necessary libraries and dependencies.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "hooks/useMultiplestepForm";
import { AnimatePresence } from "framer-motion";
import VisitorForm from "@/components/VisitorForm";
import SurfingExperienceForm from "@/components/SurfingExperienceForm";
import IDVerificationForm from "@/components/IDVerificationForm";
import FinalStepForm from "@/components/FinalStepForm";
import SuccessMessage from "@/components/SuccessMessage";
import FailedMessage from "@/components/FailedMessage";
import SideBar from "@/components/SideBar";

// Define the type for form items.
export type FormItems = {
  name: string;
  email: string;
  phone: string;
  country: string;
  files:File[];
  base64files:object[];
  surfing_experience:number|number[];
  visit_date: string;
  desired_board:string;
};

// Initial values for form fields
const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  country:"",
  files:[],
  base64files:[],
  surfing_experience:6,
  visit_date: "25/10/2024",
  desired_board:"Longboard"
};

export default function Home() {
   // State variables to manage form data, errors, success and error messages.
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Custom hook to manage multiple steps in the form.
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg
  } = useMultiplestepForm(4);

  // Function to update form data.
  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone, country, visit_date, desired_board, files } = fieldToUpdate;

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Please enter a valid 10-digit whatsapp number",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        phone: "",
      }));
    }

    if (country && country=="") {
      setErrors((prevState) => ({
        ...prevState,
        country: "Country required",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        country: "",
      }));
    }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  // Function to handle form submission.
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { name, email, phone, country, visit_date, desired_board, base64files, surfing_experience } = formData;

    let errorStep = 0;

    if (currentStepIndex==0) {

      if (name == "") {
        setErrors((prevState) => ({
          ...prevState,
          name: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          name: "",
        }));
      }

      if (email == "") {
        setErrors((prevState) => ({
          ...prevState,
          email: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: "",
        }));
      }

      if (phone=="") {
        setErrors((prevState) => ({
          ...prevState,
          phone: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          phone: "",
        }));
      }

      if (country=="") {
        setErrors((prevState) => ({
          ...prevState,
          country: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          country: "",
        }));
      }

    } else if (currentStepIndex==1) {

      if (desired_board=="") {
        setErrors((prevState) => ({
          ...prevState,
          desired_board: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          desired_board: "",
        }));
      }

      if (visit_date=="") {
        setErrors((prevState) => ({
          ...prevState,
          visit_date: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          visit_date: "",
        }));
      }

      if (surfing_experience==0) {
        setErrors((prevState) => ({
          ...prevState,
          surfing_experience: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          surfing_experience: "",
        }));
      }

    } else if (currentStepIndex==2) {

      if (base64files.length==0) {
        setErrors((prevState) => ({
          ...prevState,
          base64files: "Required",
        }));
        errorStep = 1;
      } else {
        setErrors((prevState) => ({
          ...prevState,
          base64files: "",
        }));
      }

    }

    if (errorStep == 0) {
      if (currentStepIndex==2) {
        try {

          const myHeaders = new Headers();
        
          const raw = "";

          const requestOptions : RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch(process.env.API_SERVER  + "api/v1/auth/token", requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            // Handle successful response here

            let token = data.data.token;

            let requestAPI = {
              customer_name: formData.name,
              customer_email: formData.email,
              customer_phone: formData.phone,
              country_code:formData.country,
              file_uploads:formData.base64files,
              visit_date: formData.visit_date,
              desired_board:formData.desired_board,
              surfing_experience:formData.surfing_experience
            }
    
            const response = fetch(process.env.API_SERVER + 'api/v1/booking/store', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(requestAPI), // Assuming formData is the data to be submitted
            }).then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              setSuccessMessage("");
              setErrorMessage(response.statusText);
              return response.json(); // Parse the JSON response
            })
            .then(data => {
              console.log(data)
              if (data.status_code==201) {
                setErrorMessage("");
                setSuccessMessage(data.message);
                nextStep();
              } else {
                setSuccessMessage("");
                setErrorMessage(data.message);
              }
            })
            .catch((error) => {
              setSuccessMessage("");
              setErrorMessage(error.message);
            });

          }).catch(error => {
            setSuccessMessage("");
            setErrorMessage(error.message);
          });

        } catch (error) {
          console.error('Error submitting data:', error);
          // Handle error condition
        }
      } else {
        nextStep();
      }
    }
  };

  return (
    <div style={{height: "581px",background: "#020404",borderRadius: "0px",border: "white",top:"100px"}}
      className={`flex ${
        currentStepIndex === 1 ? "h-[600px] md:h-[500px]" : "h-[500px]"
      } w-11/12 relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-0`}
    >
      {!showSuccessMsg ? (
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      ) : (
        ""
      )}
      <main style={{padding:"60px"}}
        className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
      >
        <form
          onSubmit={handleOnSubmit}
          className="w-full flex flex-col justify-between h-full"
        >
          <AnimatePresence mode="wait">
            {currentStepIndex === 0 && (
              <VisitorForm
                key="step1"
                {...formData}
                updateForm={updateForm}
                errors={errors}
              />
            )}
            {currentStepIndex === 1 && (
              <SurfingExperienceForm key="step2" {...formData} updateForm={updateForm} errors={errors}/>
            )}
            {currentStepIndex === 2 && (
              <IDVerificationForm key="step3" {...formData} updateForm={updateForm} errors={errors} successMessage={successMessage} errorMessage={errorMessage}/>
            )}
            {currentStepIndex === 3 && (
              <FinalStepForm key="step4" {...formData} updateForm={updateForm} goTo={goTo}/>
            )}
          </AnimatePresence>
          {!successMessage && (
            <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                <Button
                  type="submit"
                  className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white button-next-step"
                >
                  {isLastStep ? "Book My Visit" : "Next Step"}
                </Button>
              </div>
            </div>
            <div className="">
              <Button
                onClick={previousStep}
                type="button"
                variant="ghost"
                className={`${
                  isFirstStep
                    ? "invisible"
                    : "visible p-0 text-neutral-200 hover:text-white"
                }`}
              >
                Go Back
              </Button>
            </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
