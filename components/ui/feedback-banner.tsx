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
    ? "border-emerald-400/35 bg-emerald-400/12 text-emerald-100"
    : "border-red-400/35 bg-red-400/12 text-red-100";

  return <div className={`rounded-xl border px-3 py-2 text-sm shadow-sm ${styles}`}>{message}</div>;
}
