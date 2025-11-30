import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import * as EmailValidator from "email-validator";

// Function to verify domain exists via DNS lookup
const verifyEmailDomain = async (email: string): Promise<boolean> => {
    const domain = email.split('@')[1];
    if (!domain) return false;

    try {
        // Use DNS-over-HTTPS to check if domain has MX records
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
        const data = await response.json();
        return data.Status === 0 && data.Answer && data.Answer.length > 0;
    } catch {
        // If DNS check fails, allow it through (don't block valid emails due to network issues)
        return true;
    }
};

const volunteerSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string()
        .trim()
        .max(255)
        .refine((email) => EmailValidator.validate(email), {
            message: "Invalid email address format",
        }),
    phone: z.string().trim().min(1, "Phone number is required").max(20),
    interest: z.string().trim().min(1, "Please tell us your area of interest").max(500),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const VolunteerForm = () => {
    const { toast } = useToast();

    const form = useForm<VolunteerFormData>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            interest: "",
        },
    });

    const onSubmit = async (data: VolunteerFormData) => {
        try {
            // Verify email domain exists
            const domainExists = await verifyEmailDomain(data.email);
            if (!domainExists) {
                toast({
                    title: "Invalid Email Domain",
                    description: "The email domain does not exist. Please check your email address.",
                    variant: "destructive",
                });
                return;
            }

            await emailjs.send(
                "service_886o6ba",
                "template_7pizq3b",
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone,
                    message: `Volunteer Interest: ${data.interest}`,
                },
                "uZjSY0TYwrvN2Wwrn"
            );

            toast({
                title: "Application Submitted!",
                description: "Thank you for your interest in volunteering with us. We'll be in touch soon.",
            });

            form.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            toast({
                title: "Submission Failed",
                description: "Please try again later.",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Fatawu Yakubu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="fatawu@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
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
                                <Input placeholder="+233 (000) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area of Interest</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us what you're interested in helping with..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
            </form>
        </Form>
    );
};

export default VolunteerForm;
