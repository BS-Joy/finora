import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type userSchema = {
  id: number;
  src: string;
  fallback: string;
  name: string;
  mail: string;
};

const users: userSchema[] = [
  {
    id: 1,
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
    fallback: "PG",
    name: "Phillip George",
    mail: "phillip12@gmail.com",
  },
  {
    id: 2,
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png",
    fallback: "JD",
    name: "Jaylon Donin",
    mail: "jaylo-don@yahoo.com",
  },
  {
    id: 3,
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
    fallback: "TC",
    name: "Tiana Curtis",
    mail: "Tiana_curtis@gmail.com",
  },
];

const WalletSelector = ({ customClass }: { customClass?: string }) => {
  const [selectUser, setSelectUser] = useState<userSchema>(users[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "bg-input flex items-center gap-2 justify-between rounded-md px-3 py-1 cursor-pointer focus-visible:outline-0",
          customClass,
        )}
      >
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={selectUser.src} alt={selectUser.name} />
            <AvatarFallback className="text-xs">
              {selectUser.fallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 text-start leading-none">
            <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
              {selectUser.name}
            </span>
            {/* <span className="text-muted-foreground max-w-[20ch] truncate text-xs">
            {selectUser.mail}
          </span> */}
          </div>
        </div>
        <ChevronsUpDownIcon color="#5f6e5e" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-66">
        <DropdownMenuLabel>Task Assignment</DropdownMenuLabel>
        {users.map((user) => (
          <DropdownMenuItem key={user.id} onClick={() => setSelectUser(user)}>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.src} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 text-start leading-none">
                <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                  {user.name}
                </span>
                <span className="text-muted-foreground max-w-[20ch] truncate text-xs">
                  {user.mail}
                </span>
              </div>
            </div>
            {selectUser.id === user.id && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletSelector;
