import { Award, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import aduLogo from "@/assets/adu-logo.png";

interface CertificateTemplateProps {
  studentName: string;
  programName: string;
  certificateNumber: string;
  verificationCode: string;
  issuedAt: string;
  onPrint?: () => void;
}

const CertificateTemplate = ({
  studentName,
  programName,
  certificateNumber,
  verificationCode,
  issuedAt,
  onPrint,
}: CertificateTemplateProps) => {
  const handlePrint = () => {
    if (onPrint) { onPrint(); return; }
    window.print();
  };

  const issuedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const verifyUrl = `https://adu.africa/verify/${verificationCode}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(verifyUrl)}&bgcolor=0c0b06&color=DAA520&margin=4`;

  // Vertical golden rain streaks – many thin columns of particles falling from top
  const rainStreaks = Array.from({ length: 28 }, (_, i) => {
    const x = 2 + i * 3.5;
    const heights = [8, 18, 5, 24, 14, 7, 20, 11, 3, 28, 16, 9, 22, 6, 15, 25, 12, 4, 19, 10, 27, 13, 8, 21, 17, 5, 23, 9];
    const h = heights[i % heights.length];
    const opacity = 0.18 + (i % 5) * 0.07;
    return `linear-gradient(180deg, transparent ${100 - h - 2}%, rgba(218,165,32,${opacity}) ${100 - h}%, rgba(218,165,32,${opacity + 0.15}) ${100 - h / 3}%, transparent 100%) ${x}% 0 / 1.5px 100% no-repeat`;
  }).join(",\n");

  // Extra scattered bright droplets
  const drops = [
    "radial-gradient(1px 4px at 5% 20%,rgba(218,165,32,0.6) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 12% 55%,rgba(218,165,32,0.5) 0%,transparent 100%)",
    "radial-gradient(1px 5px at 22% 35%,rgba(218,165,32,0.45) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 33% 70%,rgba(218,165,32,0.4) 0%,transparent 100%)",
    "radial-gradient(1px 4px at 47% 15%,rgba(218,165,32,0.55) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 58% 80%,rgba(218,165,32,0.4) 0%,transparent 100%)",
    "radial-gradient(1px 5px at 67% 45%,rgba(218,165,32,0.5) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 78% 25%,rgba(218,165,32,0.45) 0%,transparent 100%)",
    "radial-gradient(1px 4px at 88% 60%,rgba(218,165,32,0.5) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 94% 40%,rgba(218,165,32,0.4) 0%,transparent 100%)",
    "radial-gradient(1.5px 2px at 16% 88%,rgba(218,165,32,0.35) 0%,transparent 100%)",
    "radial-gradient(1px 3px at 42% 92%,rgba(218,165,32,0.3) 0%,transparent 100%)",
    "radial-gradient(1.5px 2px at 72% 85%,rgba(218,165,32,0.35) 0%,transparent 100%)",
  ].join(",\n");

  return (
    <div>
      {/* Print button */}
      <div className="flex justify-center gap-3 mb-6 print:hidden">
        <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
          <Award className="w-4 h-4 mr-2" />
          Print / Download Certificate
        </Button>
      </div>

      {/* Certificate canvas */}
      <div
        id="adu-certificate"
        style={{
          width: "1040px",
          minHeight: "680px",
          maxWidth: "100%",
          margin: "0 auto",
          background: "#0c0b06",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Georgia', serif",
          boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Vertical rain streaks layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: rainStreaks,
            pointerEvents: "none",
          }}
        />

        {/* Extra bright droplets layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: drops,
            backgroundSize: "100% 100%",
            pointerEvents: "none",
          }}
        />

        {/* Dark oval smoke/halo behind logo */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "340px",
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Side edge darkening */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.45) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1, padding: "38px 64px 0" }}>

          {/* Logo + institution name */}
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <img
              src={aduLogo}
              alt="ADU Logo"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 10px",
                filter: "drop-shadow(0 0 14px rgba(218,165,32,0.55)) drop-shadow(0 0 4px rgba(255,255,255,0.2))",
              }}
            />
            <div
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "5px",
                fontFamily: "'Arial', sans-serif",
                lineHeight: 1.1,
              }}
            >
              AFRICAN DIGITAL
            </div>
            <div
              style={{
                color: "#DAA520",
                fontSize: "19px",
                fontWeight: 700,
                letterSpacing: "7px",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              UNIVERSITY
            </div>
          </div>

          {/* Certificate title */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                letterSpacing: "2px",
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                background: "linear-gradient(180deg, #FFD700 0%, #DAA520 40%, #B8860B 70%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}
            >
              CERTIFICATE OF COMPLETION
            </div>
          </div>

          {/* Awarded to */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span
              style={{
                color: "#cccccc",
                fontSize: "16px",
                fontStyle: "italic",
                letterSpacing: "0.5px",
              }}
            >
              Proudly awarded to
            </span>
          </div>

          {/* Student name */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: "42px",
                fontWeight: 700,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "0.5px",
                textShadow: "0 2px 10px rgba(255,255,255,0.18)",
              }}
            >
              {studentName}
            </span>
          </div>

          {/* Program */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ color: "#e0e0e0", fontSize: "16px" }}>
              for completing the{" "}
              <strong style={{ color: "#ffffff" }}>{programName}</strong>
            </span>
          </div>

          {/* Bottom row: badge | signature | QR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* 3-Year Bootcamp Badge with laurel wreath */}
            <div style={{ width: "160px", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "118px", height: "118px" }}>
                {/* Outer laurel wreath ring using repeating conic gradient to fake leaves */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(#8B6914 0deg, #DAA520 10deg, #8B6914 20deg, #DAA520 30deg, #8B6914 40deg, #DAA520 50deg, #8B6914 60deg, #DAA520 70deg, #8B6914 80deg, #DAA520 90deg, #8B6914 100deg, #DAA520 110deg, #8B6914 120deg, #DAA520 130deg, #8B6914 140deg, #DAA520 150deg, #8B6914 160deg, #DAA520 170deg, #8B6914 180deg, #DAA520 190deg, #8B6914 200deg, #DAA520 210deg, #8B6914 220deg, #DAA520 230deg, #8B6914 240deg, #DAA520 250deg, #8B6914 260deg, #DAA520 270deg, #8B6914 280deg, #DAA520 290deg, #8B6914 300deg, #DAA520 310deg, #8B6914 320deg, #DAA520 330deg, #8B6914 340deg, #DAA520 350deg, #8B6914 360deg)",
                    boxShadow: "0 0 18px rgba(218,165,32,0.5)",
                  }}
                />
                {/* Mask to show only the wreath ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: "9px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #4a0808 0%, #2a0404 60%, #1a0202 100%)",
                    boxShadow: "inset 0 0 18px rgba(0,0,0,0.7)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#FFD700",
                      fontSize: "16px",
                      fontWeight: 900,
                      letterSpacing: "1px",
                      fontFamily: "'Arial', sans-serif",
                      lineHeight: 1.15,
                      textAlign: "center",
                    }}
                  >
                    <div>3-YEAR</div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#DAA520",
                        letterSpacing: "2.5px",
                        marginTop: "2px",
                      }}
                    >
                      BOOTCAMP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature + title */}
            <div style={{ textAlign: "center", flex: 1 }}>
              {/* SVG handwritten-style signature – works without any external fonts */}
              <svg
                viewBox="0 0 320 60"
                width="320"
                height="60"
                style={{ display: "block", margin: "0 auto 6px", overflow: "visible" }}
                aria-label="Prof. Muhummed Okech signature"
              >
                <path
                  d="
                    M 10,45
                    C 18,20 28,18 38,30
                    C 44,38 48,25 56,22
                    C 62,18 66,28 74,22
                    C 80,18 84,38 90,35
                    C 94,32 96,28 102,25
                    C 110,20 116,30 124,26
                    C 130,22 134,18 142,20
                    C 150,22 152,32 160,28
                    C 168,24 172,20 180,22
                    C 188,24 190,35 198,30
                    C 206,25 208,20 216,22
                    C 224,24 226,36 234,32
                    C 240,29 244,24 252,26
                    C 260,28 264,38 272,34
                    C 278,30 282,22 290,24
                    C 298,26 302,42 310,40
                  "
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.92"
                />
                <path
                  d="M 14,50 C 40,42 80,44 120,46 C 160,48 200,44 250,46 C 270,47 290,44 308,42"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
              <div
                style={{
                  width: "220px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #DAA520 20%, #FFD700 50%, #DAA520 80%, transparent)",
                  margin: "4px auto 8px",
                }}
              />
              <div
                style={{
                  color: "#DAA520",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  fontFamily: "'Arial', sans-serif",
                }}
              >
                Vice Chancellor
              </div>
              <div style={{ color: "#888", fontSize: "12px", marginTop: "6px" }}>
                Issued: {issuedDate}
              </div>
              <div style={{ color: "#666", fontSize: "10px", marginTop: "2px" }}>
                Certificate No: {certificateNumber}
              </div>
            </div>

            {/* QR code */}
            <div style={{ width: "160px", textAlign: "center" }}>
              <img
                src={qrUrl}
                alt="Verification QR Code"
                width={120}
                height={120}
                style={{
                  border: "2px solid #DAA520",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto",
                  background: "#0c0b06",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div style={{ color: "#888", fontSize: "9px", marginTop: "4px", letterSpacing: "1px" }}>
                Scan to verify
              </div>
            </div>
          </div>
        </div>

        {/* Contact footer */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(0,0,0,0.6)",
            padding: "11px 60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "44px",
            marginTop: "20px",
          }}
        >
          {[
            { Icon: Globe, text: "www.adu.africa" },
            { Icon: Mail, text: "info@adu-africa.com" },
            { Icon: Phone, text: "+254 115 036553" },
          ].map(({ Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Icon style={{ width: "15px", height: "15px", color: "#DAA520" }} />
              <span style={{ color: "#cccccc", fontSize: "13px" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Pan-African colour stripe: green | gold (wide) | red */}
        <div style={{ display: "flex", height: "12px" }}>
          <div style={{ flex: 1, background: "#006400" }} />
          <div
            style={{
              flex: 3,
              background:
                "linear-gradient(90deg, #8B6914 0%, #DAA520 20%, #FFD700 50%, #DAA520 80%, #8B6914 100%)",
            }}
          />
          <div style={{ flex: 1, background: "#8B0000" }} />
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #adu-certificate, #adu-certificate * { visibility: visible !important; }
          #adu-certificate {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            margin: 0 !important; box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateTemplate;


interface CertificateTemplateProps {
  studentName: string;
  programName: string;
  certificateNumber: string;
  verificationCode: string;
  issuedAt: string;
  onPrint?: () => void;
}

const CertificateTemplate = ({
  studentName,
  programName,
  certificateNumber,
  verificationCode,
  issuedAt,
  onPrint,
}: CertificateTemplateProps) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }
    window.print();
  };

  const issuedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const verifyUrl = `https://adu.africa/verify/${verificationCode}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(verifyUrl)}&bgcolor=111108&color=ffffff&margin=4`;

  return (
    <div>
      {/* Print button – hidden when printing */}
      <div className="flex justify-center gap-3 mb-6 print:hidden">
        <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
          <Award className="w-4 h-4 mr-2" />
          Print / Download Certificate
        </Button>
      </div>

      {/* Certificate canvas */}
      <div
        ref={certRef}
        id="adu-certificate"
        style={{
          width: "1040px",
          minHeight: "720px",
          maxWidth: "100%",
          margin: "0 auto",
          background: "#0c0b06",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Georgia', serif",
          boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Particle dot background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1.5px 3px at 8% 5%, rgba(218,165,32,0.55) 0%, transparent 100%),
              radial-gradient(1px 2px at 18% 12%, rgba(218,165,32,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 30% 8%, rgba(218,165,32,0.45) 0%, transparent 100%),
              radial-gradient(1px 3px at 45% 3%, rgba(218,165,32,0.4) 0%, transparent 100%),
              radial-gradient(2px 2px at 60% 9%, rgba(218,165,32,0.5) 0%, transparent 100%),
              radial-gradient(1px 3px at 75% 5%, rgba(218,165,32,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 88% 11%, rgba(218,165,32,0.45) 0%, transparent 100%),
              radial-gradient(1px 2px at 95% 7%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 3px at 3% 22%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 14% 30%, rgba(218,165,32,0.4) 0%, transparent 100%),
              radial-gradient(1px 3px at 25% 25%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(2px 2px at 38% 35%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1px 3px at 52% 28%, rgba(218,165,32,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 65% 33%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 2px at 80% 22%, rgba(218,165,32,0.4) 0%, transparent 100%),
              radial-gradient(2px 3px at 92% 29%, rgba(218,165,32,0.35) 0%, transparent 100%),
              radial-gradient(1px 2px at 7% 48%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1.5px 3px at 20% 52%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 2px at 35% 45%, rgba(218,165,32,0.2) 0%, transparent 100%),
              radial-gradient(2px 2px at 50% 55%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 3px at 68% 50%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 82% 47%, rgba(218,165,32,0.35) 0%, transparent 100%),
              radial-gradient(1px 3px at 97% 53%, rgba(218,165,32,0.28) 0%, transparent 100%),
              radial-gradient(1px 2px at 11% 68%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(2px 3px at 28% 72%, rgba(218,165,32,0.2) 0%, transparent 100%),
              radial-gradient(1px 2px at 42% 65%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 58% 70%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 3px at 73% 66%, rgba(218,165,32,0.2) 0%, transparent 100%),
              radial-gradient(2px 2px at 87% 74%, rgba(218,165,32,0.28) 0%, transparent 100%),
              radial-gradient(1px 2px at 4% 85%, rgba(218,165,32,0.22) 0%, transparent 100%),
              radial-gradient(1.5px 3px at 22% 88%, rgba(218,165,32,0.3) 0%, transparent 100%),
              radial-gradient(1px 2px at 40% 82%, rgba(218,165,32,0.2) 0%, transparent 100%),
              radial-gradient(2px 2px at 55% 90%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1px 3px at 70% 85%, rgba(218,165,32,0.18) 0%, transparent 100%),
              radial-gradient(1.5px 2px at 85% 88%, rgba(218,165,32,0.25) 0%, transparent 100%),
              radial-gradient(1px 2px at 96% 82%, rgba(218,165,32,0.3) 0%, transparent 100%)
            `,
            backgroundSize: "100% 100%",
          }}
        />

        {/* Subtle dark center vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.55) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1, padding: "36px 60px 0" }}>

          {/* Logo + Institution name */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <img
              src={aduLogo}
              alt="ADU Logo"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                margin: "0 auto 10px",
                filter: "drop-shadow(0 0 12px rgba(218,165,32,0.5))",
              }}
            />
            <div
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "4px",
                fontFamily: "'Arial', sans-serif",
                lineHeight: 1.1,
              }}
            >
              AFRICAN DIGITAL
            </div>
            <div
              style={{
                color: "#DAA520",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "6px",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              UNIVERSITY
            </div>
          </div>

          {/* Certificate title */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "42px",
                fontWeight: 900,
                letterSpacing: "3px",
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                background: "linear-gradient(180deg, #FFD700 0%, #B8860B 50%, #DAA520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
                textShadow: "none",
              }}
            >
              CERTIFICATE OF COMPLETION
            </div>
          </div>

          {/* Awarded to */}
          <div style={{ textAlign: "center", marginBottom: "6px" }}>
            <span style={{ color: "#cccccc", fontSize: "16px", fontStyle: "italic" }}>
              Proudly awarded to
            </span>
          </div>

          {/* Student name */}
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: "40px",
                fontWeight: 700,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "1px",
                textShadow: "0 2px 8px rgba(255,255,255,0.15)",
              }}
            >
              {studentName}
            </span>
          </div>

          {/* Program */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span style={{ color: "#e0e0e0", fontSize: "16px" }}>
              for completing the{" "}
              <strong style={{ color: "#ffffff" }}>{programName}</strong>
            </span>
          </div>

          {/* Bottom section: badge | signature | QR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "0px",
            }}
          >
            {/* 3-Year Bootcamp Badge */}
            <div style={{ textAlign: "center", width: "160px" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #4a0a0a 0%, #1a0303 100%)",
                  border: "3px solid #DAA520",
                  boxShadow: "0 0 20px rgba(218,165,32,0.4), inset 0 0 15px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                {/* Laurel wreath approximation */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    border: "3px solid transparent",
                    background:
                      "linear-gradient(#0c0b06,#0c0b06) padding-box, linear-gradient(135deg,#DAA520,#8B6914,#DAA520,#8B6914,#DAA520) border-box",
                  }}
                />
                <div
                  style={{
                    color: "#FFD700",
                    fontSize: "14px",
                    fontWeight: 900,
                    letterSpacing: "1px",
                    fontFamily: "'Arial', sans-serif",
                    lineHeight: 1.2,
                    textAlign: "center",
                    zIndex: 1,
                  }}
                >
                  <div style={{ fontSize: "18px" }}>3-YEAR</div>
                  <div style={{ fontSize: "11px", color: "#cccccc", letterSpacing: "2px" }}>BOOTCAMP</div>
                </div>
              </div>
            </div>

            {/* Signature + issued date */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "26px",
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  letterSpacing: "1px",
                  marginBottom: "4px",
                }}
              >
                Prof. Muhummed Okech
              </div>
              <div
                style={{
                  width: "200px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #DAA520, transparent)",
                  margin: "6px auto",
                }}
              />
              <div style={{ color: "#DAA520", fontSize: "14px", fontWeight: 600, letterSpacing: "2px" }}>
                Vice Chancellor
              </div>
              <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                Issued: {issuedDate}
              </div>
              <div style={{ color: "#666", fontSize: "10px", marginTop: "2px" }}>
                Certificate No: {certificateNumber}
              </div>
            </div>

            {/* QR code */}
            <div style={{ textAlign: "center", width: "160px" }}>
              <img
                src={qrUrl}
                alt="Verification QR Code"
                width={110}
                height={110}
                style={{
                  border: "2px solid #DAA520",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div style={{ color: "#888", fontSize: "9px", marginTop: "4px" }}>
                Scan to verify
              </div>
            </div>
          </div>
        </div>

        {/* Contact footer bar */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(0,0,0,0.5)",
            padding: "10px 60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            marginTop: "18px",
          }}
        >
          {[
            { Icon: Globe, text: "www.adu.africa" },
            { Icon: Mail, text: "info@adu-africa.com" },
            { Icon: Phone, text: "+254 115 036553" },
          ].map(({ Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Icon style={{ width: "14px", height: "14px", color: "#DAA520" }} />
              <span style={{ color: "#cccccc", fontSize: "13px" }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom decorative stripe */}
        <div style={{ display: "flex", height: "10px" }}>
          <div style={{ flex: 1, background: "#006400" }} />
          <div style={{ flex: 2, background: "#DAA520" }} />
          <div style={{ flex: 1, background: "#8B0000" }} />
        </div>
      </div>

      {/* Print styles injected into document head */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #adu-certificate, #adu-certificate * { visibility: visible !important; }
          #adu-certificate {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateTemplate;
