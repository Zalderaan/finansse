import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function LandingPage() {
    return (
        <>
            <main className="flex h-full w-full bg-red-200">
                <div className="flex flex-col">
                    <span>Hello from LandingPage!</span>
                    <Link to="/test">
                        <Button className="w-fit">Test Routing</Button>
                    </Link>
                </div>
            </main>
        </>
    );
}