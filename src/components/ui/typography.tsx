import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function TypographyH1({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1
      {...rest}
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    />
  );
}

export function TypographyH2({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2
      {...rest}
      className={cn("text-3xl font-semibold tracking-tight", className)}
    />
  );
}

export function TypographyH3({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h3
      {...rest}
      className={cn("text-2xl font-semibold tracking-tight", className)}
    />
  );
}

export function TypographyP({
  className,
  ...rest
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p
      {...rest}
      className={cn("text-2xl font-semibold tracking-tight", className)}
    />
  );
}
