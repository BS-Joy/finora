import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

const IncomeFilters = () => {
  const categories = ["Salary", "Freelance", "Business", "Investment", "Gift"];

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

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search income..." className="pl-9" />
        </div>

        <Select defaultValue="latest">
          <SelectTrigger className="w-[150px]">
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
        <Button variant="outline" size="sm" className="rounded-full bg-primary/10 border-primary/20 text-primary">
          All Categories
        </Button>
        {categories.map((cat) => (
          <Button key={cat} variant="outline" size="sm" className="rounded-full">
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IncomeFilters;
