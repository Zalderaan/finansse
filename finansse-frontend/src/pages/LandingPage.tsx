import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function LandingPage() {
    const user = useAuthStore(state => state.user);
    const { logout } = useLogout();
    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4 bg-purple-200 top-0 sticky z-10">
                <span className="font-extrabold text-lg sm:text-xl lg:text-2xl">Finansse</span>
                <nav aria-label="Authentication">
                    {user ? (
                        <ul className="flex items-center space-x-1 sm:space-x-2 list-none">
                            <li className="hidden sm:block text-xs sm:text-sm text-gray-600">
                                Welcome, {user.username}!
                            </li>
                            <li>
                                <Button asChild className="w-fit text-xs sm:text-sm" size='sm'>
                                    <Link to='/dashboard'>
                                        <span className="hidden sm:inline">Proceed to dashboard</span>
                                        <span className="sm:hidden">Dashboard</span>
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild
                                    className="w-fit text-xs sm:text-sm" onClick={() => logout()}
                                    variant='outline' size='sm'
                                >
                                    <Link to='/dashboard'>Logout</Link>
                                </Button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex space-x-1 sm:space-x-2 list-none">
                            <li>
                                <Button asChild className="w-fit text-xs sm:text-sm" size='sm' variant={"outline"}>
                                    <Link to='/login'>Sign In</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild className="w-fit text-xs sm:text-sm" size='sm'>
                                    <Link to='/register'>
                                        <span className="sm:hidden">Sign Up</span>
                                        <span className="hidden sm:inline">Get Started Free</span>
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    )}
                </nav>
            </header>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl w-full">
                        {/* Text */}
                        <div className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left">
                            {/* Main functionality overall of your app */}
                            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                                Your Money, Your Rules
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                                Take control of your finances with smart budgeting, expense tracking, and financial insights that help you achieve your goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                <Button asChild className="w-full sm:w-fit text-sm sm:text-base" size="lg">
                                    <Link to="/register">
                                        Get Started Free
                                    </Link>
                                </Button>
                                <Button asChild className="w-full sm:w-fit text-sm sm:text-base" variant={"outline"} size="lg">
                                    <Link to="/dashboard">
                                        View Demo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        {/* Image */}
                        <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                            <Skeleton className="h-[250px] w-[350px] sm:h-[300px] sm:w-[400px] lg:h-[350px] lg:w-[500px] rounded-lg" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}