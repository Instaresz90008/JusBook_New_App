
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Mail, Bell } from "lucide-react";

const NotificationsTab = () => {
  const form = useForm({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      newBookings: true,
      bookingChanges: true,
      reminders: true,
      marketing: false
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <p className="text-gray-500 mb-6">Configure how and when you receive notifications</p>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(() => {})}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <FormLabel>Email Notifications</FormLabel>
                    </div>
                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <FormLabel>Push Notifications</FormLabel>
                    </div>
                    <FormField
                      control={form.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Notification Categories</h3>
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(() => {})}>
                <Accordion type="multiple" defaultValue={["bookings", "reminders"]} className="w-full">
                  <AccordionItem value="bookings">
                    <AccordionTrigger>Booking Notifications</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Bookings</p>
                            <p className="text-sm text-muted-foreground">Receive notifications when someone books a slot with you</p>
                          </div>
                          <FormField
                            control={form.control}
                            name="newBookings"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Booking Changes</p>
                            <p className="text-sm text-muted-foreground">Get notified about cancellations or rescheduling</p>
                          </div>
                          <FormField
                            control={form.control}
                            name="bookingChanges"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="reminders">
                    <AccordionTrigger>Reminders</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Event Reminders</p>
                            <p className="text-sm text-muted-foreground">Receive reminders before your scheduled events</p>
                          </div>
                          <FormField
                            control={form.control}
                            name="reminders"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="marketing">
                    <AccordionTrigger>Marketing & Updates</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Product Updates & Tips</p>
                            <p className="text-sm text-muted-foreground">Receive occasional product updates and usage tips</p>
                          </div>
                          <FormField
                            control={form.control}
                            name="marketing"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button">Reset to Defaults</Button>
          <Button onClick={() => form.handleSubmit(() => {})()}>Save Notification Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
