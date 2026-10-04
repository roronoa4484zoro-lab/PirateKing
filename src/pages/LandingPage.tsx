import { PortraitContainer } from '../components/layout/PortraitContainer';
import { SwordEffect } from '../components/home/SwordEffect';
import { CursorGlow } from '../components/home/CursorGlow';
import { RequestActions } from '../components/home/RequestActions';

export default function LandingPage() {
  return (
    <PortraitContainer>
      <div className="relative w-full h-full bg-black overflow-hidden">
        {/* THE BACKGROUND IMAGE - Using a simplified div with z-index 0 */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/surpass your limits.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            width: '100%',
            height: '100%'
          }}
        />

        {/* Lighting and Animation Layers - z-index 10 */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CursorGlow />
          <SwordEffect />
        </div>

        {/* Content Overlay - z-index 20 */}
        <div className="relative z-20 flex flex-col items-center justify-end h-full pb-20 px-6 text-center">
          <h1 className="text-5xl font-black italic tracking-tighter text-white mb-4 drop-shadow-lg">
            SURPASS <br />
            <span className="text-orange-500">YOUR LIMITS</span>
          </h1>
          <p className="text-white/60 text-sm max-w-[250px] mb-10">
            Forged in fire, tempered by will.
            Send your requests and transcend.
          </p>
          <RequestActions />
        </div>
      </div>
    </PortraitContainer>
  );
}
