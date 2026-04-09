export default function Logo({ className = "h-20 w-20" }) {
  return (
    <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M448 160H64C46.33 160 32 174.33 32 192V224C49.67 224 64 238.33 64 256C64 273.67 49.67 288 32 288V320C32 337.67 46.33 352 64 352H448C465.67 352 480 337.67 480 320V288C462.33 288 448 273.67 448 256C448 238.33 462.33 224 480 224V192C480 174.33 465.67 160 448 160Z" fill="#3B82F6" />
      <path d="M80 192H432V320H80V192Z" stroke="white" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="200" cy="245" r="30" fill="white" />
      <path d="M160 320C160 290 180 275 200 275C220 275 240 290 240 320H160Z" fill="#22C55E" />
      <circle cx="312" cy="245" r="30" fill="white" />
      <path d="M272 320C272 290 292 275 312 275C332 275 352 290 352 320H272Z" fill="#22C55E" />
      <circle cx="256" cy="225" r="35" fill="white" />
      <path d="M210 320C210 280 230 260 256 260C282 260 302 280 302 320H210Z" fill="white" />
    </svg>
  );
}