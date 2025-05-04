
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Underline, List, Quote, ListOrdered, MinusSquare, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface EmailTemplateEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailTemplateEditor = ({ value, onChange }: EmailTemplateEditorProps) => {
  const isMobile = useIsMobile();
  
  const addVariable = (variable: string) => {
    // Insert the variable at the cursor position or at the end
    onChange(value + `{${variable}}`);
  };
  
  const TemplateVariables = () => (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Click to add a variable to your template:</p>
      <div className="flex flex-wrap gap-2">
        {['name', 'date', 'time', 'host', 'location', 'duration', 'service', 'email'].map((variable) => (
          <Button 
            key={variable}
            variant="outline" 
            size="sm" 
            onClick={() => addVariable(variable)}
            className="flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            {variable}
          </Button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="border rounded-md">
      <div className="flex items-center p-2 border-b bg-gray-50">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-700">Normal</Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <MinusSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <div className="ml-auto">
          {!isMobile ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Variable
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Email Template Variables</DialogTitle>
                </DialogHeader>
                <TemplateVariables />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Variable
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Email Template Variables</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <TemplateVariables />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
      <Textarea 
        className="min-h-[200px] border-0 focus-visible:ring-0" 
        placeholder="Email template content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default EmailTemplateEditor;
