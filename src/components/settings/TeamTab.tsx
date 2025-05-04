
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { User, MoreHorizontal, Mail, Send, Plus, UserPlus } from "lucide-react";
import { useState } from "react";

const TeamTab = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  
  const teamMembers = [
    { 
      name: "Anilkumar Garlapati", 
      email: "anilkumar@example.com", 
      role: "Owner", 
      avatar: "/placeholder.svg",
      initials: "AG",
      online: true 
    },
    { 
      name: "Jane Cooper", 
      email: "jane@example.com", 
      role: "Admin", 
      avatar: "/placeholder.svg",
      initials: "JC",
      online: true 
    },
    { 
      name: "Robert Fox", 
      email: "robert@example.com", 
      role: "Member", 
      avatar: "/placeholder.svg",
      initials: "RF",
      online: false 
    },
    { 
      name: "Jenny Wilson", 
      email: "jenny@example.com", 
      role: "Member", 
      avatar: "/placeholder.svg",
      initials: "JW",
      online: false 
    }
  ];
  
  const pendingInvites = [
    { name: "Wade Warren", email: "wade@example.com", role: "Member", sent: "2 days ago" },
    { name: "Leslie Alexander", email: "leslie@example.com", role: "Admin", sent: "5 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Team Management</h2>
          <p className="text-gray-500">Invite and manage team members</p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Team Member
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Team Members</h3>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{member.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    </div>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded ${member.role === 'Owner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : member.role === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                    {member.role}
                  </span>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem>Transfer Ownership</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Pending Invitations</h3>
        </CardHeader>
        <CardContent>
          {pendingInvites.length > 0 ? (
            <div className="divide-y">
              {pendingInvites.map((invite, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{invite.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{invite.email}</span>
                        <span>•</span>
                        <span>Sent {invite.sent}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}>
                      {invite.role}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Send className="h-3.5 w-3.5 mr-1" />
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium">No Pending Invitations</h4>
              <p className="text-sm text-muted-foreground mt-1">All invitations have been accepted or canceled.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Team Settings</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Team Name</label>
              <div className="flex items-center gap-2 mt-1.5">
                <Input defaultValue="Event Hub Team" className="max-w-md" />
                <Button>Save</Button>
              </div>
            </div>
            
            <div className="pt-4">
              <label className="text-sm font-medium block mb-1.5">Default Role for New Members</label>
              <select className="w-full max-w-md h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="member">Member (can view and edit)</option>
                <option value="viewer">Viewer (can only view)</option>
                <option value="admin">Admin (full access)</option>
              </select>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <h4 className="text-sm font-medium">Delete Team</h4>
                  <p className="text-xs text-muted-foreground mt-1">This action cannot be undone.</p>
                </div>
                <Button variant="destructive">Delete Team</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invite Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Send an invitation to join your team. They'll receive an email with instructions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="colleague@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="member">Member (can view and edit)</option>
                <option value="viewer">Viewer (can only view)</option>
                <option value="admin">Admin (full access)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Message (optional)</label>
              <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none" placeholder="Add a personal note to your invitation..."></textarea>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Send Invitation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamTab;
