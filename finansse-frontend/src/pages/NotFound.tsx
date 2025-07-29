import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export function NotFound() {
    return (
        <>
            <main className="flex h-full w-full bg-red-200">
                <div className="flex flex-col">
                    404: Page not found
                    <Link to="/"><Button>Go back</Button></Link>
                </div>
            </main>
        </>
    );
}