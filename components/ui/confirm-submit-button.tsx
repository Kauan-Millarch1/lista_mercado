"use client";

type ConfirmSubmitButtonProps = {
  confirmText: string;
  label: string;
  className: string;
  disabled?: boolean;
};

export function ConfirmSubmitButton({ confirmText, label, className, disabled }: ConfirmSubmitButtonProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(confirmText);
    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <button className={className} type="submit" disabled={disabled} onClick={handleClick}>
      {label}
    </button>
  );
}
