import type { FieldErrors, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import type { ReactNode } from "react";

interface InputFieldProps<T extends FieldValues> {
  label?: string;
  errors: FieldErrors<T>;
  name: Path<T>;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  isOptional?: boolean;
}

const FormField = <T extends FieldValues>({
  label,
  errors,
  name,
  children,
  className,
  labelClassName,
  isOptional,
}: InputFieldProps<T>) => {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={name} className={labelClassName}>
        {label} {isOptional && <span className="font-normal">(optional)</span>}
      </FieldLabel>
      {children}
      {errors && (
        <span className="text-destructive text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </Field>
  );
};

export default FormField;
