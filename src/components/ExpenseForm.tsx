
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { 
  ExpenseCategory, 
  IncomeCategory, 
  TransactionType,
  getExpenseCategories,
  getIncomeCategories,
  getCategoryDisplayName
} from '@/utils/expenseUtils';
import { useExpenseContext } from '@/context/ExpenseContext';
import CategoryIcon from './CategoryIcon';

const ExpenseForm: React.FC = () => {
  const { addTransaction } = useExpenseContext();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory | IncomeCategory>('food');
  const [note, setNote] = useState<string>('');

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setCategory(type === 'expense' ? 'food' : 'salary');
    setNote('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    addTransaction(
      parseFloat(amount),
      category,
      type,
      note
    );

    resetForm();
    setIsOpen(false);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Reset category when switching types
    setCategory(newType === 'expense' ? 'food' : 'salary');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed right-6 bottom-24 h-14 w-14 rounded-full shadow-lg animate-scale-in" 
          size="icon"
        >
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <Tabs 
              defaultValue="expense" 
              value={type} 
              onValueChange={(v) => handleTypeChange(v as TransactionType)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="expense">Expense</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
              </TabsList>
              <TabsContent value="expense" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {getExpenseCategories().map((cat) => (
                      <Button
                        key={cat}
                        type="button"
                        variant={category === cat ? "secondary" : "outline"}
                        className={`flex flex-col items-center justify-center py-3 h-auto ${
                          category === cat ? 'ring-2 ring-primary/50' : ''
                        }`}
                        onClick={() => setCategory(cat)}
                      >
                        <CategoryIcon category={cat} className="mb-2" />
                        <span className="text-xs">{getCategoryDisplayName(cat)}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="income" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {getIncomeCategories().map((cat) => (
                      <Button
                        key={cat}
                        type="button"
                        variant={category === cat ? "secondary" : "outline"}
                        className={`flex flex-col items-center justify-center py-3 h-auto ${
                          category === cat ? 'ring-2 ring-primary/50' : ''
                        }`}
                        onClick={() => setCategory(cat)}
                      >
                        <CategoryIcon category={cat} className="mb-2" />
                        <span className="text-xs">{getCategoryDisplayName(cat)}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-medium">
                Note (Optional)
              </Label>
              <Textarea
                id="note"
                placeholder="Add a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;
