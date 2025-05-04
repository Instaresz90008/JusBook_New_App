
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, Building, Clock, MapPin, Camera } from "lucide-react";

const ProfileTab = () => {
  const [profileForm, setProfileForm] = useState({
    name: "Anilkumar Garlapati",
    email: "anilkumar@example.com",
    phone: "+1 (555) 123-4567",
    company: "Jusbook Inc.",
    timezone: "UTC-8 (Pacific Standard Time)",
    role: "Product Manager",
    location: "San Francisco, CA",
    bio: "Passionate about building products that solve real-world problems. Focusing on event management solutions and streamlining scheduling processes.",
    website: "https://anilgarlapati.com"
  });
  
  const form = useForm({
    defaultValues: profileForm
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader className="pb-0">
          <h3 className="text-lg font-semibold">Your Profile</h3>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-md">
              <AvatarFallback className="bg-primary/10 text-2xl font-medium text-primary">AG</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">{profileForm.name}</h3>
            <p className="text-sm text-muted-foreground">{profileForm.role}</p>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" /> {profileForm.location}
            </p>
            <div className="mt-6 w-full">
              <Button variant="outline" size="sm" className="mb-2 w-full gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB</p>
            </div>
            
            <div className="mt-6 pt-6 border-t w-full">
              <h4 className="text-sm font-medium mb-3 text-left">About me</h4>
              <p className="text-sm text-left">{profileForm.bio}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t w-full space-y-3">
              <h4 className="text-sm font-medium mb-3 text-left">Contact Information</h4>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <p className="text-sm">{profileForm.email}</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <p className="text-sm">{profileForm.phone}</p>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                <p className="text-sm">{profileForm.website}</p>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                <p className="text-sm">{profileForm.company}</p>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                <p className="text-sm">{profileForm.timezone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
              
      <Card className="lg:col-span-2">
        <CardHeader className="pb-0">
          <h3 className="text-lg font-semibold">Edit Profile Information</h3>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.name} 
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.email}
                          onChange={handleChange}
                          type="email" 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.phone}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.company}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.role}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.location}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={profileForm.website}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                          <option value={profileForm.timezone}>{profileForm.timezone}</option>
                          <option value="UTC+0 (GMT)">UTC+0 (Greenwich Mean Time)</option>
                          <option value="UTC-5 (EST)">UTC-5 (Eastern Standard Time)</option>
                          <option value="UTC-8 (PST)">UTC-8 (Pacific Standard Time)</option>
                          <option value="UTC+1 (CET)">UTC+1 (Central European Time)</option>
                          <option value="UTC+5:30 (IST)">UTC+5:30 (Indian Standard Time)</option>
                          <option value="UTC+8 (CST)">UTC+8 (China Standard Time)</option>
                          <option value="UTC+9 (JST)">UTC+9 (Japan Standard Time)</option>
                        </select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <textarea 
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-3">
        <CardHeader className="pb-0">
          <h3 className="text-lg font-semibold">Preferences</h3>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3">Language & Region</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interface Language
                  </label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="en-US">English (United States)</option>
                    <option value="en-GB">English (United Kingdom)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Format
                  </label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Accessibility</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Size
                  </label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Motion
                  </label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="default">Default</option>
                    <option value="reduced">Reduced</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
