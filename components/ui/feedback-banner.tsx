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
    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
    : "border-red-500/25 bg-red-500/10 text-red-800 dark:text-red-300";

  return <div className={`rounded-xl border px-3 py-2 text-sm shadow-sm ${styles}`}>{message}</div>;
}
