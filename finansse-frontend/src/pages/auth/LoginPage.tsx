import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useLogin";

const formSchema = z.object({
    email: z.string().email({
        message: "Input must be an email"
    }),
    password: z.string(),
})

export function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { loginAsync, isLoggingIn, loginError } = useLogin();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log("Login form values: ", values);
        try {
            await loginAsync(values);
        } catch (error) {
            console.error('Login failed: ', error);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Continue tracking your finances.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="space-y-4">
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
                        </CardContent>

                        {loginError && (
                            <p className="text-destructive text-sm px-6">
                                {loginError.message || "Invalid email or password"}
                            </p>
                        )}

                        <CardFooter className="flex flex-col">
                            <CardAction className="space-x-2">
                                <Button type='submit' disabled={isLoggingIn}>{isLoggingIn ? 'Logging in...' : 'Login'}</Button>
                                <Button asChild variant={'outline'}>
                                    <Link to='/'>
                                        Go back
                                    </Link>
                                </Button>
                            </CardAction>
                            <span>Don't have an account yet? <Link to='/register' className="underline">Sign up instead</Link></span>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </>
    );
}