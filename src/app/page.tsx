import { WallCalendar } from "@/components/WallCalendar";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-start justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8edf2 0%, #d6dce4 100%)" }}
    >
      {/* Wall texture ambient light — top-centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.55) 0%, transparent 70%)",
        }}
      />
      {/* Soft accent blobs */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-sky-300/10 blur-[120px] -top-40 -right-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-slate-400/10 blur-[100px] -bottom-40 -left-40 pointer-events-none" />

      {/* Calendar — centred, padded top for binding clearance */}
      <div className="w-full max-w-5xl relative z-10 mt-10 mb-10">
        <WallCalendar />
      </div>
    </main>
  );
}
