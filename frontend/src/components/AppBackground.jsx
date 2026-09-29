const AppBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base-100">
      {/* Soft gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5" />

      {/* Color blobs — bigger and stronger so they actually read as design, not a smudge */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-1/4 -right-40 w-[32rem] h-[32rem] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
};

export default AppBackground;