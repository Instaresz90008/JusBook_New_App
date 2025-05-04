
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle, Key, AlertTriangle } from "lucide-react";
import { useState } from "react";

const ApiTab = () => {
  const [copied, setCopied] = useState(false);
  const apiKey = "eh_test_51NeWiLFUXvH1234567890abcdefghijklm";
  const maskedKey = `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const endpoints = [
    { 
      name: "List Events", 
      method: "GET", 
      endpoint: "/v1/events",
      description: "Get all events for your account"
    },
    { 
      name: "Create Event", 
      method: "POST", 
      endpoint: "/v1/events",
      description: "Create a new event"
    },
    { 
      name: "Get Event", 
      method: "GET", 
      endpoint: "/v1/events/:id",
      description: "Retrieve a specific event by ID"
    },
    { 
      name: "Update Event", 
      method: "PATCH", 
      endpoint: "/v1/events/:id",
      description: "Update an existing event"
    },
    { 
      name: "Delete Event", 
      method: "DELETE", 
      endpoint: "/v1/events/:id",
      description: "Delete an event"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">API Access</h2>
      <p className="text-gray-500 mb-6">Generate and manage API keys for integration</p>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Your API Keys</h3>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/50 p-5 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <Key className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Live API Key</h4>
            </div>
            
            <div className="flex items-center mt-2">
              <Input 
                value={maskedKey} 
                readOnly 
                className="font-mono text-sm bg-background"
              />
              <Button variant="ghost" className="ml-2" onClick={handleCopy}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Generate New Key
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                Revoke Key
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md flex gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Your API key provides full access to your Event Hub account. Never share it publicly or in client-side code.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">API Documentation</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Base URL</h4>
              <div className="bg-background p-2 rounded border font-mono text-sm">
                https://api.eventhub.com/v1
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Authentication</h4>
              <div className="bg-background p-2 rounded border font-mono text-sm">
                <div className="text-xs text-muted-foreground mb-1">Header</div>
                Authorization: Bearer {maskedKey}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Available Endpoints</h4>
              <div className="space-y-3">
                {endpoints.map((endpoint, i) => (
                  <div key={i} className="border rounded-md overflow-hidden">
                    <div className="flex items-center gap-2 p-3 bg-secondary/50">
                      <span className={`text-xs px-2 py-1 rounded ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : endpoint.method === 'POST' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : endpoint.method === 'PATCH' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-sm">{endpoint.endpoint}</span>
                    </div>
                    <div className="p-3">
                      <h5 className="font-medium text-sm">{endpoint.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{endpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full">
                View Full API Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiTab;
