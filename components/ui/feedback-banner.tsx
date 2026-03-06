type FeedbackBannerProps = {
  status?: string;
  message?: string;
};

export function FeedbackBanner({ status, message }: FeedbackBannerProps) {
  if (!message) {
    return null;
  }

  const isSuccess = status === "success";
  const styles = isSuccess
    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
    : "border-red-300 bg-red-50 text-red-800";

  return <div className={`rounded-md border px-3 py-2 text-sm ${styles}`}>{message}</div>;
}
