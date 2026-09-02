import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, CalendarDays, ListFilter } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const IncomeFilters = () => {
  const categories = ["Salary", "Freelance", "Business", "Investment", "Gift"];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <CalendarDays className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem>All Time</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last Month</DropdownMenuItem>
              <DropdownMenuItem>Custom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ListFilter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem>Sort: Latest</DropdownMenuItem>
              <DropdownMenuItem>Sort: Oldest</DropdownMenuItem>
              <DropdownMenuItem>Amount: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Amount: Low to High</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Horizontal scrollable category chips - Mobile */}
        <div className="flex gap-2 overflow-x-auto pt-2 px-1 scrollbar-hide">
          <Button
            variant={
              selectedCategory === "All Categories" ? "default" : "outline"
            }
            size="sm"
            className={cn(`rounded-full whitespace-nowrap shrink-0`, {
              "bg-primary text-accent hover:cursor-not-allowed dark:bg-accent dark:text-primary":
                selectedCategory === "All Categories",
            })}
            onClick={() => setSelectedCategory("All Categories")}
          >
            All Categories
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className={cn(`rounded-full whitespace-nowrap shrink-0`, {
                "bg-primary text-accent hover:cursor-not-allowed dark:bg-accent dark:text-primary":
                  selectedCategory === cat,
              })}
              onClick={() => {
                console.log(cat);
                setSelectedCategory(cat);
              }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search income..." className="pl-9" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex bg-card border rounded-lg p-1">
          <Button variant="ghost" size="sm" className="bg-primary text-white">
            All Time
          </Button>
          <Button variant="ghost" size="sm">
            This Month
          </Button>
          <Button variant="ghost" size="sm">
            Last Month
          </Button>
          <Button variant="ghost" size="sm">
            Custom
          </Button>
        </div>

        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search income..." className="pl-9" />
        </div>

        <Select defaultValue="latest">
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Sort: Latest</SelectItem>
            <SelectItem value="oldest">Sort: Oldest</SelectItem>
            <SelectItem value="amount-high">Amount: High to Low</SelectItem>
            <SelectItem value="amount-low">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Income
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={
            selectedCategory === "All Categories" ? "default" : "outline"
          }
          size="sm"
          className={cn(`rounded-full whitespace-nowrap shrink-0`, {
            "bg-primary text-accent hover:cursor-not-allowed dark:bg-accent dark:text-primary":
              selectedCategory === "All Categories",
          })}
          onClick={() => setSelectedCategory("All Categories")}
        >
          All Categories
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            className={cn(`rounded-full whitespace-nowrap shrink-0`, {
              "bg-primary text-accent hover:cursor-not-allowed dark:bg-accent dark:text-primary":
                selectedCategory === cat,
            })}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IncomeFilters;
