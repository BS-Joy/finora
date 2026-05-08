import type { FieldErrors, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import type { ReactNode } from "react";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  errors: FieldErrors<T>;
  name: Path<T>;
  children: ReactNode;
  className?: string;
}

const FormField = <T extends FieldValues>({
  label,
  errors,
  name,
  children,
  className,
}: InputFieldProps<T>) => {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {children}
      {errors.wallet && (
        <span className="text-destructive text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </Field>
  );
};

export default FormField;
