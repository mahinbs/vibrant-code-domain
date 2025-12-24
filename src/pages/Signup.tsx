import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import SignaturePad from "../components/SignaturePad";
import { Link } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface SignUpFormData {
  name: string;
  email: string;
  whatsapp: string;
  idProof: FileList;
  paymentId: string;
  paymentDate: string;
  signature: string;
  declaration: boolean;
}

const SignUpForm = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    if (loading) return;
    setLoading(true);
    if (!data.signature) {
      alert("Please provide a signature");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    const emailBody = `Name: ${data.name}\n\nEmail: ${data.email}\n\nPhone: ${data.whatsapp}\n\npaymentId: ${data.paymentId}\n\npaymentDate:\n${data.paymentDate}`;

    const signatureFile = dataURItoFile(data.signature, "signature.png");

    if (file) {
      formData.append("file", file);
    }
    if (signatureFile) {
      formData.append("file", signatureFile);
    }
    formData.append("body", emailBody);
    try {
      const response = await axios.post(
        "https://boostmysite-attachment-email-zeta.vercel.app/api/send-signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Form submitted successfully!");
        reset();
        setFile(null);
        setImage(null);
        setLoading(false);
        clear();
        handleRemoveFile();
      } else {
        alert("Form submission failed!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
      setLoading(false);
    }
  };

  const dataURItoFile = (dataURI: string, filename: string): File => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ab], filename, { type: mimeString });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors]);

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setValue("signature", "");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setImage(null);
  };

  return (
    <>
      {" "}
      <Header />
      <div className="dark min-h-screen bg-background pt-[8rem] pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                SIGN UP
              </h1>
              <p className="text-muted-foreground">
                Complete the form below to get started
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6 shadow-lg shadow-cyan-500/10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-cyan-400/30 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    placeholder="Enter your full name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-sm mt-1 block">
                      This field is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-white text-lg mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-cyan-400/30 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm mt-1 block">
                      Please enter a valid email
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-white text-lg mb-2">
                    WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-cyan-400/30 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    placeholder="+1234567890"
                    {...register("whatsapp", {
                      required: true,
                      pattern: /^\+?[1-9]\d{1,14}$/,
                    })}
                  />
                  {errors.whatsapp && (
                    <span className="text-red-400 text-sm mt-1 block">
                      Please enter a valid WhatsApp number (e.g., +1234567890)
                    </span>
                  )}
                </div>

                <FileUpload
                  register={register}
                  name="idProof"
                  label="ID Proof"
                  errors={errors}
                  file={file}
                  setFile={setFile}
                  handleRemoveFile={handleRemoveFile}
                  setImage={setImage}
                  image={image}
                />

                <div>
                  <label className="block text-white text-lg mb-2">
                    Payment ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-cyan-400/30 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    placeholder="Enter your payment ID"
                    {...register("paymentId", { required: true })}
                  />
                  {errors.paymentId && (
                    <span className="text-red-400 text-sm mt-1 block">
                      Payment ID is required. Please enter a valid Payment ID to
                      proceed.
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-white text-lg mb-2">
                    Payment Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-lg bg-secondary/50 border border-cyan-400/30 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    {...register("paymentDate", { required: true })}
                  />
                  {errors.paymentDate && (
                    <span className="text-red-400 text-sm mt-1 block">
                      Payment Date is required. Please select a valid date.
                    </span>
                  )}
                </div>

                <SignaturePad
                  register={register}
                  setValue={setValue}
                  clear={clear}
                  sigCanvas={sigCanvas}
                />

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1 accent-cyan-400"
                    {...register("declaration", { required: true })}
                  />
                  <label className="text-white text-sm">
                    I confirm that I have read and agree to the{" "}
                    <Link
                      to={"/terms-and-conditions"}
                      className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    of the website.
                  </label>
                </div>
                {errors.declaration && (
                  <span className="text-red-400 text-sm mt-1 block">
                    You must agree to the Terms and Conditions to proceed.
                  </span>
                )}

                <div className="text-center pt-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`${
                      loading
                        ? `bg-secondary/50 cursor-not-allowed`
                        : `bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600`
                    } text-white px-8 py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/20 font-semibold`}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpForm;
