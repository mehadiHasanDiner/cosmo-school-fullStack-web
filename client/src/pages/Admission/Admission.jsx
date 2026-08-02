import ScrollReveal from "../../components/common/ScrollReveal";
import Container from "../../components/layout/Container";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiPhone,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";

import FormField from "../../components/ui/FormField";
import { useState } from "react";

const Admission = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      guardianName: "",
    },
  });

  const handleAdmissionInquiry = (data) => {
    try {
      setIsSubmitted(false);
      console.log("Form data", data);
      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Inquiry submission failed:", error);
    }
  };
  const benefits = [
    {
      title: "Quality Education",
      description: "National curriculum in English version",
      icon: FiBookOpen,
    },
    {
      title: "Expert Faculty",
      description: "Dedicated and experienced teachers",
      icon: FiUsers,
    },
    {
      title: "Holistic Development",
      description: "Focus on moral, academic & extracurricular growth",
      icon: FiAward,
    },
  ];

  const classOptions = [
    "Play Group",
    "Nursery",
    "KG",
    "Class One",
    "Class Two",
    "Class Three",
    "Class Four",
    "Class Five",
    "Class Six",
    "Class Seven",
    "Class Eight",
    "Class Nine",
  ];

  return (
    <section className="py-8 bg-linear-to-br from-[#005f50] via-[#00785c] to-[#04926c]">
      <ScrollReveal direction="zoom" delay="0.5" duration="1">
        <Container className="grid min-h-screen items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-24 body-font ">
          {/* Left side content */}
          <div className="text-white">
            <h1
              className=" inline-flex items-center rounded-full
              bg-secondary px-5 py-2 
              text-xs font-black uppercase tracking-wide
              text-neutral shadow-lg mt-10 "
            >
              Limited Time Offer
            </h1>

            <h1
              className="mt-8 max-w-xl text-4xl font-black
              leading-tight sm:text-5xl lg:text-6xl heading-font"
            >
              Get Up To 10%
              <span className="block">Discount</span>
            </h1>

            <h2 className="mt-7 text-xl font-bold sm:text-2xl">
              On Your Child&apos;s Admission!
            </h2>

            <p
              className="
              mt-5 max-w-xl text-base leading-8
              text-white/90 sm:text-lg
            "
            >
              Submit your inquiry today and receive an exclusive discount on
              admission fees. Join the Cosmo School family and give your child
              the best education they deserve.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="
                      grid size-11 shrink-0 place-items-center
                      rounded-xl bg-white/15
                      text-white backdrop-blur-sm
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:bg-secondary
                      group-hover:text-neutral
                    "
                    >
                      <Icon className="text-xl" />
                    </div>

                    <div>
                      <h3 className="text-base font-black sm:text-lg">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/80 sm:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form card */}
          <div
            className="rounded-[28px] border border-white/30
            bg-white p-6
            shadow-[0_30px_80px_rgba(0,45,36,0.35)]
            sm:p-8 lg:p-10"
          >
            <div>
              <h2 className=" text-3xl font-black text-[#034b43]">
                Inquiry Form
              </h2>
              <p className="mt-2 text-base text-neutral/70">
                Fill in your details to get discount information
              </p>

              <form
                onSubmit={handleSubmit(handleAdmissionInquiry)}
                className="mt-8 space-y-5"
                noValidate={true}
              >
                {/* Guardian name */}
                <FormField
                  label="Guardian's Name"
                  error={errors.guardianName?.message}
                >
                  <div className="relative">
                    <FiUser
                      className="
                    pointer-events-none absolute left-4 top-1/2
                    -translate-y-1/2 text-xl text-neutral/40 z-1
                  "
                    />

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`
                    input input-bordered h-14 w-full
                    rounded-xl bg-white pl-12
                    text-neutral outline-none
                    transition-all duration-300
                    placeholder:text-neutral/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4 focus:ring-primary/10
                    ${
                      errors.guardianName
                        ? "border-error focus:border-error focus:ring-error/10"
                        : "border-base-300"
                    }
                  `}
                      {...register("guardianName", {
                        required: "Guardian's name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                    />
                  </div>
                </FormField>

                {/* Email */}
                <FormField label="Email Address" error={errors.email?.message}>
                  <div className="relative">
                    <FiMail
                      className="
                    pointer-events-none absolute left-4 top-1/2
                    -translate-y-1/2 text-xl text-neutral/40 z-1
                  "
                    />

                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className={`
                    input input-bordered h-14 w-full
                    rounded-xl bg-white pl-12
                    text-neutral outline-none
                    transition-all duration-300
                    placeholder:text-neutral/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4 focus:ring-primary/10
                    ${
                      errors.email
                        ? "border-error focus:border-error focus:ring-error/10"
                        : "border-base-300"
                    }
                  `}
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </div>
                </FormField>

                {/* Phone */}
                <FormField label="Phone Number" error={errors.phone?.message}>
                  <div className="relative">
                    <FiPhone
                      className="
                    pointer-events-none absolute left-4 top-1/2
                    -translate-y-1/2 text-xl text-neutral/40 z-1
                  "
                    />

                    <input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      className={`
                    input input-bordered h-14 w-full
                    rounded-xl bg-white pl-12
                    text-neutral outline-none
                    transition-all duration-300
                    placeholder:text-neutral/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4 focus:ring-primary/10
                    ${
                      errors.phone
                        ? "border-error focus:border-error focus:ring-error/10"
                        : "border-base-300"
                    }
                  `}
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(?:\+?88)?01[3-9]\d{8}$/,
                          message: "Enter a valid Bangladeshi phone number",
                        },
                      })}
                    />
                  </div>
                </FormField>

                {/* Child name */}
                <FormField
                  label="Child's Name"
                  error={errors.childName?.message}
                >
                  <div className="relative">
                    <FiUser
                      className="
                    pointer-events-none absolute left-4 top-1/2
                    -translate-y-1/2 text-xl text-neutral/40 z-1
                  "
                    />

                    <input
                      type="text"
                      placeholder="Enter child's name"
                      className={`
                    input input-bordered h-14 w-full
                    rounded-xl bg-white pl-12
                    text-neutral outline-none
                    transition-all duration-300
                    placeholder:text-neutral/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4 focus:ring-primary/10
                    ${
                      errors.childName
                        ? "border-error focus:border-error focus:ring-error/10"
                        : "border-base-300"
                    }
                  `}
                      {...register("childName", {
                        required: "Child's name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                </FormField>

                {/* Class */}
                <FormField
                  label="Class Interested In"
                  error={errors.interestedClass?.message}
                >
                  <div className="relative">
                    <FiBookOpen
                      className="
                    pointer-events-none absolute left-4 top-1/2 z-10
                    -translate-y-1/2 text-xl text-neutral/40
                  "
                    />

                    <select
                      className={`
                    select select-bordered h-14 w-full
                    rounded-xl bg-white pl-12
                    text-neutral outline-none
                    transition-all duration-300
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4 focus:ring-primary/10
                    ${
                      errors.interestedClass
                        ? "border-error focus:border-error focus:ring-error/10"
                        : "border-base-300"
                    }
                  `}
                      {...register("interestedClass", {
                        required: "Please select a class",
                      })}
                    >
                      <option value="">Select a class</option>

                      {classOptions.map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormField>

                {/* Success alert */}
                {isSubmitted && (
                  <div
                    role="alert"
                    className="
                  alert rounded-xl border border-success/30
                  bg-success/10 text-sm text-success
                  shadow-none
                "
                  >
                    <span>
                      Thank you! Your inquiry has been submitted successfully.
                      We&apos;ll contact you soon with discount details!
                    </span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                btn h-14 w-full rounded-xl
                border-none bg-linear-to-r
                from-[#005f50] to-[#00a06f]
                text-base font-black text-white
                shadow-[0_12px_30px_rgba(0,111,83,0.25)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_16px_35px_rgba(0,111,83,0.32)]
                disabled:pointer-events-none
                disabled:opacity-70
              "
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Discount Information
                      <FiArrowRight className="text-lg" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-neutral/50">
                  By submitting this form, you agree to be contacted by our
                  admissions team.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
};

export default Admission;
