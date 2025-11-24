"use client";

type ErrorProps = {
  error: {
    message: string;
  };
};

export default function error({ error }: ErrorProps) {
  return (
    <div className="flex justify-center items-center h-screen text-3xl">
      <h1 className="text-sm lg:text-lg">{error.message}</h1>
    </div>
  );
}
