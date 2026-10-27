
export default function ToggleSwitch({ isValid, setIsValid }: { isValid: boolean; setIsValid: (isValid: boolean) => void }) {
  // Switch ပွင့်နေလား ပိတ်ထားလား မှတ်သားရန် State

  return (
    <button
      onClick={() => setIsValid(!isValid)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
        isValid ? 'bg-blue-600' : 'bg-slate-700'
      }`}
    >
      {/* ရွှေ့လျားမည့် အလုံးလေး (Circle) */}
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
          isValid ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}