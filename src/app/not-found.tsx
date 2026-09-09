import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#f4efe6",
          color: "#1b2430",
          padding: "2.5rem",
          fontFamily: "system-ui",
        }}
      >
        <p>This frequency is empty.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: "1rem" }}>
          Station Eight Labs
        </Link>
      </body>
    </html>
  );
}
