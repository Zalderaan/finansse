import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRegister } from "@/features/auth/hooks/useRegister";
// import { useAuthRedirect } from "@/features/auth/hooks/useAuthRedirect";

const formSchema = z.object({
    email: z.string().email({
        message: "Input must be an email"
    }),

    username: z.string().min(2, {
        message: "Username must be at least 2 characters",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    confirm_password: z.string()
}).refine(
    (data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"]
});

export function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange"
    })

    // const authRedirect = useAuthRedirect();
    // if (authRedirect) return authRedirect;

    const { registerAsync, isRegistering, registerError } = useRegister();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Register form values: ", values);
        try {
            await registerAsync(values);
        } catch (error) {
            console.error("Register error: ", error);
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/4">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Start tracking your finances with Finansse.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage /> {/* Add this for error messages */}
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
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="Password" placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirm_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        {registerError && (
                            <div className="mx-6">
                                <Card className="border-red-300 bg-red-50">
                                    <CardContent className="px-6">
                                        <p className="text-red-700 text-xs">
                                            {registerError.response?.data?.message || registerError.message || "Invalid email or password"}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        <CardFooter className="flex flex-col space-y-4">
                            <CardAction className="flex flex-col w-full space-y-2">
                                <Button type='submit' disabled={isRegistering}>{!isRegistering ? 'Register' : "Creating your account..."}</Button>
                                <Button asChild disabled={isRegistering} variant={"outline"}>
                                    <Link to='/'>
                                        Go back
                                    </Link>
                                </Button>
                            </CardAction>
                            <span className="text-xs">Already have an account? <Link to='/login' className="underline">Sign in instead</Link></span>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}