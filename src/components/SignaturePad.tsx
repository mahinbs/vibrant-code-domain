/* eslint-disable */
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  clear: () => void;
  sigCanvas: React.RefObject<SignatureCanvas>;
}

const SignaturePad = ({ register, setValue, clear, sigCanvas }: SignaturePadProps) => {
  const save = () => {
    if (sigCanvas.current) {
      setValue("signature", sigCanvas.current.toDataURL());
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-white text-lg">
          Signature <span className="text-red-400">*</span>
        </label>
        <button
          type="button"
          onClick={clear}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="border border-cyan-400/30 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-40 border border-cyan-400/20 rounded cursor-crosshair bg-white",
          }}
          penColor="black"
          dotSize={0.1}
          onEnd={save}
          velocityFilterWeight={0.1}
          minWidth={0.5}
          maxWidth={1.5}
        />
      </div>
    </div>
  );
};

export default SignaturePad;

