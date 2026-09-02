import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Trash2, Trash2Icon } from "lucide-react";
import Spinner from "./Spinner";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  action?: () => void;
  loading?: boolean;
}

const ConfirmationDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account from our servers.",
  cancelText = "Cancel",
  confirmText = "Delete",
  action,
  loading = false,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-8 w-8 flex justify-center items-center rounded-md cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10">
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={action} variant="destructive">
            {loading ? <Spinner size="sm" /> : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
