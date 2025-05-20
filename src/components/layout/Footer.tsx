export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} RifaFacil. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
