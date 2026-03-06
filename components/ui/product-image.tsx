import Image from "next/image";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  size?: "sm" | "md";
};

const sizeClass = {
  sm: "h-14 w-14",
  md: "h-36 w-full"
} as const;

export function ProductImage({ src, alt, size = "md" }: ProductImageProps) {
  const safeSrc = src && src.trim().length > 0 ? src : "/products/placeholders/product-default.svg";

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-white/70 to-background ${sizeClass[size]}`}>
      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes={size === "sm" ? "56px" : "(max-width: 768px) 100vw, 50vw"}
        className="h-full w-full object-contain p-2"
      />
    </div>
  );
}
