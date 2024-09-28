import Image from "next/image";
import { Control } from "react-hook-form"; // Fixed Control import with Controller
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export enum CustomFormFieldType {
  INPUT_FILE = "input-file",
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomFormFieldProps {
  control: Control<any>; // Updated Control with proper typing
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
  disabled?: boolean;
  inputFileType?: string;
  inputType?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: CustomFormFieldType;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  switch (props.fieldType) {
    case CustomFormFieldType.INPUT_FILE:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              width={30}
              height={30}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              accept={props.inputFileType}
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
              className=" text-white" 
            />
          </FormControl>
        </div>
      );

    case CustomFormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              width={30}
              height={30}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              type={props.inputType}
              {...field}
              className="shad-input"
            />
          </FormControl>
        </div>
      );

    case CustomFormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
          />
        </FormControl>
      );

    case CustomFormFieldType.CHECKBOX:
      return (
        <FormControl>
          <Checkbox
            id={props.name}
            checked={field.value}
            onChange={field.onChange}
          />
          <label htmlFor={props.name}>{props.label}</label>
        </FormControl>
      );

    case CustomFormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content text-white">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case CustomFormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== CustomFormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
