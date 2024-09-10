import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function TypographyH1({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h1 {...rest} className={cn("text-3xl font-medium", className)} />;
}

export function TypographyH2({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h2 {...rest} className={cn("text-2xl font-medium", className)} />;
}

export function TypographyH3({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h3 {...rest} className={cn("text-xl font-medium", className)} />;
}

export function TypographyH4({
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h3 {...rest} className={cn("text-lg", className)} />;
}

export function TypographyP({
  className,
  ...rest
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return <p {...rest} className={cn("leading-relaxed", className)} />;
}

export function TypographyError({
  className,
  ...rest
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p
      {...rest}
      className={cn("text-destructive leading-relaxed text-sm", className)}
    />
  );
}
