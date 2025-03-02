
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useExpenseContext } from '@/context/ExpenseContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
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
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { BrainCircuit, Download, Languages, Wallet } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { budget, setBudget } = useExpenseContext();
  const [localBudget, setLocalBudget] = useState(budget.toString());
  const [enableVoiceInput, setEnableVoiceInput] = useState(false);
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  
  const handleSaveBudget = () => {
    const newBudget = parseFloat(localBudget);
    if (!isNaN(newBudget) && newBudget >= 0) {
      setBudget(newBudget);
      toast({
        title: 'Budget updated',
        description: 'Your monthly budget has been saved'
      });
    }
  };
  
  const handleExportData = () => {
    // In a real app, this would generate and download data
    setTimeout(() => {
      toast({
        title: 'Data exported',
        description: 'Your expense data has been exported successfully'
      });
    }, 1000);
  };
  
  const handleClearData = () => {
    // In a real app, this would clear all data
    toast({
      title: 'Data cleared',
      description: 'All your expense data has been removed',
      variant: 'destructive'
    });
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setEnableDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    
    toast({
      title: checked ? 'Dark mode enabled' : 'Light mode enabled',
      description: checked 
        ? 'The app will now use a dark color theme' 
        : 'The app will now use a light color theme'
    });
  };
  
  const handleToggleVoiceInput = (checked: boolean) => {
    setEnableVoiceInput(checked);
    toast({
      title: checked ? 'Voice input enabled' : 'Voice input disabled',
      description: checked 
        ? 'You can now use voice to add transactions' 
        : 'Voice input has been disabled'
    });
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    toast({
      title: 'Language updated',
      description: `The app language has been set to ${e.target.value}`
    });
  };
  
  return (
    <div className="min-h-screen pb-24 px-4 max-w-xl mx-auto">
      <header className="pt-8 pb-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your experience</p>
      </header>
      
      <div className="space-y-6">
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-primary" />
              <CardTitle>Budget Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="budget"
                    type="number"
                    min="0"
                    step="50"
                    className="pl-7"
                    value={localBudget}
                    onChange={(e) => setLocalBudget(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveBudget}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Set your monthly budget to track spending limits
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5 text-primary" />
              <CardTitle>Appearance & Language</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={enableDarkMode}
                onCheckedChange={handleToggleDarkMode}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="hindi">Hindi</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Choose your preferred language
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <CardTitle>Advanced Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-input">Voice Input</Label>
                <p className="text-sm text-muted-foreground">
                  Add expenses using voice commands
                </p>
              </div>
              <Switch
                id="voice-input"
                checked={enableVoiceInput}
                onCheckedChange={handleToggleVoiceInput}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Data Management</Label>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" className="justify-start" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="justify-start text-destructive border-destructive/20 hover:bg-destructive/10">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your expense data
                        and remove your records from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearData} className="bg-destructive text-destructive-foreground">
                        Yes, delete all data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground py-4 animate-fade-in">
          <p>Expense Tracker v1.0.0</p>
          <p className="mt-1">All data is stored locally on your device</p>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default SettingsPage;
