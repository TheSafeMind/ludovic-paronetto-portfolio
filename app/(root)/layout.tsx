import "@fontsource-variable/inter";
import "../globals.css";

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
